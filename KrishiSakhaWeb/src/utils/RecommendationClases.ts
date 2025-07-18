export class CropRecommend {
    name!: string; // Crop name
    kannadaName?: string; // Kannada name
    scientificName?: string; // Scientific name
    climateRequirements?: string; // Climate requirements
    soilType?: string; // Soil type
    wateringNeeds?: string; // Watering needs
    growingSeason?: string; // Growing season
    tips!: Tips; // Cultivation tips
  
  }
  
  export class Tips {
    kannada!: string[]; // Tips in Kannada
    english!: string[]; // Tips in English
  
  }
  
  export class PredictionCropRes {
    isAvailable!: boolean; // Indicates if a crop is available
    recommend?: CropRecommend; // Recommended crop details
  

  }
  