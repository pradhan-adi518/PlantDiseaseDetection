import axios from "axios";
import React, { useContext, useState } from "react";
import { useUser } from "../context/Username";

const LoginPage: React.FC<{setJwt: React.Dispatch<React.SetStateAction<string>>}> = ({setJwt}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {usernameHolder,setUsernameHolder} = useUser()
  const handleSubmit = async  (e: React.FormEvent) => {
    e.preventDefault();
    try{
        const res=await axios.post("http://localhost:8080/public/services/login",{username:username,password :password})
        setJwt(res.data.jwt || "")
        setUsernameHolder(username)
        console.log(res);
        
    }
    catch(e){

    }
  };

  return (
    <div className="flex h-screen items-center justify-center" style={{
      backgroundImage:"url('/background.webp')"
    }}>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default LoginPage;
