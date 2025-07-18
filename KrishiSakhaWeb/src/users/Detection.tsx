import { DetectRes } from "../utils/DetectClasses";


const DetectionOutput: React.FC<{ detectionResult: DetectRes, language: string }> = ({ detectionResult, language }) => {
  console.log(detectionResult);

  if (!detectionResult.detected) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg">
        <h3 className="text-2xl font-semibold text-green-800 mb-4">No Disease Detected</h3>
        <p className="text-xl text-green-600">The Image may be Invalid</p>
      </div>
    );
  }

  const disease = detectionResult.disease;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg space-y-6">
      {/* Disease Status */}
      <h3 className="text-2xl font-semibold text-green-800">{language === "en" ? `Disease Detected: ${disease.class_name}` : `ಫಲಿತಾಂಶ: ${disease.kannada_name}`}</h3>
      <p className="text-green-600">Confidence: {detectionResult.confidence}%</p>

      {/* Disease Description */}
      {!disease.class_name.toLowerCase().includes("healthy") &&
        <>
          <div className="space-y-2">
            <h4 className="text-xl font-semibold text-green-700">{language === "en" ? "Description:" : "ವಿವರಣೆ:"}</h4>
            <p>{language === "en" ? disease.description : disease.kannada_description}</p>
            <h4 className="text-xl font-semibold text-green-700">{language === "en" ? "Cause:" : "ಕಾರಣ:"}</h4>
            <p>{language === "en" ? disease.cause : disease.kannada_cause}</p>
          </div>

          {/* Recommended Actions */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-green-700">{language === "en" ? "Recommended Actions:" : "ಗುರುತು ಮಾಡಲಾದ ಕ್ರಮಗಳು:"}</h4>
            <ul className="list-disc pl-5">
              {disease.recommended_actions.map((action, index) => (
                <li key={index} className="text-green-600">
                  <strong>{language === "en" ? action.action : action.kannada_action}</strong>
                </li>
              ))}
            </ul>
          </div>
        </>
      }

    </div>
  );
};

export default DetectionOutput