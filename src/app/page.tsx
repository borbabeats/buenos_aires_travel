'use client';

import { useState, useEffect, useMemo } from 'react';
import Tabs from '@/components/Tabs';
import LugarCard from '@/components/LugarCard';
import { useFavorites } from '@/hooks/useFavorites';
import { Lugar, LugaresData } from '@/types/interfaces';

const CATEGORIES_WITH_FAVORITES = ['favoritos', 'parques', 'museus', 'cafes_livrarias_bibliotecas', 'restaurantes', 'esculturas', 'passeios'];

export default function Home() {
  const [lugaresData, setLugaresData] = useState<LugaresData>({});
  const [activeCategory, setActiveCategory] = useState<string>('parques');
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite, isFavorited } = useFavorites();

  useEffect(() => {
    const loadLugares = async () => {
      try {
        const response = await fetch('/data/lugares.json');
        const data = await response.json();
        setLugaresData(data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLugares();
  }, []);

  const allLugares = useMemo(() => {
    const lugares: Lugar[] = [];
    Object.values(lugaresData).forEach(categoria => {
      categoria.forEach(lugar => {
        lugares.push({ ...lugar, id: `${lugar.nome}-${Date.now()}-${Math.random()}` });
      });
    });
    return lugares;
  }, [lugaresData]);

  const getCurrentLugares = () => {
    if (activeCategory === 'favoritos') {
      return favorites;
    }
    return lugaresData[activeCategory] || [];
  };

  const lugaresAtuais = getCurrentLugares();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando lugares de Buenos Aires...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Buenos Aires - Guia de Viagem</h1>
          <p className="text-gray-600 mt-2">Descubra os melhores lugares para visitar na cidade</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs
          categories={CATEGORIES_WITH_FAVORITES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lugaresAtuais.map((lugar, index) => (
            <LugarCard
              key={activeCategory === 'favoritos' ? lugar.id : `${activeCategory}-${index}`}
              lugar={lugar}
              isFavorited={isFavorited(lugar)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {lugaresAtuais.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {activeCategory === 'favoritos'
                ? 'Nenhum lugar favorito ainda. Clique no coração nos cards para adicionar!'
                : 'Nenhum lugar encontrado nesta categoria.'
              }
            </p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Buenos Aires Travel Guide. Feito com ❤️ para viajantes.
          </p>
        </div>
      </footer>
    </div>
  )
}
