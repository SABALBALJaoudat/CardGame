import ReactDOM from 'react-dom/client'
import App from './App.js'
import './css/index.css'
import { Provider } from 'react-redux';
import store from './Store/store.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
