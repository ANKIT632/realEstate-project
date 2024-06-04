import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

function Foter() {
  return (
    <footer className="bg-blue-900 text-white py-3  relative bottom-0">
      <div className="container mx-auto text-center">
        <h1 className="font-bold text-2xl mb-2 text-white max-sm:text-xl">EcoEstate</h1>
        <p className="text-gray-200 mb-4 max-xs:text-xs">Your one-stop solution for real estate needs.</p>
        <div className="flex justify-center space-x-4">
          <a href="/" className="text-gray-200 hover:text-white max-xs:text-xs">Home</a>
          <a href="/about" className="text-gray-200 hover:text-white max-xs:text-xs">About</a>
          <a href="/contact" className="text-gray-200 hover:text-white max-xs:text-xs">Contact</a>
          <a href="/allDeals" className="text-gray-200 hover:text-white max-xs:text-xs">Deals</a>
        
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="text-gray-200 hover:text-white ">
            <FaInstagram size={20} />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="text-gray-200 hover:text-white ">
            <FaFacebookF size={20} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer" className="text-gray-200 hover:text-white ">
            <FaTwitter size={20} />
          </a>
        </div>
        <p className="text-gray-300 text-sm mt-3 max-xs:text-xs">&copy; {new Date().getFullYear()} EcoEstate. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Foter;