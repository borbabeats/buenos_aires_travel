/**
 * Sistema simples de imagens locais
 * Usa URLs estáticas armazenadas no JSON
 */

/**
 * Gera URL para imagem local baseada no nome do arquivo
 */
export function getLocalImageUrl(imagePath: string): string {
  // Se já for uma URL completa, retorna como está
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // Remove a barra inicial se existir
  const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;

  // Retorna URL completa para a pasta public
  return `/${cleanPath}`;
}

/**
 * Fallback para imagem padrão quando não há imagem disponível
 */
export function getFallbackImage(): string {
  return '/images/placeholder.jpg';
}

/**
 * Valida se uma URL de imagem é válida
 */
export function isValidImageUrl(url: string): boolean {
  return typeof url === 'string' && url.length > 0;
}
