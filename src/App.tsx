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
import EditProduct from './pages/Products/ProductEdit/IdEdit/EditProduct';
import Layout from './components/Layout/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';

import RequireAuth from './pages/Auth/RequireAuth';
import AuthProvider from './pages/Auth/AuthContext';
import CreateCategories from './pages/Categories/CategoriesCreate/CreateCategories';
import EditCategories from './pages/Categories/CategoriesEdit/EditCategories';
import { CartProvider } from './pages/CartDetails/CartProvider';
import Finish from './pages/CartDetails/Finish';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="products"element={<Products />}/>
              <Route path="categories" element={<Categories />} />
              <Route path="cartdetail" element={<RequireAuth><Cartdetail /></RequireAuth>} />
              <Route path="finish" element={<RequireAuth><Finish /></RequireAuth>} />
              <Route path="products/create" element={<RequireAuth><CreateProducts/></RequireAuth>} />
              <Route path="products/edit/:id" element={<RequireAuth><EditProduct/></RequireAuth>} />
              <Route path="categories/create" element={<RequireAuth><CreateCategories/></RequireAuth>} />
              <Route path="categories/edit/:id" element={<RequireAuth><EditCategories/></RequireAuth>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
