import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFilter } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import GalleryCard from '../components/GalleryCard';
import galleryData from '../data/gallery.json';

const categories = ['All', 'Green Care', 'Discussions', 'Competitions', 'Celebrations'];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredImages = activeFilter === 'All'
    ? galleryData
    : galleryData.filter(img => img.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20">
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
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeFilter === category
                    ? 'bg-[#3FAE5C] text-white'
                    : 'bg-white text-[#222] border border-[#ECECEC] hover:border-[#3FAE5C]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="masonry-grid"
          >
            {filteredImages.map((image, index) => (
              <GalleryCard key={image.id} image={image} index={index} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}