'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
import { FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);



  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    {
      id: 1,
      label: 'SPRING 2025',
      path: '/spring',
      dropdown: [
        { label: 'Lookbook', path: '/spring/lookbook' },
        { label: 'Runway', path: '/spring/runway' },
      ],
    },
    {
      id: 2,
      label: 'SHOP',
      path: '/shop',
      dropdown: [
        { label: 'All Products', path: '/shop/all' },
        { label: 'New Arrivals', path: '/shop/new-arrivals' },
      ],
    },
    {
      id: 3,
      label: 'CORE COLLECTION',
      path: '/core-collection',
      dropdown: [
        { label: 'Hoodies', path: '/core-collection/hoodies' },
        { label: 'T-Shirts', path: '/core-collection/t-shirts' },
      ],
    },
    {
      id: 4,
      label: 'ABOUT RASTAH',
      path: '/about',
      dropdown: [
        { label: 'Vision', path: '/about/vision' },
        { label: 'Designers', path: '/about/designers' },
      ],
    },
  ];

  return (
    <header className={`w-full z-50 absolute top-0 left-0 ${isHome ? 'text-white' : 'text-black bg-white'} transition-colors duration-300`}>

      {/* ========================== MOBILE VIEW ========================== */}
      <div className="md:hidden">
        {/* Top Mobile Bar */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <Link href="/" className="text-3xl font-bold tracking-wide">
            RASTAH
          </Link>

          <div className="flex items-center space-x-4 text-2xl">
            <button>
              <FiSearch />
            </button>
            <Link href="/cart">
              <FiShoppingBag />
            </Link>
            <Link href="/account">
              <FiUser />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-white text-black px-6 py-4 h-[100vh] space-y-2 shadow-lg z-50 mt-15" >
            {navLinks.map((link) => (
              <Link key={link.id} href={link.path} className="block py-2 font-medium">
                {link.label}
              </Link>
            ))}
          </div>
        )}
        <div className={`border-t w-[92%] mx-auto ${isHome ? 'border-white/30 group-hover:border-black/20' : 'border-black/20'}`} />

      </div>

      {/* ========================== DESKTOP VIEW ========================== */}
      <div className="hidden md:block group hover:bg-white hover:text-black transition-colors duration-300">
        <div className="flex flex-col items-center  px-5 pt-15 pb-2">

          {/* Top Right Icons */}
          <div className="absolute right-6 top-4 flex items-center space-x-3 text-base z-10">
            <Link href="https://instagram.com/rastahofficial" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </Link>
            <Link href="https://tiktok.com/@rastahofficial" target="_blank" rel="noopener noreferrer">
              <FaTiktok />
            </Link>
            <Link href="/rewards">
              ENCLAVE REWARDS
            </Link>
            <div className={`${isHome ? 'bg-white group-hover:bg-black' : 'bg-black'} w-px h-6`} />
            <div className={`flex items-center gap-1 cursor-pointer`}>
              <span className="text-lg text-green-700">🇵🇰</span>
              <span className="text-sm">Pakistan (PKR Rs)</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Navbar Center */}
          <nav className="flex w-full max-w-screen-xl">


            <div className="flex-1  text-center">
              <Link href="/" className="text-4xl font-bold tracking-wide">
                RASTAH
              </Link>
            </div>

          </nav>

          {/* Navigation Links */}
          <div className="flex justify-between md:px-10 w-full mt-6">
            <div className="text-2xl">
              <button>
                <FiSearch />
              </button>
            </div>
            <div className="flex  space-x-8">
              {navLinks.map((link) => (
                <div
                  key={link.id}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.path}
                    className={`py-2 text-base tracking-wide flex items-center gap-1 hover:underline `}
                  >
                    {link.label}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {/* Dropdown */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 border-2 border-black bg-white text-black rounded-md shadow-lg transition-all duration-300 z-50
              ${activeDropdown === link.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                  >
                    <ul className="py-2">
                      {link.dropdown.map((item, index) => (
                        <li key={index}>
                          <Link href={item.path} className="block px-4 py-2 text-sm hover:bg-gray-100">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-2xl flex space-x-4 ">
              <Link href="/cart">
                <FiShoppingBag />
              </Link>
              <Link href="/account">
                <FiUser />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className={`border-t w-[92%] mx-auto `} />
      </div>

    </header>

  );
}

