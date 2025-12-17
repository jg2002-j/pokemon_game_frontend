import type { Generation } from "~/types/Generation";
import { PokemonSprites, type PokemonSpriteChoice } from "~/types/PokemonSpriteChoice";

const spriteCache = new Map<string, string>();

export const getCroppedSprite = async (
    pkmnId: number,
    spriteChoice: PokemonSpriteChoice,
    pkmnGen: Generation
): Promise<string> => {
    const cacheKey = `${pkmnId}-${spriteChoice}-${pkmnGen.numericalVal}`;
    const cached = spriteCache.get(cacheKey);
    if (cached) return cached;

    const spriteInfo = PokemonSprites[spriteChoice];

    const shouldFallback = !spriteInfo || spriteInfo.gen < pkmnGen.numericalVal;

    const url = shouldFallback ? getFallback(pkmnId) : buildSpriteUrl(pkmnId, spriteInfo.path, spriteInfo.animated);

    try {
        if (spriteInfo.animated || shouldFallback) {
            spriteCache.set(cacheKey, url);
            return url;
        }

        const img = await loadImage(url);
        const cropped = cropTransparentPixels(img);

        spriteCache.set(cacheKey, cropped);
        return cropped;
    } catch {
        const fallback = getFallback(pkmnId);
        spriteCache.set(cacheKey, fallback);
        return fallback;
    }
};

const buildSpriteUrl = (pkmnId: number, path: string, animated: boolean) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${path}/${pkmnId}.${animated ? "gif" : "png"}`;

const getFallback = (pkmnId: number) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pkmnId}.gif`;

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

    const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Use a Uint32 view for faster alpha checks
    const pixels32 = new Uint32Array(data.buffer);

    let top = height,
        left = width,
        right = 0,
        bottom = 0;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const pixel = pixels32[y * width + x];
            const alpha = pixel >>> 24; // highest byte is alpha in little-endian
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
