import { useEffect, useState } from 'react';
import type { Game } from '../data/mockGames';

type Purchased = {
  game: Game;
  quantity: number;
  key?: string;
};

function isPurchasedList(value: unknown): value is Purchased[] {
  return Array.isArray(value) && value.every((item): item is Purchased =>
    typeof item === 'object' &&
    item !== null &&
    'game' in item &&
    typeof item.game === 'object' &&
    item.game !== null &&
    'id' in item.game &&
    typeof item.game.id === 'string' &&
    'title' in item.game &&
    typeof item.game.title === 'string' &&
    'quantity' in item &&
    typeof item.quantity === 'number'
  );
}

export const Library: React.FC = () => {
  const [items, setItems] = useState<Purchased[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('hydra_library');
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      setItems(isPurchasedList(parsed) ? parsed : []);
    } catch {
      setItems([]);
    }
  }, []);

  if (items.length === 0) return <div className="p-6 text-slate-300">Sua biblioteca está vazia.</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold">Minha Biblioteca</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it.game.id} className="card p-4">
            <h3 className="font-semibold">{it.game.title}</h3>
            <p className="text-sm text-slate-300">Quantidade: {it.quantity}</p>
            <div className="mt-2 text-sm">
              <div className="text-xs text-slate-400">Chave de Ativação</div>
              <div className="font-mono text-sm mt-1 bg-slate-800 p-2 rounded">{it.key}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
