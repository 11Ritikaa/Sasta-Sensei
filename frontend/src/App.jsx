import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import Products from './components/Products';
import CategoryPage from './components/CategoryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:asin" element={<ProductPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;