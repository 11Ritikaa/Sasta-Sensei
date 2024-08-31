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
            <div className="grid grid-cols-2 gap-4 p-8 bg-gray-100">
                {/* Left Side */}
                <div className="left-content flex justify-center items-center">
                    <img src="../../src/assets/image.png" alt="Left Image" className="w-full h-auto" />
                </div>

                {/* Right Side */}
                <div className="right-content flex justify-center items-center">
                    <img src="../../src/assets/image1.png" alt="Right Image" className="w-full h-auto" />
                </div>
            </div>
            </div>
    )
}

export default Hero;