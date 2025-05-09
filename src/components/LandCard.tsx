
import React from 'react';
import { Link } from 'react-router-dom';
import { Land } from '@/types/land';

interface LandCardProps {
  land: Land;
}

const LandCard: React.FC<LandCardProps> = ({ land }) => {
  const { id, title, price, location, images, squareMeters } = land;
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0
  }).format(price);

  return (
    <Link to={`/land/${id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
        <div className="relative overflow-hidden h-64">
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
          {land.featured && (
            <div className="absolute top-0 right-0 bg-kangangu-accent text-kangangu-dark px-3 py-1 m-2 rounded-md font-medium text-sm">
              Featured
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-xl font-serif font-semibold mb-2 text-gray-800">{title}</h3>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Location:</span> {location}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-medium">Area:</span> {squareMeters.toLocaleString()} m²
          </p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-serif font-bold text-kangangu">{formattedPrice}</p>
            <span className="btn-secondary text-sm">View Details</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LandCard;
