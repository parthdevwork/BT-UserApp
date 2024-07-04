const AppConstants = {
  FLEETBASE_API_PUBLIC_KEY: "flb_live_zaIGsPH9hgIPiRiAiVTN",
  FLEETBASE_API_PUBLIC_KEY_STORE: "store_d2a55b485fd0435bb4e83ed3192085a4",

  DEFAULT_COUNTRY_CODE: "+971",
  DEFAULT_COUNTRY_FLAG: "🇦🇪",

  BASE_URL: "https://api.baggagetaxi.com/v1",
  BASE_URL_INT: "https://api.baggagetaxi.com/int/v1",
  // BASE_URL_STORE_FRONT: "https://api.baggagetaxi.com/storefront/v1",
  BASE_URL_STORE_FRONT: "https://backend.baggagetaxi.com",

  BASE_BACKEND: "https://backend.baggagetaxi.com",
  // BASE_BACKEND: "https://backend-stg.baggagetaxi.com",
  // BASE_BACKEND: "https://eecf-103-250-149-229.ngrok-free.app"

  // const URL = 'https://mapi-dev.baggagetaxi.com'

  // BASE_BACKEND: "https://backend.baggagetaxi.com",
  // BASE_BACKEND: "http://127.0.0.1:300",

  //DEV
  // FLEETBASE_API_PUBLIC_KEY: "flb_live_IxvFB46YnnNLjf74V2qp",
  // FLEETBASE_API_PUBLIC_KEY_STORE: "store_82e3eb289d25e504dea19539058603b2",
  // DEFAULT_COUNTRY_CODE: "+971",
  // DEFAULT_COUNTRY_FLAG: "🇦🇪",
  // BASE_URL: "https://api-dev.baggagetaxi.com/v1",
  // BASE_URL_INT: "https://api-dev.baggagetaxi.com/int/v1",
  // BASE_URL_STORE_FRONT: "https://api-dev.baggagetaxi.com/storefront/v1",

  //local
  // BASE_URLN: "http://192.168.70.55:300",
  // BASE_URLN: "http://127.0.0.1:300",

};
const servicesList = { departing: 'Departing', arriving: 'Arriving', storage: 'Storage', transfer: 'Transfer' }
export {
  AppConstants, servicesList
}