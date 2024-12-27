export default function Loader() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#191E29]"> {/* Full page center */}
        <div className="relative w-24 h-24 transform rotate-45">
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className="absolute w-7 h-7 m-0.5 bg-[#01C38D] rounded-sm"
              style={{
                animation: `square-animation 10s ease-in-out infinite both`,
                animationDelay: `${-1.4285714286 * index}s`,
              }}
            />
          ))}
        </div>
      </div>
    )
  }
  