import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 sm:h-20">
          <p className="text-sm sm:text-base text-gray-400 text-center">
            © {new Date().getFullYear()} MovieSearch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
