import axios from "axios";
import { AppConstants } from "../constants/AppConstants";
import { userurl } from "./url";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = AppConstants.FLEETBASE_API_PUBLIC_KEY;



const HEADERS = {
  "Content-Type": "application/json",
  Cookie:
    "fleetbase_session=WaGnAhRiK5M4FRcQCpclAVtMsOAX76VOiM8cxmmt; fleetbase_session=WaGnAhRiK5M4FRcQCpclAVtMsOAX76VOiM8cxmmt",
};



export async function createPlaces(data) {
  const response = await axios.post(`${AppConstants.BASE_URL}/places`, data, {
    headers: {
      ...HEADERS,
      Authorization: "Bearer " + API_KEY,
    },
  });

  return response.data;
}


export async function createOrder(data) {
  return axios.post(`${AppConstants.BASE_URL}/orders`, data, {
    headers: {
      ...HEADERS,
      Authorization: "Bearer " + API_KEY,
    },
  });
}

export async function getOrdersByContact(contactId) {
  console.log(`${AppConstants.BASE_URL}/orders/get-orders-by-contact/${contactId} HEADERS: ${HEADERS} API_KEY: ${API_KEY}`)
  return axios.get(
    `${AppConstants.BASE_URL}/orders/get-orders-by-contact/${contactId}`,
    {
      headers: {
        ...HEADERS,
        Authorization: "Bearer " + API_KEY,
      },
    }
  );
}

// export function getOrdersByUser(contactId, token) {


//   console.log(`${userurl.getBookings(contactId)}`, token,"25256565")
//   return axios.get(
//     `${userurl.getBookings(contactId)}`,
//     {
//       headers: {
//         ...HEADERS,
//         Authorization: "Bearer" + token,
//       },
//     }
//   );
// }
export async function getOrdersByUser(contactId, token) {
  try {
    console.log(`${userurl.getBookings(contactId)}`, token, "25256565", contactId)
    const url = `${userurl.getBookings(contactId)}`

    const response = await axios.get(
      `${AppConstants.BASE_BACKEND}/booking/byUserId/${contactId}`,
      {
        headers: {
          ...HEADERS,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Error fetching orders:', error.message);
    throw new Error('Failed to fetch orders. Please try again later.'); // Throw custom error message
  }
}

export async function getPrice(data) {
  return axios.post(`${AppConstants.BASE_BACKEND}/total-price`, data, {
    headers: {
      ...HEADERS,
      Authorization: "Bearer " + API_KEY,
    },
  });
}
export async function getPromoCode(data) {
  // return {
  //   data: {
  //     desc: 10,
  //     minDays: 1
  //   }, status: 201
  // }
  return axios.post(`${AppConstants.BASE_BACKEND}/promotion/validate`, data, {
    headers: {
      ...HEADERS,
      Authorization: "Bearer " + API_KEY,
    },
  });
}

// export async function createOrdeN(data) {
//   console.log('APP:---', data)

//   // return
//   return axios.post(`${AppConstants.BASE_BACKEND}/booking/app`, data, {
//     headers: {
//       ...HEADERS,
//       Authorization: "Bearer " + API_KEY,
//     },
//   });
// }

export async function createOrdeN(data) {
  console.log('APP:---', data);
  try {
    return await axios.post(`${AppConstants.BASE_BACKEND}/booking/app`, data, {
      headers: {
        ...HEADERS,
        Authorization: "Bearer " + API_KEY,
      },
    });
  } catch (error) {
    console.error("Error creating order:", error.message);
    throw error; // Optionally rethrow the error for handling by the caller
  }
}



export async function UpdateInfoExtraN(data) {


  // return
  // const { status } = await axios.patch(`${BACKEND_URL}/booking/updateInfo`, data, {
  return axios.patch(`${AppConstants.BASE_BACKEND}/booking/updateInfo`, data, {
    headers: {
      ...HEADERS,
      Authorization: "Bearer " + API_KEY,
    },
  });
}

export async function getDataOrder(id) {
  // ${id}
  console.log(`${AppConstants.BASE_BACKEND}/booking/byExternalId/${id}`)
  return axios.get(`${AppConstants.BASE_BACKEND}/booking/byExternalId/${id}`, {
    headers: {
      ...HEADERS,
      Authorization: "Bearer " + API_KEY,
    },
  });

}



