import { Link } from 'react-router-dom';
import { usePageTitle } from '@/hooks/usePageTitle';

const NotFound = () => {
  usePageTitle('Page Not Found · Al-Baraa Mansour');
  return (
  <div className="flex min-h-screen flex-col items-center justify-center text-center px-6">
    <p className="text-label">Lost in space</p>
    <h1 className="font-display mt-4 text-[clamp(4rem,15vw,9rem)] text-gold">
      404
    </h1>
    <p className="mt-2 text-lg text-muted">
      This page wandered off. Let's get you back.
    </p>
    <Link to="/" className="btn-gold mt-8">
      Return home
    </Link>
  </div>
  );
};

export default NotFound;
