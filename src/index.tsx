import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import 'suneditor/dist/css/suneditor.min.css';
import './css/index.css';
import './css/typography.css';
import AOS from 'aos/dist/aos.js';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ParallaxProvider } from 'react-scroll-parallax';

AOS.init();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ParallaxProvider>
      <App />
    </ParallaxProvider>
  </BrowserRouter>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
