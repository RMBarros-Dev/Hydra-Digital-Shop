import { } from 'react';
import { ShoppingCart, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Game } from '../data/mockGames';
import { useCart } from '../context/CartContext';

const formatPrice = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export const GameCard: React.FC<{ game: Game }> = ({ game }) => {
  const { addToCart } = useCart();
  const discounted = game.discount ? Math.round(game.price * (1 - game.discount / 100) * 100) / 100 : game.price;

  return (
    <article className={`game-card-3d game-card-hover-shadow bg-gradient-to-b from-slate-900/60 to-slate-900/40 border border-white/5 relative overflow-hidden rounded-xl`}>
      <Link to={`/game/${game.id}`} className="block">
        <div className="relative h-44 md:h-48 md:h-56 bg-gradient-to-br from-slate-800 to-zinc-800">
          <img src={game.image} alt={`${game.title} cover`} className="w-full h-full object-cover brightness-90" />
          {game.discount ? (
            <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-red-500 shadow-[0_0_20px_rgba(236,72,153,0.18)]">
              -{game.discount}%
            </div>
          ) : null}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-slate-800/60 backdrop-blur-sm border border-white/5 rounded-full text-slate-200 flex items-center gap-1">
              <Monitor className="w-3 h-3 text-cyan-300" /> <span className="hidden sm:inline">{game.platform ?? 'PC'}</span>
            </span>
          </div>
        </div>
      </Link>

      <div className="p-3 md:p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm md:text-base font-bold title-gradient leading-tight truncate">{game.title}</h3>
          <div className="text-right">
            {game.discount ? (
              <div className="text-sm font-extrabold text-cyan-300">{formatPrice(discounted)}</div>
            ) : (
              <div className="text-sm font-extrabold text-white">{formatPrice(game.price)}</div>
            )}
            {game.discount ? <div className="text-xs text-slate-400 line-through mt-1">{formatPrice(game.price)}</div> : null}
          </div>
        </div>

        <p className="text-xs text-slate-300 mt-1 line-clamp-2">{game.description}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-slate-800/50 border border-white/5 rounded-md text-slate-300">{game.category}</span>
            <span className="text-xs text-slate-400">⭐ {Math.round((game.rating ?? 4.5) * 10) / 10}</span>
          </div>

          <button
            onClick={() => addToCart(game, 1)}
            className="ml-3 inline-flex items-center gap-2 px-3 py-1 md:py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 hover:brightness-110 transition-all text-sm text-white shadow-sm"
            aria-label={`Adicionar ${game.title} ao carrinho`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Adicionar</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default GameCard;
