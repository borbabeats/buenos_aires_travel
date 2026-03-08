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
    <div className="w-full border-b border-gray-200 mb-6">
      <div className="flex overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
              ${activeCategory === category
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            {categoryNames[category] || category}
          </button>
        ))}
      </div>
    </div>
  );
}
