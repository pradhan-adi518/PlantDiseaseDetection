import React, { useEffect, useState } from "react";
import { apiSerice, username } from "../utils/Axios"
import { DetectRes, PestRes } from "../utils/DetectClasses";
import DetectionOutput from "./Detection";
import { Navigate, useNavigate } from "react-router-dom";
import { log } from "console";
import { plainToInstance } from "class-transformer";
import { FertilizerRecommendModel } from "../utils/FertilizerClsses";
import FertilizerRec from "./Fertilizer"
import { CropRecommend } from "../utils/RecommendationClases";
import CropRec from "./Recommendation";
import PestOutput from "./PestOutput";

interface NavItem {
    title: string;
    component: React.ReactNode;
    icon: string;
}



// Components for each section
const HomeSection = () => (
    <div className="container mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-green-800 mb-4">Welcome to the Home Section</h2>
            <p className="text-xl text-green-600">
                Explore the features that will help enhance your farming practices, improve crop health, and offer expert insights.
            </p>
        </div>

        {/* Section 1: Crop Disease Detection */}
        <div className="bg-green-50 p-6 rounded-lg shadow-lg mb-8 hover:bg-green-100 transition ease-in-out duration-300">
            <div className="flex items-center space-x-4">
                <img src="https://via.placeholder.com/60" alt="Disease Detection Icon" className="w-16 h-16 object-cover" />
                <div>
                    <h3 className="text-2xl font-semibold text-green-800 mb-2">Crop Disease Detection</h3>
                    <p className="text-green-700">
                        Use deep learning algorithms to detect crop diseases through images, enabling timely intervention and protection.
                    </p>
                </div>
            </div>
        </div>

        {/* Section 2: Insights */}
        <div className="bg-green-50 p-6 rounded-lg shadow-lg mb-8 hover:bg-green-100 transition ease-in-out duration-300">
            <div className="flex items-center space-x-4">
                <img src="https://via.placeholder.com/60" alt="Insights Icon" className="w-16 h-16 object-cover" />
                <div>
                    <h3 className="text-2xl font-semibold text-green-800 mb-2">Farm Insights</h3>
                    <p className="text-green-700">
                        Receive real-time insights based on weather patterns, soil health, and crop data to improve farm productivity.
                    </p>
                </div>
            </div>
        </div>

        {/* Section 3: Crop Recommendations */}
        <div className="bg-green-50 p-6 rounded-lg shadow-lg mb-8 hover:bg-green-100 transition ease-in-out duration-300">
            <div className="flex items-center space-x-4">
                <img src="https://via.placeholder.com/60" alt="Crop Recommendations Icon" className="w-16 h-16 object-cover" />
                <div>
                    <h3 className="text-2xl font-semibold text-green-800 mb-2">Crop Recommendations</h3>
                    <p className="text-green-700">
                        Get personalized crop suggestions based on your climate, soil type, and location to optimize yields.
                    </p>
                </div>
            </div>
        </div>

        {/* Section 4: Fertilizer Recommendations */}
        <div className="bg-green-50 p-6 rounded-lg shadow-lg mb-8 hover:bg-green-100 transition ease-in-out duration-300">
            <div className="flex items-center space-x-4">
                <img src="https://via.placeholder.com/60" alt="Fertilizer Recommendations Icon" className="w-16 h-16 object-cover" />
                <div>
                    <h3 className="text-2xl font-semibold text-green-800 mb-2">Fertilizer Recommendations</h3>
                    <p className="text-green-700">
                        Based on your soil's NPK values, get recommendations for the best fertilizers to optimize crop growth.
                    </p>
                </div>
            </div>
        </div>

        {/* Section 5: Educational Resources */}
        <div className="bg-green-50 p-6 rounded-lg shadow-lg mb-8 hover:bg-green-100 transition ease-in-out duration-300">
            <div className="flex items-center space-x-4">
                <img src="https://via.placeholder.com/60" alt="Educational Resources Icon" className="w-16 h-16 object-cover" />
                <div>
                    <h3 className="text-2xl font-semibold text-green-800 mb-2">Educational Resources</h3>
                    <p className="text-green-700">
                        Access videos, articles, and tutorials on best agricultural practices, pest management, and sustainable farming.
                    </p>
                </div>
            </div>
        </div>
    </div>
);

const InsightsSection = () => {
    const [language, setLanguage] = useState<"en" | "kn">("en")

    const articles = {
        en: {
            soilTips: [
                "Use organic matter such as compost and manure to enrich the soil.",
                "Practice crop rotation to maintain nutrient balance in the soil.",
                "Use cover crops like clover to fix nitrogen and improve soil structure.",
                "Apply organic fertilizers like bone meal and fish emulsion.",
                "Avoid overworking the soil to maintain its natural structure.",
                "Regularly test soil to understand its nutrient needs.",
                "Use mulching to retain moisture and prevent soil erosion.",
                "Minimize the use of chemical pesticides and fertilizers.",
                "Incorporate green manures such as legumes to enhance soil fertility.",
                "Implement no-till or reduced tillage methods to protect soil structure."
            ],
            sustainableTips: [
                "Use water-efficient irrigation methods like drip irrigation.",
                "Avoid overuse of chemical fertilizers and pesticides.",
                "Promote biodiversity by planting a variety of crops and maintaining natural habitats.",
                "Focus on soil conservation to prevent erosion and degradation.",
                "Utilize organic farming methods to reduce reliance on synthetic chemicals.",
                "Practice integrated pest management (IPM) to control pests sustainably.",
                "Use renewable energy sources like solar power for farm operations.",
                "Reduce food waste by optimizing crop production and distribution.",
                "Implement agroforestry practices to create diverse ecosystems.",
                "Support fair trade practices and local farming communities."
            ],
            pestControlTips: [
                "Identify pests early using regular crop monitoring.",
                "Use natural predators like ladybugs to control pest populations.",
                "Apply organic pest control methods such as neem oil.",
                "Practice crop rotation to break pest cycles.",
                "Introduce resistant crop varieties to minimize pest damage.",
                "Use pheromone traps to monitor and control pest outbreaks.",
                "Use physical barriers such as netting to prevent pest access.",
                "Implement trap cropping to divert pests away from main crops.",
                "Reduce pesticide use and focus on precision application techniques.",
                "Educate farmers about proper pest management strategies and biological control methods."
            ],
            irrigationTips: [
                "Use drip irrigation to deliver water directly to plant roots.",
                "Implement rainwater harvesting systems to reduce reliance on mains water.",
                "Use soaker hoses to water plants evenly and deeply.",
                "Consider sprinkler irrigation for large areas with even water distribution.",
                "Invest in moisture sensors to automate irrigation based on soil moisture levels.",
                "Water early in the morning or late in the evening to minimize evaporation.",
                "Group plants with similar water requirements together for efficient irrigation.",
                "Mulch around plants to retain moisture and reduce water usage.",
                "Avoid over-watering to prevent root rot and water wastage.",
                "Monitor weather forecasts and adjust irrigation schedules accordingly."
            ],
            climateChangeTips: [
                "Understand how shifting weather patterns impact crop growth cycles.",
                "Adapt to climate variability by diversifying crop production.",
                "Implement water conservation practices to cope with changing rainfall patterns.",
                "Invest in drought-resistant crop varieties to withstand extreme weather events.",
                "Use precision agriculture technologies to optimize resource use.",
                "Consider agroforestry to increase climate resilience and reduce emissions.",
                "Promote sustainable land management practices to preserve soil health.",
                "Educate farmers about the impacts of climate change on agriculture.",
                "Advocate for policies that support climate adaptation and sustainable farming.",
                "Monitor carbon footprints and implement measures to reduce them on farms."
            ]
        },
        kn: {
            soilTips: [
                "ಮಣ್ಣನ್ನು ಶಕ್ತಿಗೊಳಿಸಲು ಕಂಬಳ ಮತ್ತು manure ಹೋಳಿಕೆಗಳು ಹಾಗು ಅವುಗಳನ್ನು ಬಳಸುವಂತೆ ಮಾಡಿ.",
                "ಮಣ್ಣಿನ ಪೋಷಕಾಂಶ ಸಮತೋಲನವನ್ನು ಕಾಪಾಡಲು ಬೆಳೆ ಬದಲಾವಣೆ ಅಭ್ಯಾಸವನ್ನು ಮಾಡಿ.",
                "ನೈಟ್ರೋಜನ್ ಸುಧಾರಿಸಲು ಹೊತ್ತಿಟ್ಟ ಹುಲ್ಲುಗಳನ್ನು ಬಳಸಿ.",
                "ಆರ್ಗ್ಯಾನಿಕ್ ಪೋಷಕಾಂಶಗಳನ್ನು, ಹಲ್ಲುಹಣ್ಣು ಮತ್ತು ಮೀನು ಹೊಟ್ಟೆಗಳನ್ನು ಹಾಕಿ.",
                "ಮಣ್ಣನ್ನು ಹೆಚ್ಚಾಗಿ ಕೆಲಸ ಮಾಡದಂತೆ ನಿಗದಿಸು.",
                "ಮಣ್ಣಿನ ಪೋಷಕಾಂಶಗಳನ್ನು ತಿಳಿಯಲು ನಿಯಮಿತವಾಗಿ ಪರೀಕ್ಷೆ ಮಾಡಿ.",
                "ಆಗಾಗಾಗ ಹೋಳುಹಚ್ಚಿದಾಗ, ಮಣ್ಣಿನ ತಲುಪಲು ನೀರು ಉಳಿಯುವಂತೆ ಮಾಡಿ.",
                "ರಾಸಾಯನಿಕ ಪೋಷಕಾಂಶಗಳನ್ನು ಕಡಿಮೆ ಮಾಡಿ, ಪ್ರಯೋಗ ಹಾಗೂ ಜೈವಿಕ ರಾಸಾಯನಿಕವನ್ನು ಬಳಸಲು ಪ್ರಯತ್ನಿಸಿ.",
                "ಹರಿತ ಸುಧಾರಣೆಯನ್ನು ಹೆಚ್ಚು ಆಮದು ಮಾಡಿದರೆ, ಉತ್ಪನ್ನಗಳನ್ನು ಬಿಡು ಮಾಡಬಹುದು.",
                "ಮಣ್ಣಿನ ಬದಲಿ ಮಾಡಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ."
            ],
            sustainableTips: [
                "ಹೇಮವನ್ನು ಗಮನದಿಂದ ನಿದಾನಗೊಳ್ಳಲು ಉತ್ಪತ್ತಿಯನ್ನು ಮಾಡಲು ಅದನ್ನು ಹೊಸ ಸಮಯದಲ್ಲಿ ಬಳಸಿ.",
                "ಮೀನುಗಳ ಹೋಲುಗಳಿಗೆ ದರವನ್ನು ಸುಧಾರಿಸಲು ಪರಿಗಣಿಸಿ.",
                "ಪೂರ್ಣ ಅಭ್ಯಾಸದ ಕಡೆ ಸೇರಿದಷ್ಟೊಳು, ಷರತ್ ನಡೆಸಲು ನಮ್ಮ ಪುನಶ್ಚೇ ಸಾದ್ಯಾಯು.",
                "ನಮಗೆ ಹೊಂದಿಕೆ ನೀಡಿದ ವಿಮರ್ಶಿಯು ವಾಯ್ಮುಡ್ಡ ಅನುಕೂಲತೆಗೆ ಮನಮಾಡುತ್ತದೆ."
            ],
            pestControlTips: [
                "ಹುಳುಗಳನ್ನು ಮೊದಲೇ ಗುರುತಿಸಿ, ನಿಯಮಿತವಾಗಿ ಬೆಳೆಗಳನ್ನು ಗಮನಿಸಿ.",
                "ಹುಳುಗಳನ್ನು ನಿಯಂತ್ರಿಸಲು ladybugs వంటి ಪ್ರಕೃತಿ ಶತ್ರುಗಳನ್ನು ಬಳಸಿ.",
                "ನೀಮ್ ಎಣ್ಣೆಂತಹ ಜೈವಿಕ ಪests ನಿಯಂತ್ರಣ ವಿಧಾನಗಳನ್ನು ಅನ್ವಯಿಸಿ.",
                "ಹುಳು ಚಕ್ರಗಳನ್ನು ಮುರಿಯಲು ಬೆಳೆ ಬದಲಾವಣೆಯನ್ನು ಅನುಸರಿಸಿ.",
                "ಹುಳು ಹಾನಿಯನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಪ್ರತಿರೋಧಕ ಬೆಳೆ ವೈವಿಧ್ಯಗಳನ್ನು ಪರಿಚಯಿಸಿ.",
                "ಹುಳುಗಳ ಉತ್ಕ್ರಾಂತಿಯನ್ನು ಗಮನಿಸಲು ಫೆರೋಮೋನ್ ಟ್ರ್ಯಾಪ್‌ಗಳನ್ನು ಬಳಸಿ.",
                "ಹುಳುಗಳು ಪ್ರವೇಶಿಸದಂತೆ ಶಾರದೆಯಲ್ಲಿ ದರವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಶಕ್ತಿಯಾದ ಪ್ರಾಥಮಿಕಗಳನ್ನು ಬಳಸಿ."
            ],
            irrigationTips: [
                "ಹಣ್ಣುಗಳಿಗೆ ನೀರನ್ನು ನೇರವಾಗಿ ನೀಡಲು ಡ್ರಿಪ್ ನೀರು ಹಾಕುವ ಸಾಧನಗಳನ್ನು ಬಳಸಿ.",
                "ಮುಗಿಯುವ ನೀರು ಬಳಕೆ ಕಡಿಮೆ ಮಾಡಲು ಮಳೆಯ ನೀರಿನ ಸಂಗ್ರಹಣೆ ವ್ಯವಸ್ಥೆಗಳನ್ನು ಅನುಸರಿಸಿ.",
                "ಮನೆಮದ್ದು ತುಂಬಾ ದಯವಿಟ್ಟು ನಿಯಂತ್ರಿತ ನೀರಾವರಿ ಮಾಡಿ.",
                "ಹೂವುಗಳಿಗೆ ಹಾವರೊಂದು ಮೀನು ಎಂದು ತುಳಿದು ಮಾಡಲಾಗುತ್ತದೆ."
            ],
            climateChangeTips: [
                "ಹವಾಮಾನ ವೈವಿಧ್ಯ ಮತ್ತು ಬಾಳಿಕೆ ಬಗ್ಗೆ ಹೆಚ್ಚು ಗಮನ ನೀಡಲು ಪ್ರಯೋಜನವನ್ನು ವಿವರಿಸಿ.",
                "ನಾವು ಬದಲಾವಣೆ ಮಾಡಬಹುದು."
            ]
        }
    };
    return (<div className="container mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-green-800 mb-4">Insights: Learn and Grow</h2>
            <p className="text-xl text-green-600">
                Stay updated with the latest trends in farming, best practices, and expert advice through videos and articles.
            </p>
        </div>

        {/* YouTube Videos Section */}
        <div className="mb-8">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">Educational YouTube Videos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Video 1 */}
                <div className="aspect-w-16 aspect-h-9">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/M2bPTdVncD4?si=1UwCQiBZCBFGUFDJ" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
                {/* Video 2 */}
                <div className="aspect-w-16 aspect-h-9">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/Pz0_wXtcyQE?si=K0-AqdFB0IHBPqRH" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
                {/* Video 3 */}
                <div className="aspect-w-16 aspect-h-9">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/JeU_EYFH1Jk?si=AMZsIA6_1C_7R2Kl" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
                {/* Video 4 */}
                <div className="aspect-w-16 aspect-h-9">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/v1DT4yvxpMw?si=XHmmD-rDnRpyHj8U" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
                {/* Video 5 */}
                <div className="aspect-w-16 aspect-h-9">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/wBcnUUkdavE?si=IIgOJZc0yJB0JHYY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
                {/* Video 6 */}
                <div className="aspect-w-16 aspect-h-9">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/K9vy7Cb-2ZA?si=twbo8avMAjHP7KY2" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
            </div>
        </div>

        {/* Articles Section */}
        <div>
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-green-800 mb-4">Farming Articles</h3>
                <div className="flex  items-center ">
                    <button
                        onClick={() => setLanguage("en")}
                        className={`px-4 py-2 rounded-md ${language === "en" ? "bg-green-600 text-white" : "bg-white text-green-600"}`}
                    >
                        English
                    </button>
                    <button
                        onClick={() => setLanguage("kn")}
                        className={`px-4 py-2 rounded-md ${language === "kn" ? "bg-green-600 text-white" : "bg-white text-green-600"}`}
                    >
                        ಕನ್ನಡ
                    </button>

                </div>
            </div>
            <div className="space-y-6">
                {/* Article 1 */}
                <div className="bg-green-50 p-6 rounded-lg shadow-lg hover:bg-green-100 transition ease-in-out duration-300">
                    <h4 className="text-xl font-semibold text-green-800 mb-2">How to Improve Soil Fertility</h4>
                    <ul className="text-green-700 space-y-2">
                        {articles[language].soilTips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                </div>

                {/* Article 2 */}
                <div className="bg-green-50 p-6 rounded-lg shadow-lg hover:bg-green-100 transition ease-in-out duration-300">
                    <h4 className="text-xl font-semibold text-green-800 mb-2">Sustainable Farming Practices</h4>
                    <ul className="text-green-700 space-y-2">
                        {articles[language].sustainableTips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                </div>

                {/* Article 3 */}
                <div className="bg-green-50 p-6 rounded-lg shadow-lg hover:bg-green-100 transition ease-in-out duration-300">
                    <h4 className="text-xl font-semibold text-green-800 mb-2">Dealing with Pest Infestation</h4>
                    <ul className="text-green-700 space-y-2">
                        {articles[language].pestControlTips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                </div>

                {/* Article 4 */}
                <div className="bg-green-50 p-6 rounded-lg shadow-lg hover:bg-green-100 transition ease-in-out duration-300">
                    <h4 className="text-xl font-semibold text-green-800 mb-2">Best Irrigation Techniques</h4>
                    <ul className="text-green-700 space-y-2">
                        {articles[language].irrigationTips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                </div>

                {/* Article 5 */}
                <div className="bg-green-50 p-6 rounded-lg shadow-lg hover:bg-green-100 transition ease-in-out duration-300">
                    <h4 className="text-xl font-semibold text-green-800 mb-2">Climate Change and Farming</h4>
                    <ul className="text-green-700 space-y-2">
                        {articles[language].climateChangeTips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
    );

}



const DetectSection = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [result, setResult] = useState<DetectRes | null>(null)
    const [language, setLanguage] = useState("en")
    const [cropType, setCropType] = useState<string>("");
    const [types, setTypes] = useState<string[]>([])

    useEffect(() => {
        getTypes()
    }, [])


    const getTypes = async () => {
        try {
            let res = await apiSerice.get('/getTypes')
            console.log(res);
            setTypes(res.data.types)
        } catch { }
    }


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
            setPreview(URL.createObjectURL(file)); // Set preview of the file
        }
    };

    // Handle file drag-and-drop
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0];
        console.log(file, event)
        if (file) {
            setFile(file);
            setPreview(URL.createObjectURL(file)); // Set preview of the file
        }
    };

    const getResults = async () => {
        let form = new FormData()
        if (file)
            form.append('image', file)
        const jsonBlob = new Blob(
            [JSON.stringify({ imageName: file?.name, imageSize: file?.size, cropType: cropType === "" ? null : cropType })],
            { type: "application/json" }
        );
        form.append("data", jsonBlob);
        try {
            let res = await apiSerice.post("/detect", form, {
                headers: { 'Content-Type': "multipart/form-data" }
            })
            setResult(plainToInstance(DetectRes, res.data, {}))
        } catch { }
    }

    // Prevent default behavior for drag events (to allow dropping)
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleCropTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCropType(event.target.value);
    };

    return (
        <div className="container mx-auto p-6">
            {/* Header */}
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-green-800 mb-4">Crop Disease Detection</h2>
                <p className="text-xl text-green-600">
                    Upload a crop image to detect potential diseases.
                </p>
            </div>
            <div className="flex  items-center justify-center space-y-6 space-x-4">
                <button
                    onClick={() => setLanguage("en")}
                    className={`px-4 py-2 rounded-md ${language === "en" ? "bg-green-600 text-white" : "bg-white text-green-600"}`}
                >
                    English
                </button>
                <button
                    onClick={() => setLanguage("kn")}
                    className={`px-4 py-2 rounded-md ${language === "kn" ? "bg-green-600 text-white" : "bg-white text-green-600"}`}
                >
                    ಕನ್ನಡ
                </button>

            </div>

            {/* File Upload and Preview Section */}
            <div className="flex flex-col items-center justify-center space-y-6">
                <div
                    className="border-2 border-dashed border-green-500 p-10 w-full max-w-lg text-center rounded-lg cursor-pointer hover:border-green-700 transition"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <h3 className="text-xl font-semibold text-green-800">Drag and Drop or Select an Image</h3>
                    <p className="text-green-600 mb-4">Click or drag your crop image here</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="fileInput"
                    />
                    <label htmlFor="fileInput" className="bg-green-600 text-white p-2 rounded-md cursor-pointer">
                        Choose File
                    </label>
                </div>
                {/* Crop Type Dropdown */}
                <div className="flex justify-center mb-6">
                    <select
                        value={cropType}
                        onChange={handleCropTypeChange}
                        className="p-3 border-2 border-green-500 rounded-md"
                    >
                        <option value="">Select Crop Type</option>
                        {types.map((val) => {
                            return <option value={val}>{val}</option>
                        })}
                    </select>
                </div>

                {/* Image Preview */}
                {preview && (
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-semibold text-green-800 mb-4">Image Preview</h3>
                        <img src={preview} alt="Crop Preview" className="w-52 h-auto rounded-lg" />
                        <p className="text-green-600 mt-4">This is the uploaded crop image.</p>
                    </div>
                )}

                {/* Button to Submit for Detection */}
                {file && (
                    <div className="mt-6">
                        <button
                            className="bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition"
                            onClick={getResults}
                        >
                            Detect Disease
                        </button>
                    </div>
                )}
                {result == null ? <p></p> : <DetectionOutput detectionResult={result} language={language} />}
            </div>
        </div>
    );
}

const PestSection = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [result, setResult] = useState<PestRes | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const getResults = async () => {
        let form = new FormData();
        if (file) form.append('image', file);
        try {
            let res = await apiSerice.post("/predict/pest", form, {
                headers: { 'Content-Type': "multipart/form-data" }
            });
            setResult(plainToInstance(PestRes, res.data, {}));
        } catch {}
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <div className="container mx-auto p-6">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-green-800 mb-4">Crop Disease Detection</h2>
                <p className="text-xl text-green-600">Upload a crop image to detect potential diseases.</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-6">
                <div
                    className="border-2 border-dashed border-green-500 p-10 w-full max-w-lg text-center rounded-lg cursor-pointer hover:border-green-700 transition"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <h3 className="text-xl font-semibold text-green-800">Drag and Drop or Select an Image</h3>
                    <p className="text-green-600 mb-4">Click or drag your crop image here</p>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="fileInput" />
                    <label htmlFor="fileInput" className="bg-green-600 text-white p-2 rounded-md cursor-pointer">
                        Choose File
                    </label>
                </div>

                {preview && (
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-semibold text-green-800 mb-4">Image Preview</h3>
                        <img src={preview} alt="Crop Preview" className="w-52 h-auto rounded-lg" />
                        <p className="text-green-600 mt-4">This is the uploaded crop image.</p>
                    </div>
                )}

                {file && (
                    <div className="mt-6">
                        <button
                            className="bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition"
                            onClick={getResults}
                        >
                            Detect Disease
                        </button>
                    </div>
                )}
                {result && <PestOutput detectionResult={result} />}
            </div>
        </div>
    );
};



const RecommendSection = () => {
    const [formData, setFormData] = useState({
        n: "",
        p: "",
        k: "",
        temperature: "",
        humidity: "",
        ph: "",
        rainfall: "",
    });

    const [result, setResult] = useState<CropRecommend | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(!showModal);

    const handleAuto = async () => {
        setLoading(true);
        try {
            // Replace with actual API call
            const response = await apiSerice.post("predict/crop", {
                params: false,
                data: formData
            });
            console.log(response);
            let data = plainToInstance(CropRecommend, response.data.recommend)
            setResult(data);
        } catch (error) {
            console.error("Error fetching recommendation:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Replace with actual API call
            const response = await apiSerice.post("predict/crop", {
                params: true,
                data: formData
            });
            console.log(response);
            let data = plainToInstance(CropRecommend, response.data.recommend)
            setResult(data);
        } catch (error) {
            console.error("Error fetching recommendation:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 relative">
            {/* Section Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-green-800">
                    Crop Recommendation
                </h3>
                <button
                    onClick={toggleModal}
                    className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-200 transition"
                    style={{ width: '50px', height: '50px' }}
                >
                    {/* Info Icon as Image */}
                    <img
                        src="/info-circle-svgrepo-com.svg" // Replace with the path to your SVG image file
                        alt="Info Icon"
                        className="w-6 h-6 text-blue-600" // Adjust size if needed
                    />
                </button>
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
                        <h3 className="text-xl font-bold text-center">Information</h3>
                        <ul className="list-disc pl-6 pt-3 text-gray-800">
                            <li><strong>Nitrogen (N):</strong> Essential for leafy growth. Input range: <strong>0–300</strong>.</li>
                            <li><strong>Phosphorus (P):</strong> Supports root development. Input range: <strong>0–150</strong>.</li>
                            <li><strong>Potassium (K):</strong> Enhances overall plant health. Input range: <strong>0–200</strong>.</li>
                            <li><strong>Rainfall:</strong> Crucial for soil moisture. Input range: <strong>200–1000 mm/year</strong>.</li>
                            <li><strong>Humidity:</strong> Impacts plant transpiration. Input range: <strong>30%–80%</strong>.</li>
                            <li><strong>Temperature:</strong> Affects growth and yield. Input range: <strong>10°C–35°C</strong>.</li>
                        </ul>

                        <button
                            onClick={toggleModal}
                            className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {/* Input Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                    { label: "Nitrogen (N)", name: "n", placeholder: "Enter Nitrogen value" },
                    { label: "Phosphorus (P)", name: "p", placeholder: "Enter Phosphorus value" },
                    { label: "Potassium (K)", name: "k", placeholder: "Enter Potassium value" },
                    { label: "Temperature (°C)", name: "temperature", placeholder: "Enter Temperature in Celsius" },
                    { label: "Humidity (%)", name: "humidity", placeholder: "Enter Humidity percentage" },
                    { label: "Soil pH", name: "ph", placeholder: "Enter Soil pH value" },
                    { label: "Rainfall (mm)", name: "rainfall", placeholder: "Enter Rainfall in mm" },
                ].map((field, index) => (
                    <div key={index}>
                        <label
                            htmlFor={field.name}
                            className="block text-green-700 font-semibold"
                        >
                            {field.label}
                        </label>
                        <input
                            type="number"
                            id={field.name}
                            name={field.name}
                            value={formData[field.name as keyof typeof formData]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            className="mt-1 p-2 w-full border border-green-500 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none"
                        />
                    </div>
                ))}
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex items-center justify-around">
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Get Recommendation"}
                </button>
                <button
                    className="bg-green-600 text-white px-4 py-2 mr-4 rounded-md hover:bg-green-700 transition"
                    onClick={handleAuto}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Auto Recommend"}
                </button>
            </div>

            {/* Result Section */}
            {result && (
                <CropRec crop={result} language="en"></CropRec>
            )}
        </div>
    );
}



const FertilizerSection = () => {
    const [nValue, setNValue] = useState<number | string>("");
    const [pValue, setPValue] = useState<number | string>("");
    const [kValue, setKValue] = useState<number | string>("");
    const [fertilizerRecommendation, setFertilizerRecommendation] = useState<FertilizerRecommendModel | null>(null);

    // Handle form submission
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            let res = await apiSerice.post("predict/fertilizer", {
                n: Number(nValue),
                p: Number(pValue),
                k: Number(kValue)
            })
            console.log(res);
            setFertilizerRecommendation(res.data.recommend)
        } catch { }
    };

    // Simple logic to recommend fertilizers based on N, P, K values (can be replaced with an API call)
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(!showModal);
    return (
        <div className="container mx-auto p-6 relative">
            <button
                onClick={toggleModal}
                className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-200 transition"
                style={{ width: '50px', height: '50px' }}
            >
                {/* Info Icon as Image */}
                <img
                    src="/info-circle-svgrepo-com.svg" // Replace with the path to your SVG image file
                    alt="Info Icon"
                    className="w-6 h-6 text-blue-600" // Adjust size if needed
                />
            </button>
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
                        <h3 className="text-xl font-bold text-center">Information</h3>
                        <ul className="list-disc pl-6 text-gray-800">
                            <li><strong>Nitrogen (N):</strong> Essential for leafy growth. Input range: <strong>0–200</strong>.</li>
                            <li><strong>Phosphorus (P):</strong> Supports root development. Input range: <strong>0–150</strong>.</li>
                            <li><strong>Potassium (K):</strong> Enhances overall plant health. Input range: <strong>0–200</strong>.</li>
                        </ul>
                        <button
                            onClick={toggleModal}
                            className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <div className="text-center mb-6">
                <h2 className="text-4xl font-bold text-green-800 mb-4">Fertilizer Recommendation</h2>
                <p className="text-xl text-green-600">
                    Enter the N, P, and K values for fertilizer recommendation.
                </p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-6">
                {/* Fertilizer Form */}
                <form onSubmit={handleFormSubmit} className="w-full max-w-lg flex flex-col space-y-6">
                    <div className="space-y-4">
                        {/* Nitrogen Input */}
                        <div className="flex flex-col">
                            <label htmlFor="nitrogen" className="text-green-800 font-semibold">Nitrogen (N)</label>
                            <input
                                id="nitrogen"
                                type="number"
                                value={nValue}
                                onChange={(e) => setNValue(e.target.value)}
                                placeholder="Enter Nitrogen value"
                                className="border-2 border-green-500 rounded-lg p-3 text-green-600"
                            />
                        </div>

                        {/* Phosphorus Input */}
                        <div className="flex flex-col">
                            <label htmlFor="phosphorus" className="text-green-800 font-semibold">Phosphorus (P)</label>
                            <input
                                id="phosphorus"
                                type="number"
                                value={pValue}
                                onChange={(e) => setPValue(e.target.value)}
                                placeholder="Enter Phosphorus value"
                                className="border-2 border-green-500 rounded-lg p-3 text-green-600"
                            />
                        </div>

                        {/* Potassium Input */}
                        <div className="flex flex-col">
                            <label htmlFor="potassium" className="text-green-800 font-semibold">Potassium (K)</label>
                            <input
                                id="potassium"
                                type="number"
                                value={kValue}
                                onChange={(e) => setKValue(e.target.value)}
                                placeholder="Enter Potassium value"
                                className="border-2 border-green-500 rounded-lg p-3 text-green-600"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition"
                    >
                        Get Fertilizer Recommendation
                    </button>
                </form>

                {/* Recommendation Display */}
                {fertilizerRecommendation && (
                    <FertilizerRec fertilizer={fertilizerRecommendation} language="en"></FertilizerRec>
                )}
            </div>
        </div>
    );
}

// Main Home Page
const HomePage: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>("Home");
    const navigate = useNavigate()
    const navItems: NavItem[] = [
        { title: "Home", component: <HomeSection />, icon: "🏠" },
        { title: "Insights", component: <InsightsSection />, icon: "📊" },
        { title: "Detect", component: <DetectSection />, icon: "🔍" },
        { title: "Recommend", component: <RecommendSection />, icon: "💡" },
        { title: "Fertilizer", component: <FertilizerSection />, icon: "🌱" },
        {title:"Pestiside",component:<PestSection></PestSection>,icon :""}
    ];

    const currentComponent = navItems.find((item) => item.title === activeSection)?.component;

    useEffect(() => {
        if (username == '') {
            navigate("/login")
        }
    })
    return (
        <div className="min-h-screen flex flex-col" style={{
            backgroundImage: "url('/background.webp')"
        }}>
            {/* Top Navigation Bar */}
            <nav className="bg-green-500 text-white p-4 flex justify-between items-center shadow-lg">
                <h1 className="text-xl font-bold">{username}</h1>
                <div className="flex space-x-4">
                    {navItems.map((item) => (
                        <button
                            key={item.title}
                            onClick={() => setActiveSection(item.title)}
                            className={`flex items-center space-x-1 hover:bg-green-600 px-3 py-2 rounded transition ${activeSection === item.title ? "bg-green-700" : ""
                                }`}
                        >
                            <span>{item.icon}</span>
                            <span className="hidden sm:inline">{item.title}</span>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Dynamic Content Rendering */}
            <main className="flex-grow p-4">
                <section className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
                    {currentComponent}
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-green-500 text-white text-center p-4">
                <p>© 2024 KrishiSakha. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
