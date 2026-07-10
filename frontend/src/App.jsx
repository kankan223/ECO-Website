import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from './Loading';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const NoixorgoPage = lazy(() => import('./pages/NoixorgoPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Navbar />
      
      <AnimatePresence mode="wait">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-12 h-12 border-4 border-[#3FAE5C] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/noixorgo" element={<NoixorgoPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}