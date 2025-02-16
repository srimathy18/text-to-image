import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token,setToken]=useState(localStorage.getItem('token'))

  const[credit,setCredit]=useState(false)

  const backendUrl=import.meta.env.VITE_BACKEND_URL

  const navigate=useNavigate()

  const loadCreditsData = async () => {
    try {
        if (!token) return;  // ✅ Prevent request if token is missing

        const { data } = await axios.get(backendUrl + '/api/user/credits', {
            headers: { Authorization: `Bearer ${token}` }  // ✅ Ensure token is sent correctly
        });

        if (data.success) {
            setCredit(data.credits);
            setUser(data.user);
        }
    } catch (error) {
        console.error("Error loading credits:", error);
        toast.error(error.response?.data?.message || "Failed to load credits!");
    }
};

const generateImage = async (prompt) => {
  try {
    const { data } = await axios.post(
      backendUrl + '/api/image/generate-image',  // ✅ Check correct API path
      { prompt },
      {
        headers: { Authorization: `Bearer ${token}` },  // ✅ Correct header format
      }
    );

    if (data.success) {
      loadCreditsData();  //  Update credit balance
      return data.resultImage;
    } else {
      toast.error(data.message);
      loadCreditsData();  //  Ensure the credits  are update correctly or not

      if (data.creditBalance === 0) {
        navigate('/buy');  //  Redirect user if credits are zero
      }
    }
  } catch (error) {
    console.error("Error generating image:", error);
    toast.error(error.response?.data?.message || "Failed to generate image!");
  }
};


  const logout=()=>{
    localStorage.removeItem('token');
    setToken('')
    setUser(null)
    
  }
  useEffect (()=>{
     if(token){
      loadCreditsData()
     }
  },[token])
  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
