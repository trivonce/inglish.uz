import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";

export const PageHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header 
      className={`sticky top-0 z-10 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-3" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <button 
              className="flex items-center text-emerald-700 hover:text-emerald-600 transition-colors"
              onClick={() => window.history.back()}
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>
          
          <div className={`transition-all duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}>
            <h2 className="text-lg font-semibold text-emerald-800">
              Speaking Results
            </h2>
          </div>
          
          <div className="w-[60px]"></div>
        </div>
      </div>
    </header>
  );
};