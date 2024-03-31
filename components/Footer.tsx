import { Facebook, InstagramIcon, TwitterIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const Footer: React.FC = () => {
  return (
    <>
    <footer className="bg-gray-800 text-white py-8 px-8 bottom-0">
      <div className="mb-4">
      <Image src="/logo.png" width={50} height={50} className="mr-5" alt="logo" />
        <p className="max-w-xs mt-4 text-sm opacity-60">
        Shop &apos;til you drop, then shop some more.
        </p>
      </div>
      <div className="container mx-auto flex justify-between items-center max-md:flex-col-reverse">
        <div className="md:w-2/3 flex justify-between max-md:w-screen max-md:mt-4 max-md:gap-3 max-md:px-4 min-w-[360px]">
          <div className="md:w-1/2">
            <h2 className="text-lg font-bold">COMPANY</h2>
            <ul className="list-none mt-4">
              <li className="mb-2">About Us</li>
              <li className="mb-2">Sustainability</li>
              <li className="mb-2">Terms of Service</li>
              <li className="mb-2">Privacy</li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-lg font-bold">RESOURCES</h2>
            <ul className="list-none mt-4">
              <li className="mb-2">Info</li>
              <li className="mb-2">Blog</li>
              <li className="mb-2">FAQ</li>
              <li className="mb-2">Status</li>
            </ul>
          </div>
        </div>
        <div className="w-1/3 max-md:w-screen max-md:px-4 min-w-fit">
          <h2 className="text-lg font-bold mb-4">
            SUBSCRIBE TO EMAIL NEWSLETTER
          </h2>
          <form className="flex items-center mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-700 text-white py-1 px-1 mr-2 rounded"
            />
            <button className="bg-blue-500 py-1 px-4 rounded">Subscribe</button>
          </form>
          <h2 className="text-lg font-bold mt-2">FOLLOW US</h2>
          <div className="flex flex-nowrap gap-3 mt-4">
            <div>
              <button className="bg-blue-1 py-1 px-2 rounded flex items-center justify-center cursor-pointer transition duration-300 ease-in-out hover:shadow-pink-600 hover:text-pink-300">
                <Facebook />
              </button>
            </div>
            <div>
              <button className="bg-blue-300 py-1 px-2 rounded flex items-center justify-center cursor-pointer transition duration-300 ease-in-out hover:shadow-pink-600 hover:text-pink-300">
                <TwitterIcon />
              </button>
            </div>
            <div>
              <button className="bg-red-200 py-1 px-2 rounded flex items-center justify-center cursor-pointer transition duration-300 ease-in-out hover:shadow-pink-600 hover:text-pink-300">
                <InstagramIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </footer>
    <div className="flex flex-nowrap items-center justify-center bottom-0 bg-gray-500">
    <p className=" text-xs text-black">© 2024 AmarStore</p>
    </div>
    </>
  );
};

export default Footer;
