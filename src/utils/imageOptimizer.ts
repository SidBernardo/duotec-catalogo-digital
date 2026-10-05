/**
 * Utilitário para optimização e compressão de imagens no cliente (Browser).
 * Reduz imagens pesadas de 5-15MB para ~30-60KB antes de guardar ou enviar para o Supabase,
 * garantindo rapidez, sem estourar limites de memória ou base de dados.
 */

export interface OptimizedImageResult {
  dataUrl: string;
  blob: Blob;
  width: number;
  height: number;
}

/**
 * Converte uma string Data URL (Base64) num objecto Blob para envio via FormData/Storage
 */
export function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(',');
  const mimeMatch = parts[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  const bstr = atob(parts[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * Comprime e redimensiona um ficheiro de imagem no browser antes de carregar
 */
export async function compressImageFile(
  file: File,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.82
): Promise<OptimizedImageResult> {
  // Se for SVG, não precisa de redimensionamento via canvas
  if (file.type === 'image/svg+xml') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        resolve({
          dataUrl,
          blob: file,
          width: 200,
          height: 200,
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;

      // Calcular novas dimensões mantendo a proporção original
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Não foi possível inicializar o contexto 2D do Canvas.'));
        return;
      }

      // Suavização de alta qualidade
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Desenhar a imagem redimensionada
      ctx.drawImage(img, 0, 0, width, height);

      // Tentar WebP primeiro, fallback para JPEG
      let mimeType = 'image/webp';
      let dataUrl = canvas.toDataURL(mimeType, quality);

      if (!dataUrl.startsWith('data:image/webp')) {
        mimeType = 'image/jpeg';
        dataUrl = canvas.toDataURL(mimeType, quality);
      }

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve({
              dataUrl,
              blob,
              width,
              height,
            });
          } else {
            const fallbackBlob = dataUrlToBlob(dataUrl);
            resolve({
              dataUrl,
              blob: fallbackBlob,
              width,
              height,
            });
          }
        },
        mimeType,
        quality
      );
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(objectUrl);
      reject(err);
    };

    img.src = objectUrl;
  });
}
