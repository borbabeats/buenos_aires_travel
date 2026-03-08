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
 * Fallback para imagem padrão usando Unsplash (temporário até adicionar imagens locais)
 */
export function getFallbackImage(): string {
  return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop';
}

/**
 * Verifica se uma imagem local existe (simulação - sempre retorna true por enquanto)
 * No futuro pode implementar checagem real de arquivos
 */
export function imageExists(imagePath: string): boolean {
  // Por enquanto, assumimos que imagens locais existem
  // Futuramente pode implementar fetch HEAD ou similar
  return !imagePath.includes('placeholder');
}

/**
 * Valida se uma URL de imagem é válida
 */
export function isValidImageUrl(url: string): boolean {
  return typeof url === 'string' && url.length > 0;
}
