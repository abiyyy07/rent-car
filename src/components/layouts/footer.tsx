// components/Footer.tsx
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Tentang Kami</h3>
            <p className="text-gray-400">Kami adalah perusahaan rental mobil yang menyediakan berbagai jenis mobil dengan harga terjangkau dan kualitas terbaik.</p>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Kontak</h3>
            <ul className="text-gray-400">
              <li className="mb-2 flex items-center">
                <FaPhoneAlt className="mr-2" /> +62 123 456 789
              </li>
              <li className="mb-2 flex items-center">
                <FaEnvelope className="mr-2" /> info@rentalmobil.com
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Ikuti Kami</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700">
                <FaFacebookF size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} Rental Mobil. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
