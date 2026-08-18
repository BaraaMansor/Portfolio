import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Index from './pages/Index';

const AllProjects = React.lazy(() => import('./pages/AllProjects'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

/** Reset scroll when navigating between pages (SPA links keep scroll otherwise). */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
