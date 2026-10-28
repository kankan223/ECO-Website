import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import EventCard from '../components/EventCard';
import eventsData from '../data/events.json';

const filters = ['All', ...[...new Set(eventsData.map((event) => event.status))].map((status) => status.charAt(0).toUpperCase() + status.slice(1))];

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState(
    eventsData.some((event) => event.status === 'upcoming') ? 'Upcoming' : 'All'
  );
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = eventsData.filter(event => {
    const matchesFilter = activeFilter.toLowerCase() === 'all' || event.status === activeFilter.toLowerCase();
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20">
      {/* Hero Section */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Events"
            subtitle="Join us in our environmental initiatives and activities"
          />
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Category Chips */}
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    activeFilter === filter
                      ? 'bg-[#3FAE5C] text-white'
                      : 'bg-white text-[#222] border border-[#ECECEC] hover:border-[#3FAE5C]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="search"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-[#3FAE5C] bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </motion.div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted">No events found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}