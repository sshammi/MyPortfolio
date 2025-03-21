'use client'

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="text-gray-600 py-5 bg-gray-50 px-10">
      <div className="container mx-auto flex items-center justify-between px-5 md:px-10 lg:px-20">
        <Link href="/" className="text-2xl font-bold">
          SHAMMI
        </Link>
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <ul
          className={`lg:flex lg:space-x-8 absolute lg:static w-full lg:w-auto transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'top-16 left-0 px-5' : '-top-40'
          } lg:top-0 lg:left-0 lg:space-x-8 lg:items-center p-4 lg:p-0`}
        >
          {[
            { href: '/', label: 'Home' },
            { href: '/projects', label: 'Projects' },
            { href: '/blogs', label: 'Blog' },
            { href: '/contact', label: 'Contact' },
            { href: '/skill', label: 'Skill' },
            { href: 'https://drive.google.com/file/d/1_LAh-sMUyew-PhPToWSk8YiWbS98hN2z/view?usp=sharing', label: 'Resume' }
          ].map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={handleClick}
                className={`flex items-center space-x-2 ${
                  pathname === href ? 'text-gray-700 font-semibold' : 'text-gray-600'
                }`}
                target={label === 'Resume' ? '_blank' : '_self'}
              >
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
