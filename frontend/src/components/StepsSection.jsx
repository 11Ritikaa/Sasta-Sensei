const StepsSection = () => {
  return (
    <div className="bg-white p-8">
      <h2 className="text-2xl font-bold text-center mb-8">How to get notified when price drops?</h2>
      <p className="text-center mb-8">It is simple. Download Price History app and follow these three steps.</p>
      <div className="flex justify-around">
        <div className="text-center">
          <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">U</div>
          <h3 className="text-lg font-semibold">Open product page</h3>
          <p className="text-gray-500 mt-2">Find your product via search or URL and open it in Price History app.</p>
        </div>
        {/* Arrow */}
        <div className="hidden sm:block mx-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8 text-gray-400"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <div className="text-center">
          <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">✔</div>
          <h3 className="text-lg font-semibold">Set alerts</h3>
          <p className="text-gray-500 mt-2">Tap set price alert or set stock alert button, enter your target price.</p>
        </div>
        {/* Arrow */}
        <div className="hidden sm:block mx-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8 text-gray-400"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <div className="text-center">
          <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">C</div>
          <h3 className="text-lg font-semibold">Get notified</h3>
          <p className="text-gray-500 mt-2">Based on stock, price, you will be notified when the product price drops.</p>
        </div>
      </div>
    </div>
  );
};

export default StepsSection;
