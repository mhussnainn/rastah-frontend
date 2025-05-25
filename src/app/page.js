'use client';
import { useState, useEffect } from "react";
import { getAllProducts } from "@/lib/api";
import ProductCard from "../components/ProductCard";
import Image from "next/image";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error in HomePage:', err);
        setError('Error loading products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <main className="container mx-auto py-16 px-4 text-center">
        <p className="mt-4 text-gray-700 text-lg font-medium">Products are loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container px-4 py-8">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto px-0">
      {/* Your existing Hero Section */}
      <section className="relative w-full h-[140vh] mb-12">
        <Image
          src="/Slider.jpeg"
          alt="Core Collection Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col mt-6 items-center text-white z-10">
          <h1 className="text-4xl font-bold tracking-widest mb-8">RASTAH</h1>
        </div>
        <div className="absolute left-16 top-[58%] -translate-y-1/2 text-white max-w-md z-10">
          <p className="uppercase text-sm tracking-wider mb-2">Everyday Essentials</p>
          <h1 className="text-5xl font-semibold mb-6">CORE COLLECTION</h1>
          <div className="flex gap-4">
            <button className="px-6 py-2 border border-white rounded text-white text-sm hover:bg-white hover:text-black transition-all duration-300">
              Shop Men
            </button>
            <button className="px-6 py-2 border border-white rounded text-white text-sm hover:bg-white hover:text-black transition-all duration-300">
              Shop Women
            </button>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <div className="ml-8 mb-8">
        <h1 className="text-2xl font-bold mb-2">CORE COLLECTION</h1>
        <div className="flex justify-left gap-4 mb-6">
          <button className="px-4 py-1 border border-gray-300 rounded-full text-sm hover:border-black transition-colors">{`Men's`}</button>
          <button className="px-4 py-1 border border-gray-300 rounded-full text-sm hover:border-black transition-colors">{`Women's`}</button>
        </div>
      </div>

      <ProductCard products={products} />
    </main>
  );
}
