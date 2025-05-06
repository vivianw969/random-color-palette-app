import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [colors, setColors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);

  const getColors = async () => {
    try {
      setLoading(true);
      const res = await axios.get("api/generate");
      setColors(res.data.data[0].palette);
    } catch (error) {
      console.error("Failed to fetch colors:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    setCopied(color);
    setTimeout(() => setCopied(null), 1000);
  };

  useEffect(() => {
    getColors();
  }, []);

  return (
    <div className="flex flex-col md:px-12 px-4 bg-background font-poppins items-center min-h-screen">
      <div className="w-full max-w-5xl mx-auto">
        <h1 className="md:text-6xl text-4xl font-bold text-primary mt-10 text-center">
          Random <span className="text-active">Color Palette</span> Generator
        </h1>
        <h2 className="text-primary/80 text-xl font-light mt-4 text-center">
          Click on any color to copy its code
        </h2>

        <div className="mt-10">
          {colors ? (
            <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
              {colors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => copyToClipboard(color)}
                  className="group relative cursor-pointer"
                >
                  <div
                    className="h-36 rounded-lg shadow-md transform transition-all duration-300 group-hover:shadow-lg"
                    style={{ backgroundColor: color }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white text-sm font-medium bg-black/20 px-3 py-1 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      {copied === color ? "Copied!" : color}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-36 flex items-center justify-center">
              <div className="text-primary/60 text-xl animate-pulse">
                Loading palette...
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8 mb-12">
          <button
            className="px-6 py-2.5 rounded-full bg-active text-white font-bold text-lg 
                     shadow-lg shadow-active/20 hover:shadow-active/30 
                     transform transition-all duration-300 hover:scale-105
                     disabled:opacity-70 disabled:hover:scale-100"
            onClick={getColors}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              "Generate New Palette"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}