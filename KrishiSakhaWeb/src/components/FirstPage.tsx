import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const FirstPage: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex items-center justify-center" style={{
            backgroundImage: "url('/background.webp')"
        }}>
            <div className="bg-white shadow-lg rounded-lg p-6 w-9/12 flex flex-col items-center justify-center">
                <img src="/first.jpg" alt="" className="w-full rounded-md" />
                <div className="mt-4">
                    <button
                        onClick={()=>{navigate("/home")}}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md font-medium transition-all"
                    >
                        Go to Main Screen
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FirstPage