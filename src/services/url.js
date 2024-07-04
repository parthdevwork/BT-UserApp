import { AppConstants } from "../constants/AppConstants";
import { Platform } from 'react-native'

const API_STORE_KEY = AppConstants.FLEETBASE_API_PUBLIC_KEY_STORE


export const userurl = {
    sentOTP: `${AppConstants.BASE_BACKEND}/otp/send-otp`,
    verifyOtp:`${AppConstants.BASE_BACKEND}/otp/validate`,
    getBookings: (id) => `${AppConstants.BASE_BACKEND}/booking/byUserId/666beac6a50d5f0c5496b7f1`
  }

  