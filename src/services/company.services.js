import axios from "axios";
import { AppConstants } from "../constants/AppConstants";

export const rangeHoursDefault = [
  { pickupTime: 5, deliveryTime: 3 },
  { pickupTime: 5, deliveryTime: 3 },
  { pickupTime: 5, deliveryTime: 3 },
  { pickupTime: 5, deliveryTime: 3 },
  { pickupTime: 5, deliveryTime: 3 },
  { pickupTime: 1, deliveryTime: 3 },
  { pickupTime: 1, deliveryTime: 3 },
  { pickupTime: 1, deliveryTime: 3 },
  { pickupTime: 1, deliveryTime: 3 },
  { pickupTime: 1, deliveryTime: 3 },
  { pickupTime: 1, deliveryTime: 3 },
  { pickupTime: 1, deliveryTime: 3 },
  { pickupTime: 1, deliveryTime: 3 },
  { pickupTime: 1, deliveryTime: 3 },
  { pickupTime: 1, deliveryTime: 3 },
  { pickupTime: 1, deliveryTime: 3 },
  { pickupTime: 1, deliveryTime: 3 },
  { pickupTime: 1, deliveryTime: 3 },
  { pickupTime: 1, deliveryTime: 3 },
  { pickupTime: 1, deliveryTime: 3 },
  { pickupTime: 1, deliveryTime: 3 },
  { pickupTime: 1, deliveryTime: 3 },
  { pickupTime: 5, deliveryTime: 3 },
  { pickupTime: 5, deliveryTime: 3 }
]

// extrahoursNoDubai
// suspendFrom
// suspendTo
// timeslots
// rangeHours


const API_KEY = AppConstants.FLEETBASE_API_PUBLIC_KEY;


const HEADERS = {
  "Content-Type": "application/json",
  Cookie:
    "fleetbase_session=WaGnAhRiK5M4FRcQCpclAVtMsOAX76VOiM8cxmmt; fleetbase_session=WaGnAhRiK5M4FRcQCpclAVtMsOAX76VOiM8cxmmt",
};


export async function getparams() {
  try {
    const { status, data } = await axios.get(`${AppConstants.BASE_BACKEND}/company-params`).catch(err => console.log(err));
    const { rangeHours = [] } = data
    if (status !== 200) return {}

    // extrahoursNoDubai
    // suspendFrom
    // suspendTo
    // timeslots
    // rangeHours
    data.rangeHours = rangeHours.length > 0 ? rangeHours : rangeHoursDefault

    return data
  } catch (error) {
    return {}
  }
}

//   let dataFormParameters = await fetch(`${ BACKEND_URL } / company - params`, { cache: 'no-store' }).then(res => res.json()).catch(err => rangeHoursDefault)