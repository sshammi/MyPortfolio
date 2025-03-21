import { Facebook, Twitter, Linkedin, Github } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-10 mt-8">
      <div className="container mx-auto px-5 md:px-10 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <p className="text-gray-600 text-sm text-center lg:text-left">
            &copy; {new Date().getFullYear()} SHAMMI. All rights reserved.
          </p>
          <ul className="flex flex-wrap space-x-8 mt-4 lg:mt-0">
            {[{ href: '/', label: 'Home' }, { href: '/projects', label: 'Projects' }, { href: '/contact', label: 'Contact' }].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-gray-600 hover:text-gray-700"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex space-x-6 mt-4 lg:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-700"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-700"
            >
              <Twitter size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-700"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-700"
            >
              <Github size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
