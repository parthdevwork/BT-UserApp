import { useState } from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import Toast from "react-native-root-toast";
import Layout from "../components/Layout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createOrder } from "../services/order.services";
import { useSelector, useDispatch } from "react-redux";
import {
  updateData,
  setScreenType
} from "../store/redux/order";
import { AntDesign } from "@expo/vector-icons";
import Stripe from '../components/PaymentButtons/Stripe'

import moment from "moment";
import { Images } from "../constants/images";

const PayByCash = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({});

  const orderData = useSelector((state) => state.order);
  const userData = useSelector((state) => state.user.data);


  const handleContinuePress = () => {
    const customerId = userData?.contact_id;
    const pickupString = `${orderData?.collect?.pickupDate} ${moment(
      orderData?.collect?.pickupTime,
      "hh:mm A"
    ).format("HH:mm")}`;
    const dropoffString = `${orderData?.delivery?.dropoffDate} ${moment(
      orderData?.delivery?.dropoffTime,
      "hh:mm A"
    ).format("HH:mm")}`;
    const createOrderData = {
      customer: customerId, //"contact_gPVlVge",
      driver: null,
      service_quote_uuid: null,
      meta: {
        bags: orderData?.delivery?.bagsCount,
      },
      qr_code: null,
      customer_type: "fleet-ops:contact",
      facilitator_type: "fleet-ops:contact",
      pickup: orderData?.collect?.id,
      dropoff: orderData?.delivery?.id,
      pickup_time: pickupString, //"2023-11-02 10:00:00",
      dropoff_time: dropoffString, //"2023-11-02 16:00:00",
    };
    setLoading(true);
    createOrder(createOrderData)
      .then((res) => {
        const data = res?.data;
        dispatch(setScreenType(0));
        dispatch(updateData({ order: data }));
        setLoading(false);
        navigation.navigate("OrderCompletedScreen");
      })
      .catch((error) => {
        setLoading(false);
        Toast.show(
          `Error! - ${
            error?.response?.data?.errors[0] || "Please try again later."
          }`,
          {
            duration: Toast.durations.LONG,
          }
        );
      });
  };

  const cardIcon = (
    <View className="ml-2">
      <MaterialCommunityIcons name="credit-card" size={20} color="gray" />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? (
        <View
          style={{
            backgroundColor: "#fff",
            padding: 16,
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            paddingHorizontal: 48,
          }}
        >
          <Text className="text-xl font-montserrat-600 mt-4 text-center">
            Your payment is being processed
          </Text>
          <Text className="text-base font-montserrat-300 mt-4 text-center">
            Do not close the app
          </Text>
        </View>
      ) : (
        <><View
            style={{
              backgroundColor: "#fff",
              padding: 16,
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <View style={{ marginTop: 64 }}>
              <Text className="text-base font-montserrat-600 mt-4">
                Cash on Delivery
              </Text>
              <View style={{ marginTop: 16 }}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={Images.general.cod}
                  resizeMode="contain" />
              </View>
            </View>
            <Button
              className="w-full mt-8"
              label="Okay"
              onPress={handleContinuePress} />
          </View>
          <Stripe />
          </>
      )}
    </SafeAreaView>
  );
};

export default PayByCash;
