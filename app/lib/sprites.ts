import { PokemonSprites, type PokemonSpriteChoice } from "~/types/PokemonSpriteChoice";

const cache: Record<string, string> = {}; // pkmnId + spriteChoice => cropped data URL

/**
 * Auto-crop transparent pixels and return a uniform sprite
 */
export const getCroppedSprite = async (pkmnId: number, spriteChoice: PokemonSpriteChoice): Promise<string> => {
    const cacheKey = `${pkmnId}-${spriteChoice}`;
    if (cache[cacheKey]) return cache[cacheKey];

    const spriteInfo = PokemonSprites[spriteChoice];

    let url: string;
    let isGif = false;
    let fallback = false;

    if (!spriteInfo) {
        // Use fallback sprite for older generations
        url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkmnId}.png`;
        fallback = true;
    } else {
        isGif = spriteChoice === "Black & White (Animated)" || spriteChoice === "Pokémon Showdown";
        const extension = isGif ? "gif" : "png";
        url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${spriteInfo.path}/${pkmnId}.${extension}`;
    }

    try {
        const img = await loadImage(url);
        const croppedDataUrl = cropTransparentPixels(img);

        // Cache normally, but if this is a fallback, use a special key
        const finalCacheKey = fallback ? `${pkmnId}-fallback` : cacheKey;
        cache[finalCacheKey] = croppedDataUrl;

        return croppedDataUrl;
    } catch {
        // If even the fallback fails, just return the original URL
        return url;
    }
};

// Fallback if sprite fails or is invalid
const getFallback = (pkmnId: number) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkmnId}.png`;

// Load image as HTMLImageElement
const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });

// Crop transparent pixels from canvas
const cropTransparentPixels = (img: HTMLImageElement): string => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = imgData;

    let top = height,
        left = width,
        right = 0,
        bottom = 0;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const alpha = data[(y * width + x) * 4 + 3];
            if (alpha !== 0) {
                if (x < left) left = x;
                if (x > right) right = x;
                if (y < top) top = y;
                if (y > bottom) bottom = y;
            }
        }
    }

    const cropWidth = right - left + 1;
    const cropHeight = bottom - top + 1;

    if (cropWidth <= 0 || cropHeight <= 0) return img.src;

    const cropCanvas = document.createElement("canvas");
    cropCanvas.width = cropWidth;
    cropCanvas.height = cropHeight;
    cropCanvas.getContext("2d")!.drawImage(canvas, left, top, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

    return cropCanvas.toDataURL("image/png");
};
