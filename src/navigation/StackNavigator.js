import React, { useContext } from "react";
import { Text } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from '../store/context/auth-context';
import BackHeader from "../components/ui/BackHeader";
import LoginScreen from "../screens/LoginScreen";
import AccountScreen from "../screens/AccountScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ScanPassportScreen from "../screens/ScanPassportScreen";
import ScanPassportScreenbook from "../screens/ScanPassportScreenbook";
import PassportVerificationScreen from "../screens/PassportVerificationScreen";
import FamilyAndSecurityScreen from "../screens/FamilyAndSecurityScreen";
import SafetyScreen from "../screens/SafetyScreen";
import SafetyDetailsScreen from "../screens/SafetyDetailsScreen";
import WalletScreen from "../screens/WalletScreen";
import Layout from "../components/Layout";
import MultiPurposeMapScreen from "../screens/MultiPurposeMapScreen";
import PhoneScreen from "../screens/PhoneScreen";
import OTPScreen from "../screens/OTPScreen";
import PersonalInfoScreen from "../screens/PersonalInfoScreen";
import InvitationCodeScreen from "../screens/InvitationCodeScreen";
import PayByCash from "../screens/PayByCash";
import OrderDetailScreen from "../screens/OrderDetailScreen";
import OrderCompletedScreen from "../screens/OrderCompletedScreen";
import ActivitiesScreen from "../screens/ActivitiesScreen";
import PastBookingsScreen from "../screens/PastBookingsScreen";
// import UnauthenticatedHomeScreen from "../screens/UnauthenticatedHomeScreen";
import TermsAgreementScreen from "../screens/TermsAgreementScreen";
import Customer from "../screens/Customer";
import TabMenuScreen from "../screens/TabMenuScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import user from "../store/redux/user";
import Forgetpassword from "../screens/ForgetPassword";
import CheckOutBarcode from "../screens/CheckOutBarcode";
import Barcode from "../components/ui/Barcode";

// import TabNavigator from "./TabNavigator";
const Stack = createStackNavigator();
const Header = ({ navigation, route, options, back }) => {

  const authCtx = useContext(AuthContext);
  if (['UnauthenticatedHomeScreen', "ScanPassportScreen"].includes(route.name)) return null;
  console.log(authCtx?.token)
  const handleLogout = () => {
    authCtx.logout();

    //   setTimeout(() => {
    //     navigation.dispatch(
    //       CommonActions.reset({
    //         index: 0,
    //         routes: [
    //           {
    //             name: "UnauthenticatedHomeTab",
    //             state: {
    //               routes: [{ name: "LoginScreen" }]
    //             },
    //           },
    //         ],
    //       })
    //     );
    //   });
  }
  const notShowbackIcon = route.name === "OrderCompletedScreen"
  return (
    <BackHeader
      style={options.headerStyle}
      showBackButton={notShowbackIcon?false:!!back}
      onBackPress={navigation.goBack}
      showLogoutButton={authCtx.isAuthenticated}
      onLogout={handleLogout}
    />
  );
}

const Header1 = ({ navigation, route, options, back }) => {

  const authCtx = useContext(AuthContext);
  if (['UnauthenticatedHomeScreen', "ScanPassportScreen"].includes(route.name)) return null;

  const handleLogout = () => {
    authCtx.logout();

    //   setTimeout(() => {
    //     navigation.dispatch(
    //       CommonActions.reset({
    //         index: 0,
    //         routes: [
    //           {
    //             name: "UnauthenticatedHomeTab",
    //             state: {
    //               routes: [{ name: "LoginScreen" }]
    //             },
    //           },
    //         ],
    //       })
    //     );
    //   });
  }

  return (
    <BackHeader
      style={options.headerStyle}
      showBackButton={!back}
      // onBackPress={navigation.goBack}
      showLogoutButton={authCtx.isAuthenticated}
      onLogout={handleLogout}
      showBackButton1={navigation.push}
    />
  );
}

const screenOptions1 = {
  header: Header1,
  headerTransparent: true
}

const screenOptions = {
  header: Header,
  headerTransparent: true
}

// temp
const TempComponent = ({ text }) => {
  return (
    <Layout.BackgroundImageView className="p-5">
      <Text className="text-black">{text}</Text>
    </Layout.BackgroundImageView>
  )
}

export const UnAuthenticatedStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>

      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      {/* <Stack.Screen name="UnauthenticatedHomeScreen" component={UnauthenticatedHomeScreen} /> */}
      <Stack.Screen name="PhoneScreen" component={PhoneScreen} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />


    </Stack.Navigator>
  );
}

export const HomeStackNavigator =() => {
const authCtx = useContext(AuthContext);
  // console.log("========",authCtx?.token)
  return (
    <Stack.Navigator  >
      {authCtx?.token == null ?
       <Stack.Group screenOptions={{headerShown:false}} >
       <Stack.Screen name="LoginScreen" component={LoginScreen} />
       <Stack.Screen name="PhoneScreen" component={PhoneScreen} />
       <Stack.Screen name="OTPScreen" component={OTPScreen} />
       <Stack.Screen name="Forgetpassword" component={Forgetpassword} />

      <Stack.Screen
        name="PersonalInfoScreen"
        component={PersonalInfoScreen}
      />
       </Stack.Group>
      :
      <Stack.Group >
      <Stack.Screen  options={screenOptions}
        name="MultiPurposeMapScreen"
        component={MultiPurposeMapScreen}
      />
      <Stack.Screen options={{ headerShown: false }}
        name="TabMenuScreen"
        component={TabMenuScreen}
      />
     
      <Stack.Screen
        name="InvitationCodeScreen"
        component={InvitationCodeScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="TermsAgreementScreen"
        component={TermsAgreementScreen}
        options={screenOptions}
      />
      <Stack.Screen name="PayByCash" component={PayByCash} options={screenOptions} />
      <Stack.Screen options={screenOptions}
        name="OrderCompletedScreen"
        component={OrderCompletedScreen}
      />
      {/* activity Screen */}
      <Stack.Screen name="ActivitiesScreen" component={ActivitiesScreen} options={screenOptions} />
      <Stack.Screen name="PastBookingsScreen" component={PastBookingsScreen} options={screenOptions} />
      <Stack.Screen name="Customer" component={Customer} options={screenOptions} />
      {/* Profile screen */}
      <Stack.Screen name="AccountScreen" component={AccountScreen} options={screenOptions} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={screenOptions} />
      <Stack.Screen name="ScanPassportScreen" component={ScanPassportScreen} options={screenOptions} />
      <Stack.Screen name="PassportVerificationScreen" component={PassportVerificationScreen}  options={screenOptions}/>
      <Stack.Screen name="FamilyAndSecurityScreen" component={FamilyAndSecurityScreen} options={screenOptions} />
      <Stack.Screen name="SafetyScreen" component={SafetyScreen} options={screenOptions} />
      <Stack.Screen name="SafetyDetailsScreen" component={SafetyDetailsScreen} options={screenOptions} />
      <Stack.Screen name="WalletScreen" component={WalletScreen} options={screenOptions} />
      <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} options={screenOptions} />
      <Stack.Screen name="CheckOutBarcode" component={CheckOutBarcode} options={screenOptions} />
      <Stack.Screen name="ScanPassportScreenbook" component={ScanPassportScreenbook}  options={screenOptions}/>
      <Stack.Screen name="Barcode" component={Barcode}  options={screenOptions} />
      </Stack.Group>
      }
     
      {/* <Stack.Screen
        name="PersonalInfoScreen"
        component={PersonalInfoScreen}
      /> */}
    
    </Stack.Navigator>
  );
}

// export const ActivitiesStackNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={screenOptions}>
//       <Stack.Screen name="ActivitiesScreen" component={ActivitiesScreen} />
//       <Stack.Screen name="PastBookingsScreen" component={PastBookingsScreen} />
//       <Stack.Screen name="Customer" component={Customer} />


//       <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
//     </Stack.Navigator>
//   );
// }

export const ServicesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="ServicesScreen" component={TempComponent} />
    </Stack.Navigator>
  );
}

// export const AccountStackNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={screenOptions}>
//       <Stack.Screen name="AccountScreen" component={AccountScreen} />
//       <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
//       <Stack.Screen name="ScanPassportScreen" component={ScanPassportScreen} />
//       <Stack.Screen name="PassportVerificationScreen" component={PassportVerificationScreen} />
//       <Stack.Screen name="FamilyAndSecurityScreen" component={FamilyAndSecurityScreen} />
//       <Stack.Screen name="SafetyScreen" component={SafetyScreen} />
//       <Stack.Screen name="SafetyDetailsScreen" component={SafetyDetailsScreen} />
//       <Stack.Screen name="WalletScreen" component={WalletScreen} />
//       <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
//     </Stack.Navigator>
//   );
// }