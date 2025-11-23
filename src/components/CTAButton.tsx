export default function CTAButton() {
  return (
    <div className="flex justify-center">
      <a
        href="https://cal.com/syamak-azadeh-s/sabzi-1er-rencontre"
        target="_blank"
        rel="noopener noreferrer"
        className="relative overflow-hidden bg-white text-[#0e0801] px-8 py-4 rounded-full text-lg font-inter font-semibold hover:bg-gray-100 transition-all duration-400 transform hover:scale-105 shadow-lg group inline-block"
      >
        <span className="relative z-10 font-extrabold">{`{ Programmer une réunion }`}</span>
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#e99e0a50] to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
      </a>
    </div>
  );
}