import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import theme from './theme';
import { store, persistor } from './redux/auth'
import reportWebVitals from './reportWebVitals';
import { AmountProvider } from './context/GetAmount';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <AmountProvider>
          <CssBaseline />
          <App />
        </AmountProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
);

reportWebVitals();
