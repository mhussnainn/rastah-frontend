'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const sections = [
    {
      title: 'About',
      links: [
        { name: 'ABOUT US', href: '/about-us' },
        { name: 'PRESS', href: '/press' },
        { name: 'LOOKBOOK', href: '/lookbook' },
      ],
    },
    {
      title: 'Get in Touch',
      links: [
        { name: 'CONTACT', href: '/contact' },
        { name: 'HASSLE FREE RETURNS', href: '/returns' },
        { name: 'PRIVACY POLICY', href: '/privacy-policy' },
        { name: 'WORK WITH US', href: '/work-with-us' },
      ],
    },
    {
      title: 'Join Us',
      links: [
        { name: 'ENCLAVE', href: '/enclave' },
      ],
    },
  ];

  return (
    <footer className="bg-black text-white py-12">
      <div className="px-6 md:px-20">
        {/* Top Section: Left description & right links */}
        <div className="grid grid-cols-12 gap-4">
          {/* Left: Description and Social Icons */}
          <div className="col-span-12 md:col-span-7">
            <p className="text-gray-300 text-xs md:text-md leading-relaxed">
              Rastah is a premier South Asian contemporary label that aims at{' '}
              <span className="italic">reinterpreting</span> south asian heritage and artisanship.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link
                href="https://instagram.com/rastahofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                href="https://tiktok.com/@rastahofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaTiktok size={20} />
              </Link>
            </div>
          </div>

          {/* Right: Collapsible Sections on Mobile */}
          <div className="col-span-12 md:col-span-5 mt-6 w-full">
            <div className="grid grid-cols-12 mx-auto">
              {sections.map((section, index) => (
                <div key={index} className="col-span-12 md:col-span-4 mb-3 border-t-1 md:border-t-0 border-gray-400">
                  {/* Header with toggle on mobile */}
                 
                  <button
                    className="text-sm uppercase mb-4 w-full flex justify-between items-center md:cursor-default md:pointer-events-none pt-4"
                    onClick={() => toggleSection(index)}
                  >
                    {section.title}
                    <span className="md:hidden">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                     </svg>
                    </span>
                  </button>
              

                  {/* Links (visible on desktop always, toggle on mobile) */}
                  <ul
                    className={`space-y-4 text-sm md:text-lg text-gray-300 pl-1 transition-all duration-200 ${
                     openSection === index ? 'block' : 'hidden'
                     } md:block`}
                  >

                    {section.links.map((link, i) => (
                      <li key={i} className=' mb-3'>
                        <Link href={link.href} className="hover:text-white hover:underline">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 space-y-4">
          <button className="text-xs text-gray-300 flex items-center space-x-2">
            <span>Pakistan (PKR ₨)</span>
            <span className="ml-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
            </span>
          </button>
          <div className="text-gray-300 text-xs">
            Copyright © 2025, Rastah. All rights reserved. See our{' '}
            <Link href="/terms-of-use" className="underline">terms of use</Link> and{' '}
            <Link href="/privacy-policy" className="underline">privacy notice</Link>.
          </div>
        </div>
      </div>
    </footer>
  );
}
