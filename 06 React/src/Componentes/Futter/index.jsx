import React from 'react'

const Futter = () => {
  return (
     <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo / Brand */}
        <div>
          <h1 className="text-2xl font-bold mb-4">MyBrand</h1>
          <p className="text-gray-400">
            Building modern web apps with React & TailwindCSS.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-red-400">Home</a></li>
            <li><a href="#" className="hover:text-red-400">About</a></li>
            <li><a href="#" className="hover:text-red-400">Services</a></li>
            <li><a href="#" className="hover:text-red-400">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400">Facebook</a>
            <a href="#" className="hover:text-sky-400">Twitter</a>
            <a href="#" className="hover:text-pink-400">Instagram</a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
        © {new Date().getFullYear()} MyBrand. All rights reserved.
      </div>
    </footer>
  )
}

export default Futter