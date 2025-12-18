export type GenerationName = "i" | "ii" | "iii" | "iv" | "v" | "vi" | "vii" | "viii";

export interface Generation {
    name: GenerationName;
    numericalVal: number;
}

export const Generations: Record<GenerationName, Generation> = {
    i: { name: "i", numericalVal: 1 },
    ii: { name: "ii", numericalVal: 2 },
    iii: { name: "iii", numericalVal: 3 },
    iv: { name: "iv", numericalVal: 4 },
    v: { name: "v", numericalVal: 5 },
    vi: { name: "vi", numericalVal: 6 },
    vii: { name: "vii", numericalVal: 7 },
    viii: { name: "viii", numericalVal: 8 },
};

export const getGenerationFromNum = (num: number): Generation => {
    const gen = Object.values(Generations).find((gen) => gen.numericalVal === num);
    if (!gen) throw new Error(`Generation with number ${num} not found`);
    return gen;
};

export const getGenFromName = (name: string): Generation => {
    const gen = Object.values(Generations).find((gen) => gen.name === name.toLowerCase());
    if (!gen) throw new Error(`Generation with name "${name}" not found`);
    return gen;
};
