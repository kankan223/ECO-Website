import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFilter, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import GalleryCard from '../components/GalleryCard';
import galleryData from '../data/gallery.json';

const categories = ['All', 'Green Care', 'Discussions', 'Competitions', 'Celebrations', 'Achievements'];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeId, setActiveId] = useState(null);

  const filteredImages = activeFilter === 'All'
    ? galleryData
    : galleryData.filter(img => img.category === activeFilter);

  const selectedIndex = filteredImages.findIndex(img => img.id === activeId);

  const safelyOpenLightbox = (image) => {
    setActiveId(image.id);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActiveId(null);
    document.body.style.overflow = '';
  };

  const prev = () => {
    if (activeId == null) return;
    const next = (filteredImages[(selectedIndex - 1 + filteredImages.length) % filteredImages.length]).id;
    setActiveId(next);
  };

  const next = () => {
    if (activeId == null) return;
    const next = (filteredImages[(selectedIndex + 1) % filteredImages.length]).id;
    setActiveId(next);
  };

  useEffect(() => {
    if (activeId == null) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prev();
      } else if (e.key === 'ArrowRight') {
        next();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeId, filteredImages.length]);

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] pt-20">
      {/* Hero Section */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Gallery"
            subtitle="Capturing moments from our green journey"
          />
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <FiFilter className="w-5 h-5 text-[#3FAE5C]" />
            <span className="text-lg font-medium text-[#222]">Filter by:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveFilter(category);
                  setActiveId(null);
                }}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  activeFilter === category
                    ? 'bg-[#3FAE5C] text-white ring-2 ring-[#3FAE5C]/30'
                    : 'bg-white text-[#222] border border-[#ECECEC] hover:border-[#3FAE5C]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1.5 gap-y-1.5"
          >
            {filteredImages.map((image, index) => (
              <GalleryCard
                key={image.id}
                image={image}
                index={index}
                onSelect={safelyOpenLightbox}
              />
            ))}
          </motion.div>

          {filteredImages.length === 0 && (
            <p className="text-center text-muted mt-14">No photos in this category yet.</p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {activeId != null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close viewer"
            className="absolute top-4 right-4 z-10 text-white/80 hover:text-[#3FAE5C] transition-colors"
          >
            <FiX className="w-7 h-7" />
          </button>

          <div
            className="flex flex-col items-center gap-3 px-4"
            onClick={(e) => e.target === e.currentTarget && closeLightbox()}
          >
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors hidden md:block"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>

            <motion.button
              type="button"
              key={selectedIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {}}
              className="block max-w-[90vw] max-h-[70vh] overflow-hidden rounded-sm"
            >
              <img
                src={filteredImages[selectedIndex]?.src}
                alt={filteredImages[selectedIndex]?.alt}
                className="w-auto h-auto max-w-[90vw] max-h-[70vh] object-contain"
                aria-hidden="true"
              />
            </motion.button>

            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors hidden md:block"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-center pointer-events-none">
            <p className="text-white/80 text-sm font-medium">{selectedIndex + 1} / {filteredImages.length}</p>
            <p className="text-white/50 text-xs mt-0.5">{filteredImages[selectedIndex]?.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
}