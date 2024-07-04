import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { getRandomLetter, generateOrderId } from '../../constants/utils'

// const randomId = Date.now().toString().substring(0, 6);
// const cityName = getRandomLetter(true)

export const initialState = {
  collect: {},
  delivery: {},
  data: { bookingExtId: generateOrderId() }, // This will contain current order data Object
  orderList: [],
  payment: { amount: 0, currency: 'AED', codeProm: false, methodPay: 'card', promotionCode: '', bags: 1 },
  screenType: 0,
};


const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateCollectData: (state, action) => {
      state.collect = { ...state.collect, ...action.payload };
    },
    updatePaymentData: (state, action) => {
      state.payment = { ...state.payment, ...action.payload };
    },
    updateDeliveryData: (state, action) => {
      state.delivery = { ...state.delivery, ...action.payload };
    },
    updateData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    updateToOrderList: (state, action) => {
      state.orderList = action.payload;
    },
    setScreenType: (state, action) => {
      state.screenType = action.payload;
    },
    restartOrder: (state, action) => ({ ...initialState, data: { bookingExtId: generateOrderId() } })
  },
});

export const {
  updateCollectData,
  updateDeliveryData,
  updateData,
  updatePaymentData,
  setScreenType,
  // updateOrderData,
  updateToOrderList,
  restartOrder
} = OrderSlice.actions;
export default OrderSlice.reducer;
