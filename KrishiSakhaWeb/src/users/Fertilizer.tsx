import { DetectRes } from "../utils/DetectClasses";
import { FertilizerRecommendModel } from "../utils/FertilizerClsses";


const fertilizerRec: React.FC<{ fertilizer: FertilizerRecommendModel, language: string }> = ({ fertilizer, language }) => {
    console.log(fertilizer);
    
    if (!fertilizer) {
      return (
        <div className="text-center p-6 bg-green-50 rounded-lg">
          <p className="text-xl text-green-600">Something went wrong</p>
        </div>
      );
    }

  
    return (
        <div className="p-6 bg-white shadow-lg rounded-lg space-y-6">
        {/* Fertilizer Name */}
        <h3 className="text-2xl font-semibold text-green-800">
          {fertilizer.name} ({fertilizer.scientificName})
        </h3>
  
        {/* NPK Composition */}
        <div>
          <h4 className="text-xl font-semibold text-green-700">{language === "en" ? "NPK Composition:" : "ಎನ್‌ಪಿಕೆ ಸಂಯೋಜನೆ:"}</h4>
          <p className="text-green-600">{fertilizer.NPK_Composition}</p>
        </div>
  
        {/* Recommended Crops */}
        <div>
          <h4 className="text-xl font-semibold text-green-700">{language === "en" ? "Recommended Crops:" : "ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆಗಳು:"}</h4>
          <ul className="list-disc pl-5">
            {fertilizer.recommendedCrops.map((crop, index) => (
              <li key={index} className="text-green-600">{crop}</li>
            ))}
          </ul>
        </div>
  
        {/* Application Details */}
        <div>
          <h4 className="text-xl font-semibold text-green-700">{language === "en" ? "Application Rate:" : "ಅನ್ವಯದ ಪ್ರಮಾಣ:"}</h4>
          <p className="text-green-600">{fertilizer.applicationRate}</p>
          <h4 className="text-xl font-semibold text-green-700">{language === "en" ? "Best Time to Apply:" : "ಅನ್ವಯಿಸಲು ಉತ್ತಮ ಸಮಯ:"}</h4>
          <p className="text-green-600">{fertilizer.bestTimeToApply}</p>
        </div>
  
        {/* Benefits */}
        <div>
          <h4 className="text-xl font-semibold text-green-700">{language === "en" ? "Benefits:" : "ಲಾಭಗಳು:"}</h4>
          <ul className="list-disc pl-5">
            {fertilizer.benefits.map((benefit, index) => (
              <li key={index} className="text-green-600">{benefit}</li>
            ))}
          </ul>
        </div>
  
        {/* Potential Risks */}
        <div>
          <h4 className="text-xl font-semibold text-green-700">{language === "en" ? "Potential Risks:" : "ಸಂಭಾವ್ಯ ಅಪಾಯಗಳು:"}</h4>
          <ul className="list-disc pl-5">
            {fertilizer.potentialRisks.map((risk, index) => (
              <li key={index} className="text-red-600">{risk}</li>
            ))}
          </ul>
        </div>
  
        {/* Tips */}
        <div>
          <h4 className="text-xl font-semibold text-green-700">{language === "en" ? "Tips:" : "ಟಿಪ್ಸ್:"}</h4>
          <ul className="list-disc pl-5">
            {(language === "en" ? fertilizer.tips.english : fertilizer.tips.kannada).map((tip, index) => (
              <li key={index} className="text-green-600">{tip}</li>
            ))}
          </ul>
        </div>
  
        {/* Storage and Cost */}
        <div>
          <h4 className="text-xl font-semibold text-green-700">{language === "en" ? "Storage and Handling:" : "ಸಂಗ್ರಹಣೆ ಮತ್ತು ನಿರ್ವಹಣೆ:"}</h4>
          <p className="text-green-600">{fertilizer.storageAndHandling}</p>
          <h4 className="text-xl font-semibold text-green-700">{language === "en" ? "Cost Estimate:" : "ವೆಚ್ಚ ಅಂದಾಜು:"}</h4>
          <p className="text-green-600">{fertilizer.costEstimate}</p>
        </div>
  
        {/* Organic vs Synthetic */}
        <div>
          <h4 className="text-xl font-semibold text-green-700">{language === "en" ? "Organic vs Synthetic:" : "ಸಾವಯವ ವಿರುದ್ಧ ಸಂಶ್ಲೇಷಿತ:"}</h4>
          <p className="text-green-600">{fertilizer.organicVsSynthetic}</p>
        </div>
      </div>
    );
};

export default fertilizerRec;