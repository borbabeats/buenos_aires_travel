'use client';

import { useState } from 'react';

interface TabProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categoryNames: { [key: string]: string } = {
  favoritos: '❤️ Favoritos',
  parques: 'Parques',
  museus: 'Museus',
  cafes_livrarias_bibliotecas: 'Cafés, Livrarias & Bibliotecas',
  restaurantes: 'Restaurantes',
  esculturas: 'Esculturas',
  passeios: 'Passeios'
};

export default function Tabs({ categories, activeCategory, onCategoryChange }: TabProps) {
  return (
    <div className="w-full border-b-2 border-blue-200 mb-6 bg-white rounded-t-xl shadow-sm">
      <div className="flex overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              px-6 py-4 text-sm font-medium border-b-4 transition-all duration-300 whitespace-nowrap
              ${activeCategory === category
                ? 'border-gradient-to-r from-blue-500 to-blue-600 text-blue-700 bg-gradient-to-b from-blue-50 to-transparent transform scale-105'
                : 'border-transparent text-blue-500 hover:text-blue-700 hover:border-blue-200 hover:bg-blue-50/50'
              }
            `}
          >
            <span className="flex items-center gap-2">
              {categoryNames[category] || category}
              {activeCategory === category && (
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
