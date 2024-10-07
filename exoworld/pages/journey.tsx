import Image from "next/image";
import Link from "next/link";
import DrawingApp from "./DrawingApp";
import page from "../src/app/page";
import "../src/app/globals.css";
import Head from "next/head";
export default function Journey() {
  return (
    <>
    <Head>
      <title>Journey to Exoplanets</title>
      <link rel="stylesheet" href="../src/app/globals.css" />
    </Head>
    <div className="font-[SF Pro Display] text-foreground bg-background min-h-screen flex flex-col">
      <header className="p-4">
        <nav>
          <ul className="flex justify-center space-x-6">
            <li><Link href="/" className="hover:underline">ExoWorld</Link></li>
            <li><Link href="/#discover" className="hover:underline">Discover</Link></li>
            <li><Link href="/#explore" className="hover:underline">Explore</Link></li>
            <li><Link href="/#research" className="hover:underline">Research</Link></li>
            <li><Link href="/#about" className="hover:underline">About</Link></li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow">
        <section id="home" className="hero text-center py-20">
          <h1 style={{textAlign: 'left'}}>What is an Exoplanet?</h1>
          <p style={{textAlign: 'left', fontSize: '20px', color:"blue"}}>An exoplanet is a planet that does         not belong to our Solar System or in other words does not orbit the sun. There are over 4,000 confirmed exoplanets, and scientists are still discovering new ones.</p>
          
          <br></br>
          <br />
     
          <h1 style={{textAlign: 'left'}}>What makes an Exoplanet unique?</h1>
          <p style={{textAlign: 'left', fontSize: '20px', color:"blue"}}>They can be hot enough to boil metal or locked in deep freeze. They can orbit their stars so tightly that a “year” lasts only a few days; they can orbit two suns at once. Some exoplanets are sunless rogues, wandering through the galaxy in permanent darkness.</p>
          <br></br>
          <br></br>
          <br></br>

          
        </section>

        <section id="home" className="hero text-center py-20">
            <Link href="/DrawingApp" className="cta-button justify-center align-center bg-white text-black px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors">
                Design your Exoplanet
        </Link>
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
    </>
    
  );
}

