import React, { useCallback, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Images } from "../constants/images";
import { Colors } from "../constants/colors";
import Input from "../components/ui/Input";
import Button from "./ui/Button";
import moment from "moment";
import debounce from 'lodash.debounce'
import Toast from "react-native-root-toast";
import { useSelector, useDispatch } from "react-redux";
import { UpdateInfoExtraN } from '../services/order.services'
import { AuthContext } from "../store/context/auth-context";
import Spinner from "react-native-loading-spinner-overlay";
import { updatePassportNumber, uploadPassport } from "../services/auth.services";
import QRCode from 'react-native-qrcode-svg';

const BookingSummary = ({ navigation, bookingInfo, onPressDone, orderData }) => {


  const [loading, setLoading] = useState(false);

  // const { collect, data: { orderFleetbase = {}, ...data }, delivery, payment, contact } = bookingInfo;
  const { data: { passportPhoto = '', orderFleetbase = {} } } = orderData;

  const { fcollection, delivery, payment, contact, qr_code, _id } = bookingInfo;
  const [enableForm, setenableForm] = useState(true)

  const submit = async (datos) => {
    setLoading(true)
    try {
      const data = { ...datos, bookingId: bookingInfo?._id }

      // const uploadPasport = await uploadPassport({
      //   customer_uuid: orderFleetbase?.customer?.uuid,
      //   doc_type: "passport_image",
      //   document: passportPhoto
      // });

      // const res1 = await updatePassportNumber(contact_id, {
      //   passport_number: passportNumber
      // });


      const res = await UpdateInfoExtraN(data)

      if (res.status === 200 || res.status === 201) {
        // push(`/order/success?id=${booking.wooExternal}`)
        Toast.show('Data saved successfully')
        setenableForm(false)
        // refresh()
        // setenable(false);
      } else {
        // setenable(false);
      }
      setLoading(false)
    } catch (error) {
      // toast.error('Error saving payment, CONTACT US to resolve this issue')
      // setenable(false);

      setLoading(false)
    }
  }




  return (

    <View style={{ flex:1,backgroundColor: "#fff", borderRadius: 10, padding: 16,}}>
    <View style={{}}>
      <Image
        className="w-full h-12"
        source={Images.icons.completed}
        resizeMode="contain"
      />

      <Text className={"text-[22px] font-montserrat-600 mt-4 text-center"}>
        Booking Summary
      </Text>

      
      <Text className='text-[14px] font-montserrat-700 mt-8 text-center'>Thank you for your Order {contact?.fcFirstName} {contact?.fcLastName},</Text>
      <Text className={"text-[12px] font-montserrat-400 text-center max-w-[350px] mx-auto mt-1"}>
         an email confirmation
        will be send to you shortly with an overview & additional information
        to email: {contact?.fcEmail}
      </Text>
      <Text className={"text-[11px] font-montserrat-600 mt-10 text-center"}>
        Your Order Reference Number: {bookingInfo?.bookingExtId}
      </Text>
      <Text className={"text-[14px] font-montserrat-600 mt-5 text-center"}>
        Services Booked: Arriving in Dubai
      </Text>
      <Text className={"text-[11px] font-montserrat-500 text-[#212121] text-center mt-1.5"}>(Collection (Drop-Off), Storage & Delivery)</Text>

      {/* 
      <Text className={"text-xs font-montserrat-200 text-center"}>
        (Collection (Drop-Off), Storage & Delivery)
      </Text> */}

      {/* <Image
        className="w-full h-28 my-4"
        source={{ uri: `data:image/png;base64,${qr_code}` }}
        // source={{ uri: `data:image/png;base64,${data?.qr_code}` }}
        resizeMode="contain"
      /> */}
      {/* <View className="flex row items-center p-5 w-full">
        <QRCode
          value={bookingInfo._id}
          size={150}
          logo={{ uri: Images.general.logob64 }}
          logoSize={25}
          logoBackgroundColor='transparent'
        />
      </View> */}


      <View className='mt-[20px]'>
        <Text className={"text-[11px] font-montserrat-600 mt-4"}>Collection</Text>
        <Text className={"text-[11px] font-montserrat-300"}>
          Location: {fcollection?.fcollectionLocation}
        </Text>
        <Text className={"text-[11px] font-montserrat-300"}>
          Date:{" "}
          {moment(fcollection?.FcollectionDate).format("DD-MMM-YYYY : hh:mm A")}
        </Text>
        <Text className={"text-[11px] font-montserrat-600 mt-6"}>Delivery</Text>
        <Text className={"text-[11px] font-montserrat-300"}>
          Location: {delivery?.fdeliveryLocation}
        </Text>
        <Text className={"text-[11px] font-montserrat-300"}>
          Date:{" "}
          {moment(delivery?.FdeliveryDate).format("DD-MMM-YYYY : hh:mm A")}
        </Text>
      </View>
      {!!enableForm && 
      <BookingExtraData navigation={navigation} bookingInfo={bookingInfo} submit={submit} passportPhoto={passportPhoto} />

      } 

      <View className='flex justify-center flex-row items-center gap-6 '>
        <Image source={require("../../assets/wallet.png")} className="w-[100px] " resizeMode="contain"/>
        <Image source={require("../../assets/add.png")} className='w-[100px] ' resizeMode="contain" />

      </View>

      <Button
        className="px-2.5 w-full mt-2"
        label="Continue"
        onPress={() => onPressDone()}
      />
      <Spinner visible={loading} />
    </View>
    </View>

  );
};


export default BookingSummary;


const BookingExtraData = ({ navigation, bookingInfo, submit, passportPhoto }) => {


  const authCtx = useContext(AuthContext);
  const { isAuthenticated } = authCtx;
  const userData = useSelector((state) => state.user.data);
  // const isPassportVerified = userData?.isPassportVerified ?? ''
  // const isPassportVerified = userData?user?.passportFile ?? ''
  const { fcollection, delivery, payment, contact } = bookingInfo;
  const [state, setstate] = useState({ airline: '', fnumber: '', fFrom: '' })
  const [passport, setpassport] = useState('')
  const debounceCall = useCallback(
    debounce((name, textParam) => {
      setstate(prev => ({ ...prev, [name]: textParam }))
    }, 400),
    [],
  );

  const HandleSave = () => {
    const dat = {
      fflyingNumber: state?.fnumber ?? '',
      fwichAirline: state?.airline ?? '',
      fflyingFrom: state?.fFrom ?? '',
      hearAboutUs: '',
      fdeliveryFiles: passportPhoto ?? '',
      fdeliveryInstruction: '',
    }
    submit(dat);


  }



  // (!isPassportVerified || !isAuthenticated ) &&

  return (<>
    {/* {(!delivery.fdeliveryFiles) &&
      <Pressable
        className=""
        onPress={() => navigation.navigate("ScanPassportScreenbook")}
      >
        <View className="border rounded-md border-slate-300 items-center mt-5 p-5">
          {!!passportPhoto ?
            <Image
              className="w-full h-28 my-4"
              source={{ uri: passportPhoto }}
              // source={{ uri: `data:image/png;base64,${data?.qr_code}` }}
              resizeMode="contain"
            />
            : <>
              <Text className='text-lg font-montserrat-600' >Upload your passport copy</Text>
              <Text className='text-xs font-montserrat-300 text-center ' >As per local law we must have your passport copy picture page uploaded. This is for security reasons for all parties</Text>
              <View className="flex-row rounded-xl bg-[#F91414] p-3 items-center justify-center space-y-2.5 my-3">

                <Text className="font-montserrat-600 text-base text-white">Scan Passport Picture Page</Text>
              </View>
            </>
          }
        </View>
      </Pressable>
    } */}
    {!fcollection?.fservices !== 'transfer' &&
   <View className="items-center mt-10">
   <Text className='text-[14px] font-montserrat-700' >Your flight Details</Text>
   <Text className='text-[10px] font-montserrat-300 max-w-[260px] text-center mt-[2px] mb-4' >( If you have your details on hand, please share with us,
    so we can have  you meet & greet ready. )</Text>
   <Input
     className={'mt-3'}
     placeholder={'Airline'}
     onChange={(e) => debounceCall('airline', e)}
   />
   <Input
     className={'mt-3'}
     placeholder={'Flight Number'}
     onChange={(e) => debounceCall('fnumber', e)}
   />
   <Input
     className={'mt-3'}
     placeholder={'Flying from'}
     onChange={(e) => debounceCall('fFrom', e)}
   />
 </View>

      }
    {
      fcollection?.fservices !== 'transfer' &&
      <Button className={`bg-[${Colors.primaryYellow}] p-3 rounded-md m-3 `}
        title='Save data'
        textClassName={''}
        label={'Save'}
        onPress={() => HandleSave()}
      />
    }
  </>
  )

}





// return (
//   <View style={{ backgroundColor: "#fff", borderRadius: 10, padding: 16 }}>
//     <Image
//       className="w-full h-12"
//       source={Images.icons.completed}
//       resizeMode="contain"
//     />

//     <Text className={"text-xl font-montserrat-600 mt-4 text-center"}>
//       Booking Summary
//     </Text>
//     <Text className={"text-sm font-montserrat-300 mt-4 text-center"}>
//       Thank you for your Order {data?.customer?.name}, an email confirmation
//       will be send to you shortly with an overview & additional information
//       to email: {data?.customer?.email}
//     </Text>
//     <Text className={"text-sm font-montserrat-600 mt-4 text-center"}>
//       Your Order Reference Number: {data?.id}
//     </Text>

//     <Text className={"text-sm font-montserrat-500 mt-4 text-center"}>
//       Services Booked: Baggage Delivery
//     </Text>
//     <Text className={"text-xs font-montserrat-200 text-center"}>
//       (Collection (Drop-Off), Storage & Delivery)
//     </Text>

//     <View>
//       <Text className={"text-sm font-montserrat-500 mt-4"}>Collection</Text>
//       <Text className={"text-xs font-montserrat-200"}>
//         {data?.payload?.pickup?.name}
//       </Text>
//       <Text className={"text-xs font-montserrat-200"}>
//         Date:{" "}
//         {moment(data?.payload?.hub_point?.pickup_time).format(
//           "DD-MMM-YYYY HH:mm"
//         )}
//       </Text>
//       <Text className={"text-sm font-montserrat-500 mt-8"}>Delivery</Text>
//       <Text className={"text-xs font-montserrat-200"}>
//         {data?.payload?.dropoff?.name}
//       </Text>
//       <Text className={"text-xs font-montserrat-200"}>
//         Date:{" "}
//         {moment(data?.payload?.hub_point?.dropoff_time).format(
//           "DD-MMM-YYYY HH:mm"
//         )}
//       </Text>
//     </View>

//     <Button
//       className="px-2.5 w-full mt-6"
//       label="Done"
//       onPress={() => onPressDone()}
//     />
//   </View>
// );