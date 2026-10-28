import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
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
    image:
      '/home/hero-1.webp',
    title: 'Rooted in Nature. Driven by Change.',
    subtitle:
      'Empowering the NIT Silchar community to protect nature and build a greener tomorrow.',
    cta: 'Explore Our Mission',
    alt: 'Sunlight filtering through a lush green forest',
  },
  {
    image:
      '/home/hero-2.webp',
    title: 'Plant Today. Sustain Tomorrow.',
    subtitle:
      'Every tree we nurture brings us one step closer to a healthier, more sustainable planet.',
    cta: 'Join the Green Movement',
    alt: 'Lush green plants growing in natural sunlight',
  },
  {
    image:
      '/home/hero-3.webp',
    title: 'A Campus That Cares for the Earth.',
    subtitle:
      'Turning environmental awareness into action through conservation, innovation, and community.',
    cta: 'Discover Our Initiatives',
    alt: 'Wildlife thriving in a natural green landscape',
  },
];

export default function HomePage() {
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [achievementsRef, achievementsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [eventsRef, eventsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [blogRef, blogInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const upcomingEvents = eventsData.filter(e => e.status === 'upcoming');

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative h-[min(88vh,850px)] min-h-[620px] overflow-hidden bg-[#10291d] max-md:min-h-[620px]">
        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1000}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          loop
          className="h-full"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="h-full w-full object-cover"
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#071b12]/85 via-[#071b12]/55 to-[#071b12]/10" />
                <div className="absolute inset-0 flex items-center px-6 pb-12 pt-20 sm:px-10 lg:px-16">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.75 }}
                    className="mx-auto w-full max-w-7xl text-white"
                  >
                    <div className="max-w-3xl">
                      <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm sm:text-sm">
                        <span className="h-2 w-2 rounded-full bg-[#91d65c]" />
                        NIT Silchar · Eco Club
                      </span>
                      <h1 className="mb-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                        {slide.title}
                      </h1>
                      <p className="max-w-2xl text-base leading-7 text-white/85 sm:text-lg md:text-xl md:leading-8">
                        {slide.subtitle}
                      </p>
                      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <Button href="/events" className="gap-2 !rounded-full !bg-[#71bd54] !px-7 !py-4 !text-[#10291d] !shadow-lg hover:!bg-[#8bd46d]">
                          {slide.cta}
                          <FiArrowRight aria-hidden="true" />
                        </Button>
                        <Link
                          to="/noixorgo"
                          className="inline-flex items-center justify-center rounded-full border border-white/55 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        >
                          Discover our work
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Campus impact strip */}
      <section className="relative z-10 mx-auto -mt-8 w-[calc(100%-2rem)] max-w-6xl rounded-2xl border border-[#e6eee7] bg-white px-5 py-6 shadow-[0_18px_50px_rgba(18,50,31,0.12)] sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-5 text-center sm:grid-cols-3 sm:divide-x sm:divide-[#e6eee7]">
          <div className="px-3">
            <p className="text-2xl font-extrabold tracking-tight text-[#24623b] sm:text-3xl">166th</p>
            <p className="mt-1 text-xs font-medium text-[#66756b] sm:text-sm">UI GreenMetric global sustainability rank</p>
          </div>
          <div className="px-3">
            <p className="text-2xl font-extrabold tracking-tight text-[#24623b] sm:text-3xl">1st</p>
            <p className="mt-1 text-xs font-medium text-[#66756b] sm:text-sm">in India for Energy &amp; Climate Change</p>
          </div>
          <div className="px-3">
            <p className="text-2xl font-extrabold tracking-tight text-[#24623b] sm:text-3xl">One community</p>
            <p className="mt-1 text-xs font-medium text-[#66756b] sm:text-sm">students taking action for a greener campus</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="bg-[#f5f8f3] px-6 py-20 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={aboutInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20"
        >
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-4 -top-4 h-28 w-28 rounded-tl-[2.5rem] border-l-2 border-t-2 border-[#78b95c] sm:-left-6 sm:-top-6" />
            <img
              src="/achievements/tree-plant.jpeg"
              alt="Eco Club members planting a young tree on campus"
              loading="lazy"
              className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-[0_24px_60px_rgba(18,50,31,0.18)]"
            />
            <div className="absolute -bottom-5 right-4 max-w-[17rem] rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl backdrop-blur sm:right-[-1.5rem] sm:p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#548545]">Rooted in action</p>
              <p className="mt-1 text-sm font-semibold leading-5 text-[#20372a] sm:text-base">Small steps today. A healthier campus tomorrow.</p>
            </div>
          </div>
          <div className="pt-4 lg:pt-0">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#548545]">Who we are</p>
            <h2 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-[#20372a] sm:text-4xl lg:text-5xl">
              A greener campus starts with all of us.
            </h2>
            <p className="mt-6 text-base leading-8 text-[#66756b] sm:text-lg">
              The Eco Club at National Institute of Technology Silchar brings students, faculty, and staff together to turn care for the environment into meaningful action. We learn, work on campus initiatives, and make sustainability part of everyday life.
            </p>
            <div className="mt-7 space-y-3">
              {[
                'Build awareness through learning and conversation',
                'Care for campus green spaces and natural resources',
                'Turn ideas into hands-on community initiatives',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm font-medium leading-6 text-[#334b3b] sm:text-base">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#62a84b]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Link
              to="/noixorgo"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#215d39] px-6 py-3.5 font-semibold text-white transition hover:bg-[#17482c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#215d39]"
            >
              Explore our initiatives <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </section>

    {/* future initiative upgrade */}
      {/* Green Initiatives Section
      <section
        id="initiatives"
        className="bg-[#F1F7F0] py-20 px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Our Green Initiatives"
            subtitle="Turning environmental awareness into meaningful action"
          />

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {greenInitiatives.map((initiative, index) => (
              <motion.article
                key={initiative.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group overflow-hidden rounded-2xl bg-white
                  shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="overflow-hidden aspect-[4/3]">
                  <img
                    src={initiative.image}
                    alt={initiative.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover
                      transition-transform duration-500
                      group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#245638]">
                    {initiative.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-600 leading-7">
                    {initiative.description}
                  </p>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 mt-5
                      font-semibold text-[#26734D]
                      hover:text-[#17452D] transition-colors
                      focus-visible:outline-2
                      focus-visible:outline-offset-4"
                  >
                    Get involved
                    <FiArrowRight aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section> */}


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
            {upcomingEvents.length > 0 ? (
              <Swiper
                modules={[Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={upcomingEvents.length > 3}
              >
                {upcomingEvents.map((event, index) => (
                  <SwiperSlide key={event.id}>
                    <EventCard event={event} index={index} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="rounded-2xl bg-white shadow-card px-6 py-12 text-center">
                <p className="text-xl font-semibold text-[#222]">No upcoming events right now</p>
                <p className="mt-2 text-muted">We are busy planning the next one. Browse everything that has happened so far.</p>
                <Link
                  to="/events"
                  className="inline-flex items-center mt-6 px-6 py-3 rounded-xl font-medium bg-white text-[#3FAE5C] border-2 border-[#3FAE5C] hover:bg-[#3FAE5C]/5 transition-all"
                >
                  Browse past events
                </Link>
              </div>
            )}
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