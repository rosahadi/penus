import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthAndUserProvider } from './context/AuthContext.tsx';
import { Toaster } from './components/ui/toaster.tsx';

const queryClient = new QueryClient({});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthAndUserProvider>
          <App />
          <Toaster />
        </AuthAndUserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
