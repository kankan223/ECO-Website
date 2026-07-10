import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import MemberCard from '../components/MemberCard';
import teamData from '../data/team.json';

const years = ['2024', '2023', '2022'];

export default function TeamPage() {
  const [activeYear, setActiveYear] = useState('2024');

  const currentCommittee = teamData.committees[activeYear];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20">
      {/* Hero Section */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Our Team"
            subtitle="Meet the passionate individuals behind Eco Club"
          />
        </div>
      </section>

      {/* Faculty Advisors & Leadership */}
      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#222] mb-8">Leadership</h2>
          
          {/* Faculty Advisor */}
          {teamData.facultyAdvisors && (
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-muted mb-6">Faculty Advisor</h3>
              <div className="max-w-3xl">
                {teamData.facultyAdvisors.map((advisor) => (
                  <div key={advisor.id} className="bg-white rounded-2xl p-8 shadow-card">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <img
                        src={advisor.image}
                        alt={advisor.name}
                        className="w-32 h-32 rounded-full object-cover"
                        loading="lazy"
                      />
                      <div>
                        <h4 className="text-2xl font-bold text-[#222] mb-2">{advisor.name}</h4>
                        <p className="text-[#3FAE5C] font-medium mb-4">{advisor.position}</p>
                        <p className="text-muted leading-relaxed">{advisor.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Director */}
          {teamData.directors && (
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-muted mb-6">Director</h3>
              <div className="max-w-3xl">
                {teamData.directors.map((director) => (
                  <div key={director.id} className="bg-white rounded-2xl p-8 shadow-card">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <img
                        src={director.image}
                        alt={director.name}
                        className="w-32 h-32 rounded-full object-cover"
                        loading="lazy"
                      />
                      <div>
                        <h4 className="text-2xl font-bold text-[#222] mb-2">{director.name}</h4>
                        <p className="text-[#3FAE5C] font-medium mb-4">{director.position}</p>
                        <p className="text-muted leading-relaxed">{director.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dean */}
          {teamData.deans && (
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-muted mb-6">Dean</h3>
              <div className="max-w-3xl">
                {teamData.deans.map((dean) => (
                  <div key={dean.id} className="bg-white rounded-2xl p-8 shadow-card">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <img
                        src={dean.image}
                        alt={dean.name}
                        className="w-32 h-32 rounded-full object-cover"
                        loading="lazy"
                      />
                      <div>
                        <h4 className="text-2xl font-bold text-[#222] mb-2">{dean.name}</h4>
                        <p className="text-[#3FAE5C] font-medium mb-4">{dean.position}</p>
                        <p className="text-muted leading-relaxed">{dean.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Student Members */}
      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#222] mb-8">Student Members</h2>
          
          {/* Year Tabs */}
          <div className="flex space-x-4 mb-8">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeYear === year
                    ? 'bg-[#3FAE5C] text-white'
                    : 'bg-white text-[#222] border border-[#ECECEC] hover:border-[#3FAE5C]'
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Committee Members */}
          {currentCommittee && (
            <div>
              {/* Core Members */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-muted mb-6">Core Committee</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {[currentCommittee.president, currentCommittee.secretary, currentCommittee.treasurer].map((member, index) => (
                    <MemberCard key={member.name} member={member} index={index} />
                  ))}
                </div>
              </div>

              {/* Executives */}
              {currentCommittee.executives && currentCommittee.executives.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-muted mb-6">Executive Members</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentCommittee.executives.map((member, index) => (
                      <MemberCard key={member.name} member={member} index={index} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}