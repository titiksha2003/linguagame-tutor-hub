
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { LanguageTutorProvider } from './contexts/LanguageTutorContext';

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <ProgressProvider>
        <LanguageTutorProvider>
          <App />
        </LanguageTutorProvider>
      </ProgressProvider>
    </AuthProvider>
  </BrowserRouter>
);
