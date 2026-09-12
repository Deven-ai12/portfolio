import Scene3D from "./three/Scene3D";
import useSceneScroll from "./hooks/useSceneScroll";
import useLenis from "./hooks/useLenis";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  useLenis();
  useSceneScroll();

  return (
    <div className="relative bg-ink min-h-screen">
      <Scene3D />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <main className="relative">
        <Hero />

        <div className="relative z-10 bg-ink/90 backdrop-blur-sm border-t border-line">
          <About />
          <div className="border-t border-line">
            <Skills />
          </div>
          <div className="border-t border-line">
            <Experience />
          </div>
          <div className="border-t border-line">
            <Projects />
          </div>
          <div className="border-t border-line">
            <Contact />
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;