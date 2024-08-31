const Download = () => {
    return (
        <div className="download-section">

            {/* Main Content */}
            <div className="grid grid-cols-2 gap-4 p-8 bg-gray-100">
                {/* Left Side */}
                <div className="left-content flex justify-center items-center">
                    <a href="https://play.google.com/store/apps?hl=en_IN" target="_blank"><img src="../../src/assets/android.png" alt="Left Image" className="w-full h-auto" /></a>
                </div>

                {/* Right Side */}
                <div className="right-content flex justify-center items-center">
                    <a href="https://www.apple.com/in/app-store/" target="_blank"><img src="../../src/assets/iOS.png" alt="Right Image" className="w-full h-auto" /></a>
                </div>
            </div>
            </div>
    )
}

export default Download;