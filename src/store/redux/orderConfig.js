import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  rangeHours:
    [
      { pickupTime: 180, deliveryTime: 120 },
      { pickupTime: 300, deliveryTime: 120 },
      { pickupTime: 240, deliveryTime: 120 },
      { pickupTime: 180, deliveryTime: 120 },
      { pickupTime: 120, deliveryTime: 120 },
      { pickupTime: 20, deliveryTime: 120 },
      { pickupTime: 20, deliveryTime: 120 },
      { pickupTime: 20, deliveryTime: 120 },
      { pickupTime: 20, deliveryTime: 120 },
      { pickupTime: 20, deliveryTime: 120 },
      { pickupTime: 20, deliveryTime: 120 },
      { pickupTime: 20, deliveryTime: 120 },
      { pickupTime: 20, deliveryTime: 120 },
      { pickupTime: 20, deliveryTime: 120 },
      { pickupTime: 20, deliveryTime: 120 },
      { pickupTime: 20, deliveryTime: 120 },
      { pickupTime: 20, deliveryTime: 120 },
      { pickupTime: 20, deliveryTime: 120 },
      { pickupTime: 20, deliveryTime: 120 },
      { pickupTime: 20, deliveryTime: 120 },
      { pickupTime: 20, deliveryTime: 120 },
      { pickupTime: 20, deliveryTime: 120 },
      { pickupTime: 20, deliveryTime: 120 },
      { pickupTime: 20, deliveryTime: 300 }
    ]
  ,
  extrahoursNoDubai: 3,
  suspendFrom: '2024-03-17T04:00:00.000+04:00',
  suspendTo: '2024-03-17T23:50:00.000+04:00',
  timeslots: 20,
};


const OrderConfigSlice = createSlice({
  name: "orderConfig",
  initialState,
  reducers: {
    updateOrderConfig: (state, action) => { console.log("action", action); return (state = { ...state, ...action.payload }) },
    restartOrderConfig: () => ({ ...initialState })
  },
});

export const {
  updateOrderConfig,
  restartOrderConfig,
} = OrderConfigSlice.actions;

export default OrderConfigSlice.reducer;
