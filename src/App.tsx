import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { SpecialOffersPage } from './components/SpecialOffersPage';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Product } from './types';
import productsData from './data/products.json';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const categories = [
    'All',
    'Computers',
    'Phones',
    'Computer Accessories',
    'Phone Accessories',
    'Modems',
    'Services'
  ];

  useEffect(() => {
    setProducts(productsData);
    setFilteredProducts(productsData);
  }, []);

  useEffect(() => {
    let filtered = products;

    if (activeCategory !== 'All') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    const sortedFiltered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low-high':
          return a.price - b.price;
        case 'price-high-low':
          return b.price - a.price;
        case 'name-a-z':
          return a.name.localeCompare(b.name);
        case 'name-z-a':
          return b.name.localeCompare(a.name);
        case 'newest':
          // Simulate newest by ID (higher ID = newer)
          return b.id - a.id;
        case 'rating':
          // Simulate rating sort (for demo, using price as proxy)
          return b.price - a.price;
        case 'featured':
        default:
          // Featured: special offers first, then by ID
          if (a.isSpecialOffer && !b.isSpecialOffer) return -1;
          if (!a.isSpecialOffer && b.isSpecialOffer) return 1;
          return a.id - b.id;
      }
    });
    setFilteredProducts(sortedFiltered);
  }, [products, activeCategory, searchQuery, sortBy]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };
  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'special-offers':
        return <SpecialOffersPage products={products} />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            
            {/* Results section */}
            <section className="bg-white">
              <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-lg font-medium text-gray-900">
                      {searchQuery ? `Results for "${searchQuery}"` : activeCategory === 'All' ? 'All Departments' : activeCategory}
                    </h1>
                    <p className="text-sm text-gray-600">
                      {filteredProducts.length} results
                    </p>
                  </div>
                  
                  <select 
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="featured">Sort by: Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="rating">Customer Reviews</option>
                    <option value="newest">Newest Arrivals</option>
                    <option value="name-a-z">Name: A to Z</option>
                    <option value="name-z-a">Name: Z to A</option>
                  </select>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg mb-4">
                      No results found
                    </p>
                    <p className="text-gray-400 mb-4">
                      Try checking your spelling or use more general terms
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('All');
                        setSortBy('featured');
                      }}
                      className="text-blue-600 hover:text-primary-600 font-medium"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        );
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <Header 
        onSearch={handleSearch} 
        onContactClick={() => setIsContactOpen(true)}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      
      <main>{renderCurrentPage()}</main>

      <Footer />
      <Contact isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}

export default App;