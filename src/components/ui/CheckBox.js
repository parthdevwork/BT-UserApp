import React, {useState} from 'react';
import {TouchableOpacity, SafeAreaView} from 'react-native';
import { AntDesign } from "@expo/vector-icons";

export function CheckBox({ setCount, count }) {

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          width: 20,
          height: 20,
          borderWidth: 2,
        }}
        onPress={() => {
          setCount(!count);
        }}
      >
        {count ? <AntDesign name="check" size={15} color={"black"} /> : null}
      </TouchableOpacity>
    </SafeAreaView>
  );
}