import { motion } from 'framer-motion';
import Button from './Button';

export default function AchievementCard({ achievement, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-card hover-lift h-full flex flex-col">
        <div className="relative overflow-hidden">
          <img
            src={achievement.image}
            alt={achievement.title}
            className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-[#222] mb-3">{achievement.title}</h3>
          <p className="text-muted mb-4 flex-grow">{achievement.description}</p>
          <Button variant="secondary" className="w-full">
            Read More
          </Button>
        </div>
      </div>
    </motion.div>
  );
}