'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ArchivePage() {
  const [archives, setArchives] = useState<any[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let dbData = [];
      if (supabase) {
        const { data } = await supabase.from("forums").select("*").eq("is_current", false).order("year", { ascending: false });
        dbData = data || [];
      }

      // 2023, 2024, 2025 데이터는 요청에 따라 특수 처리 (이미지 포함 및 주제 제외)
      const specialData = [
        { 
          year: 2025, 
          title: '2025 대한민국 노벨사이언스 대상 시상식 & 노벨사이언스포럼', 
          images: ['/images/forum_2025_1.jpg'],
          hideTheme: true
        },
        { 
          year: 2024, 
          title: '2024 노벨사이언스 포럼', 
          images: ['/images/forum_2024_1.jpg', '/images/forum_2024_2.jpg', '/images/forum_2024_3.jpg'],
          hideTheme: true
        },
        { 
          year: 2023, 
          title: '2023 노벨사이언스 포럼', 
          images: ['/images/forum_2023_1.jpg', '/images/forum_2023_2.jpg'],
          hideTheme: true
        },
        { 
          year: 2022, 
          title: '2022 노벨사이언스 포럼', 
          images: ['/images/forum_2022_1.jpg', '/images/forum_2022_2.jpg'],
          hideTheme: true
        }
      ];

      setArchives(specialData);
    }
    fetchData();
  }, []);

  const openModal = (images: string[]) => {
    if (images && images.length > 0) {
      setSelectedImages(images);
      setCurrentImgIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      alert('등록된 자료가 없습니다.');
    }
  };

  const closeModal = () => {
    setSelectedImages(null);
    document.body.style.overflow = 'auto';
  };

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImages) {
      setCurrentImgIndex((prev) => (prev + 1) % selectedImages.length);
    }
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImages) {
      setCurrentImgIndex((prev) => (prev - 1 + selectedImages.length) % selectedImages.length);
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '60vh' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
        <Link href="/forum" style={{ fontWeight: 500, color: 'var(--text-muted)' }}>올해의 포럼</Link>
        <Link href="/forum/archive" style={{ fontWeight: 700, color: 'var(--primary)' }}>아카이브</Link>
      </div>

      <h1 className="title-h1">포럼 아카이브</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>과거 포럼의 기록과 자료를 확인하세요. 당시의 영상 및 발표 자료가 제공됩니다.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {archives.map(archive => (
          <div key={archive.year} className="card">
            <div 
              style={{ 
                height: '180px', 
                background: archive.images && archive.images.length > 0 ? `url(${archive.images[0]}) center/cover` : 'var(--surface-hover)', 
                borderRadius: 'var(--radius-sm)', 
                marginBottom: '1.25rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'var(--text-muted)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {!archive.images || archive.images.length === 0 ? '자료 준비 중' : null}
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.4 }}>{archive.title}</h3>
            {!archive.hideTheme && archive.theme && (
              <p style={{ color: 'var(--text-muted)', marginTop: '0.625rem', fontSize: '0.9rem' }}>주제: {archive.theme}</p>
            )}
            <button 
              className="btn-outline" 
              style={{ marginTop: '1.5rem', padding: '0.5rem 1rem', fontSize: '0.875rem', width: '100%' }}
              onClick={() => openModal(archive.images || [])}
            >
              자료보기
            </button>
          </div>
        ))}
      </div>

      {/* 이미지 갤러리 모달 */}
      {selectedImages && (
        <div 
          onClick={closeModal}
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            backgroundColor: 'rgba(0,0,0,0.85)', 
            zIndex: 9999, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <button 
            onClick={closeModal}
            style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer', zIndex: 10001 }}
          >
            &times;
          </button>

          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative', maxWidth: '900px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <img 
              src={selectedImages[currentImgIndex]} 
              alt="Archive Material" 
              style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '4px', boxShadow: '0 0 30px rgba(0,0,0,0.5)' }} 
            />
            
            {selectedImages.length > 1 && (
              <>
                <button 
                  onClick={prevImg}
                  style={{ position: 'absolute', left: '-4rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontSize: '3rem', cursor: 'pointer', padding: '1rem', borderRadius: '50%' }}
                >
                  &#8249;
                </button>
                <button 
                  onClick={nextImg}
                  style={{ position: 'absolute', right: '-4rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontSize: '3rem', cursor: 'pointer', padding: '1rem', borderRadius: '50%' }}
                >
                  &#8250;
                </button>
                <div style={{ color: 'white', marginTop: '1rem', fontSize: '1rem', fontWeight: 500 }}>
                  {currentImgIndex + 1} / {selectedImages.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
