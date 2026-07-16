import { v4 as uuidv4 } from 'uuid';

export type Game = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: 'Ação' | 'RPG' | 'Estratégia' | 'Corrida' | 'Simulação' | 'Esporte';
  discount?: number;
  rating?: number;
  platform?: 'Windows';
  requirements: {
    os: string;
    cpu: string;
    ram: string;
    gpu: string;
    storage: string;
  };
  featured?: boolean;
};

export const mockGames: Game[] = [
  {
    id: uuidv4(),
    title: 'Elden Ring',
    description: 'A massive world to explore. High difficulty, rich lore and epic boss battles.',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1605902711622-cfb43c44367f?auto=format&fit=crop&w=800&q=60',
    category: 'RPG',
    discount: 20,
    rating: 4.8,
    platform: 'Windows',
    featured: true,
    requirements: {
      os: 'Windows 10 64-bit',
      cpu: 'Intel Core i5-8400 / AMD Ryzen 3 3300X',
      ram: '12 GB',
      gpu: 'NVIDIA GeForce GTX 1060 / AMD RX 580',
      storage: '60 GB',
    },
  },
  {
    id: uuidv4(),
    title: 'Red Dead Redemption 2',
    description: 'Western epic with a cinematic single-player campaign and online modes.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=60',
    category: 'Ação',
    discount: 35,
    rating: 4.9,
    platform: 'Windows',
    requirements: {
      os: 'Windows 10 64-bit',
      cpu: 'Intel Core i7-4770K / AMD Ryzen 5 1500X',
      ram: '12 GB',
      gpu: 'NVIDIA GTX 1060 6GB / AMD RX 480 4GB',
      storage: '150 GB',
    },
  },
  {
    id: uuidv4(),
    title: 'FIFA Ultimate 24',
    description: 'Última edição do sim de futebol, jogabilidade refinada e modos online.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=60',
    category: 'Esporte',
    discount: 10,
    rating: 4.2,
    platform: 'Windows',
    requirements: {
      os: 'Windows 10 64-bit',
      cpu: 'Intel Core i5-6600K / AMD Ryzen 5 1600',
      ram: '8 GB',
      gpu: 'NVIDIA GTX 1050 Ti / AMD RX 560',
      storage: '50 GB',
    },
  },
  {
    id: uuidv4(),
    title: 'Forza Horizon 5',
    description: 'Corridas em mundo aberto com centenas de carros e clima dinâmico.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=800&q=60',
    category: 'Corrida',
    discount: 15,
    rating: 4.7,
    platform: 'Windows',
    requirements: {
      os: 'Windows 10 64-bit',
      cpu: 'Intel Core i5-4460 / AMD Ryzen 3 1200',
      ram: '8 GB',
      gpu: 'NVIDIA GTX 970 / AMD RX 470',
      storage: '80 GB',
    },
  },
  {
    id: uuidv4(),
    title: 'Civilization VI',
    description: 'Estratégia por turnos com gestão de impérios e diplomacia profunda.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=60',
    category: 'Estratégia',
    discount: 50,
    rating: 4.5,
    platform: 'Windows',
    requirements: {
      os: 'Windows 10 64-bit',
      cpu: 'Intel Core i3',
      ram: '4 GB',
      gpu: '1 GB DirectX 11',
      storage: '12 GB',
    },
  },
  {
    id: uuidv4(),
    title: 'Microsoft Flight Simulator',
    description: 'Simulação de voo hiper-realista com mapeamento global.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=60',
    category: 'Simulação',
    discount: 5,
    rating: 4.6,
    platform: 'Windows',
    requirements: {
      os: 'Windows 10 64-bit',
      cpu: 'Intel i5-4460 / AMD Ryzen 3 1200',
      ram: '16 GB',
      gpu: 'NVIDIA GTX 770 / AMD Radeon RX 570',
      storage: '150 GB',
    },
  },
];
