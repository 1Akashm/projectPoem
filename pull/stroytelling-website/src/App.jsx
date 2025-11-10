import "./App.css";
import About from "./components/About";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <main className="min-h-screen relative w-screen overflow-x-clip">
        <Navbar />
        <Hero id="nexus"/>
        <About id="about"/>

      </main>
    </>
  );
}
export default App;
