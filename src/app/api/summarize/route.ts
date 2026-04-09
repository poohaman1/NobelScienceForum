import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import * as cheerio from 'cheerio';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: '.env.local 파일에 GEMINI_API_KEY가 설정되지 않았습니다.' }, { status: 500 });
    }

    // 1. URL의 HTML 콘텐츠 가져오기
    const fetchResponse = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    if (!fetchResponse.ok) {
      return NextResponse.json({ error: '해당 URL을 가져올 수 없습니다.' }, { status: 400 });
    }

    const html = await fetchResponse.text();

    // 2. Cheerio를 이용해 순수 텍스트만 추출 (성능 및 토큰 최적화)
    const $ = cheerio.load(html);
    // 불필요한 태그 제거
    $('script, style, noscript, iframe, img, nav, footer, header').remove();
    const textContent = $('body').text().replace(/\s+/g, ' ').trim();

    // 토큰 한계를 막기 위해 일부 텍스트만 제한
    const truncatedText = textContent.slice(0, 8000);

    // 3. Gemini 1.5 Flash API 호출 (안정적인 모델로 변경)
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // JSON 형식을 보장하기 위해 강력한 프롬프트 작성
    const prompt = `다음 텍스트는 인터넷 기사 원문입니다.
이 기사의 원래 "제목(title)"과 내용을 바탕으로 한 "3~5줄 분량의 요약(summary)"을 추출해주세요.
결과는 반드시 JSON 형식으로만 응답해야 합니다.

응답 형식 예시:
{
  "title": "노벨사이언스 포럼 개막",
  "summary": "우주항공 혁신을 주제로 하는 올해 노벨사이언스 포럼이 개막했다. 전 세계 30개국의 연구원들이 참석하여 성황을 이뤘다."
}

기사 텍스트:
${truncatedText}
`;

    let response;
    let retries = 3;
    let delay = 1000;

    // 일시적인 503 에러 대응을 위한 재시도 로직
    for (let i = 0; i < retries; i++) {
      try {
        response = await ai.models.generateContent({
          model: 'gemini-1.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          }
        });
        break; // 성공 시 루프 탈출
      } catch (err: any) {
        if (i === retries - 1) throw err; // 마지막 시도 실패 시 에러 던짐
        console.warn(`AI 요약 재시도 (${i + 1}/${retries}):`, err.message);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // 지수 백오프
      }
    }

    if (!response) {
      throw new Error('AI 응답을 생성하지 못했습니다.');
    }

    const resultText = response.text || "{}";
    const resultObj = JSON.parse(resultText);

    return NextResponse.json({
      title: resultObj.title || '',
      summary: resultObj.summary || ''
    });
  } catch (error: any) {
    console.error("AI 요약 실패:", error);
    return NextResponse.json({ error: error.message || 'AI 요약에 실패했습니다. (Gemini API 오류)' }, { status: 500 });
  }
}
