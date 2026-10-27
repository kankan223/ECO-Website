import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import noixorgoData from '../data/noixorgo.json';

export default function NoixorgoPage() {
  const previous = noixorgoData.previous;
  const previousReleases = previous;

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
                  <span className="text-[#3FAE5C] font-medium">
                    Read Issue
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-6 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Previous Releases"
            subtitle="Looking back at our achievements in making NIT Silchar a more sustainable campus"
          />
        </div>
      </section>

      {/* Previous Releases Grid */}
      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {previousReleases.map((release, index) => (
              <motion.article
                key={`${release.title}-${release.date}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-card hover-lift h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <img
                      src={release.image}
                      alt={release.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-[#222] mb-3 group-hover:text-[#3FAE5C] transition-colors">
                      {release.title}
                    </h3>
                    <p className="text-muted mb-4 flex-grow line-clamp-3">{release.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#ECECEC]">
                      <span className="text-sm text-muted">{release.date}</span>
                      <span className="text-sm font-medium text-[#3FAE5C]">Read Issue</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {previousReleases.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted">No previous releases available.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}