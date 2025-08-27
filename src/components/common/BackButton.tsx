import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface BackButtonProps {
  fallbackTo?: string;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ 
  fallbackTo = "/", 
  className = "inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-8" 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract section name from current path
  const section = location.pathname.split('/')[1];
  const backText = section ? `Back to ${section.charAt(0).toUpperCase() + section.slice(1)}` : 'Back';
  const backPath = section ? `/${section}` : fallbackTo;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Check if there's history to go back to within our app
    if (window.history.length > 1 && document.referrer.startsWith(window.location.origin)) {
      navigate(-1);
    } else {
      // Fallback to the section page
      navigate(backPath);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      <ArrowLeft className="w-4 h-4" />
      {backText}
    </button>
  );
};