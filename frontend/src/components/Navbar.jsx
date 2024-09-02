import { GlobeAltIcon, DevicePhoneMobileIcon, ComputerDesktopIcon, MusicalNoteIcon, BookOpenIcon, HomeModernIcon, FireIcon, ShoppingBagIcon, CubeIcon, CameraIcon, UserIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';

const Navbar = () => {
  return (
    <header className="bg-black text-white">
      <div className="container mx-auto flex justify-between items-center py-2 px-4">
        <div className="flex items-center">
          <div className="text-sm flex space-x-4">
            <a href="#" className="hover:underline">Features</a>
            <a href="#" className="hover:underline">Latest Deals</a>
            <a href="#" className="hover:underline">Supported Stores</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:underline">Download</a>
          <a href="#" className="hover:underline">Contact Us</a>
          <div className="flex items-center space-x-2">
            <span>IN</span>
            <GlobeAltIcon className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="bg-purple-800 py-7">
        <div className="container mx-auto flex items-center justify-between">
          <div className="ml-4">
            <span className="text-xl font-bold">SastaSensei</span>
          </div>
          <div className="flex items-center space-x-2 mr-5">
          <span className="text-white ml-2">Quick Search</span>
            <input
              type="text"
              className="px-3 py-1 text-black rounded-md"
              placeholder="Enter name or paste the product link"
            />
            <button className="bg-orange-500 text-white px-4 py-1 rounded-md">Search</button>
          </div>
        </div>
      </div>
      <nav className="bg-white py-2 shadow">
        <div className="container mx-auto flex items-center justify-evenly space-x-3 text-black">
            <span className="font-semibold space-x-4 ml-2">Explore:</span>

            <a href="#" className="flex space-x-2 px-4 py-2 hover:bg-gray-200 hover:shadow-lg hover:rounded-full transition">
            <DevicePhoneMobileIcon className="w-6 h-6" />
            <span>Mobiles</span>
            </a>

            <a href="#" className="flex space-x-2 px-4 py-2 hover:bg-gray-200 hover:shadow-lg hover:rounded-full transition">
            <ComputerDesktopIcon className="w-6 h-6" />
            <span>Computers</span>
            </a>

            <a href="#" className="flex space-x-2 px-4 py-2 hover:bg-gray-200 hover:shadow-lg hover:rounded-full transition">
            <MusicalNoteIcon className="w-6 h-6" />
            <span>Audio</span>
            </a>

            <a href="#" className="flex space-x-2 px-4 py-2 hover:bg-gray-200 hover:shadow-lg hover:rounded-full transition">
            <BookOpenIcon className="w-6 h-6" />
            <span>Books</span>
            </a>

            <a href="#" className="flex space-x-2 px-4 py-2 hover:bg-gray-200 hover:shadow-lg hover:rounded-full transition">
            <HomeModernIcon className="w-6 h-6" />
            <span>Home</span>
            </a>

            <a href="#" className="flex space-x-2 px-4 py-2 hover:bg-gray-200 hover:shadow-lg hover:rounded-full transition">
            <FireIcon className="w-6 h-6" />
            <span>Kitchen</span>
            </a>

            <a href="#" className="flex space-x-2 px-4 py-2 hover:bg-gray-200 hover:shadow-lg hover:rounded-full transition">
            <ShoppingBagIcon className="w-6 h-6" />
            <span>Clothing</span>
            </a>

            <a href="#" className="flex space-x-2 px-4 py-2 hover:bg-gray-200 hover:shadow-lg hover:rounded-full transition">
            <CubeIcon className="w-6 h-6" />
            <span>Footwear</span>
            </a>

            <a href="#" className="flex space-x-2 px-4 py-2 hover:bg-gray-200 hover:shadow-lg hover:rounded-full transition">
            <CameraIcon className="w-6 h-6" />
            <span>Cameras</span>
            </a>

            <a href="#" className="flex space-x-2 px-4 py-2 hover:bg-gray-200 hover:shadow-lg hover:rounded-full transition">
            <UserIcon className="w-6 h-6" />
            <span>Baby</span>
            </a>

            <a href="#" className="flex space-x-2 px-4 py-2 hover:bg-gray-200 hover:shadow-lg hover:rounded-full transition">
            <BuildingOffice2Icon className="w-6 h-6" />
            <span>Furniture</span>
            </a>
        </div>
    </nav>

    </header>
  );
};

export default Navbar;
