// src/lib/api.js
const BASE_URL = "https://victorious-prize-eeb50f2b32.strapiapp.com/api"; // Adjust if deployed

export async function getAllProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products?populate=*`, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log('API Response:', data); // Debug log

    if (!data || !data.data || !Array.isArray(data.data)) {
      console.error('Invalid API response structure:', data);
      return [];
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductBySlug(slug) {
  try {
    console.log('Fetching product with slug:', slug);
    
    const res = await fetch(`${BASE_URL}/products?filters[slug][$eq]=${slug}&populate=*`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('API Response:', data);
    
    const item = data.data[0];
    if (!item) {
      console.log('No product found with slug:', slug);
      return null;
    }

    return {
      id: item.id,
      ...item.attributes
    };
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
}
