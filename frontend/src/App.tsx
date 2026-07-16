import { Routes, Route } from 'react-router-dom';
import Storefront from './pages/Storefront';
import GameDetails from './pages/GameDetails';
import Library from './pages/Library';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Storefront />} />
      <Route path="/game/:id" element={<GameDetails />} />
      <Route path="/library" element={<Library />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}

export default App;
