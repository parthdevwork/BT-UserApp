import React, { useEffect, useState, useContext, lazy, useCallback } from "react";
import { View, ImageBackground, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Pressable } from "react-native";
import Map from "../components/Map";
import * as Location from "expo-location";
import { Images } from "../constants/images";
import { AuthContext } from "../store/context/auth-context";

import Toast from "react-native-root-toast";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import CollectionSheet from "../components/CollectionSheet";
// import { Colors } from "../constants/colors";
import DeliverySheet from "../components/DeliverySheet";
import ReviewSheet from "../components/ReviewSheet";
import { AntDesign } from '@expo/vector-icons';


import moment from 'moment-timezone';
import { DUBAI_TIMEZONE } from "../constants/dateTime";
import { createPlaces } from "../services/order.services";
import { getparams, rangeHoursDefault } from "../services/company.services";
import { createOrder, createOrdeN } from "../services/order.services";

// const DeliverySheet = lazy(() => import("../components/DeliverySheet"))
// const ReviewSheet = lazy(() => import("../components/ReviewSheet"))

import {
  updateDeliveryData,
  updateCollectData,
  setScreenType,
  restartOrder,
  updatePaymentData,
  updateData,
  updateOrderData,
} from "../store/redux/order";
import { updateOrderConfig } from '../store/redux/orderConfig'
import { useFocusEffect } from "@react-navigation/native";
// import { ScrollView } from "react-native-gesture-handler";

const PICKUP = "pickup";
const DROPOFF = "dropoff";

const MultiPurposeMapScreen = ({ navigation, route }) => {

  const screenOptions = {
    headerShown: true,
  }
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const { isAuthenticated } = authCtx;

  const [refreshKey, setRefreshKey] = useState(0);
  const [onMap, setOnMap] = useState(-1);

  const [pickupLocation, setPickupLocation] = useState(
    { latitude: "", longitude: "" }
  );
  const [currentLocation, setCurrentLocation] = useState([]);
  const [isLoading, setLoading] = useState(false);


  // console.log("ORDER_DATA", typeof( currentLocation.latitude) )


  // const [rangeHours, setrangeHours] = useState(rangeHoursDefault);
  // console.log(currentLocation,"66965++++++")
  const requestLocationPermission1 = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    await getLocation();
  };
  const getLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync();

      setCurrentLocation(location?.coords);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await requestLocationPermissions();
        await fetchCurrentLocation();
        await getDataConfig();
        setPickupLocation(location.coords);

      };

      fetchData();
      setTimeout(() => {
        setRefreshKey(Math.floor(Math.random() * 100));
      }, 400);
    }, [])
  );
  const requestLocationPermissions = async () => {
    console.log("REQUEST PERMITION CALL");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    else if (status == "granted") {
      console.log("Calling Granted");
      await fetchCurrentLocation()
    }
  };

  const fetchCurrentLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync();
      setCurrentLocation(location.coords);
      setPickupLocation(location.coords);

    } catch (error) {
      console.error("Error getting location:", error);
      setErrorMsg("Error fetching location");
    }
  };


  const [dropoffLocation, setDropoffLocation] = useState({
    latitude: 0.0,
    longitude: 0.0,
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const orderData = useSelector((state) => state.order);
  const userData = useSelector((state) => state.user.data);

  //   const [bagCount, setBagCount] = useState(orderData?.payment ? orderData?.payment : 99);
  //  console.log("bagCount",bagCount);
  const { extrahoursNoDubai, rangeHours, suspendFrom, suspendTo, timeslots } = useSelector((state) => state.orderConfig);


  // console.log("paramsOrder", rangeHours)
  console.log("paramsOrder", { extrahoursNoDubai, suspendFrom, suspendTo, timeslots })




  const screenType = orderData.screenType || 0;






  const getDataConfig = async () => {
    const data = await getparams();

    dispatch(updateOrderConfig(data))

    // setrangeHours(data?.rangeHours || rangeHoursDefault);
  }

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync();
      setCurrentLocation(location.coords);
      setPickupLocation(location.coords);
      // console.log("status",status);
      // console.log("====>", location.coords);
    } catch (error) {

    }
  };

  const placeToAddress = (place) => {
    var address = '';
    try {

      place?.address_components?.forEach(function (c) {
        switch (c.types[0]) {
          case "street_number":
            address.StreetNumber = c;
            break;
          case "route":
            address.StreetName = c;
            break;
          case "neighborhood":
          case "locality":
            address.City = c;
            break;
          case "administrative_area_level_1": //  Note some countries don't have states
            address.State = c;
            break;
          case "postal_code":
            address.Zip = c;
            break;
          case "country":
            address.Country = c;
            break;
          /*
          *   . . .
          */
        }
      });

      return address;
    } catch (error) {
      return ''
    }
  };

  const requestCreatePlace = async (details, type) => {

    console.log("details", details)

    // debugger
    const placeDetails = details?.data;
    // console.log("placeDetails", details)
    const location = { coordinates: [details?.latitude, details?.longitude] }
    const addressData = placeToAddress(placeDetails);
    const title = `${placeDetails.formatted_address + ' ' + addressData?.Country?.short_name || "AE"}`
    let address = { title, address: title, location }
    if (!addressData) {
      address = { title: details?.data?.description, address: details?.data?.description, location }
    }
    console.log('addressF', address)
    // const address = {
    //   postal_code: "",
    //   // street1: `${placeDetails?.name} ${addressData?.StreetName?.long_name || ""}`,
    //   street1: `${placeDetails.formatted_address}`,
    //   country: addressData?.Country?.short_name || "AE",
    //   location: {
    //     type: "Point",
    //     coordinates: [
    //       parseFloat(JSON.stringify(placeDetails?.geometry?.location?.lng)),
    //       parseFloat(JSON.stringify(placeDetails?.geometry?.location?.lat)),
    //     ],
    //   },
    //   country_name: "Dubai", // ?? Country or State?
    //   type: null,
    //   name: placeDetails?.name,
    // };

    // setLoading(true);


    try {
      // const placeData = await createPlaces(address);

      if (type === PICKUP) {
        dispatch(
          // updateCollectData({ ...placeData, title: placeDetails?.name })
          updateCollectData(address)
        );
      } else {
        dispatch(
          // updateDeliveryData({ ...placeData, title: placeDetails?.name })
          updateDeliveryData(address)
        );
      }
      // setLoading(false);
    } catch (error) {
      console.error(error)
      setLoading(false);
    }
  };

  const handlesetLocation = (data) => {
    requestCreatePlace(data, screenType === 0 ? PICKUP : DROPOFF);
    setPickupLocation(data);
    setRefreshKey(Math.floor(Math.random() * 100));
    setOnMap(-1)
  }

  const handleCreateOrder = () => {

    // dispatch(updateData({ orderData }));
    // dispatch(setScreenType(0));
    // setTimeout(() => {
    //   navigation.navigate("OrderCompletedScreen");
    // }, 100);
    // return;



    setLoading(true)

    createOrdeN({ ...orderData, contact: userData })
      .then((res) => {
        const data = res?.data;
        console.log("res::po", data)
        dispatch(setScreenType(1));
        dispatch(updateData({ ...data }));
        // dispatch(setUser({ idOrder: data.booking._id, userId: data.userId, ...data?.orderFleetbase?.customer }));
        setLoading(false);
        navigation.navigate("OrderCompletedScreen", { externalKey: !!data?.bookingExtId ? data?.bookingExtId : data?.woodelivery?.externalKey });
      })
      .catch((error) => {
        console.log("catch", error)
        setLoading(false);
        dispatch(setScreenType(2));
        Toast.show(
          `Error! - ${error?.response?.data?.errors[0] || "Please try again later."}`,
          {
            duration: Toast.durations.LONG,
          }
        );
      });
  }
  useEffect(() => {
    const { paymentStatus = '', idStripe = '' } = orderData?.payment
    if (paymentStatus === 'SUCCESS') {
      handleCreateOrder()
    }
  }, [orderData?.payment?.paymentStatus])
  useEffect(() => {
    if (!orderData?.collect?.address) {
      setDropoffLocation({
        latitude: 0.0,
        longitude: 0.0,
      })
    }
  }, [orderData?.collect?.address])


  const nowDub = moment().tz(DUBAI_TIMEZONE).startOf('hour').add(Math.round(moment().tz(DUBAI_TIMEZONE).minutes() / 30) * 30, 'minutes');
  const rangedate = rangeHours[parseInt(nowDub.format('HH'))]

  console.log("paramsOrder", rangedate)

  if (screenType === 2) {
    console.log("screenType", screenType)
    return (
      <SafeAreaView style={{ flex: 1, }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1, }}
        >

          <ReviewSheet
            isAuthenticated={isAuthenticated}
            userData={userData}
            data={orderData}
            onupdateData={(data) => dispatch(updateData(data))}
            newpayment={orderData?.payment}
            deliveryData={orderData?.delivery}
            onPressGoBack={() => {
              console.log("RRRRR")
              console.log("RRR2222", screenType)
              // setDropoffLocation({
              //   latitude: 0.0,
              //   longitude: 0.0,
              // });
              dispatch(setScreenType(1));
            }}
            onUpdatePayment={data => { dispatch(updatePaymentData(data)) }}
            onUpdate={data => {
              dispatch(updateDeliveryData({ promoCode: promoCode }));
            }}

            onCreateOrder={() => { handleCreateOrder() }}
            onPressContinueOnReview={() => {
              // navigation.navigate("OrderCompletedScreen");
              if (!isAuthenticated) {
                navigation.navigate("PhoneScreen");
              }
            }}
          />
          <Spinner visible={isLoading} />
          {/* </ImageBackground> */}
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }

  const handleBackPress = () => {
    console.log("RRR2222", screenType)
    if (screenType === 0) {
    } else if (screenType === 1) {
      dispatch(setScreenType(0));
    }
    else if (screenType === 2) {
      console.log("first")
      dispatch(setScreenType(1));
    }
  };

  // console.log("ORDER_DATA", orderData?.collect)

  return (
    <SafeAreaView style={{ flex: 1, }}>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        enableOnAndroid
        enableAutomaticScroll

      >

        <ImageBackground
          source={Images.general.gtaxi_bg}
          style={styles.background}
        >

          <View className="flex-1">
            {screenType === 0 ? null
              :
              <View style={{ position: 'absolute', zIndex: 1, top: Platform.OS == "ios" ? 9 : 16}} className='left-[14px]'>
                <Pressable
                  className="justify-center items-center"
                  style={{
                    backgroundColor: "#FFCC00",
                    borderRadius: 25,
                    height: 40,
                    width: 40,
                  }}
                  onPress={handleBackPress}
                >
                  <AntDesign name="left" size={24} color="black" />
                </Pressable>
              </View>
            }

            <View style={{ marginTop: Platform.OS == "ios" ? -40 : 12, flex: 1 }} className="w-full">

              {/* {pickupLocation?.latitude ? ( */}
              <Map
                key={refreshKey}
                origin={pickupLocation}
                destination={dropoffLocation.latitude !== 0.0 ? dropoffLocation : null}
                onMapReady={(data) => { }}
                setOnMap={(e) => setOnMap((e === -1 ? e : screenType))}
                onMap={onMap}
                onLocationSet={handlesetLocation}
              />
              {/* ) : null}  */}
            </View>
            {screenType === 0 && onMap === -1 ? (
              <CollectionSheet
                placeholder={`${orderData?.collect?.address ?? ''}`}
               
                collectionData={orderData?.collect}
                setOnMap={(e) => setOnMap(screenType)}
                minpickupTime={moment().startOf('hour').add(Math.round(moment().minutes() / timeslots) * timeslots, 'minutes').add(rangedate.pickupTime, 'minutes')}
                onPressContinueOnPickup={() => {
                  // navigation.navigate("OrderCompletedScreen");
                  dispatch(setScreenType(1));
                }}
                onPickupDate={(data) => {
                  const date = moment(data).tz(DUBAI_TIMEZONE)
                  dispatch(updateCollectData({ pickupDate: date.format("YYYY-MM-DD"), pickupTime: date.format("HH:mm") }));
                }}
                onLocationSet={(data) => {
                  console.log("onLocationSet", data)
                  requestCreatePlace(data, PICKUP);
                  setPickupLocation(data);
                  setRefreshKey(Math.floor(Math.random() * 100));
                }}
              />
            ) : null}

            {screenType === 1 && onMap === -1 ? (
              <DeliverySheet
                setOnMap={(e) => setOnMap(screenType)}
                collectionData={orderData?.collect}
                deliveryData={orderData?.delivery}
                paymentData={orderData?.payment}
                minDeliveryDate={moment(orderData?.collect?.pickupDate + 'T' + orderData?.collect?.pickupTime).add(rangedate.deliveryTime, 'minutes')}
                onDropoffDate={(data) => {
                  const date = moment(data).tz(DUBAI_TIMEZONE)
                  dispatch(updateDeliveryData({ dropoffDate: date.format("YYYY-MM-DD"), dropoffTime: date.format("HH:mm") }));
                }}
                onupdateData={(data) => dispatch(updateData(data))}
                onPressContinueOnDropOff={(bagsCount) => {

                  dispatch(updateDeliveryData({ bagsCount: bagsCount }));
                  dispatch(setScreenType(2));
                }}
                onLocationSet={(data) => {

                  requestCreatePlace(data, DROPOFF);
                  setDropoffLocation(data);
                  setRefreshKey(Math.floor(Math.random() * 100));
                }}
                onPressPickupInput={() => {
                  dispatch(setScreenType(0));
                }}
                onUpdatePayment={data => dispatch(updatePaymentData(data))}
              />
            ) : null}


          </View>
          <Spinner visible={isLoading} />
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",

  },
  head: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cancelBtn: {
    position: "absolute",
    top: 200,
    left: 28,
    backgroundColor: "#fff",
    elevation: 2,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default MultiPurposeMapScreen;
