import Template from '@templates/Template.js';
// Lo estamos llamando a la raiz del proyecto
import '@styles/main.css';

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
