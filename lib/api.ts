import { Product, Category } from './types';

const API_BASE = 'https://dummyjson.com/products';

interface FetchProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export async function fetchProducts(params?: {
  category?: string;
  sort?: string;
  search?: string;
  name?: string;
  limit?: string;
  skip?: string;
  maxPrice?: string;
}): Promise<FetchProductsResponse> {
  try {
    let url = API_BASE;
    
    // Handle search (from SearchBar) - This is for the main search
    if (params?.search) {
      url = `${API_BASE}/search?q=${params.search}`;
    } 
    // Handle category filter
    else if (params?.category) {
      url = `${API_BASE}/category/${params.category}`;
    }
    // Handle name filter (from sidebar) - IMPORTANT: Add name search to URL
    else if (params?.name) {
      url = `${API_BASE}/search?q=${params.name}`;
    }
    
    // Add pagination
    const limit = params?.limit || '12';
    const skip = params?.skip || '0';
    const separator = url.includes('?') ? '&' : '?';
    url += `${separator}limit=${limit}&skip=${skip}`;
    
    const response = await fetch(url, { 
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    
    const data = await response.json();
    let products: Product[] = data.products || data || [];
    const total = data.total || products.length;
    
    // APPLY ADDITIONAL NAME FILTER (client-side) for more specific matching
    // This is still needed because API search might not catch everything
    if (params?.name && !params?.search) { // Only apply if it's a name filter, not main search
      const nameLower = params.name.toLowerCase();
      products = products.filter(product => 
        product.title.toLowerCase().includes(nameLower) ||
        product.description.toLowerCase().includes(nameLower) ||
        (product.brand && product.brand.toLowerCase().includes(nameLower))
      );
    }
    
    // Apply sorting
    if (params?.sort) {
      products.sort((a, b) => {
        switch (params.sort) {
          case 'price-low': return a.price - b.price;
          case 'price-high': return b.price - a.price;
          case 'rating': return b.rating - a.rating;
          case 'name-asc': return a.title.localeCompare(b.title);
          case 'name-desc': return b.title.localeCompare(a.title);
          default: return 0;
        }
      });
    }
    
    return {
      products,
      total: params?.name && !params?.search ? products.length : total,
      skip: parseInt(skip),
      limit: parseInt(limit)
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      products: [],
      total: 0,
      skip: 0,
      limit: 0
    };
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE}/categories`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    
    const categories = await response.json();
    return categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}