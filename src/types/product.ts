export interface Product {
  id: number;
  sku: string;
  name: string;
  slug: string;
  category: 'GLP' | 'Non-GLP' | 'Best Sellers' | 'Reconstitution';
  dosage: string;
  price: number; // in CAD
  regularPrice: number;
  salePrice: number;
  onSale: boolean;
  currency: string;
  currencySymbol: string;
  isInStock: boolean;
  imageUrl: string;
  shortDescription: string;
  description: string;
  specifications: {
    purityStandard: string;
    form: string;
    appearance: string;
    storage: string;
    countryOfOrigin: string;
    reconstitutionNotes?: string;
  };
  coaSkuMatch?: string | null;
  tags: string[];
}
