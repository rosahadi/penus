import { Route, Routes } from 'react-router';
import Nav from './components/nav/Nav';
import Home from './pages/Home';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <>
      <Nav />

      <main className="max-w-[1200px] w-[90%] mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
