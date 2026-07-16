import { } from 'react';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const { items, removeFromCart, total, checkout } = useCart();

  const onCheckout = () => {
    const res = checkout();
    if (res.success) {
      alert('Compra realizada! Verifique sua Biblioteca para ver as chaves.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold">Carrinho</h1>
      {items.length === 0 ? (
        <p className="text-slate-300 mt-4">Seu carrinho está vazio.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 max-w-3xl">
          {items.map(it => (
            <div key={it.game.id} className="card p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold">{it.game.title}</div>
                <div className="text-sm text-slate-400">Quantidade: {it.quantity}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm font-bold text-purple-400">{(it.game.price * (1 - (it.game.discount ?? 0) / 100)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                <button onClick={() => removeFromCart(it.game.id)} className="text-sm text-red-400">Remover</button>
              </div>
            </div>
          ))}

          <div className="card p-4 flex items-center justify-between">
            <div className="text-slate-300">Total</div>
            <div className="text-xl font-bold text-purple-400">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
          </div>

          <div>
            <button onClick={onCheckout} className="btn-primary">Finalizar Compra</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
