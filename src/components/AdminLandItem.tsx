
import React, { useState } from 'react';
import { Land } from '@/types/land';
import { useLandContext } from '@/context/LandContext';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AdminLandItemProps {
  land: Land;
}

const AdminLandItem: React.FC<AdminLandItemProps> = ({ land }) => {
  const { deleteLand } = useLandContext();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { id, title, price, location, images } = land;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);

  const formattedDate = new Date(land.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <>
      <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-40 h-32 sm:h-auto">
            <img
              src={images[0]}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 flex-grow flex flex-col sm:flex-row justify-between">
            <div>
              <h3 className="text-lg font-serif font-medium mb-1">{title}</h3>
              <p className="text-gray-600 text-sm">{location}</p>
              <p className="text-kangangu font-medium mt-1">{formattedPrice}</p>
              <p className="text-gray-500 text-xs mt-2">Added on {formattedDate}</p>
            </div>
            <div className="flex items-center mt-4 sm:mt-0">
              <button
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
                aria-label="Delete land listing"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the land listing
              "{title}" and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteLand(id)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdminLandItem;
