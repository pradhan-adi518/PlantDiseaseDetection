import React from "react";
import { CropRecommend } from "../utils/RecommendationClases";

const CropRec: React.FC<{ crop: CropRecommend; language: string }> = ({
  crop,
  language,
}) => {
  if (!crop) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg">
        <p className="text-xl text-green-600">Something went wrong</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg space-y-6">
      {/* Crop Name and Scientific Name */}
      <h3 className="text-2xl font-semibold text-green-800">
        {crop.name} ({crop.scientificName})
      </h3>

      {/* Climate and Soil Requirements */}
      <div>
        <h4 className="text-xl font-semibold text-green-700">
          {language === "en" ? "Climate Requirements:" : "ಹವಾಮಾನ ಅವಶ್ಯಕತೆಗಳು:"}
        </h4>
        <p className="text-green-600">{crop.climateRequirements}</p>
      </div>

      <div>
        <h4 className="text-xl font-semibold text-green-700">
          {language === "en" ? "Soil Type:" : "ಮಣ್ಣಿನ ಪ್ರಕಾರ:"}
        </h4>
        <p className="text-green-600">{crop.soilType}</p>
      </div>

      {/* Watering and Growing Season */}
      <div>
        <h4 className="text-xl font-semibold text-green-700">
          {language === "en" ? "Watering Needs:" : "ನೀರಿನ ಅವಶ್ಯಕತೆಗಳು:"}
        </h4>
        <p className="text-green-600">{crop.wateringNeeds}</p>
      </div>

      <div>
        <h4 className="text-xl font-semibold text-green-700">
          {language === "en" ? "Growing Season:" : "ಹರಿದು ಹೋಗುವ ಕಾಲ:"}
        </h4>
        <p className="text-green-600">{crop.growingSeason}</p>
      </div>

      {/* Tips */}
      <div>
        <h4 className="text-xl font-semibold text-green-700">
          {language === "en" ? "Tips:" : "ಟಿಪ್ಸ್:"}
        </h4>
        <ul className="list-disc pl-5">
          {(language === "en" ? crop.tips.english : crop.tips.kannada).map(
            (tip, index) => (
              <li key={index} className="text-green-600">
                {tip}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default CropRec;
