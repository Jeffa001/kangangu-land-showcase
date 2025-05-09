
import React, { useState } from 'react';
import { useLandContext } from '@/context/LandContext';
import LandCard from '@/components/LandCard';
import Navbar from '@/components/Navbar';

const Index: React.FC = () => {
  const { lands } = useLandContext();
  const [filterPrice, setFilterPrice] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  
  // Filter lands based on price range
  const filteredLands = lands.filter(land => {
    if (filterPrice === 'all') return true;
    if (filterPrice === 'low' && land.price <= 200000) return true;
    if (filterPrice === 'medium' && land.price > 200000 && land.price <= 350000) return true;
    if (filterPrice === 'high' && land.price > 350000) return true;
    return false;
  });

  // Get featured lands
  const featuredLands = lands.filter(land => land.featured);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-kangangu to-kangangu-dark text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Discover Your Perfect Piece of Land
            </h1>
            <p className="text-lg mb-8 text-kangangu-muted">
              KANGANGU offers premium land properties in the most desirable locations.
              Your dream begins with the perfect piece of land.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#properties" className="btn-secondary">
                View Properties
              </a>
              <a href="#" className="text-white border border-white px-5 py-2 rounded-md hover:bg-white hover:text-kangangu transition-colors duration-300 font-medium">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Properties */}
      {featuredLands.length > 0 && (
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-semibold mb-2">Featured Properties</h2>
            <p className="text-gray-600 mb-8">Exclusive land offerings selected for their exceptional value and location.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredLands.map(land => (
                <LandCard key={land.id} land={land} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* All Properties */}
      <section id="properties" className="py-16 bg-kangangu-muted/30">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h2 className="text-3xl font-serif font-semibold mb-2">All Properties</h2>
              <p className="text-gray-600">Explore our diverse collection of premium land listings.</p>
            </div>
            
            <div className="mt-4 sm:mt-0">
              <select
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value as any)}
                className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kangangu"
              >
                <option value="all">All Prices</option>
                <option value="low">Ksh200,000 & Under</option>
                <option value="medium">Ksh200,001 - Ksh350,000</option>
                <option value="high">Ksh350,001 & Above</option>
              </select>
            </div>
          </div>
          
          {filteredLands.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLands.map(land => (
                <LandCard key={land.id} land={land} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center">
              <h3 className="text-xl font-medium mb-2">No properties found</h3>
              <p className="text-gray-600">Try changing your filter criteria.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl font-serif font-bold mb-4">KANGANGU</h2>
              <p className="max-w-xs text-gray-400">
                Premium land properties for those who seek beauty, investment, and opportunity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                  <li><a href="#properties" className="text-gray-400 hover:text-white transition-colors">Properties</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>0720861867</li>
                  <li>Central, i.e KIAMBU, NAIROBI COUNTY</li>
                  <li>Email: info@kanganguinvestment.com</li>
                  <li>Phone: +254 720 861867</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} KANGANGU. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
