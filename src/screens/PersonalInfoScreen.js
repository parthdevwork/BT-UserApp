import React, { useState, useContext } from "react";
import { View, Text, SafeAreaView, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import Toast from "react-native-root-toast";
import Layout from "../components/Layout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { registerCustomerSignupN, getDataUser } from "../services/auth.services";
import { setUser } from "../store/redux/user";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from '../store/context/auth-context';
import Spinner from "react-native-loading-spinner-overlay";
import PhoneInput from "react-native-international-phone-number";
import { AntDesign, Feather } from "@expo/vector-icons";

const PersonalInfoScreen = ({ route, navigation }) => {
  const {  email } = route.params;
  console.log( email)
  const dispatch = useDispatch();

  const [repassword, setRepassword] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  // const [email, setEmail] = useState("");
  const authCtx = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const userData = useSelector((state) => state.user.data);
  const [selectedCountry, setSelectedCountry] = useState('ae');

  const loginHandler = async () => {
    setLoading(true);
  // console.log(phoneNumber);
    const dat = {
      firstName: firstname, lastName: lastname, email: email.toLowerCase(),
      password, password_confirmation: repassword, phone: phoneNumber
    }
    console.log(dat);

    try {
      const res = await registerCustomerSignupN(dat);
      const { token, userId } = res?.data || {};

      const user = await getDataUser(token, userId)
      const userData = user?.data || {};
      authCtx.authenticate(token);
      dispatch(setUser({ ...userData, token, userId }));
      navigation.navigate("LoginScreen")
      setLoading(false);

    } catch (error) {
      setLoading(false);
      let message = "Authentication failed! Could not log you in.";
      if (error?.response?.data?.error) message = error.response.data.error
      Toast.show(message, { duration: Toast.durations.LONG });
      setLoading(false);
    }
  }

  const passwordHandler = (enteredText) => {
    setPassword(enteredText);
  }

  const repasswordHandler = (enteredText) => {
    setRepassword(enteredText);
  }

  const handleContinuePress = () => {
    const user = userData

    const customer = { firstName: firstname, lastName: lastname, email, userIdFleetbase: '', phone: phone }

    dispatch(setUser(customer));
    navigation.navigate("MultiPurposeMapScreen", { email: email });

    setLoading(true);
    // registerCustomerSignup({
    //   uuid: user?.uuid,
    //   name: firstname,
    //   email: email,
    // })
    //   .then((res) => {
    //     console.log("***** ----- ***")
    //     console.warn(res)
    //     const data = res?.data;
    //     if (data?.status === "OK") {
    //       console.log("Data",data)

    // Flow return to MultiPurposeMapScreen for checkout
    //   }
    //   setLoading(false);

    // })
    // .catch((error) => {
    //   setLoading(false);
    //   console.log("ERROR", error.response.data);
    //   navigation.navigate("MultiPurposeMapScreen", { email: email }); //
    //   Toast.show(
    //     `Error! - ${
    //       error?.response?.data?.error || "Please try again later."
    //     }`,
    //     {
    //       duration: Toast.durations.LONG,
    //     }
    //   );
    // });

  };

  const emailHandler = (enteredText) => {
    setEmail(enteredText);
  };

  const firstnameHandler = (enteredText) => {
    setFirstname(enteredText);
  };

  const lastnameHandler = (enteredText) => {
    setLastname(enteredText);
  };


  function handleInputValue(phoneNumber) {
    setPhoneNumber(phoneNumber);
  }

  function handleSelectedCountry(country) {
    setSelectedCountry(country);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", }}>
      <TouchableOpacity onPress={()=> navigation.goBack()}>
            <AntDesign name="leftcircleo" size={24} color="black" style={{ marginLeft: 20, marginTop: 20 }} />
            </TouchableOpacity>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View
          style={{
           
            padding: 16,
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View style={{ marginTop: 24 }}>
            <Text className="text-base font-montserrat-500 mt-4">
            Enter your personal information
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              gap:5
              }}
              className="mt-3"
            >
              <Input
                style={{ flex: 1, marginRight: 12 }}
                placeholder="First Name"
                value={firstname}
                onChange={firstnameHandler}
              />
              <Input
                style={{ flex: 1 }}
                placeholder="Last Name"
                value={lastname}
                onChange={lastnameHandler}
              />
            </View>
            <Text  className="text-base font-montserrat-500 mt-4">Enter your mobile number</Text>
             <PhoneInput
            phoneInputStyles={{ container: { borderColor: "#000", marginTop: 16 } }}
            value={phoneNumber}
            defaultCountry="AE"
            placeholder=" "
            onChangePhoneNumber={handleInputValue}
            selectedCountry={selectedCountry}
            onChangeSelectedCountry={handleSelectedCountry}
          />
            {/* <Text className="text-base font-montserrat-500 mt-4">
              Email
            </Text>
            <Input
              type="email"
              placeholder="name@example.com"
              className={"mt-4"}
              value={email}
              onChange={emailHandler}
            /> */}
            <View className="space-y-1 w-full">
              <Text className="text-base font-montserrat-500 mt-4">
                Password
              </Text>
              <Input
                type="password"
                placeholder="Enter your password"
                // hideEyeIcon

                value={password}
                onChange={passwordHandler}
              />
            </View>
            <View className="space-y-1 w-full mt-4">
                <Text className="text-base font-montserrat-500">
                  Re-enter your password
                </Text>
                <Input
                  type="password"
                  placeholder="Re-enter your password"
                  // hideEyeIcon
                  value={repassword}
                  onChange={repasswordHandler}
                />
              </View>
          </View>
          <Button
            className="w-full mt-8"
            disabled={isLoading}
            label="Sign Up"
            onPress={loginHandler}
          />
        </View>
      </KeyboardAvoidingView>
      <Spinner visible={isLoading} />
    </SafeAreaView>
  );
};

export default PersonalInfoScreen;
