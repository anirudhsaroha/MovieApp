import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const ConfigContext = createContext();

export const useConfig = () => {
  return useContext(ConfigContext);
};

export const ConfigProvider = ({ children }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchConfiguration = async () => {
      try {
        const response = await axios.get("/configuration");
        setImageUrl(response.data.images.secure_base_url + "original");
      } catch (error) {
        console.error("Failed to fetch configuration:", error);
      }
    };

    fetchConfiguration();
  }, []);

  return (
    <ConfigContext.Provider value={{ imageUrl }}>
      {children}
    </ConfigContext.Provider>
  );
};