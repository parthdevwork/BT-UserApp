import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
} from "react-native";

import Button from "../components/ui/Button";
import { Images } from "../constants/images";
import { CheckBox } from "../components/ui/CheckBox"; 
const TermsAgreementScreen = ({ route, navigation }) => {
  const { driverDetails } = route.params || {};


const [count, setCount] = useState(0);


  const handleContinuePress = () => {
    navigation.navigate("PayByCash");
  };

  return (
    <SafeAreaView style={styles.background}>
      <View
        style={{
          flex: 1,
          padding: 16,
          justifyContent: "flex-end",
        }}
      >
        <View style={{ paddingHorizontal: 32 }}>
          <View style={styles.rowContainer}>
            <Image
              source={Images.icons.prohibited}
              style={styles.imageStyle}
              resizeMode="contain"
            />
            <Text className="text-base font-montserrat-700 ml-4 flex-1 underline">
              Prohibited Items & Dangerous Goods Policy
            </Text>
          </View>
          <Text className="text-xs font-montserrat-400 mt-4">
            Our policy aims to ensure the safety of all customers & passengers
            and the aircraft itself by strictly prohibiting the transportation
            of certain items that may pose risks or cause harm. Prior to your
            travel, we strongly recommend familiarizing yourself with our
            Prohibited Items & Dangerous Goods Policy to avoid any
            inconveniences.
          </Text>
          <View style={styles.rowContainer}>
            <Image
              source={Images.icons.terms}
              style={styles.imageStyle}
              resizeMode="contain"
            />
            <Text className="text-base font-montserrat-700 ml-4 flex-1 underline">
              Accept Terms & Review Privacy Notice
            </Text>
          </View>
          <Text className="text-xs font-montserrat-400 mt-4">
            By selecting “I Agree” below. I have reviewed and agreed to the
            terms of use and acknowledge the Privacy Notice and reviewed How
            BaggageTAXI works. I am at least 18 years of age
          </Text>

          <View className="border-solid border-t-2 border-gray-400 mt-8" />

          <View style={styles.checkBoxContainer}>
            <CheckBox count={count} setCount={(count) => setCount(count)} />
            <Text className="text-base font-montserrat-700 ml-4">I Agree</Text>
          </View>
        </View>
        <Button
          className="w-full mt-8"
          disabled={!count}
          label="Continue"
          onPress={handleContinuePress}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: "#fff" },
  rowContainer: { flexDirection: "row", justifyContent: 'space-between', marginTop: 16 },
  imageStyle: {
    width: 50,
    height: 50
  },
  checkBoxContainer: { flexDirection: "row", justifyContent: 'center', marginTop: 32 }
});
export default TermsAgreementScreen;
