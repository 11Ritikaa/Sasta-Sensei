const Footer = () => {
  return (
    <footer className="w-[80%] mx-auto mb-6 bg-white-800 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-2">Sasta Sensei</h3>
          <p>Sasta Sansei is a free tool to check price history charts for millions of products. Track prices for popular Indian stores such as Amazon</p>
        </div>
        <div>
          <h3 className="font-bold mb-2">Features</h3>
          <ul>
            <li><a href="#" className="hover:underline">Charts</a></li>
            <li><a href="#" className="hover:underline">API</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">For Businesses</h3>
          <ul>
            <li><a href="#" className="hover:underline">Download stores supported</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Company</h3>
          <ul>
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Disclaimer</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-16 text-center">
        <p className="font-semibold">© 2024 Sasta Sensei. All Rights Reserved.</p>
        <p className="mt-2">We use cookies to offer better online experiences. By visiting and using Sasta Sensei, you consent to our use of cookies. Learn about your options, rights and more by reading our Terms & Conditions and Privacy Policy.</p>
      </div>
    </footer>
  );
};

export default Footer;
