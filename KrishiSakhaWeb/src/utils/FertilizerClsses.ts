export class FertilizerRecommendModel {
    name: string;
    scientificName: string;
    NPK_Composition: string;
    recommendedCrops: string[];
    applicationRate: string;
    bestTimeToApply: string;
    benefits: string[];
    potentialRisks: string[];
    storageAndHandling: string;
    costEstimate: string;
    organicVsSynthetic: string;
    tips: Tips;

    constructor(
        name: string,
        scientificName: string,
        NPK_Composition: string,
        recommendedCrops: string[],
        applicationRate: string,
        bestTimeToApply: string,
        benefits: string[],
        potentialRisks: string[],
        storageAndHandling: string,
        costEstimate: string,
        organicVsSynthetic: string,
        tips: Tips
    ) {
        this.name = name;
        this.scientificName = scientificName;
        this.NPK_Composition = NPK_Composition;
        this.recommendedCrops = recommendedCrops;
        this.applicationRate = applicationRate;
        this.bestTimeToApply = bestTimeToApply;
        this.benefits = benefits;
        this.potentialRisks = potentialRisks;
        this.storageAndHandling = storageAndHandling;
        this.costEstimate = costEstimate;
        this.organicVsSynthetic = organicVsSynthetic;
        this.tips = tips;
    }
}

export class Tips {
    kannada: string[];
    english: string[];

    constructor(kannada: string[], english: string[]) {
        this.kannada = kannada;
        this.english = english;
    }
}
