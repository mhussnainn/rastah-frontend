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

  

  return (
    <main className="mx-auto">
   <section className="relative w-full h-[100vh] sm:h-[150vh] mb-12 overflow-hidden">
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
      style={{ objectPosition: "top" }}
    />
  </div>

  {/* Centered Hero Content */}
  <div
    className="
      absolute inset-0 z-10 px-4
      flex flex-col justify-start items-center
      sm:justify-center sm:items-start sm:pl-16 sm:text-left
      sm:-mt-70
    "
    style={{ paddingTop: '60vh' }} // vertical position on mobile
  >
    <p className="uppercase text-sm text-white tracking-wider mb-2">Everyday Essentials</p>
    <h2 className="text-4xl sm:text-5xl text-white font-semibold mb-6 text-center sm:text-left">
      CORE COLLECTION
    </h2>
    <div className="flex flex-wrap justify-center sm:justify-start gap-4">
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
      <section className="px-4 sm:px-2 mb-8 ">
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left sm:ml-10">
  <h1 className="text-2xl font-bold mb-2">CORE COLLECTION</h1>
  <div className="flex flex-wrap justify-center sm:justify-start gap-4 mb-6">
    <button className="px-4 py-1 border border-gray-300 rounded-full text-sm hover:border-black transition-colors">{`Men's`}</button>
    <button className="px-4 py-1 border border-gray-300 rounded-full text-sm hover:border-black transition-colors">{`Women's`}</button>
  </div>
</div>

<main className="w-full text-center">
  {loading ? (
    <p className="mt-4 text-gray-700 text-lg py-32 px-4 font-medium">Products are loading...</p>
  ) : error ? (
    <p className="text-red-600">{error}</p>
  ) : (
    <ProductCard products={products} />
  )}
</main>

  {/* Product Cards stay in original layout */}
  
</section>

    </main>
  );
}
