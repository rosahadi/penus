import { Route, Routes } from 'react-router';
import Nav from './components/nav/Nav';
import Home from './pages/Home';
import ResetPassword from './pages/ResetPassword';
import Blog from './pages/Blog';
import Write from './pages/Write';
import Settings from './pages/Settings';

function App() {
  return (
    <>
      <Nav />

      <main className="max-w-[1200px] w-[90%] mx-auto ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/blog/:blogId" element={<Blog />} />
          <Route path="/write" element={<Write />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
