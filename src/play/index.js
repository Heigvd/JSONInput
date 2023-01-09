import { createRoot } from 'react-dom/client';
// import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import React from 'react';
import App from './App';

function mount() {
  const root = createRoot(document.getElementById('container'));
  root.render(<App />);
}

mount();

if (module.hot) {
  module.hot.accept('./App', () => mount());
}
