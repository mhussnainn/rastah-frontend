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
    <main className="mx-auto px-4 sm:px-2">
      {/* Hero Section */}
      <section className="relative w-full h-[140vh] sm:h-[100vh] mb-12 overflow-hidden">
  {/* Desktop Image */}
  <div className="hidden sm:block absolute inset-0">
    <Image
      src="/Slider.jpeg"
      alt="Core Collection Banner"
      fill
      priority
      className="object-cover"
    />
  </div>

  {/* Mobile Image */}
  <div className="block sm:hidden absolute inset-0">
    <Image
      src="/Slider2.jpeg"
      alt="Core Collection Banner Mobile"
      fill
      priority
      className="object-cover"
    />
  </div>

  {/* RASTAH logo at top */}
  <div className="absolute top-6 w-full z-10 text-center px-4">
    <h1 className="text-4xl sm:text-5xl font-bold tracking-widest text-white">RASTAH</h1>
  </div>

  {/* Centered Hero Content */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 text-center px-4 pt-16 sm:pt-0">
    <p className="uppercase text-sm tracking-wider mb-2">Everyday Essentials</p>
    <h2 className="text-4xl sm:text-5xl font-semibold mb-6">CORE COLLECTION</h2>
    <div className="flex flex-wrap justify-center gap-4">
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
      <section className="px-4 sm:px-2 mb-8">
  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
    <h1 className="text-2xl font-bold mb-2">CORE COLLECTION</h1>
    <div className="flex flex-wrap justify-center sm:justify-start gap-4 mb-6">
      <button className="px-4 py-1 border border-gray-300 rounded-full text-sm hover:border-black transition-colors">{`Men's`}</button>
      <button className="px-4 py-1 border border-gray-300 rounded-full text-sm hover:border-black transition-colors">{`Women's`}</button>
    </div>
  </div>

  {/* Product Cards stay in original layout */}
  <ProductCard products={products} />
</section>

    </main>
  );
}
