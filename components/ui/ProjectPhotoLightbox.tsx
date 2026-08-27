'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ProjectPhotoLightbox({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      }

      if (event.key === 'ArrowRight') {
        setSelectedIndex((current) => {
          if (current === null) return 0;
          return (current + 1) % images.length;
        });
      }

      if (event.key === 'ArrowLeft') {
        setSelectedIndex((current) => {
          if (current === null) return images.length - 1;
          return (current - 1 + images.length) % images.length;
        });
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [images.length, selectedIndex]);

  return (
    <>
      <div className="mx-auto max-w-[860px] overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max justify-center gap-4">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="group relative w-[82vw] max-w-[760px] shrink-0 snap-center overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C3A2F1]"
              aria-label={`Open ${title} project photo ${index + 1}`}
            >
              <div className="relative h-[260px] w-full sm:h-[360px] md:h-[440px]">
                <Image
                  src={image}
                  alt={`${title} project photo ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 82vw, 760px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#10082B]/85 p-4 backdrop-blur-sm"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative w-full max-w-[1100px]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute -top-12 right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#10082B]/70 text-xl text-white/80 transition hover:bg-[#10082B] hover:text-white"
              aria-label="Close image preview"
            >
              ×
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex((current) =>
                      current === null ? 0 : (current - 1 + images.length) % images.length
                    )
                  }
                  className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#10082B]/70 text-2xl text-white/80 transition hover:bg-[#10082B] hover:text-white"
                  aria-label="Previous image"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex((current) =>
                      current === null ? 1 : (current + 1) % images.length
                    )
                  }
                  className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#10082B]/70 text-2xl text-white/80 transition hover:bg-[#10082B] hover:text-white"
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}

            <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#0D0724] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
              <div className="relative mx-auto h-[60vh] w-full max-w-[1050px]">
                <Image
                  src={selectedImage}
                  alt={`${title} enlarged preview`}
                  fill
                  priority
                  sizes="(max-width: 1200px) 90vw, 1050px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
