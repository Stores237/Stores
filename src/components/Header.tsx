import React, { useState, useEffect } from 'react';
import { Search, Phone, Menu, MapPin, User } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onContactClick: () => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Header({ onSearch, onContactClick, categories, activeCategory, onCategoryChange, currentPage, onPageChange }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerStyle, setHeaderStyle] = useState<React.CSSProperties>({ 
    background: 'rgba(17, 24, 39, 1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)'
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // When scrolling down, make header solid
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsScrolled(true);
      } 
      // When scrolling up, make header transparent
      else if (currentScrollY < lastScrollY) {
        setIsScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
      
      // Update header background style based on scroll position
      if (currentScrollY < 10) {
        setHeaderStyle({
          background: 'rgba(17, 24, 39, 1)',
          backdropFilter: 'blur(0px)',
          WebkitBackdropFilter: 'blur(0px)'
        });
      } else if (!isScrolled) {
        setHeaderStyle({
          background: 'rgba(223, 190, 46, 0.34)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        });
      } else {
        setHeaderStyle({
          background: 'rgba(237, 242, 252, 0.9)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isScrolled]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    if (currentPage !== 'home') {
      onPageChange('home');
    }
  };

  return (
    <header 
      className="fixed top-0 left-0 w-full z-50 text-white shadow transition-all duration-300"
      style={headerStyle}
    >
      {/* Top navigation bar */}
      <div className="border-b border-gray-700" style={{ background: 'transparent' }}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src="/3D_S-Logo-removebg.png"
                  alt="Logo"
                  className="h-8 w-8 rounded"
                />
                <span className="text-xl font-bold hidden sm:block">STORE'S</span>
              </div>
              
              {/* Delivery location */}
              <div className="hidden md:flex items-center space-x-1 text-sm">
                <MapPin className="h-4 w-4" />
                <div>
                  <div className="text-xs text-gray-300">Deliver to</div>
                  <div className="font-bold">Cameroon</div>
                </div>
              </div>
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4 hidden md:flex">
              <div className="flex w-full">
                <select className="bg-gray-200 text-gray-800 px-3 py-2 rounded-l-md border-r border-gray-300 text-sm">
                  <option>All</option>
                  <option>Computers</option>
                  <option>Phones</option>
                  <option>Accessories</option>
                </select>
                <input
                  type="text"
                  placeholder="Search store's"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 text-gray-800 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-primary-400 hover:bg-primary-500 px-4 py-2 rounded-r-md transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Right side */}
            <div className="flex items-center space-x-4">

              {/* Contact */}
              <button
                onClick={onContactClick}
                className="flex items-center space-x-1 hover:bg-gray-800 p-2 rounded transition-colors"
              >
                <Phone className="h-6 w-6" />
                <span className="hidden md:block font-bold">Contact</span>
              </button>

              {/* Mobile menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-800 rounded transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <form onSubmit={handleSearch} className="mt-3 md:hidden">
            <div className="flex">
              <input
                type="text"
                placeholder="Search TechShop"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 text-gray-800 rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary-400 hover:bg-primary-500 px-4 py-2 rounded-r-md transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Secondary navigation */}
      <div className="border-b border-gray-700" style={{ background: 'transparent' }}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center space-x-6 text-sm overflow-x-auto">
            <button
              onClick={() => onPageChange('special-offers')}
              className={`px-2 py-1 rounded whitespace-nowrap transition-colors flex items-center space-x-1 ${
                currentPage === 'special-offers'
                  ? 'bg-primary-500 text-white'
                  : 'hover:bg-gray-700'
              }`}
            >
              <span className="text-red-400">⚡</span>
              <span>Special Offers</span>
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-2 py-1 rounded whitespace-nowrap transition-colors ${
                  activeCategory === category && currentPage === 'home'
                    ? 'bg-primary-500 text-white'
                    : 'hover:bg-gray-700'
                }`}
                onClick={() => {
                  onCategoryChange(category);
                  if (currentPage !== 'home') {
                    onPageChange('home');
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 pb-3 border-b border-gray-700">
                <User className="h-5 w-5" />
                <span>Hello Make Your Choice</span>
              </div>
              <button
                onClick={() => {
                  onPageChange('special-offers');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 px-2 rounded transition-colors flex items-center space-x-2 ${
                  currentPage === 'special-offers'
                    ? 'bg-primary-500 text-white'
                    : 'hover:bg-gray-700'
                }`}
              >
                <span className="text-red-400">⚡</span>
                <span>Special Offers</span>
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    onCategoryChange(category);
                    onPageChange('home');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 px-2 rounded transition-colors ${
                    activeCategory === category && currentPage === 'home'
                      ? 'bg-primary-500 text-white'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}