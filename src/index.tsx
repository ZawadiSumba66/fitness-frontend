import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';
import Bus from './actions/bus';
import './index.css';

declare global {
  interface Window {
    flash?: any;
  }
}

window.flash = (message: string, type = 'success') => Bus.emit('flash', ({ message, type }));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
