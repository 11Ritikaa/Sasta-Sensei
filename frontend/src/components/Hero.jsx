const Hero = () => {
    return (
        <div className="hero-section">
            {/* Top Banner */}
            <div className="bg-blue-600 text-white text-center py-2">
                <p className="flex justify-center items-center">
                    <svg className="w-6 h-6 mr-2" /* Telegram Icon SVG */></svg>
                    <span>Join our <span className="font-bold">Telegram channel</span> to grab the biggest discounts from this sale! <span className="font-bold italic">Happy Looting!</span></span>
                    <button className="ml-4 bg-white text-blue-600 font-bold px-4 py-1 rounded">Join Now</button>
                </p>
            </div>

            {/* Main Content */}
            <div className="flex justify-center p-8 bg-gray-100">
                {/* Centered Right Side Image */}
                <img src="../../src/assets/image1.png" alt="Main Image" className="w-full h-auto max-w-lg" />
            </div>
        </div>
    );
};

export default Hero;