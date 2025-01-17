import { Navigate, Route, Routes } from 'react-router';
import Nav from './components/nav/Nav';
import Home from './pages/Home';
import ResetPassword from './pages/ResetPassword';
import Blog from './pages/Blog';
import Write from './pages/Write';
import Settings from './pages/Settings';
import Stories from './pages/Stories';
import MobileSearch from './pages/MobileSearch';
import { useMediaQuery } from 'react-responsive';
import ProtectedRoute from './components/ProtectedRoute';
import DesktopSearch from './pages/DesktopSearch';

function App() {
  const isMobile = useMediaQuery({ maxWidth: 600 });

  return (
    <>
      <Nav />

      <main className="max-w-[1200px] w-[90%] mx-auto ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/blog/:blogId" element={<Blog />} />

          <Route
            path="/search"
            element={isMobile ? <MobileSearch /> : <DesktopSearch />}
          />

          {/* Protected Routes */}
          <Route
            path="/write"
            element={
              <ProtectedRoute>
                <Write />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stories"
            element={
              <ProtectedRoute>
                <Stories />
              </ProtectedRoute>
            }
          />
          {/* */}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
