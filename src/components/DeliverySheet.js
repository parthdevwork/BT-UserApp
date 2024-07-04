import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Keyboard,
} from "react-native";
import GooglePlacesInput from "./ui/GooglePlacesInput";
import Button from "./ui/Button";
import { Images } from "../constants/images";
import { Colors } from "../constants/colors";
import Input from "../components/ui/Input";
import DatePicker from "react-native-date-picker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_KEY } from "@env";
import dayjs from "dayjs";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { DUBAI_TIMEZONE, minHourDelivery, createDateTimeZoneDubai } from "../constants/dateTime";
import moment from 'moment-timezone';
import { getPrice } from "../services/order.services";
import Toast from "react-native-root-toast";
import { aditionalCitys } from '../constants/utils'
import { useSelector } from "react-redux";

const DeliverySheet = ({
  navigation,
  onPressContinueOnDropOff,
  onLocationSet,
  onPressPickupInput,
  onDropoffDate,
  collectionData,
  deliveryData,
  placeholder,
  paymentData,
  onUpdatePayment,
  minDeliveryDate,
  onupdateData,
  setOnMap
}) => {

  const [dropOffLocation, setDropOffLocation] = useState("");
  const [bagCount, setBagCount] = useState(paymentData.bags ? paymentData.bags : 99);

  const [date, setDate] = useState(minDeliveryDate.toDate());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [loading, setloading] = useState(false);
  const { extrahoursNoDubai, rangeHours, suspendFrom, suspendTo, timeslots } = useSelector((state) => state.orderConfig);


  const valdateFrom = moment(suspendFrom).tz(DUBAI_TIMEZONE)
  const valdateTo = moment(suspendTo).tz(DUBAI_TIMEZONE)
  const daycol = moment(deliveryData?.dropoffDate + 'T' + deliveryData?.dropoffTime).tz(DUBAI_TIMEZONE)
  const validat = valdateFrom < daycol && daycol < valdateTo;
  const orderData = useSelector((state) => state.order);
  const screenType = orderData.screenType
  console.log("-=-==-=>", screenType);

  collectionData


  const onChange = (selectedDate) => {
    setShow(false);
    onDropoffDate(selectedDate);
  };

  const showDatepicker = () => {
    setMode("date");
    setShow(true);
  };

  const showTimepicker = () => {
    setMode("time");
    setShow(true);
  };

  useEffect(() => {
    if (!!deliveryData?.dropoffDate) {

      const dateDropOff = moment(deliveryData?.dropoffDate + 'T' + deliveryData?.dropoffTime)
      const datepickup = moment(collectionData.pickupDate + 'T' + collectionData.pickupTime)

      getPriceBags(bagCount, datepickup, collectionData?.address, dateDropOff, deliveryData.address)

    }
  }, [bagCount, deliveryData?.dropoffDate])
  useEffect(() => {
    if (collectionData?.address && deliveryData?.address) {
      if (`${collectionData?.address}`.toLocaleLowerCase().includes('airport')) {
        onupdateData({ service: 'arriving' });
      } else
        //@ts-ignore
        if (`${deliveryData.address}`.toLocaleLowerCase().includes('airport')) {
          onupdateData({ service: 'departing' });
        } else {
          onupdateData({ service: 'transfer' });
        }
    }

    console.log("deliveryData.address", deliveryData.address)
    if (aditionalCitys.findIndex((e) => `${deliveryData.address}`.toUpperCase().includes(e)) > -1) {
      setDate(minDeliveryDate.add(extrahoursNoDubai, 'hours').toDate())
    }
  }, [deliveryData.address, collectionData?.address])

  const getPriceBags = async (bags, collectDate, collectLocation, deliveryDate, deliveryLocation) => {
    setloading(true)
    try {
      const response = await getPrice({ bags, collectDate, collectLocation, deliveryDate, deliveryLocation, service: '' }).catch(e => console.log("error", e))
      const { totalPrice = 0 } = response.data;
      onUpdatePayment({ amount: totalPrice, bags, codeProm: false, discount: 0 })

    } catch (error) {

    } finally {
      setloading(false)
    }

  }

  // const GooglePlacesInput = () => {
  //   return (
  //     <GooglePlacesAutocomplete
  //       enablePoweredByContainer={false}
  //       fetchDetails={true}
  //       placeholder={deliveryData.address || "Delivery Address"}
  //       listViewDisplayed={true}
  //       isRowScrollable={true}
  //       textInputProps={{ placeholderTextColor: Colors.gray700 }}
  //       onPress={(data, details = null) => {
  //         setDropOffLocation(details);
  //         onLocationSet({
  //           latitude: parseFloat(
  //             JSON.stringify(details?.geometry?.location?.lat)
  //           ),
  //           longitude: parseFloat(
  //             JSON.stringify(details?.geometry?.location?.lng)
  //           ),
  //           data: details,
  //         });
  //       }}
  //       query={{
  //         key: GOOGLE_MAP_KEY,
  //         language: "en",
  //         components: "country:AE",
  //       }}
  //       styles={{
  //         container: {
  //           zIndex: 10,
  //           overflow: "visible",
  //           height: 35,
  //           flexGrow: 0,
  //           flexShrink: 0,
  //         },
  //         textInput: {
  //           borderColor: (dropOffLocation == "" && !deliveryData.address) ? 'red' : Colors.gray700,
  //           borderWidth: 1,
  //           paddingRight: 1,
  //           fontSize: 12,
  //           fontStyle: 'normal'
  //         },
  //         listView: {
  //           position: "absolute",
  //           top: 100,

  //           backgroundColor: "white",
  //           borderRadius: 5,
  //           flex: 1,
  //           elevation: 3,
  //           zIndex: 100,
  //           overflow: 'scroll',
  //           maxHeight: 200
  //         },
  //       }}
  //       renderRow={(rowData) => {
  //         const title = rowData?.structured_formatting?.main_text;
  //         const address = rowData?.structured_formatting?.secondary_text;
  //         return (
  //           <View
  //             style={{
  //               flexDirection: "row",
  //               alignItems: "center"
  //             }}
  //           >
  //             <Image
  //               resizeMode="contain"
  //               source={Images.icons.location}
  //               style={{ height: 25, width: 25 }}
  //             />
  //             <View style={{ marginStart: 10 }}>
  //               <Text className="text-xs font-montserrat-600 text-gray-800">{title}</Text>
  //               <Text className="text-xs2 text-gray-500">{address}</Text>
  //             </View>
  //           </View>
  //         );
  //       }}
  //     />
  //   );
  // };

  const pickupNode = (
    <View className="mr-13">
      <MaterialCommunityIcons name="music-note-whole" size={35} color="black" />
    </View>
  );

  const dropoffNode = (
    <View className="">
      <MaterialCommunityIcons name="map-marker" size={20} color="black" />
    </View>
  );
  // deliveryData.dropoffDate,deliveryData.dropoffTime
  const { dropoffDate = '', dropoffTime = '' } = deliveryData
  const showingdate = deliveryData?.dropoffDate ? moment(deliveryData?.dropoffDate + 'T' + deliveryData?.dropoffTime).toDate() : date

  

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer} className='flex flex-row justify-between'>
        <Text className="text-base font-montserrat-700 pb-1 ml-5">
          Delivery Address
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 0.1, alignItems: "center" }} className=''>
            {pickupNode}
            <Image
              style={styles.dottedImage}
              source={Images.general.dotted}
              resizeMode="cover"
            />
            {dropoffNode}
          </View>
          <View className="flex-1 flex-col gap-5 ">
            <Pressable onPress={() => onPressPickupInput()}>
              <Input
                value={`${collectionData.title}, ${moment(collectionData?.pickupDate).format('DD MMM YYYY')} ${collectionData?.pickupTime} `} //{"Dubai Airport, 10-Sep-2023 11:00AM"}
                editable={false}
                type="default"
                textStyle={"text-xs font-montserrat-500"}
              />
            </Pressable>
            <View className='relative flex flex-row z-20 '>
              <View className='flex flex-grow z-20'>
                {/* {GooglePlacesInput()} */}
                {/* setopensearch={setopensearch} */}
                <GooglePlacesInput placeholder={deliveryData.address} onLocationSet={onLocationSet} setLocation={setDropOffLocation} Location={dropOffLocation} placeholder1="Enter delivery destination" />
              </View>
              <Pressable className='absolute right-2 top-1 bottom-0 z-20 pt-2 rounded-s-full bg-white ' onPress={() => setOnMap()}>
                <View className="mr-1 flex justify-center ">
                  <Feather name="navigation" size={22} color="#000" />
                </View>
              </Pressable>
            </View>

            <View style={styles.rowContainer} className="z-0 ">
              <Pressable
                style={{ flex: 1 }}
                onPress={showDatepicker}
              >
                <Input
                  value={!!dropoffDate ? moment(dropoffDate).format('DD MMM YYYY') + ' ' + dropoffTime : 'Choose Date & Time'}
                  editable={false}
                  type="default"
                  placeholder="Date"
                  styleWrap={`border-[${(dropoffDate == "") ? 'red' : Colors.gray700}]`}
                  textStyle={"text-[14px] text-[#212121]"}
                  RightIcon={
                    <View className="h-full items-center justify-center ">
                      <Image
                        className="w-6"
                        source={Images.icons.calendar}
                        resizeMode="contain"
                      />
                    </View>
                  }
                />
              </Pressable>
              {/* <Pressable
                style={{ flex: 1, paddingStart: 4 }}
                onPress={showTimepicker}
              >
                <Input
                  value={dropoffTime}
                  editable={false}
                  type="default"
                  placeholder="Time"
                  RightIcon={
                    <View className="h-full items-center justify-center px-3 w-12">
                      <Image
                        className="w-5"
                        source={Images.icons.time}
                        resizeMode="contain"
                      />
                    </View>
                  }
                />
              </Pressable> */}
            </View>

            {/* <View className="z-10 flex-row justify-between" >
              <View style={{ flex: 0.65 }}>
                <Text className="text-base font-montserrat-700">
                  How many Bags?
                </Text>
                <Text className="text-xs2 font-montserrat-400" style={{}}>
                  Luggage, Backpacks, Shopping Bags, Strollers, Golf
                  Bags
                </Text>
              </View>
              <View className="items-center justify-evenly flex-row gap-3" style={{ flex: 0.35 }} >
                <Pressable
                  style={styles.pressableBtn}
                  onPress={() => {
                    if (bagCount > 1) {
                      setBagCount(bagCount - 1);
                    }
                  }}
                  className="px-2 w-10 items-center h-10 justify-center"
                >
                  <Text className="text-3xl font-montserrat-700">-</Text>
                </Pressable>
                <Text className="flex-grow text-2xl font-montserrat-700">{bagCount}</Text>
                <Pressable
                  style={styles.pressableBtn}
                  onPress={() => setBagCount(bagCount + 1)}
                  className="px-2 w-10 items-center h-10 justify-center"
                >
                  <Text className="text-3xl font-montserrat-700">+</Text>
                </Pressable>
              </View>

            </View>
            <View className="flex flex-row justify-between " >
              <Text className="text-xl font-montserrat-700">Total: </Text>
              <Text className="text-xl font-montserrat-700">{paymentData?.amount ==0? 99:paymentData?.amount } AED</Text>
            </View> */}
            {/* <View className="flex flex-row justify-between " style={{ flex: 0.3 }}></View> */}

            <View>
              {validat ?
                <Text>
                  Regrettably, we are fully booked this hours. We apologize for any inconvenience. Please contact us if you need a special service.
                </Text> : <></>}
            </View>
          </View>
        </View>
            <Button
              // disabled={
              // (dropOffLocation == "" && !deliveryData.address) || !deliveryData?.dropoffDate || paymentData?.amount === 0
              // }
              className="px-2.5  mt-6 mb-6 ml-2"
              label="Continue"
              // onPress={() => {
              //   if (!((dropOffLocation == "" && !deliveryData.address) || !deliveryData?.dropoffDate || paymentData?.amount === 0)) {
              //     onPressContinueOnDropOff(bagCount)
              //   } else {
              //     Toast.loading('Comploading the location and date', { shadowColor: 'red' })
              //   }
              // }
              // }
              onPress={() => {
                if (
                  !(
                    (dropOffLocation === "" && (!deliveryData || !deliveryData.address)) ||
                    !deliveryData?.dropoffDate ||
                    paymentData?.amount === 0
                  )
                ) {
                  onPressContinueOnDropOff(bagCount);
                } else {
                  // Toast.loading('Completing the location and date', { shadowColor: 'red' });
                  Toast.show('Complete the location and date', { shadowColor: 'red' });
                }
              }}
            />

        <DatePicker
          modal
          mode={"datetime"}
          open={show}
          date={showingdate}
          minimumDate={date}
          timeZoneOffsetInMinutes={(4 * 60)}
          // minimumDate={ mode === 'date'? minumumDate:minimunTime}
          minuteInterval={timeslots}
          onConfirm={(date) => {
            onChange(date);
          }}
          onCancel={() => {
            setShow(false);
          }}
        />

      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: Colors.primaryYellow,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 5,
  },
  headerContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 16,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    paddingTop: 16,
    paddingRight: 16,
    paddingLeft: 10
  },
  rowContainer: {
    flexDirection: "row",
    // marginTop: 10,
  },
  dottedImage: {
    height: 42,
    width: 1,
    // marginHorizontal: 24,
    // marginLeft: 18,
  },
  pressableBtn: { backgroundColor: Colors.lightGray },
});
export default DeliverySheet;
