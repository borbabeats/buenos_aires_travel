'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getLocalImageUrl, getFallbackImage, isValidImageUrl } from '@/utils/imageUtils';
import { Lugar } from '@/types/interfaces';

interface LugarCardProps {
  lugar: Lugar;
  isFavorited: boolean;
  onToggleFavorite: (lugar: Lugar) => void;
}

export default function LugarCard({ lugar, isFavorited, onToggleFavorite }: LugarCardProps) {
  const [showCarousel, setShowCarousel] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Usa a primeira imagem disponível ou fallback
  const mainImageUrl = lugar.fotos && lugar.fotos.length > 0 && isValidImageUrl(lugar.fotos[0])
    ? getLocalImageUrl(lugar.fotos[0])
    : getFallbackImage();

  // Imagens para o carousel
  const carouselImages = lugar.fotos && lugar.fotos.length > 0
    ? lugar.fotos.map(foto => getLocalImageUrl(foto)).filter(isValidImageUrl)
    : [getFallbackImage()];

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita abrir o carrossel
    onToggleFavorite(lugar);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<span key={i} className="text-gray-300">★</span>);
    }

    return stars;
  };

  return (
    <>
      <div className="relative h-[500px] md:h-[400px] lg:h-[500px] landscape:h-[300px] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer">
        <Image
          src={mainImageUrl}
          alt={lugar.nome}
          fill
          className="object-cover"
          onClick={() => setShowCarousel(true)}
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 left-2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-200 shadow-md"
          aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <span className={`text-2xl ${isFavorited ? 'text-red-500' : 'text-gray-400'}`}>
            {isFavorited ? '❤️' : '🤍'}
          </span>
        </button>
        
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          <div className="flex items-center gap-1">
            {renderStars(lugar.classificacao_tripadvisor)}
            <span className="text-xs">({lugar.classificacao_tripadvisor})</span>
          </div>
        </div>
        
        <div 
          className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${isExpanded ? 'bg-gradient-to-t from-black via-black/80 to-transparent' : 'bg-gradient-to-t from-black via-black/70 to-transparent'} p-4`}
        >
          <h3 
            className="text-xl font-semibold text-white mb-2 cursor-pointer hover:text-gray-200 transition-colors flex items-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {lugar.nome}
            <span className={`text-sm transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </h3>
          
          {isExpanded && (
            <div className="mt-3 space-y-2 text-sm text-white animate-in slide-in-from-top duration-300">
              <p className="text-white/90">{lugar.descricao}</p>
              
              <div className="flex items-center gap-2">
                <span className="font-medium">💰</span>
                <span className="text-white/90">{lugar.custo_medio}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="font-medium">🚕</span>
                <span className="text-white/90">{lugar.distancia.taxi} min de taxi</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {showCarousel && (
        <Carousel 
          images={carouselImages}
          title={lugar.nome}
          onClose={() => setShowCarousel(false)}
        />
      )}
    </>
  );
}

interface CarouselProps {
  images: string[];
  title: string;
  onClose: () => void;
}

function Carousel({ images, title, onClose }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev: number) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev: number) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
      >
        ✕
      </button>
      
      <button
        onClick={goToPrevious}
        className="absolute left-4 text-white text-3xl hover:text-gray-300 z-10"
      >
        ‹
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 text-white text-3xl hover:text-gray-300 z-10"
      >
        ›
      </button>

      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={images[currentIndex]}
          alt={`${title} - Foto ${currentIndex + 1}`}
          fill
          className="object-contain"
        />
        
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
          <div className="flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
          <p className="text-white text-sm mt-2">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}
