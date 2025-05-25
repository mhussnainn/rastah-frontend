'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const STRAPI_URL = "https://victorious-prize-eeb50f2b32.strapiapp.com";

// 🖼️ Main Image Component
function MainImage({ src, alt }) {
  return (
    <div className="relative w-[500px] h-[800px] rounded-lg">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
        className="object-cover"
        priority
        quality={90}
      />
    </div>
  );
}

// 🧩 Thumbnails Component
function Thumbnails({ images, selectedIndex, onSelect }) {
  return (
    <div className="flex flex-col space-y-4 mr-8 -ml-6">
      {images.map((img, index) => (
        <div
          key={index}
          onClick={() => onSelect(index)}
          className={`w-24 h-28 relative rounded-md overflow-hidden cursor-pointer border ${
            selectedIndex === index ? 'border-black' : 'border-gray-300'
          }`}
        >
          <Image
            src={img}
            alt={`Thumbnail ${index + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

// ⬇️ Accordion Component
function Accordion({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="border-b border-gray-200">
        <button
          className="w-full flex justify-between items-center py-4 text-left"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-lg font-semibold text-gray-900">{title}</span>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
  
        {/* Smooth transition without affecting layout */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pb-4 text-sm text-gray-700">
            {children}
          </div>
        </div>
      </div>
    );
  }

// 📦 Updated Product Info Component
function ProductDetails({ product }) {
  const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="flex flex-col space-y-6">
      <span className="inline-block text-xs font-semibold text-green-800 bg-green-100 px-2 py-0.5 rounded w-fit">
        NEW
      </span>

      <h1 className="text-2xl font-semibold text-gray-900">{product.name}</h1>
      <p className="text-xl font-medium text-gray-800">Rs.{product.price?.toLocaleString()}</p>
      <p className="text-sm text-gray-500">Orders to the US, UK, and UAE ship with no duties or taxes.</p>

      <div className="grid grid-cols-7 w-full border border-gray-300 rounded overflow-hidden">
  {sizes.map((size, index) => (
    <button
      key={size}
      className="border border-gray-300 border-t-0 border-l-0 py-2 text-sm font-medium text-gray-800 hover:bg-black hover:text-gray transition-colors duration-200"
      style={{
        borderTop: index < 7 ? 'none' : undefined,
        borderLeft: index % 7 === 0 ? 'none' : undefined,
      }}
    >
      {size}
    </button>
  ))}
</div>



      <a href="#" className="text-sm underline text-gray-600 hover:text-black">
        Size Chart
      </a>

      <button className="bg-black text-white py-3 w-full  text-sm rounded hover:bg-gray-800 transition">
        ADD TO BAG
      </button>

      <div className="flex items-center gap-2 text-sm text-gray-700">
        <span className="h-3 w-3 rounded-full bg-green-500 inline-block" />
        In stock & ready to ship
      </div>

      <div className="border px-4 py-2 rounded flex items-center gap-2 w-fit text-sm font-medium">
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 3h18l-2 13H5L3 3z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 16a2 2 0 1 1-4 0m6 0a2 2 0 1 1-4 0" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Free Shipping Over $200
      </div>

      <Accordion title="PRODUCT DETAILS">
        {product.description || 'No additional details provided.'}
      </Accordion>
      <Accordion title="SIZE & FIT">
        Regular fit. Choose your standard size.
      </Accordion>
      <Accordion title="SHIPPING">
        Free shipping on orders over $200. Delivered within 5–7 business days.
      </Accordion>
      <Accordion title="RETURNS">
        Free returns within 14 days of delivery.
      </Accordion>
    </div>
  );
}

// 🔍 Full Product Detail Page
export default function ProductDetail({ product }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  const mainThumbnail = product.thumbnail?.url
    ? `${product.thumbnail.url}`
    : '/placeholder.jpg';

  const otherImages = product.images?.length
    ? product.images.map((img) => `${img.url}`)
    : [];

  const allImages = [mainThumbnail, ...otherImages];

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goNext = () => {
    if (currentIndex < allImages.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="min-h-screen py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-8 items-start">
          {/* Thumbnails */}
          <Thumbnails
            images={allImages}
            selectedIndex={currentIndex}
            onSelect={setCurrentIndex}
          />

          {/* Main Image */}
          <div className="flex items-center space-x-4">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="px-1 py-0 rounded text-gray-700 hover:text-gray-900 disabled:text-gray-400"
            >
              <svg
                className="w-7 h-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <MainImage src={allImages[currentIndex]} alt={product.name} />

            <button
              onClick={goNext}
              disabled={currentIndex === allImages.length - 1}
              className="px-1 py-0 rounded text-gray-700 hover:text-gray-900 disabled:text-gray-400"
            >
              <svg
                className="w-7 h-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Product Info */}
          <ProductDetails product={product} />
        </div>
      </div>
    </div>
  );
}
