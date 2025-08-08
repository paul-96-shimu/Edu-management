import axios from "axios";

const axiosInstance = axios.create({
      baseURL: `https://server-kappa-steel.vercel.app`
})
const usAxiosAuth = () => {
    return axiosInstance;
};

export default usAxiosAuth;