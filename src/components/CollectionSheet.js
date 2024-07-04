import React, {
  useState,
  useContext,
  useEffect,
} from "react";
import { AuthContext } from "../store/context/auth-context";
import { View, Text, Image, StyleSheet, Pressable, Button as Button2 } from "react-native";
import Button from "./ui/Button";
import { Images } from "../constants/images";
import Input from "../components/ui/Input";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import DatePicker from "react-native-date-picker";
import moment from 'moment-timezone';
import { useNavigation } from '@react-navigation/native';
import Toast from "react-native-root-toast";
import GooglePlacesInput from "./ui/GooglePlacesInput";
import { useSelector } from "react-redux";
import { aditionalCitys } from '../constants/utils'
import { DUBAI_TIMEZONE } from "../constants/dateTime";

const CollectionSheet = ({
  minpickupTime,
  onPressContinueOnPickup,
  onLocationSet,
  onPickupDate,
  setOnMap,
  placeholder,
  collectionData
}) => {
  const navigation = useNavigation();
  const [pickupLocation, setPickupLocation] = useState("");
  const [minumumDate, setminumumDate] = useState(minpickupTime.toDate());
  const [show, setShow] = useState(false);
  const [opensearch, setopensearch] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const [pressContinue, setpressContinue] = useState(false);
  const { extrahoursNoDubai, rangeHours, suspendFrom, suspendTo, timeslots = 20 } = useSelector((state) => state.orderConfig);

  const onChange = (selectedDate) => {
    setShow(false);
    onPickupDate(selectedDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  // const showTimepicker = () => {
  //   setShow(true);
  // };

  useEffect(() => {
    if (aditionalCitys.findIndex((e) => `${placeholder}`.toUpperCase().includes(e)) > -1) {
      setminumumDate(minpickupTime.add(extrahoursNoDubai, 'hours').toDate())
    }

  }, [placeholder])

  const valdateFrom = moment(suspendFrom).tz(DUBAI_TIMEZONE)
  const valdateTo = moment(suspendTo).tz(DUBAI_TIMEZONE)
  const dayCol = moment(collectionData?.pickupDate + 'T' + collectionData?.pickupTime).tz(DUBAI_TIMEZONE)
  const validat = valdateFrom < dayCol && dayCol < valdateTo //|| valdateFrom < dayDel && dayDel < valdateTo;


  const pickupNode = (
    <View className="">
      <MaterialCommunityIcons name="music-note-whole" size={30} color="black" />
    </View>
  );

  const { pickupDate = '', pickupTime = '' } = collectionData
  const backButton = (
    <Pressable
      className="ml-4 absolute left-0 top-1"
      onPress={() => navigation.goBack()}
    >
      <MaterialCommunityIcons
        name="keyboard-backspace"
        size={25}
        color="black"
      />
    </Pressable>
  );

  console.log("timeslots", timeslots)


  return (
    <View className={`${opensearch ? 'h-[270px] flex flex-col items-end' : ''} w-full relative `}>
      <View style={styles.mainContainer} className={` absolute  w-full bg-white rounded-xl h-auto ${opensearch ? 'top-0' : 'bottom-0'}`} >
        <View style={styles.headerContainer} className='flex flex-row pl-5 relative'>
          {
            !isAuthenticated &&
            backButton
          }
          <Text className="text-base font-montserrat-700 pb-1">
            Pick-up location
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.1, alignItems: "center" }}>{pickupNode}</View>
            <View style={{ flexDirection: "column", flex: 1 }} className='gap-4'>
              <View className='relative flex flex-row z-20'>
                <View className='flex flex-grow z-20 ' onTouchStart={() => setopensearch(true)} >
                  <GooglePlacesInput placeholder={placeholder} setopensearch={setopensearch} onLocationSet={onLocationSet} setLocation={setPickupLocation} Location={pickupLocation} pressContinue={pressContinue} placeholder1={"Enter pick-up location"} />
                </View>
                <Pressable className='absolute right-2 top-1 bottom-0 z-20 pt-2 rounded-s-full bg-white ' onPress={() => setOnMap()}>
                  <View className="mr-1 flex justify-center ">
                    <Feather name="navigation" size={22} color="#000" />
                  </View>
                </Pressable>
              </View>
              <View style={styles.rowContainer} className='z-10 mt-2 pr-0'>
                <Pressable
                  style={{ flex: 1, }}
                  onPress={showDatepicker}
                >
                  <Input
                    // styleWrap={`${styleWrap border-red-200}`}
                    value={!!pickupDate ? moment(pickupDate).format('DD MMM YYYY') + ' : ' + pickupTime :"Choose Date & Time"}
                    editable={false}
                    type="default"
                    placeholder={"Date and Time"}
                    textStyle={" text-[14px] text-[#121212]"}
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
                    value={pickupTime}
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
              <View>
                {validat ?
                  <Text>
                    Regrettably, we are fully booked this hours. We apologize for any inconvenience. Please contact us if you need a special service.
                  </Text> : <></>}
              </View>

            </View>
          </View>
              <Button
                disabled={!!validat}
                className="flex-1 semt-6 z-10"
                // textClassName="text-[#FFCC00]"
                label="Continue"
                onPress={() => {
                  if (!((pickupLocation == "" && !placeholder) || pickupDate == "")) {
                    onPressContinueOnPickup()
                  } else {
                    Toast.show('Complete the location and date', { shadowColor: 'red' });
                  }
                }}
              />

          <DatePicker
            modal
            mode={'datetime'}
            
            open={show}
            date={minumumDate}
            minimumDate={minumumDate}
            // timeZoneOffsetInMinutes={+4*60}
            minuteInterval={+timeslots}
            // minuteInterval={timeslots}
            // style={{fontSize:12}}
            onConfirm={(date) => {

              onChange(date);
            }}
            onCancel={() => {
              setShow(false);
            }}
          />


        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // right: 0,
    // backgroundColor: Colors.white,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // elevation: 5,
  },
  headerContainer: {
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 16,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 20

  },
  rowContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
});
export default CollectionSheet;
