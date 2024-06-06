
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './redux/store.tsx'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from './components/ui/toaster.tsx'
import { ThemeProvider } from './components/common/theme-provider.tsx'
import { SocketContextProvider } from './assets/context/socketContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme='dark' storageKey='hiremeup-ui-theme'>
    <Router>
      <Provider store={store}>
        <SocketContextProvider>
          <GoogleOAuthProvider clientId='738481169283-03bsefidu1mt54orsd1qidp7gic50vmb.apps.googleusercontent.com'>
            <Toaster />
            <App />
          </GoogleOAuthProvider>
        </SocketContextProvider>
      </Provider>
    </Router>
  </ThemeProvider>
)
