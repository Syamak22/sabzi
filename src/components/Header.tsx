import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full py-8 px-6 sm:py-10">
      <div className="max-w-7xl mx-auto flex items-center justify-center relative">
        {/* Logo au centre */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-white font-arvo leading-relaxed">
            {/* Logo mobile */}
            <Image
              src="/logo_blanc.png"
              alt="Logo Sabzi"
              width={100}
              height={100}
              className="inline mr-2 sm:hidden"
            />
            {/* Logo desktop */}
            <Image
              src="/logo_blanc.png"
              alt="Logo Sabzi"
              width={200}
              height={200}
              className="hidden sm:inline mr-2"
            />
          </h1>
        </div>

        {/* Liens réseaux sociaux à droite */}
        <div className="flex items-center space-x-6 absolute right-0">
          <a
            href="https://www.linkedin.com/in/syamakazadeh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
          >
            {/* LinkedIn mobile */}
            <Image
              src="/linkedin.svg"
              alt="LinkedIn"
              width={24}
              height={24}
              className="inline mr-2 hover:scale-110 transition-transform duration-200 sm:hidden"
            />
            {/* LinkedIn desktop */}
            <Image
              src="/linkedin.svg"
              alt="LinkedIn"
              width={30}
              height={30}
              className="hidden sm:inline mr-2 hover:scale-110 transition-transform duration-200"
            />
          </a>

          <a
            href="https://www.youtube.com/@syamakazadeh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
          >
            {/* YouTube mobile */}
            <Image
              src="/youtube.svg"
              alt="YouTube"
              width={24}
              height={24}
              className="inline mr-2 hover:scale-110 transition-transform duration-200 sm:hidden"
            />
            {/* YouTube desktop */}
            <Image
              src="/youtube.svg"
              alt="YouTube"
              width={30}
              height={30}
              className="hidden sm:inline mr-2 hover:scale-110 transition-transform duration-200"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
