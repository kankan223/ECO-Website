import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import noixorgoData from '../data/noixorgo.json';

const categories = ['All', 'Sustainability', 'Technology', 'Conservation', 'Waste Management', 'Water', 'Student Stories'];

export default function NoixorgoPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = noixorgoData.articles.filter(article => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20">
      {/* Hero Section */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Noixorgo"
            subtitle="Eco Club's official magazine and newsletter"
          />
        </div>
      </section>

      {/* Featured Banner */}
      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl overflow-hidden shadow-soft">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2">
                <img
                  src={noixorgoData.featured.image}
                  alt={noixorgoData.featured.title}
                  className="w-full h-64 lg:h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-sm font-medium text-[#3FAE5C] mb-2">Latest Issue</span>
                <h2 className="text-3xl font-bold text-[#222] mb-4">{noixorgoData.featured.title}</h2>
                <p className="text-muted mb-6">{noixorgoData.featured.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">{noixorgoData.featured.date}</span>
                  <a href="#" className="text-[#3FAE5C] font-medium hover:underline">
                    Read Issue
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Category Chips */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-[#3FAE5C] text-white'
                      : 'bg-white text-[#222] border border-[#ECECEC] hover:border-[#3FAE5C]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-[#3FAE5C] bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-card hover-lift h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-[#222] mb-3 group-hover:text-[#3FAE5C] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted mb-4 flex-grow line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#ECECEC]">
                      <span className="text-sm text-muted">{article.date}</span>
                      <span className="text-sm font-medium text-[#3FAE5C]">{article.category}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}