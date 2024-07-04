import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, TouchableOpacity, Image, ScrollView, Platform } from "react-native";
import Button from "./ui/Button";
import Swaper from './Swaper'
import { Colors } from "../constants/colors";
import { AntDesign, Fontisto, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Input from "../components/ui/Input";
import { Images } from "../constants/images";
import PayByCash from "./PaymentButtons/PayByCash";
import Stripe from './PaymentButtons/Stripe'
import { getPrice, getPromoCode } from '../services/order.services'
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";
import { servicesList } from "../constants/AppConstants";
import debounce from 'lodash.debounce'
import moment from "moment";
import { updateDeliveryData } from "../store/redux/order";
import { useDispatch } from "react-redux";
import { Assets } from "@react-navigation/elements";
import { calculateVAT } from '../constants/utils'

const ReviewSheet = ({
  onupdateData,
  onPressContinueOnReview,
  data,
  onPressGoBack,
  isAuthenticated,
  onUpdatePayment,
  onCreateOrder,
  userData,
  newpayment,
  deliveryData
}) => {
  const [promoCode, setPromoCode] = useState("");
  const collectionData = data?.collect;
  const dropoffData = data?.delivery;
  const paymentData = data?.payment;
  const [selectedOption, setSelectedOption] = useState('creditCard'); // State to track selected option

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    handlePaymentFlow(option)
  };
  const handlePaymentFlow = (option) => {
    if (option === "creditCard") {

    }
    else if (option === "cashOnPickup") {
      setTimeout(() => setLoading(false), 200); setLoading(true); onUpdatePayment({ methodPay: 'cash' })

    }
  }

  const [isLoading, setLoading] = useState(false);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [bagCount, setBagCount] = useState(newpayment ? parseInt(newpayment?.bags) : 99);
  const dispatch = useDispatch()
  useEffect(() => {
    if (!!deliveryData?.dropoffDate) {

      const dateDropOff = moment(deliveryData?.dropoffDate + 'T' + deliveryData?.dropoffTime)
      const datepickup = moment(collectionData.pickupDate + 'T' + collectionData.pickupTime)

      getPriceBags(bagCount, datepickup, collectionData?.address, dateDropOff, deliveryData.address)

    }
  }, [bagCount, deliveryData?.dropoffDate])
  const getPriceBags = async (bags, collectDate, collectLocation, deliveryDate, deliveryLocation) => {
    setLoading(true)
    try {
      const response = await getPrice({ bags, collectDate, collectLocation, deliveryDate, deliveryLocation, service: '' }).catch(e => console.log("error", e))
      const { totalPrice = 0 } = response.data;
      onUpdatePayment({ amount: totalPrice, bags, codeProm: false, discount: 0 })

    } catch (error) {

    } finally {
      setLoading(false)
    }

  }
  const showPanel = () => {
    setIsPanelVisible(true);
  };

  const hidePanel = () => {
    setIsPanelVisible(false);
  };


  const handleApplyPromoCode = async () => {

    try {
      setLoading(true)
      const res = await getPromoCode({ code: promoCode, userId: userData?._id });
      console.log("res?.data", res?.data)
      const { minBags = 1, amountDiscount = 0, desc = 0 } = res?.data
      if (desc === 0 && amountDiscount === 0) {
        Toast.show('Code, not avaliable')
        // Toast.show("Code, not avaliable",
        //   {
        //     duration: Toast.durations.LONG,
        //   }
        // );
      } else {
        let validate = true;
        const minDays = res?.data?.minDays

        if (minDays > 1) {
          const del = moment(collectionData.pickupDate);
          const col = moment(dropoffData.dropoffData);

          let diff = (del.diff(col, 'days').toObject().days) || 0

          diff = diff < 0 ? diff * (-1) : diff
          if (diff < minDays) {
            // toast.info(`Code, not avaliable, min days ${minDays}`)
            validate = false;
          }
        }
        if (+minBags > bagCount) {
          validate = false;
          Toast.show('Minimum bags required ')
        }
        if (validate) {

          let discount = ''
          let amount1 = ''

          if (desc > 0) {
            discount = ((parseFloat(`${paymentData.amount}`) * desc) / 100).toFixed(2)
            amount1 = (parseFloat(`${paymentData.amount}`) - parseFloat(discount)).toFixed(2)
          } else if (amountDiscount > 0) {
            discount = amountDiscount.toFixed(2)
            amount1 = (parseFloat(`${paymentData.amount}`) - amountDiscount).toFixed(2)
          }

          // const desc = res?.data?.desc
          // const discount = ((parseFloat(`${paymentData.amount}`) * desc) / 100).toFixed(2)
          // const amount1 = (parseFloat(`${paymentData.amount}`) - parseFloat(discount)).toFixed(2)
          const payment = { amount: amount1, codeProm: true, discount, promotionCode: promoCode }
          onUpdatePayment(payment)
        }
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)

    }
  };

  const backButton = (
    <Pressable
      // style={{ flex: 0.2 }}
      className="ml-1 absolute "

      onPress={() => onPressGoBack()}
    >
      <MaterialCommunityIcons
        name="keyboard-backspace"
        size={22}
        color="black"
      />
    </Pressable>
  );

  const debounceCall = useCallback(
    debounce(textParam => {
      onupdateData({ instructions: textParam })
    }, 400),
    [],
  );

  const payment = paymentData?.methodPay === 'cash' ? (parseFloat(paymentData?.amount) + 20).toFixed(2) : paymentData?.amount;
  // const vat = calculateVAT(parseFloat(payment), 0.05);
  console.log("paymentData", vat)


  let initialPayment = paymentData?.methodPay === 'cash' ? (parseFloat(paymentData?.amount) + 20) : parseFloat(paymentData?.amount);

// Apply discount if it exists
if (parseFloat(paymentData?.discount) > 0) {
  initialPayment -= parseFloat(paymentData?.discount);
}

// Calculate VAT based on the adjusted payment amount
const vat = calculateVAT(initialPayment, 0.05);
  return (

    <View className='  bg-[#fff]' >
  
       
<View>
                <TouchableOpacity
                className='ml-[14px]'
                    style={{
                    backgroundColor: "#ffcc00",
                    borderRadius: 25,
                    height: 40,
                    width: 40,
                    alignContent:"center",alignItems:'center', justifyContent:"center",marginTop:10
                  }}
                  onPress={ ()=> onPressGoBack()}
                >
                  <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                </View>
      <ScrollView
      // stickyHeaderIndices={[0]}
       style={{marginBottom:40 }}
      >

        <View style={{ flexDirection: "row", alignItems: "center",}} className='relative'>
          <View style={styles.headerContainer}>
            <Text className="text-xl font-montserrat-500 " style={{ alignSelf: "flex-start", marginLeft: 5 }}>Overview</Text>
            {/* <Text className="text-xs font-montserrat-400">
              Service: Baggage Delivery
            </Text> */}

            <View style={styles.topContainer} className="z-10 flex-row justify-between py-[20px] px-[30px] bg-white rounded-[10px] mx-1">
              <View style={{ flex: 0.65 }}>
                <Text className="text-base font-montserrat-700">
                  How many Bags?
                </Text>
                <Text className="text-xs2 font-montserrat-400 max-w-[160px]" style={{}}>
                  Luggage, Backpacks, Shopping Bags, Strollers, Golf
                  Bags
                </Text>
              </View>
              <View className= "items-center justify-evenly flex-row gap-6" style={{ flex: 0.35 }} >
                <Pressable
                  onPress={() => {
                    if (bagCount > 1) {
                      dispatch(updateDeliveryData({ bagsCount: bagCount }))
                      setBagCount(bagCount - 1);
                    }
                  }}
                  style={{ backgroundColor: "#e9e9e9", borderRadius: 5 }}
                  className="px-2 w-[36px] items-center h-[36px] justify-center"
                >
                  <Text className="text-[20px] font-montserrat-700">-</Text>
                </Pressable>
                <Text className="text-[18px] font-montserrat-700 mx-2">{bagCount}</Text>
                <Pressable
                  // style={styles.pressableBtn}
                  style={{ backgroundColor: "#e9e9e9", borderRadius: 5 }}
                  onPress={() => {
                    dispatch(updateDeliveryData({ bagsCount: bagCount }));
                    setBagCount(bagCount + 1)
                  }}
                  className="px-2 w-[36px] items-center h-[36px] justify-center"
                >
                  <Text className="text-[20px] font-montserrat-700">+</Text>
                </Pressable>
              </View>

            </View>
          </View>
          {/* {backButton} */}
        </View>
        <View style={styles.topContainer}>
          <View className='flex-row p-4 justify-between items-start'>
            <View style={{ flex: 1 }} className="p-2">
              {/* <Text className="text-xl font-montserrat-700 p-2 pl-0 ">{servicesList[data?.data?.service ?? '']}</Text> */}
              <View className='flex flex-row'>
                <Text className="text-sm font-montserrat-500 w-1/3">
                  Pick-up:
                </Text>
                <View className="">
                  <Text className="text-sm font-montserrat-700">
                    {moment(collectionData?.pickupDate).format('DD MMM YYYY')} {collectionData?.pickupTime}
                  </Text>
                  <Text className="text-xs font-montserrat-400 w-[150px]">
                    {collectionData?.title}
                  </Text>
                </View>
              </View>
              <View className='mt-3 flex flex-row'>
                <Text className="text-sm font-montserrat-500 w-1/3">
                  Delivery:
                </Text>
                <View className="">
                  <Text className="text-sm font-montserrat-700">
                    {moment(dropoffData?.dropoffDate).format('DD MMM YYYY')} {dropoffData?.dropoffTime}
                  </Text>
                  <Text className="text-xs font-montserrat-400 w-[150px]">
                    {dropoffData?.title}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{}} className='justify-end items-center'>
              <View className="flex border border-slate-300 rounded-[10px] p-1 px-3 justify-center items-center">
                <Text className="text-2xl font-montserrat-700">
                  {/* {dropoffData?.bagsCount} */}
                  {bagCount}
                </Text>
                <Text className='whitespace-nowrap text-xs'>Bags</Text>
              </View>
            </View>
          </View>
          <Text style={{ fontWeight: "700", }} className="ml-6">Price Information</Text>
          <View style={{ height: .4, width: "87%", backgroundColor: "gray", alignSelf: "center", marginTop: 8 }} />
          <View>
            <View style={{ flexDirection: "row", alignContent: "space-between", justifyContent: "space-between", width: "85%", alignSelf: "center", marginTop: 10 }}>
              <Text style={{ color: '#212121', fontSize: 12 }} className='w-[120px]'>Service fee
                </Text>
              <Text style={{ color: '#212121', fontSize: 12 }} className='w-[40px]'>AED</Text>
              <Text style={{ color: '#212121', fontSize: 12 }} className='w-[70px] text-right'>{vat.netAmount}</Text>
            </View>
            {paymentData?.methodPay === 'cash' ?
              <View style={{ flexDirection: "row", alignContent: "space-between", justifyContent: "space-between", width: "85%", alignSelf: "center", marginTop: 5 }}>
                <Text style={{ color: '#212121', fontSize: 12 }} className='w-[120px]'>Cash service fee</Text>
                <Text style={{ color: '#212121', fontSize: 12 }} className='w-[40px]'>AED</Text>
                <Text style={{ color: '#212121', fontSize: 12 }} className='w-[70px] text-right'>20.00</Text>
              </View> : null}

            {`${paymentData.discount}` !== '0' ?
              <View style={{ flexDirection: "row", alignContent: "space-between", justifyContent: "space-between", width: "85%", alignSelf: "center", marginTop: 5 }}>
                <Text style={{ color: '#212121', fontSize: 12 }}>Discount</Text>
                <Text style={{ color: '#212121', fontSize: 12 }}>AED</Text>
                <Text style={{ color: '#212121', fontSize: 12 }}>{paymentData.discount}</Text>
              </View>
              : <></>}
            <View style={{ flexDirection: "row", alignContent: "space-between", justifyContent: "space-between", width: "85%", alignSelf: "center", marginTop: 5 }}>
              <Text style={{ color: '#212121', fontSize: 12 }} className='w-[120px]'>5% VAT</Text>
              <Text style={{ color: '#212121', fontSize: 12 }} className='w-[40px]'>AED</Text>
              <Text style={{ color: '#212121', fontSize: 12 }}  className='w-[70px] text-right'>{vat.vatAmount}</Text>
            </View>
          </View>
          <View className='p-5 items-center justify-between flex-row py-1 bg-[#FFEC81] mt-5'>
            <Text className="text-[14px] font-montserrat-700">Total</Text>
            <View style={{ alignItems: "flex-end" }}>
              <Text className="text-[20px] font-montserrat-700">
                AED {initialPayment}
              </Text>
              <Text className="text-xs2 font-montserrat-300">including VAT</Text>
            </View>
          </View>
          <View className='flex justify-end flex-row gap-3 p-3 items-center'>
            <TextInput editable={!paymentData?.codeProm} type="text" className=' border-[1px] rounded-[5px] px-3 w-32 border-[#0000001A] py-1.5 text-[12px] placeholder:opacity-100 placeholder:text-[#212121] text-[#212121]' placeholder={'Promo Code'} onChangeText={(text) => {
              setPromoCode(text);
            }} />
            <TouchableOpacity disabled={paymentData?.codeProm} onPress={() => handleApplyPromoCode()}
              className={`p-1 px-3 rounded-[5px] bg-[#D9D9D9] text-black py-2 ${paymentData.codeProm ? 'bg-green-400 border-2 border-green-100' : ''}`}>
              <Text className='text-[10px] font-montserrat-600'>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className='p-4 mt-1'>

          <Text className='text-[12px] font-montserrat-600'>Information you would like to share with us:</Text>
          <Input
            className={'mt-4 h-[100px]'}
            placeholder={'Instructions e.g. Meeting at parking, opposite bakery'}
            textStyle={'bg-white text-[12px] font-montserrat-400 p-2'}
            numberOfLines={4}
            multiline={true}
            onChange={(e) => debounceCall(e)}
          />
        </View>
        <View className='px-4'>
          <Text className='font-montserrat-600 text-[16px] mb-2'>Pay with</Text>
          <View className='flex flex-row gap-[10px] items-center mb-10 justify-between'>
            <TouchableOpacity className={`${paymentData?.methodPay === 'card' ? 'bg-[#0F978A80] ¸' : 'bg-[#fff] border-[#00000080]'}  h-[36px] w-[47%] pb-[6px] rounded-md flex flex-row justify-center gap-[10px] items-center !text-[#000] border-[1px] text-[16px] font-montserrat-500`}
              onPress={() => { setTimeout(() => setLoading(false), 200); setLoading(true); onUpdatePayment({ methodPay: 'card' }) }}>
              <Image
                className=" p-0 m-0 w-[22px]"
                source={require('../../assets/card.png')}
                resizeMode="contain"
              />
              <Text className='font-montserrat-600 text-[12px] mt-[-6px]'>Card</Text>
            </TouchableOpacity>
            <TouchableOpacity className={`${paymentData?.methodPay === 'cash' ? 'bg-[#0F978A80] border-[#0F978A80]' : 'bg-[#fff] border-[#00000080]'}  h-[36px] w-[47%] pb-[6px] rounded-md flex flex-row justify-center gap-[10px] items-center  !text-[#000] border-[1px] text-[16px] font-montserrat-500`}
              onPress={() => { setTimeout(() => setLoading(false), 200); setLoading(true); onUpdatePayment({ methodPay: 'cash' }) }}
            >
              <Image
                className=" p-0 m-0 w-[22px]"
                source={require('../../assets/cash.png')}
                resizeMode="contain"
              />
              <Text className='font-montserrat-600 text-[12px]'>Cash</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View className="flex bg-white px-4 py-4 rounded-xl border border-slate-50 shadow-md"
          style={{ elevation: 1 }}
        >
          <View className='flex-row justify-between gap-3'>
            <TouchableOpacity onPress={() => { setTimeout(() => setLoading(false), 200); setLoading(true); onUpdatePayment({ methodPay: 'card' }) }} className={`flex flex-1 flex-row items-center justify-between bg-white py-2 border rounded-md px-3 border-neutral-400 ${paymentData.methodPay === 'card' ? 'bg-slate-200' : 'bg-white"'}`} >
              <View className={`flex flex-row items-center gap-3 ${paymentData.methodPay === 'card' ? '' : 'opacity-30'}`}>
                <Image
                  className=" p-0 m-0 w-8 h-8"
                  source={Images.icons.card}
                  resizeMode="contain"
                />
                <Text className="text-lg">Card</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setTimeout(() => setLoading(false), 200); setLoading(true); onUpdatePayment({ methodPay: 'cash' }) }} className={`flex flex-1 flex-row items-center justify-between bg-white p-0 border rounded-md px-3 border-neutral-400 ${paymentData.methodPay === 'cash' ? 'bg-slate-200' : 'bg-white"'}`} >
              <View className={`flex flex-row items-center gap-3 ${paymentData.methodPay === 'cash' ? '' : 'opacity-30'}`}>
                <Image
                  className=" p-0 m-0 w-8 h-8"
                  source={Images.icons.cash}
                  resizeMode="contain"
                />
                <Text className="text-lg">Cash</Text>
              </View>
            </TouchableOpacity>
          </View>
              
          <View>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}
        onPress={() => handleOptionSelect('creditCard')}
      >
        <Fontisto
          name={selectedOption === 'creditCard' ? 'radio-btn-active' : 'radio-btn-passive'}
          size={10}
          color="black"
        />
        <Text style={{ marginLeft: 8, fontSize: 12 }}>
          We accept all major credit or debit cards
        </Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}
        onPress={() => handleOptionSelect('cashOnPickup')}
      >
        <Fontisto
          name={selectedOption === 'cashOnPickup' ? 'radio-btn-active' : 'radio-btn-passive'}
          size={10}
          color="black"
        />
        <Text style={{ marginLeft: 8, fontSize: 12 }}>
          Cash on Pick-up{' '}
          <Text style={{ fontSize: 10, color: 'gray' }}>(additional 20 AED service charge applies)</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center',  }}
        onPress={() => handleOptionSelect('paymentIcon')}
      >
        <Fontisto
          name={selectedOption === 'paymentIcon' ? 'radio-btn-active' : 'radio-btn-passive'}
          size={10}
          color="black"
        />
        <Image
          source={require('../../assets/pay.png')}
          resizeMode="contain"
          style={{ width: 60, marginLeft: 8 }}
        />
      </TouchableOpacity>
    </View>

          <View >

          </View>
          
          </View> */}
        <View className="py-3 px-4" key={paymentData.amount}>
          {
            (isAuthenticated || (!!userData?.email && !!userData.firstName && !!userData?.lastName)) ?
              paymentData?.methodPay === 'card' ? <Stripe onUpdatePayment={payment => onUpdatePayment(payment)} /> : <PayByCash onCreateOrder={onCreateOrder} />
              : <>
                <Button
                  className="px-2.5 w-full mt-6"
                  // label="Continue"
                  onPress={() => onPressContinueOnReview()}
                />
              </>
          }
        </View>
      </ScrollView>
      <Spinner visible={isLoading} />
    </View>

  );
};
// {/* <Swaper isVisible={isPanelVisible} onClose={hidePanel} >
//   <View className='bg-white border border-neutral-200 rounded-t-lg py-2'>
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} className="p-3 bg-slate-100">
//       <Text className="text-xl font-semibold">Payment methods</Text>
//     </View>

//     <TouchableOpacity onPress={() => { hidePanel(); onUpdatePayment({ methodPay: 'card' }) }} className="flex flex-row items-center justify-between bg-slate-50 px-4 py-1"  >
//       <View className='flex flex-row items-center gap-3'>
//         <Image
//           source={Images.icons.card}
//           className=" p-0 m-0 w-12 h-12"
//           resizeMode="contain"
//         />
//         <Text>Card</Text>
//       </View>
//       <RadioButton selected={paymentData.methodPay === 'card'} />
//     </TouchableOpacity>
//     <TouchableOpacity onPress={() => { hidePanel(); onUpdatePayment({ methodPay: 'cash' }) }} className="flex flex-row items-center justify-between bg-white  px-4 py-1" >
//       <View className='flex flex-row items-center gap-3'>
//         <Image
//           className=" p-0 m-0 w-12 h-12"
//           source={Images.icons.cash}
//           resizeMode="contain"
//         />
//         <Text>Cash</Text>
//       </View>
//       <RadioButton selected={paymentData.methodPay === 'cash'} />
//     </TouchableOpacity>
//   </View>
// </Swaper> */}
const styles = StyleSheet.create({
  mainContainer: {
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // right: 0,
    // backgroundColor: "white",
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // elevation: 5,
  },
  headerContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    alignItems: "center",
    flex: 1,
  },
  topContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.01 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 10
  },
  rowContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
});
export default ReviewSheet;

function RadioButton(props) {
  return (
    <View style={[{
      height: 24,
      width: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: Colors.primaryYellow,
      alignItems: 'center',
      justifyContent: 'center',
    }, props.style]}>
      {
        props.selected ?
          <View style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: Colors.primaryYellow,
          }} />
          : null
      }
    </View>
  );
}