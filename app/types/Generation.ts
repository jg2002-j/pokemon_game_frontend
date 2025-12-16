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
