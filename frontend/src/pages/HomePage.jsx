import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { useInView } from 'react-intersection-observer';
import { FiArrowRight } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import AchievementCard from '../components/AchievementCard';
import EventCard from '../components/EventCard';
import BlogCard from '../components/BlogCard';
import achievementsData from '../data/achievements.json';
import eventsData from '../data/events.json';
import blogsData from '../data/blogs.json';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&h=1080&fit=crop',
    title: 'Nurturing Nature, Empowering Minds',
    subtitle: 'Join the green revolution at NIT Silchar',
  },
  {
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&h=1080&fit=crop',
    title: 'Building a Sustainable Future',
    subtitle: 'Together, we can make a difference',
  },
  {
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&h=1080&fit=crop',
    title: 'Green Initiatives for a Better Tomorrow',
    subtitle: 'Innovation meets environmental responsibility',
  },
];

const greenInitiatives = [
  {
    id: 1,
    title: 'Tree Plantation Drive',
    description: 'Our annual tree plantation drive aims to increase green cover on campus and surrounding areas, contributing to a healthier environment.',
    image: 'https://images.unsplash.com/photo-1416879241372-5961d01131e3?w=800&h=500&fit=crop',
  },
  {
    id: 2,
    title: 'Solar Power Initiative',
    description: 'Harnessing solar energy to power our campus sustainably, reducing our carbon footprint and promoting renewable energy adoption.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e95801c1d87?w=800&h=500&fit=crop',
  },
  {
    id: 3,
    title: 'Waste Management Program',
    description: 'Comprehensive waste segregation and recycling program to minimize landfill waste and promote circular economy practices.',
    image: 'https://images.unsplash.com/photo-1532992512062-4d3a0f5c1c0a?w=800&h=500&fit=crop',
  },
  {
    id: 4,
    title: 'Water Conservation',
    description: 'Rainwater harvesting and water-saving initiatives to ensure sustainable water usage across the campus.',
    image: 'https://images.unsplash.com/photo-1527219521225-1b6e2e9e1a0a?w=800&h=500&fit=crop',
  },
];

export default function HomePage() {
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [achievementsRef, achievementsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [initiativesRef, initiativesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [eventsRef, eventsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [blogRef, blogInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
     {/* Hero Section */}
<section className="relative h-[85vh]">
  <Swiper
    modules={[Autoplay, Navigation, Pagination, EffectFade]}
    effect="fade"
    fadeEffect={{ crossFade: true }}
    speed={1200}
    autoplay={{
      delay: 5000,
      disableOnInteraction: false,
    }}
    navigation
    pagination={{ clickable: true }}
    loop
    className="h-full"
  >
    {heroSlides.map((slide, index) => (
      <SwiperSlide key={index}>
        <div className="relative h-full">
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="text-center text-white max-w-5xl"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
                {slide.title}
              </h1>

              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
                {slide.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="About Us"
            subtitle="Learn more about our mission and vision"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <p className="text-lg text-muted leading-relaxed text-center">
              The Eco Club at National Institute of Technology Silchar is a vibrant community of students, 
              faculty, and staff committed to promoting environmental awareness and sustainable practices. 
              Through our initiatives, we strive to create a greener campus, engage in meaningful 
              environmental projects, and inspire the next generation of environmental stewards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section ref={achievementsRef} className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Our Achievements"
            subtitle="Celebrating our impact and milestones"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={achievementsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            <Swiper
              modules={[Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop
            >
              {achievementsData.map((achievement, index) => (
                <SwiperSlide key={achievement.id}>
                  <AchievementCard achievement={achievement} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      

      {/* Upcoming Events Section */}
      <section ref={eventsRef} className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Upcoming Events"
            subtitle="Join us in our upcoming environmental activities"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={eventsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            <Swiper
              modules={[Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop
            >
              {eventsData.filter(e => e.status === 'upcoming').map((event, index) => (
                <SwiperSlide key={event.id}>
                  <EventCard event={event} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section ref={blogRef} className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="From Our Blog"
            subtitle="Latest articles and stories from Eco Club"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={blogInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid md:grid-cols-3 gap-8"
          >
            {blogsData.slice(0, 3).map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}