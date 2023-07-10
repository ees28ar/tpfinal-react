import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import Cartdetail from './pages/CartDetails/Cartdetail';
import Categories from './pages/Categories/Categories';
import NotFound from './components/Error/NotFound/NotFound';
import Products from './pages/Products/Products';
import CreateProducts from './pages/Products/ProductCreate/CreateProducts';
import IdEditP from './pages/Products/ProductEdit/IdEdit/IdEditP';
import IdProducts from './pages/Products/ProductsDetails/IdProducts';
import Layout from './components/Layout/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <div>
                <hr />
                <Layout />
              </div>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cartdetail" element={<Cartdetail />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products/create" element={<CreateProducts />} />
            <Route path="products/edit/:id" element={<IdEditP />} />
            <Route path="/products/:id" element={<IdProducts />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
