export type GenerationName = "i" | "ii" | "iii" | "iv" | "v" | "vi" | "vii" | "viii";

export interface Generation {
    slug: GenerationName;
    number: number;
}

export const Generations: Record<GenerationName, Generation> = {
    i: { slug: "i", number: 1 },
    ii: { slug: "ii", number: 2 },
    iii: { slug: "iii", number: 3 },
    iv: { slug: "iv", number: 4 },
    v: { slug: "v", number: 5 },
    vi: { slug: "vi", number: 6 },
    vii: { slug: "vii", number: 7 },
    viii: { slug: "viii", number: 8 },
};

export const getGenFromNum = (num: number): Generation => {
    const gen = Object.values(Generations).find((gen) => gen.number === num);
    if (!gen) throw new Error(`Generation with number ${num} not found`);
    return gen;
};

export const getGenFromName = (name: string): Generation => {
    const gen = Object.values(Generations).find((gen) => gen.slug === name.toLowerCase());
    if (!gen) throw new Error(`Generation with name "${name}" not found`);
    return gen;
};
