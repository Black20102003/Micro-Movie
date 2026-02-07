import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AddCollection } from './components/CollectionContent.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AddCollection>
    <App />
    </AddCollection>
  </StrictMode>,
)
