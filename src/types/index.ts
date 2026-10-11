export type ProductCategory = 'rolling-door' | 'folding-gate' | 'kaca-aluminium' | 'servis';

export interface ProjectItem {
  id: string;
  title: string;
  category: ProductCategory;
  location: string;
  year: string;
  dimensions?: string;
  description: string;
  imageUrl: string;
  featured?: boolean;
}

export interface ProductPriceItem {
  id: string;
  name: string;
  category: ProductCategory;
  thickness: string;
  pricePerUnit: number;
  unit: string; // 'm²' or 'unit'
  description: string;
  features: string[];
  popular?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  comment: string;
  projectType: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  workingHours: string;
  serviceAreas: string[];
  googleMapsQuery: string;
}

export interface AppDataState {
  company: CompanyInfo;
  projects: ProjectItem[];
  pricing: ProductPriceItem[];
  testimonials: TestimonialItem[];
}
