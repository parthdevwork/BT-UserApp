import axios from "axios"
import { useState } from "react"
import { AppConstants } from "../constants/AppConstants";

const API_STORE_KEY = AppConstants.FLEETBASE_API_PUBLIC_KEY_STORE;

const HEADERS = {
    "Content-Type": "application/json",
    Cookie: "fleetbase_session=WaGnAhRiK5M4FRcQCpclAVtMsOAX76VOiM8cxmmt; fleetbase_session=WaGnAhRiK5M4FRcQCpclAVtMsOAX76VOiM8cxmmt",
    Authorization: "Bearer " + API_STORE_KEY,
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000'
const useGetPrice = () => {
    const [amount, setprice] = useState(0)
    const getPrice= async (bags, collectDate,deliveryDate,collectLocation,deliveryLocation)=>{
        try {
            const response = await axios.post(`${BACKEND_URL}/total-price`,
                { bags,collectDate, deliveryDate,collectLocation,deliveryLocation, service, },
                {
                    headers: { ...HEADERS}
                }).catch(err => console.log(err))

            const data = response?.data
            const status = response?.status
            if(status===201||status===200){
                setprice(data.totalPrice)
            }
        } catch (error) {
        
        }
    }
    return { getPrice,amount }
}
export default useGetPrice