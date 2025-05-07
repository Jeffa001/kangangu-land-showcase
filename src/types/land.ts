
export interface Land {
  id: string;
  title: string;
  price: number;
  location: string;
  description: string;
  images: string[];
  squareMeters: number;
  featured?: boolean;
  createdAt: Date;
}

export interface LandContextType {
  lands: Land[];
  addLand: (land: Omit<Land, "id" | "createdAt">) => void;
  deleteLand: (id: string) => void;
  updateLand: (id: string, land: Partial<Land>) => void;
}
