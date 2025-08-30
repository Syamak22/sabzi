import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full py-6 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo à gauche */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-white font-arvo">
            <Image
              src="/logo_blanc.png"
              alt="Logo Sabzi"
              width={200}
              height={200}
              className="inline mr-2"
            />
          </h1>
        </div>

        {/* Liens réseaux sociaux à droite */}
        <div className="flex items-center space-x-6">
          <a
            href="https://linked.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
          >
            <Image
              src="/linkedin.svg"
              alt="Logo Sabzi"
              width={30}
              height={30}
              className="inline mr-2 hover:scale-110 transition-transform duration-200"
            />
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
          >
            <Image
              src="/youtube.svg"
              alt="Logo Sabzi"
              width={30}
              height={30}
              className="inline mr-2 hover:scale-110 transition-transform duration-200"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
