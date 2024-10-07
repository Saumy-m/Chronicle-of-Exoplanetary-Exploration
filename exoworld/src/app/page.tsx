import Image from "next/image";
import Link from "next/link";
import DrawingApp from "../../pages/DrawingApp";
import Journey from "../../pages/journey";

export default function Home() {
  return (
    <div className="font-[SF Pro Display] text-foreground bg-background min-h-screen flex flex-col">
      <header className="p-4">
        <nav>
          <ul className="flex justify-center space-x-6">
            <li><Link href="#home" className="hover:underline">ExoWorld</Link></li>
            <li><Link href="#discover" className="hover:underline">Discover</Link></li>
            <li><Link href="#explore" className="hover:underline">Explore</Link></li>
            <li><Link href="#research" className="hover:underline">Research</Link></li>
            <li><Link href="#about" className="hover:underline">About</Link></li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow">
        <section id="home" className="hero text-center py-20">
          <h1 className="text-6xl font-bold mb-4">Welcome to ExoWorld</h1>
          <h2 className="text-3xl mb-8">Explore the Universe Beyond</h2>
          <Link href="/journey" className="cta-button  bg-white text-black px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors">
            Start Your Journey
          </Link>
          <br></br>
          <br></br>
          <br></br>
          <Link href="/DrawingApp" className="cta-button bg-white text-black px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors">
            Design your Exoplanet
          </Link>
        </section>

        <section id="discover" className="feature-section py-20">
          <h2 className="text-4xl font-bold text-center mb-12">Discover Exoplanets</h2>
          <div className="feature-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            <div className="feature-item text-center ">
              <Image src='/images/kepler452b.png' alt="Kepler-452b" width={300} height={200} className="rounded-lg mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Kepler-452b</h3>
              <p>Earth's Larger Cousin</p>
            </div>
            <div className="feature-item text-center text-black">
              <Image src="/images/proximab.png" alt="Proxima b" width={300} height={200} className="rounded-lg mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Proxima b</h3>
              <p>Our Nearest Neighbor</p>
            </div>
            <div className="feature-item text-center ">
              <Image src="/images/trappist1e.png" alt="TRAPPIST-1e" width={300} height={200} className="rounded-lg mb-4" />
              <h3 className="text-2xl font-semibold mb-2">TRAPPIST-1e</h3>
              <p>Potentially Habitable World</p>
            </div>
          </div>
        </section>

        <section id="explore" className="parallax-section py-20 bg-fixed bg-cover bg-center" style={{backgroundImage: "url('/cosmos-bg.jpg')"}}>
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Explore the Cosmos</h2>
            <p className="text-xl mb-8">Immerse yourself in the wonders of distant worlds</p>
            <Link href="#" className="cta-button bg-white text-black px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors">
              Launch 3D Explorer
            </Link>
          </div>
        </section>

        <section id="research" className="info-section py-20">
          <h2 className="text-4xl font-bold text-center mb-12">Cutting-Edge Research</h2>
          <div className="info-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            {['Exoplanet Detection', 'Atmospheric Analysis', 'Habitability Index'].map((topic, index) => (
              <div key={index} className="info-item text-center">
                <h3 className="text-2xl font-semibold mb-4">{topic}</h3>
                <p>{index === 0 ? "Learn about the latest methods in finding new worlds" :
                    index === 1 ? "Discover how we study exoplanet atmospheres" :
                    "Explore the factors that make a planet potentially habitable"}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="about-section py-20 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold mb-6">About ExoWorld</h2>
            <p className="text-xl mb-8">We are a team of passionate astronomers, astrophysicists, and space enthusiasts dedicated to bringing the wonders of exoplanets to everyone.</p>
            <Link href="#" className="cta-button bg-foreground text-background px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors">
              Join Our Mission
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-200 dark:bg-gray-900 py-6">
        <div className="footer-content max-w-6xl mx-auto px-4">
          <div className="footer-links flex justify-center space-x-6 mb-4">
            <Link href="#" className="hover:underline">Privacy Policy</Link>
            <Link href="#" className="hover:underline">Terms of Use</Link>
            <Link href="#" className="hover:underline">Contact Us</Link>
          </div>
          <p className="text-center">&copy; 2024 ExoWorld. All rights reserved.</p>
        </div>
      </footer>
      <button className="chat-button">
      <Image
        src="/images/chat.png" // Make sure to adjust this path to your image
        alt="Chat"
        width={50} // Adjust size
        height={50} // Adjust size
      />
    </button>    
    </div>
  );
}

