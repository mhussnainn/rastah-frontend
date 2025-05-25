import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

const STRAPI_URL = "https://victorious-prize-eeb50f2b32.strapiapp.com";

export default function ProductGrid({ products }) {
  const scrollContainerRef = useRef(null);

  if (!products || !Array.isArray(products)) return null;

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -800 : 800;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Helper to truncate product name to first 3 words
  const truncateWords = (text, wordLimit = 3) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className="relative w-full mx-auto py-8">
      {/* Arrows: only visible on desktop */}
      <div className="absolute top-0 right-0 hidden sm:flex gap-3 z-20 pr-6">
        <button
          onClick={() => handleScroll("left")}
          className="p-2 rounded-full shadow-md hover:bg-white transition-all"
          aria-label="Previous"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            viewBox="0 0 32 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="30" y1="12" x2="2" y2="12" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </button>

        <button
          onClick={() => handleScroll("right")}
          className="p-2 rounded-full shadow-md hover:bg-white transition-all"
          aria-label="Next"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            viewBox="0 0 32 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="2" y1="12" x2="30" y2="12" />
            <polyline points="24 6 30 12 24 18" />
          </svg>
        </button>
      </div>

      {/* Product Slider */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto hide-scrollbar gap-8 pt-8"
        style={{
          scrollSnapType: "x mandatory",
        }}
      >
        {products.map((product) => {
          if (!product) return null;

          const imageUrl = product.thumbnail?.url
            ? product.thumbnail.url
            : product.images?.[0]?.url
            ? product.images.data[0].url
            : "/placeholder.jpg";

          return (
            <div
              key={product.id}
              className="min-w-[220px] sm:min-w-[240px] md:min-w-[260px] lg:min-w-[280px] xl:min-w-[300px] shrink-0"
              style={{ scrollSnapAlign: "start" }}
            >
              <Link href={`/${product.slug}`} className="block group">
                {/* Image Container */}
                <div className="relative aspect-[3/3.8] overflow-hidden rounded-md">
                  {/* NEW tag */}
                  {product.isNew && (
                    <div className="absolute top-2 left-2 z-10 bg-[#d3eacc] text-[#4e7031] text-xs px-2 py-1 rounded font-semibold">
                      NEW
                    </div>
                  )}
                  <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={imageUrl}
                      alt={product.name || "Product Image"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover"
                      quality={90}
                    />
                  </div>
                  <div className="absolute inset-0 border border-transparent transition-all duration-300 group-hover:border-white/10" />
                </div>

                {/* Product Info */}
                <div className="mt-4 text-center">
                  <h3 className="text-xs font-semibold uppercase tracking-wide">
                    {/* Mobile: truncated */}
                    <span className="inline sm:hidden">
                      {truncateWords(product.name || "Unnamed Product", 3)}
                    </span>
                    {/* Desktop: full name */}
                    <span className="hidden sm:inline">{product.name || "Unnamed Product"}</span>
                  </h3>
                  <p className="mt-1 text-sm font-semibold ">
                    Rs.{product.price?.toLocaleString() || "N/A"}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Hide scrollbars */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
