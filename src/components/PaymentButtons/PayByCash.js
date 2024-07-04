// import { useState } from "react";
// import { View, Text, SafeAreaView, Image } from "react-native";
// import Toast from "react-native-root-toast";
import Button from "../ui/Button";
// import Spinner from "react-native-loading-spinner-overlay";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { createOrder } from "../../services/order.services";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   updateData,
//   setScreenType
// } from "../../store/redux/order";
// import moment from "moment";


const PayByCash = ({ onCreateOrder }) => {
  // const dispatch = useDispatch();

  // const [isLoading, setLoading] = useState(false);
  // const [cardDetails, setCardDetails] = useState({});

  // const orderData = useSelector((state) => state.order);
  // const userData = useSelector((state) => state.user.data);

  // console.log("PO", { userData, orderData })


  // const handleContinuePress = () => {
  //   const customerId = userData?.contact_id;
  //   const pickupString = `${orderData?.collect?.pickupDate} ${moment(
  //     orderData?.collect?.pickupTime,
  //     "hh:mm"
  //   ).format("HH:mm")}`;
  //   const dropoffString = `${orderData?.delivery?.dropoffDate} ${moment(
  //     orderData?.delivery?.dropoffTime,
  //     "hh:mm"
  //   ).format("HH:mm")}`;
  //   const createOrderData = {
  //     customer: customerId, //"contact_gPVlVge",
  //     driver: null,
  //     service_quote_uuid: null,
  //     meta: {
  //       bags: orderData?.delivery?.bagsCount,
  //     },
  //     qr_code: null,
  //     customer_type: "fleet-ops:contact",
  //     facilitator_type: "fleet-ops:contact",
  //     pickup: orderData?.collect?.id,
  //     dropoff: orderData?.delivery?.id,
  //     pickup_time: pickupString, //"2023-11-02 10:00:00",
  //     dropoff_time: dropoffString, //"2023-11-02 16:00:00",
  //   };

  //   console.log("createOrderData", createOrderData, orderData)
  //   return
  //   setLoading(true);
  //   createOrder(createOrderData)
  //     .then((res) => {
  //       const data = res?.data;
  //       dispatch(setScreenType(0));
  //       dispatch(updateData({ order: data }));
  //       setLoading(false);
  //       navigation.navigate("OrderCompletedScreen");
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       Toast.show(
  //         `Error! - ${error?.response?.data?.errors[0] || "Please try again later."
  //         }`,
  //         {
  //           duration: Toast.durations.LONG,
  //         }
  //       );
  //     });
  // };


  return (<>
    {/* <View className="py-3"> */}
    <Button
      className="w-full"
      label="Checkout"
      onPress={() => { console.log("aser"); onCreateOrder() }} />
    {/* </View> */}
  </>
  );
};

export default PayByCash;

