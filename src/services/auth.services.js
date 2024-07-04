import axios from "axios";
import { AppConstants } from "../constants/AppConstants";
import { Platform } from 'react-native'
import { userurl } from "./url";

const API_STORE_KEY = AppConstants.FLEETBASE_API_PUBLIC_KEY_STORE;

const HEADERS = {
  "Content-Type": "application/json",
  Cookie:
    "fleetbase_session=WaGnAhRiK5M4FRcQCpclAVtMsOAX76VOiM8cxmmt; fleetbase_session=WaGnAhRiK5M4FRcQCpclAVtMsOAX76VOiM8cxmmt",
  platform: Platform.OS,
  'api-key': 'API_STORE_KEYASDQWDQWWDSD'
};

export async function login(data) {
  return axios.post(
    `${AppConstants.BASE_URL_STORE_FRONT}/auth/login`,
    data,
    {
      headers: {
        ...HEADERS,
        Authorization: "Bearer " + API_STORE_KEY,
      },
    }
  );
}


export async function signupWithSMS(data) {
  return axios.post(
    `${AppConstants.BASE_URL_STORE_FRONT}/customers/signup-with-sms`,
    data,
    {
      headers: {
        ...HEADERS,
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + API_STORE_KEY,
      },
    }
  );
}

export async function verifySignupCode(data) {
  return axios.post(
    `${AppConstants.BASE_URL_STORE_FRONT}/customers/verify-signup-sms`,
    data,
    {
      headers: {
        ...HEADERS,
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + API_STORE_KEY,
      },
    }
  );
}

export async function registerCustomerSignup(data) {
  return axios.post(
    `${AppConstants.BASE_URL_STORE_FRONT}/customers/register-user`,
    data,
    {
      headers: {
        ...HEADERS,
        Authorization: "Bearer " + API_STORE_KEY,
      },
    }
  );
}

export async function updatePassportNumber(contact_id, data) {
  return axios.put(
    `${AppConstants.BASE_URL_STORE_FRONT}/customers/${contact_id}`,
    data,
    {
      headers: {
        ...HEADERS,
        Authorization: "Bearer " + API_STORE_KEY,
      },
    }
  );
}

export async function uploadPassport(data) {
  return axios.post(
    `${AppConstants.BASE_URL_STORE_FRONT}/customers/upload-documents`,
    data,
    {
      headers: {
        ...HEADERS,
        Authorization: "Bearer " + API_STORE_KEY,
      },
    }
  );
}

export async function verifyEmail(data) {
  return axios.post(
    `${AppConstants.BASE_URL_STORE_FRONT}/customers/verify-signup-email`,
    data,
    {
      headers: {
        ...HEADERS,
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + API_STORE_KEY,
      },
    }
  );
}

// const response = await axios.patch(`${BACKEND_URL}/auth/${userId}`, dat, { headers: { Authorization: `Bearer ${token}` } })

export async function uploadPassportn({ data, token, userId }) {
  return axios.patch(
    `${AppConstants.BASE_BACKEND}/auth/${userId}`,
    data,
    {
      headers: {
        ...HEADERS,
        Authorization: "Bearer " + token,
      },
    }
  );
}

//==========================================================================================================
//==========================================================================================================
//==========================================================================================================
export async function loginn(data) {
  console.log(`${AppConstants.BASE_BACKEND}/auth/login`)
  const email = data.identity
  const password = data.password
  const response = await axios.post(`${AppConstants.BASE_BACKEND}/auth/login`, { email, password }, {
    headers: {
      ...HEADERS,
      Authorization: "Bearer " + API_STORE_KEY,
    },
  });

  const { userId, apikey } = response.data
  // console.log(response.data)
  console.log("check vallue", response.data);

  let { data: datt, status } = await getDataUser(apikey, userId)
  const response2 = { data: { ...datt, userId, token: apikey } }
  return response2
}

export async function getDataUser(token, userId) {
  // console.log(`${AppConstants.BASE_BACKEND}/auth/${userId}`, token)
  try {
    let response2 = await axios.get(`${AppConstants.BASE_BACKEND}/auth/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return response2

  } catch (error) {
    return error
  }

}

// auth / signupComplete
export async function registerAfterBooking(data) {
  try {

    const response = await axios.post(`${AppConstants.BASE_BACKEND}/auth/signupComplete`, data);
    const { userId, token } = response.data

    let response2 = await axios.get(`${AppConstants.BASE_BACKEND}/auth/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    response2 = { ...response2, data: { ...response2.data, userId, token } }


    return response2
  } catch (error) {

    return false
  }
}

export async function registerCustomerSignupN(data) {
  return axios.post(
    `${AppConstants.BASE_BACKEND}/auth/signup`,
    data,
    {
      headers: {
        ...HEADERS,
        Authorization: "Bearer " + API_STORE_KEY,
      },
    }
  );
}
export async function passwordrecovery(data) {
  console.log(data, `${AppConstants.BASE_BACKEND}/auth/request-password-reset`)
  return axios.post(
    `${AppConstants.BASE_BACKEND}/auth/request-password-reset`,
    data,
    {
      headers: {
        ...HEADERS,
        Authorization: "Bearer " + API_STORE_KEY,
      },
    }
  );
}

export async function sendOTP(data) {
  console.log('post', data)
  return axios.post(
    userurl.sentOTP,
    data,
    {
      headers: {
        ...HEADERS,
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + API_STORE_KEY,
      },
    }
  );
}

export async function verifyCode(data) {
  return axios.post(
    userurl.verifyOtp,
    data,
    {
      headers: {
        ...HEADERS,
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + API_STORE_KEY,
      },
    }
  );
}

