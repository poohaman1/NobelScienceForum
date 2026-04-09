import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as cheerio from 'cheerio';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY가 설정되지 않았습니다.' }, { status: 500 });
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

    // 2. Cheerio를 이용해 순수 텍스트만 추출
    const $ = cheerio.load(html);
    $('script, style, noscript, iframe, img, nav, footer, header').remove();
    const textContent = $('body').text().replace(/\s+/g, ' ').trim();
    const truncatedText = textContent.slice(0, 8000);

    // 3. Google 공식 SDK를 이용한 AI 요약 호출
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });
    
    const prompt = `다음 기사 원문을 바탕으로 "제목(title)"과 "3~5줄 분량의 요약(summary)"을 추출해주세요.
결과는 반드시 JSON 형식이어야 합니다.

응답 형식:
{
  "title": "뉴스 제목",
  "summary": "뉴스 요약 내용"
}

기사 원문:
${truncatedText}
`;

    let result;
    let retries = 3;
    let delay = 1000;

    for (let i = 0; i < retries; i++) {
      try {
        result = await model.generateContent(prompt);
        break;
      } catch (err: any) {
        if (i === retries - 1) throw err;
        console.warn(`Retry ${i + 1}/${retries}:`, err.message);
        await new Promise(r => setTimeout(r, delay));
        delay *= 2;
      }
    }

    if (!result) throw new Error('AI 응답 생성 실패');

    const response = await result.response;
    const resultText = response.text();
    const resultObj = JSON.parse(resultText);

    return NextResponse.json({
      title: resultObj.title || '',
      summary: resultObj.summary || ''
    });
  } catch (error: any) {
    console.error("AI 요약 실패:", error);
    return NextResponse.json({ error: error.message || 'AI 요약에 실패했습니다.' }, { status: 500 });
  }
}
