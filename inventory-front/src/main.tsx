import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'
import './index.css'
import { getToken } from './utils/helper-functions';
import { fetchUserData } from './store/slices/authThunk';
import { Toaster } from './components/ui/toaster';
import Inventory from './pages/inventory/Index';
import Login from './pages/login/Index';
import NoMatch from './pages/notfound/Index';
import PrivateRoute from './routes/PrivateRoute';
import History from './pages/history/Index';
import ProductOut from './pages/product-out/Index';

if (getToken()) {
  store.dispatch(fetchUserData());
}

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  {
    path: "/inventory", element:
      <PrivateRoute>
        <Inventory />
      </PrivateRoute>
  },
  {
    path: "/history", element:
      <PrivateRoute>
        <History />
      </PrivateRoute>
  },
  {
    path: "/product-out", element:
      <PrivateRoute>
        <ProductOut />
      </PrivateRoute>
  },
  { path: "*", element: <NoMatch /> }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster />
  </Provider>
)
