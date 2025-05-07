
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLandContext } from '@/context/LandContext';
import Navbar from '@/components/Navbar';
import ImageGallery from '@/components/ImageGallery';
import { ArrowLeft } from 'lucide-react';

const LandDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { lands } = useLandContext();
  const navigate = useNavigate();
  
  const land = lands.find(land => land.id === id);
  
  // If land not found, redirect to home
  if (!land) {
    React.useEffect(() => {
      navigate('/');
    }, [navigate]);
    return null;
  }
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(land.price);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container-custom py-12">
        <div className="flex items-center mb-8">
          <Link to="/" className="flex items-center text-gray-600 hover:text-kangangu transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to listings</span>
          </Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">{land.title}</h1>
        <p className="text-xl text-gray-600 mb-8">{land.location}</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ImageGallery images={land.images} title={land.title} />
            
            <div className="mt-8">
              <h2 className="text-2xl font-serif font-semibold mb-4">About This Land</h2>
              <p className="text-gray-700 leading-relaxed">
                {land.description}
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-2xl font-serif font-semibold mb-4">Location</h2>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Map placeholder - {land.location}</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
              <h2 className="text-3xl font-serif font-bold text-kangangu mb-2">{formattedPrice}</h2>
              
              <div className="space-y-4 mt-6">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Location</span>
                  <span className="text-gray-600">{land.location}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Area</span>
                  <span className="text-gray-600">{land.squareMeters.toLocaleString()} m²</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Listed On</span>
                  <span className="text-gray-600">
                    {new Date(land.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <button className="btn-primary w-full py-3">
                  Contact Agent
                </button>
                <button className="btn-secondary w-full py-3">
                  Schedule Viewing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandDetail;
