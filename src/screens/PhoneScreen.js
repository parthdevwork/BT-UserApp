import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import Toast from "react-native-root-toast";
import Button from "../components/ui/Button";
import { sendOTP } from "../services/auth.services";
// import PhoneInput from "react-native-phone-input";
import Spinner from "react-native-loading-spinner-overlay";
import PhoneInput from "react-native-international-phone-number";
import Input from "../components/ui/Input";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
// import Clipboard from '@react-native-clipboard/clipboard';

const PhoneScreen = ({ route, navigation }) => {
  const { driverDetails } = route.params || {};
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setemail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('ae');

  const handleContinuePress = () => {
    // const customerPhoneNumber = selectedCountry.callingCode + phoneNumber.replace(/ /g, "");

    // if (customerPhoneNumber.length < 10) return Toast.show("Please enter a valid phone number.", { duration: Toast.durations.LONG });
    if (email.length < 5) return Toast.show("Please enter a valid email.", { duration: Toast.durations.LONG });

    setLoading(true);
    setLoading(false);
    // navigation.navigate("OTPScreen", {ß
    //   phone: customerPhoneNumber,
    // });
    // return
    sendOTP({  email: email })
      .then((res) => {
        setLoading(false);

        if (res?.status === 200 || res?.status === 201) {

          // Clipboard.setString()
          navigation.navigate("OTPScreen", {
            email
          });
        }
      })
      .catch((error) => {
        setLoading(false);

        Toast.show(
          `Error! - ${error?.response?.data?.errors[0] || "Please try again later."
          }`,
          {
            duration: Toast.durations.LONG,
          }
        );
      });
  };

  function handleInputValue(phoneNumber) {
    setPhoneNumber(phoneNumber);
  }

  function handleSelectedCountry(country) {
    setSelectedCountry(country);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableOpacity onPress={()=> navigation.goBack()}>
            <AntDesign name="leftcircleo" size={24} color="black" style={{ marginLeft: 20, marginTop: 20 }} />
            </TouchableOpacity>
      <View style={{ padding: 20 }}>
        <View style={{ marginTop: 30 }}>
          {/* <Text className="text-lg font-montserrat-700 mt-4">
            How should we reach you
          </Text>
          <Text className="text-base font-montserrat-500 mt-4">
            Enter your mobile number
          </Text> */}

          {/* <PhoneInput
                initialCountry={"ae"}
                initialValue={phoneNumber}
                onChangePhoneNumber={(value) => setPhoneNumber(value)}
              /> */}

          {/* <PhoneInput
            phoneInputStyles={{ container: { borderColor: "#000", marginTop: 16 } }}
            value={phoneNumber}
            defaultCountry="AE"
            placeholder=" "
            onChangePhoneNumber={handleInputValue}
            selectedCountry={selectedCountry}
            onChangeSelectedCountry={handleSelectedCountry}
          /> */}
          <Text className="text-base font-montserrat-500 mt-4">
            Enter your Email
          </Text>
          <Input
          textStyle={'px-[20px]'}
            type="email"
            placeholder="name@example.com"
            className={"mt-4"}
            value={email}
            onChange={(e) => setemail(e.toLowerCase())}
          />
        </View>
        <Button
          className="w-full mt-5"
          disabled={isLoading}
          label="Continue"
          onPress={handleContinuePress}
        />
      </View>
      <View className=" flex items-center w-full px-8 ">
                    
                    {/* <View className='mt-[10px] mb-[10px] w-full flex flex-row items-center justify-between'>
                        <View className='h-[1px] w-[30%] bg-[#aaa]'></View>
                          <Text className='text-[14px] font-normal text-center'>Or</Text>
                          <View className='h-[1px] w-[30%] bg-[#aaa]'></View>
                    </View>
                    <Button
                        style={{ gap: '20px' }}
                        LeftIcon={<AntDesign name="google" size={16} color="black" />}
                        wrapperClassName={"gap-[10px] items-center"}
                        className={`w-full border-neutral-400 border-[1px] rounded-[6px] py-[10px] bg-white flex justify-center mt-[20px]`}
                        textClassName={`font-inter-400 text-[14px]`}
                        label="Continue with Google"
                    // onPress={loginHandler}
                    />
                    <Button
                        style={{ gap: '20px' }}
                        LeftIcon={<AntDesign name="apple1" size={16} color="black" />}
                        wrapperClassName={"gap-[10px]"}
                        className={`w-full border-neutral-400 border-[1px] rounded-[6px] py-[10px] bg-white flex justify-center mt-[20px]`}
                        textClassName={`font-inter-400 text-[14px]`}
                        label="Continue  with Apple"
                    // onPress={loginHandler}
                    />
                     */}
                    
                </View>
                <View className='border-[#00000080] border-[.5px] mt-[20px] mx-[24px] '></View>
      <Text className='text-neutral-500 p-5 text-justify text-[9px]'>
        By proceeding, I agree the <Text className="text-black underline">Privacy Policy.</Text> & <Text className="text-black underline">Terms or Conditions</Text> and consent to get calls, WhatsApp or SMS message, including by automated means, from BaggageTaxi and its affiliates to the number provided. This site is protected by reCAPTCHA
      </Text>
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  }
});
export default PhoneScreen;
