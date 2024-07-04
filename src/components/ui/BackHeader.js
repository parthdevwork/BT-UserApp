import React from 'react';
import { View, Image, Pressable, SafeAreaView, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { verticalScale } from 'react-native-size-matters';
const BackHeader = ({ style, showBackButton,showBackButton1, onBackPress, showLogoutButton = false, onLogout }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View className= {showBackButton  ?  "bg-white":'bg-transparent' }  >
        <View className={showBackButton ?'flex items-center justify-between flex-row mx-[16px]':'flex items-center justify-end flex-row mx-[16px]'}>
          {showBackButton && (
            <Pressable
              className="justify-center items-center"
              style={{backgroundColor:"#ffcc00", borderRadius:25, height:40, width:40, }}
              onPress={onBackPress}
            >
              <Ionicons name="chevron-back" size={30} color="black"  />
            </Pressable>
          )}
          <Pressable className= {showBackButton? "" :"absolute  top-[10px]"}
              // onPress={onLogout}
              onPress={()=>navigation.navigate("TabMenuScreen")}
              style={{height:40, width:40, borderRadius:25, backgroundColor:"#ffcc00", alignItems:"center", justifyContent:"center" }}
            > 
            {/* top:Platform.OS=='ios' ?75:17,  */}
              <Feather name="menu" size={22} color="black" />
            </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BackHeader;


    {/* <Pressable
            className="absolute left-6 justify-center items-center "
            style={{backgroundColor:"#FFCC00", borderRadius:25, height:40, width:40}}
            onPress={onBackPress}
          >
            <Ionicons name="chevron-back" size={30} color="black"  />
          </Pressable> */}
        {/* <Image
          className="w-40 h-full "
          source={require("../../../assets/header-logo.png")}
          resizeMode="contain"
        /> */}
        {/* {showLogoutButton && (
          <Pressable
            className="absolute right-6 justify-center items-center"
            onPress={onLogout}
          >
            <Ionicons name="log-out-outline" size={30} color="#666666" />
          </Pressable>
        )} */}