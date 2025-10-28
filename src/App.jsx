import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Customizer from "./components/Customizer";
import Showcase from "./components/Showcase";

function App() {
  return (
    <div className="min-h-screen bg-black text-white font-inter selection:bg-blue-500/40 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Customizer />
        <Showcase />
      </main>
    </div>
  );
}

export default App;
