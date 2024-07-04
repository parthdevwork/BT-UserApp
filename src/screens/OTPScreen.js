import { useContext, useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import Toast from "react-native-root-toast";
import Button from "../components/ui/Button";
import OTPInput from "../components/ui/OTPInput";
import { sendOTP, verifyCode } from "../services/auth.services";
import { initUser, setUser } from "../store/redux/user";
import Spinner from "react-native-loading-spinner-overlay";
import { AntDesign } from "@expo/vector-icons";

const OTPScreen = ({ route, navigation }) => {
  const { phone, email } = route.params;
  const dispatch = useDispatch();
  const [otp, setCode] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [desableOtp, setdesableOtp] = useState(false);
  const [seconds, setSeconds] = useState(90)
  const handletimeout = () => {
    setdesableOtp(true)
    setSeconds(90)
  }

  useEffect(() => {
    dispatch(initUser({}))
    handletimeout()
  }, [])


  useEffect(() => {

    const timer = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    if (seconds === 0) {
      clearInterval(timer);
      setdesableOtp(false)
    }

    return () => clearInterval(timer);
  }, [seconds]);

  useEffect(() => {
    if (otp.length === 4) {
      handleContinuePress()
    }
  }, [otp])

  const handleContinuePress = async () => {
    setLoading(true);
    
    const DATA ={
      otp:otp,
      email:email
    }
    try {

      console.log(DATA);
      const data  = await verifyCode(DATA)

     console.log("========>",data.status);

      setLoading(false);

      if (data?.status === 201) {
        dispatch(setUser(data?.user));
        navigation.navigate("PersonalInfoScreen", {
          // phone: phone,
          email: email
        });
      } else {
        Toast.show(
          `Error! - "Please try again later."}`)
      }

    } catch (error) {
      setLoading(false);
      // const err = error?.response?.data?.errors[0] ?? '';
      // console.log("-error-", err)
      Toast.show(
        `Error verifying code! - ${"Please try again later."
        }`,
        {
          duration: Toast.durations.LONG,
        }
      );
    }

  };

  const handleResend = async () => {
    sendOTP({ phone: null, email: email })
      .then((res) => {
        if (!!res?.data?.otp) {
          handletimeout()
          Toast.show(`OTP sent Successfully`, {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((error) => {
        Toast.show(
          `Error! - ${error?.response?.data?.errors[0] || "Please try again later."
          }`,
          {
            duration: Toast.durations.LONG,
          }
        );
      });
  };

  // console.log(desableOtp)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", }}>
       <TouchableOpacity onPress={()=> navigation.goBack()}>
            <AntDesign name="leftcircleo" size={24} color="black" style={{ marginLeft: 20, marginTop: 20 }} />
            </TouchableOpacity>
      <View
        style={{
          backgroundColor: "#fff",
          padding: 16,
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View className="w-full px-2 h-60 mt-24">
          <Text className="text-normal font-montserrat-600 mt-4">
          Enter the 4-digit code sent to you at:
          </Text>
          <View className="w-full mb-2 mt-1">
            <Text className="text-[12px] font-montserrat-500 text-[#212121] opacity-60">
            Please enter the 4 digit verification code send to your Email ID. (If you did not receive it, please check your spam folder)
            </Text>
            <Text className="text-base font-montserrat-500">{phone}</Text>
          </View>
          <View className=" mx-auto">
            <OTPInput value={otp} onChange={(value) => setCode(value)} />
          </View>
          <TouchableOpacity className={`${desableOtp ? ' bg-opacity-25' : ''} p-2 mt-4 rounded-md `} onPress={() => handleResend()} disabled={desableOtp}>
            <Text className={`${desableOtp ? ' bg-opacity-80' : ''}underline text-sm font-montserrat-500 text-center`}>
              Resend {desableOtp ? ` in ${seconds} seconds` : ''}
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          className="w-full mt-4"
          disabled={isLoading}
          label="Continue"
          onPress={handleContinuePress}
        />
      </View>
      <Spinner visible={isLoading} />
    </SafeAreaView >
  );
};

export default OTPScreen;
