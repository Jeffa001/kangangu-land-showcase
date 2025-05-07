
import React, { useState } from 'react';
import { useLandContext } from '@/context/LandContext';
import Navbar from '@/components/Navbar';
import AdminLandItem from '@/components/AdminLandItem';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';
import { Land } from '@/types/land';
import { toast } from '@/components/ui/use-toast';

type LandFormData = Omit<Land, "id" | "createdAt">;

const Admin: React.FC = () => {
  const { lands, addLand } = useLandContext();
  const [formData, setFormData] = useState<LandFormData>({
    title: "",
    price: 0,
    location: "",
    description: "",
    images: [],
    squareMeters: 0,
    featured: false
  });

  // Placeholder function to simulate image upload
  // In a real app, this would upload to a server and return URLs
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Create temporary URLs for preview
    // In a real app, you'd upload these to a server
    const newImageUrls = Array.from(files).map(file => URL.createObjectURL(file));

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImageUrls]
    }));

    toast({
      title: "Images Added",
      description: `${files.length} image(s) added to listing.`,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Handle numeric inputs
    if (name === "price" || name === "squareMeters") {
      setFormData({
        ...formData,
        [name]: Number(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      featured: checked
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Title is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.price <= 0) {
      toast({
        title: "Error",
        description: "Price must be greater than 0.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.location.trim()) {
      toast({
        title: "Error",
        description: "Location is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.images.length === 0) {
      toast({
        title: "Error",
        description: "At least one image is required.",
        variant: "destructive"
      });
      return;
    }
    
    // Submit form
    addLand(formData);
    
    // Reset form
    setFormData({
      title: "",
      price: 0,
      location: "",
      description: "",
      images: [],
      squareMeters: 0,
      featured: false
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container-custom py-12">
        <h1 className="text-3xl font-serif font-semibold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add New Land Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-serif font-medium mb-6">Add New Land</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Mountain View Estate"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price || ""}
                    onChange={handleInputChange}
                    placeholder="250000"
                    min="1"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Alpine Valley, Colorado"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="squareMeters">Area (m²)</Label>
                  <Input
                    id="squareMeters"
                    name="squareMeters"
                    type="number"
                    value={formData.squareMeters || ""}
                    onChange={handleInputChange}
                    placeholder="5000"
                    min="1"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Beautiful land with stunning mountain views..."
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="images">Images</Label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="images"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG or WEBP (MAX. 5MB)
                        </p>
                      </div>
                      <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        multiple
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  
                  {formData.images.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative h-16 w-16 overflow-hidden rounded-md">
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <Label htmlFor="featured">Featured Property</Label>
                </div>
                
                <Button type="submit" className="w-full bg-kangangu hover:bg-kangangu-dark">
                  Add Land Listing
                </Button>
              </form>
            </div>
          </div>
          
          {/* Current Listings */}
          <div className="lg:col-span-2">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
