import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 mt-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Aman Khan. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
