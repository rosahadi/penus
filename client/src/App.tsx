import Nav from './components/nav/Nav';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Nav />

      <main className="max-w-[1200px] w-[90%] mx-auto">
        <Home />
      </main>
    </>
  );
}

export default App;
