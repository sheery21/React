import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";

export default function App() {
  return (
    <div className="flex min-h-screen bg-[#021c3a] text-white">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-y-auto h-screen p-6 space-y-20">
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
