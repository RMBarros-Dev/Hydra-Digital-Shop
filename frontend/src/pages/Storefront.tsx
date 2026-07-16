import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { mockGames } from '../data/mockGames';
import GameCard from '../components/GameCard';
import { useCart } from '../context/CartContext';
import CartDrawer from '../components/CartDrawer';
import SkeletonCard from '../components/SkeletonCard';

const categories = ['Todas', 'Ação', 'RPG', 'Estratégia', 'Corrida', 'Simulação', 'Esporte'] as const;

export const Storefront: React.FC = () => {
  const { itemCount } = useCart();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('Todas');
  const [heroIndex, setHeroIndex] = useState(0);
  const [games, setGames] = useState<typeof mockGames>(mockGames);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const apiBase = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000';

  useEffect(() => {
    let mounted = true;
    const fetchGames = async () => {
      try {
        const res = await fetch(`${apiBase}/api/games`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (mounted && Array.isArray(data)) {
          setGames(data);
        }
      } catch (e) {
        // fallback to mockGames if API unavailable
        setGames(mockGames);
      }
    };

    fetchGames();
    return () => { mounted = false; };
  }, [apiBase]);

  const featured = useMemo(() => games.filter(g => (g as any).featured), [games]);

  useEffect(() => {
    const t = setInterval(() => setHeroIndex(i => (i + 1) % Math.max(1, featured.length)), 5000);
    return () => clearInterval(t);
  }, [featured.length]);

  const filtered = games.filter(g => {
    if (category !== 'Todas' && g.category !== category) return false;
    if (!query) return true;
    return g.title.toLowerCase().includes(query.toLowerCase()) || g.description.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-extrabold tracking-tight title-gradient">
              Hydra Digital Shop
            </Link>

            <div className="relative">
              <label htmlFor="search" className="sr-only">Buscar jogos</label>
              <input
                id="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Pesquisar jogos, títulos ou tags..."
                className="w-72 md:w-96 glass px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg"
              />
            </div>
          </div>

          <nav className="flex items-center gap-4">
            <Link to="/library" className="text-sm text-slate-300 hover:text-white">Biblioteca</Link>
            <button onClick={() => setDrawerOpen(true)} className="relative inline-flex items-center p-2 rounded-md hover:bg-white/3">
              <ShoppingCart className="w-6 h-6 text-cyan-400" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-purple-600 rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero */}
        <section className="rounded-xl overflow-hidden mb-6">
          <div className="relative h-56 md:h-80 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl">
            {featured.length > 0 ? (
              <div className="absolute inset-0">
                <img src={featured[heroIndex].image} alt={featured[heroIndex].title} className="w-full h-full object-cover brightness-75" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="max-w-xl bg-slate-900/60 p-4 rounded-xl">
                    <h2 className="text-2xl md:text-4xl font-bold text-white">{featured[heroIndex].title}</h2>
                    <p className="text-sm md:text-base text-slate-300 mt-2">{featured[heroIndex].description}</p>
                    <div className="mt-4 flex gap-3 items-center">
                      <span className="text-lg font-semibold text-purple-400">
                        {(featured[heroIndex].discount ?? 0) > 0 ? `${featured[heroIndex].discount}% OFF` : ''}
                      </span>
                      <Link to={`/game/${featured[heroIndex].id}`} className="ml-auto inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white">
                        Ver promoção
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <h2 className="text-xl text-slate-300">Destaques em breve</h2>
              </div>
            )}
          </div>
        </section>

        {/* Filtros Rápidos */}
        <section className="mb-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`text-sm px-3 py-1 rounded-full ${category === c ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                aria-pressed={category === c}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? (
              // show skeletons while loading
              Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            ) : (
              filtered.map(game => (
                <GameCard key={game.id} game={game} />
              ))
            )}
          </div>
        </section>
      </main>
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Storefront;
