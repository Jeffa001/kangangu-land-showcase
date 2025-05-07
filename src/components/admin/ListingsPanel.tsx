
import React from 'react';
import { Land } from '@/types/land';
import AdminLandItem from '@/components/AdminLandItem';

interface ListingsPanelProps {
  lands: Land[];
}

const ListingsPanel: React.FC<ListingsPanelProps> = ({ lands }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-serif font-medium mb-6">Current Listings</h2>
      
      {lands.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No land listings available.</p>
      ) : (
        <div className="space-y-4">
          {lands.map(land => (
            <AdminLandItem key={land.id} land={land} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingsPanel;
