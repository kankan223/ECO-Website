import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function MemberCard({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="bg-white rounded-2xl p-6 text-center shadow-card hover-lift">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full rounded-full object-cover border-4 border-[#3FAE5C]/20 transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#3FAE5C]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <h3 className="text-xl font-bold text-[#222] mb-1">{member.name}</h3>
        <p className="text-[#3FAE5C] font-medium mb-4">{member.position}</p>
        
        {member.social && (
          <div className="flex justify-center space-x-3">
            {member.social.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#3FAE5C]/10 rounded-full flex items-center justify-center hover:bg-[#3FAE5C] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            )}
            {member.social.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#3FAE5C]/10 rounded-full flex items-center justify-center hover:bg-[#3FAE5C] hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
            )}
            {member.social.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#3FAE5C]/10 rounded-full flex items-center justify-center hover:bg-[#3FAE5C] hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}