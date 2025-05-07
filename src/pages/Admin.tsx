
import React from 'react';
import { useLandContext } from '@/context/LandContext';
import AdminLayout from '@/components/admin/AdminLayout';
import AddLandForm from '@/components/admin/AddLandForm';
import ListingsPanel from '@/components/admin/ListingsPanel';
import { Land } from '@/types/land';

type LandFormData = Omit<Land, "id" | "createdAt">;

const Admin: React.FC = () => {
  const { lands, addLand } = useLandContext();

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add New Land Form */}
        <div className="lg:col-span-1">
          <AddLandForm onAddLand={addLand} />
        </div>
        
        {/* Current Listings */}
        <div className="lg:col-span-2">
          <ListingsPanel lands={lands} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
