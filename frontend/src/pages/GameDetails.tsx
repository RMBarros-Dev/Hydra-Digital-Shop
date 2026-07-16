import { } from 'react';
import { useParams } from 'react-router-dom';
import { mockGames } from '../data/mockGames';
import { useCart } from '../context/CartContext';

export const GameDetails: React.FC = () => {
  const { id } = useParams();
  const game = mockGames.find(g => g.id === id);
  const { addToCart } = useCart();

  if (!game) return <div className="p-6">Jogo não encontrado</div>;

  const price = game.price * (1 - (game.discount ?? 0) / 100);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative h-64 md:h-96">
        <img src={game.image} alt={game.title} className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 flex items-end p-6">
          <div className="glass p-6 rounded-2xl max-w-3xl">
            <h1 className="text-4xl font-extrabold title-gradient">{game.title}</h1>
            <p className="text-sm text-slate-300 mt-2">{game.description}</p>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2">
          <h2 className="text-xl font-semibold title-gradient">Descrição</h2>
          <p className="text-slate-300 mt-2">{game.description}</p>

          <h3 className="mt-4 text-lg font-semibold">Requisitos Mínimos</h3>
          <ul className="text-slate-300 mt-2 list-disc list-inside">
            <li>OS: {game.requirements.os}</li>
            <li>CPU: {game.requirements.cpu}</li>
            <li>RAM: {game.requirements.ram}</li>
            <li>GPU: {game.requirements.gpu}</li>
            <li>Storage: {game.requirements.storage}</li>
          </ul>
        </section>

        <aside className="md:col-span-1 glass p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-400 line-through">{game.discount ? game.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : ''}</div>
              <div className="text-2xl font-bold text-cyan-300">{price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
            </div>
            <div>
              <button onClick={() => addToCart(game, 1)} className="btn-primary">Comprar</button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default GameDetails;
