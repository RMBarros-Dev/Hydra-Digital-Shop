import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { items, removeFromCart, total, checkout } = useCart();

  const handleCheckout = () => {
    const res = checkout();
    if (res.success) {
      alert('Compra realizada! Verifique sua Biblioteca para as chaves.');
      onClose();
    }
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-full sm:w-96 z-50 transform ${open ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
      <div className="h-full glass flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-white/5">
          <h3 className="text-lg font-bold">Seu Carrinho</h3>
          <button onClick={onClose} aria-label="Fechar" className="p-2 rounded-md hover:bg-white/5">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-auto space-y-4">
          {items.length === 0 ? (
            <div className="text-slate-400">Seu carrinho está vazio.</div>
          ) : (
            items.map(it => (
              <div key={it.game.id} className="flex items-center gap-3 p-2 bg-slate-900/40 rounded-lg">
                <img src={it.game.image} alt={it.game.title} className="w-14 h-14 rounded-md object-cover" />
                <div className="flex-1">
                  <div className="font-semibold">{it.game.title}</div>
                  <div className="text-sm text-slate-400">Qtd: {it.quantity}</div>
                </div>
                <div className="text-cyan-300 font-bold">{(it.game.price * (1 - (it.game.discount ?? 0) / 100)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                <button onClick={() => removeFromCart(it.game.id)} className="text-sm text-pink-400">Remover</button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-slate-300">Total</div>
            <div className="text-xl font-bold text-cyan-300">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
          </div>
          <button onClick={handleCheckout} className="w-full btn-primary">Finalizar Compra</button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
