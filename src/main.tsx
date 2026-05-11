import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { applyTheme } from './theme';
import { applyDocumentSEO } from './lib/seo';
import { config } from './config/landing.config';

applyTheme(config.theme);
applyDocumentSEO(config);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
