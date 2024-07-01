import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import TheBook from './pages/TheBook.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "books/:bookId",
    element: <TheBook />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <RouterProvider router={router} />
  </Provider>,
)
