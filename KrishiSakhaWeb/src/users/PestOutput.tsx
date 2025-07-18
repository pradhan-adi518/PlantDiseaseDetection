import React from "react";

const PestOutput: React.FC<{ detectionResult: { insect: string, pest: string[], confidence: number } }> = ({ detectionResult }) => {
  console.log(detectionResult);

  if (!detectionResult.insect) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg">
        <h3 className="text-2xl font-semibold text-green-800 mb-4">No Insect Detected</h3>
        <p className="text-xl text-green-600">The Image may be Invalid</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg space-y-6">
      {/* Insect Detected */}
      <h3 className="text-2xl font-semibold text-green-800">Detected Insect: {detectionResult.insect}</h3>
      <p className="text-green-600">Confidence: {detectionResult.confidence}%</p>

      {/* Recommended Pesticide Treatment */}
      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-green-700">Recommended Pesticide Treatment:</h4>
        <ul className="list-disc pl-5">
          {detectionResult.pest.map((treatment, index) => (
            <li key={index} className="text-green-600">{treatment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PestOutput;
