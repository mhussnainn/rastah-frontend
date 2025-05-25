import ProductDetail from "@/components/ProductDetail";
async function getProduct(slug) {
  try {
    const res = await fetch(
      `https://victorious-prize-eeb50f2b32.strapiapp.com/api/products?filters[slug][$eq]=${slug}&populate=*`,
      { next: { revalidate: 10 } }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch product');
    }

    const data = await res.json();
    return data.data[0]; // get the first matched product
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}



export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Product Not Found</h1>
          <p className="mt-4 text-gray-600">Sorry, the product you are looking for is not available.</p>
        </div>
      </div>
    );
  }

  return <ProductDetail product={product} />;
} 