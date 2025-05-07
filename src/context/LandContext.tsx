
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Land, LandContextType } from "../types/land";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/components/ui/use-toast";

// Sample data
const initialLands: Land[] = [
  {
    id: "1",
    title: "Mountain View Estate",
    price: 250000,
    location: "Alpine Valley, Colorado",
    description: "Beautiful land with stunning mountain views, perfect for a vacation home or cabin.",
    images: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80",
    ],
    squareMeters: 5000,
    featured: true,
    createdAt: new Date()
  },
  {
    id: "2",
    title: "Riverside Property",
    price: 175000,
    location: "Green River, Wyoming",
    description: "Serene land parcel adjacent to a pristine river, ideal for nature lovers.",
    images: [
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80",
    ],
    squareMeters: 4200,
    createdAt: new Date()
  },
  {
    id: "3",
    title: "Forest Retreat",
    price: 320000,
    location: "Pine Creek, Oregon",
    description: "Secluded forest property with mature trees and wildlife. Perfect for your dream cabin.",
    images: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80",
    ],
    squareMeters: 8700,
    featured: true,
    createdAt: new Date()
  },
  {
    id: "4",
    title: "Valley Overlook",
    price: 450000,
    location: "Sun Valley, Idaho",
    description: "Premium lot with panoramic valley views and southern exposure. Fully permitted for construction.",
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80",
    ],
    squareMeters: 6200,
    createdAt: new Date()
  }
];

const LandContext = createContext<LandContextType | null>(null);

export const LandProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lands, setLands] = useState<Land[]>(initialLands);

  const addLand = (landData: Omit<Land, "id" | "createdAt">) => {
    const newLand: Land = {
      ...landData,
      id: uuidv4(),
      createdAt: new Date()
    };
    
    setLands(prevLands => [...prevLands, newLand]);
    toast({
      title: "Land Added",
      description: `"${landData.title}" has been added successfully.`,
    });
  };

  const deleteLand = (id: string) => {
    setLands(prevLands => {
      const landToDelete = prevLands.find(land => land.id === id);
      const updatedLands = prevLands.filter(land => land.id !== id);
      
      if (landToDelete) {
        toast({
          title: "Land Deleted",
          description: `"${landToDelete.title}" has been removed.`,
        });
      }
      
      return updatedLands;
    });
  };

  const updateLand = (id: string, landData: Partial<Land>) => {
    setLands(prevLands =>
      prevLands.map(land =>
        land.id === id ? { ...land, ...landData } : land
      )
    );
    
    toast({
      title: "Land Updated",
      description: "The property has been updated successfully.",
    });
  };

  return (
    <LandContext.Provider value={{ lands, addLand, deleteLand, updateLand }}>
      {children}
    </LandContext.Provider>
  );
};

export const useLandContext = () => {
  const context = useContext(LandContext);
  if (!context) {
    throw new Error("useLandContext must be used within a LandProvider");
  }
  return context;
};
