import "./App.css";
import About from "./components/About";
import Feature from "./components/Feature";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <main className="min-h-screen relative w-screen overflow-x-clip">
        <Navbar />
        <Hero id="nexus" />
        <About id="about" />
        <Feature/>
      </main>
    </>
  );
}
export default App;
