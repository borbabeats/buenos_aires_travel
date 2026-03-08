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
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div 
          className="relative h-48 cursor-pointer"
          onClick={() => setShowCarousel(true)}
        >
          <Image
            src={mainImageUrl}
            alt={lugar.nome}
            fill
            className="object-cover"
          />
          {carouselImages.length > 1 && (
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
              +{carouselImages.length - 1} fotos
            </div>
          )}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 left-2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-200 shadow-md"
            aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <span className={`text-2xl ${isFavorited ? 'text-red-500' : 'text-gray-400'}`}>
              {isFavorited ? '❤️' : '🤍'}
            </span>
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{lugar.nome}</h3>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">
              {renderStars(lugar.classificacao_tripadvisor)}
            </div>
            <span className="text-sm text-gray-600">({lugar.classificacao_tripadvisor})</span>
          </div>

          <p className="text-gray-600 text-sm mb-3">{lugar.descricao}</p>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">📍</span>
              <span className="text-gray-600">{lugar.endereco}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">💰</span>
              <span className="text-gray-600">{lugar.custo_medio}</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">🚶</span>
                <span className="text-gray-600">{lugar.distancia.a_pe} min a pé</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">🚕</span>
                <span className="text-gray-600">{lugar.distancia.taxi} min de taxi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">🚌</span>
                <span className="text-gray-600">{lugar.distancia.onibus} min de ônibus</span>
              </div>
            </div>
          </div>
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
