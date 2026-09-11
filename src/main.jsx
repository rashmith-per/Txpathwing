import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './modules/marketing/presentation/pages/Home/Home.jsx'
import WhyChoose from './modules/marketing/presentation/pages/WhyChoose/WhyChoose.jsx'
import Blog from './modules/marketing/presentation/pages/Blog/Blog.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Blog />
  </StrictMode>,
)
