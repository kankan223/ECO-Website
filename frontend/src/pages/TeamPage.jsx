import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import MemberCard from "../components/MemberCard";
import teamData from "../data/team.json";

const years = Object.keys(teamData.committees).sort((a, b) => b - a);

export default function TeamPage() {
  const [activeYear, setActiveYear] = useState(years[0]);

  const currentCommittee = teamData.committees[activeYear];

  const sections = [
    {
      title: "Faculty Advisor",
      data: currentCommittee.facultyAdvisor,
    },
    {
      title: "Secretary",
      data: currentCommittee.secretary,
    },
    {
      title: "Senior Executives",
      data: currentCommittee.seniorExecutives,
    },
    {
      title: "Developers",
      data: currentCommittee.developers,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            title="Our Team"
            subtitle="Meet the passionate individuals behind Eco Club"
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">

          {/* Year Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-6 py-2 rounded-full transition-all font-medium ${
                  activeYear === year
                    ? "bg-[#3FAE5C] text-white"
                    : "bg-white border border-gray-300 hover:border-[#3FAE5C]"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Sections with Photos */}
          {sections.map(
            (section) =>
              section.data &&
              section.data.length > 0 && (
                <div key={section.title} className="mb-16">

                  <h2 className="text-3xl font-bold text-center mb-10">
                    {section.title}
                  </h2>

                  <div className="flex flex-wrap justify-center gap-8">
                    {section.data.map((member, index) => (
                      <div key={member.name} className="w-72">
                        <MemberCard
                          member={member}
                          index={index}
                        />
                      </div>
                    ))}
                  </div>

                </div>
              )
          )}

          {/* Junior Executives */}
          {currentCommittee.juniorExecutives &&
            currentCommittee.juniorExecutives.length > 0 && (
              <div className="mb-16">

                <h2 className="text-3xl font-bold text-center mb-10">
                  Junior Executives
                </h2>

                <div className="flex flex-wrap justify-center gap-5">
                  {currentCommittee.juniorExecutives.map((member, index) => (
                    <div
                      key={index}
                      className="w-64 bg-white rounded-xl shadow-card p-5 text-center border border-[#ECECEC] hover:border-[#3FAE5C] transition-all"
                    >
                      <h3 className="text-lg font-semibold text-[#222]">
                        {member.name}
                      </h3>
                    </div>
                  ))}
                </div>

              </div>
            )}

        </div>
      </section>
    </div>
  );
}