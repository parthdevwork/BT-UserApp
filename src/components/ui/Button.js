import React from 'react';
import { TouchableHighlight, Text, View } from 'react-native';

const Button = ({ style, textClassName, wrapperClassName, label, LeftIcon, disabled, onPress }) => {
  return (
    <TouchableHighlight
      style={style}
      underlayColor={"#E5E6EA"}
      className={["bg-[#FFCC00] px-5 py-2.5 rounded-lg items-center flex", disabled ? "opacity-80" : ""].join(" ")}
      onPress={disabled ? undefined : onPress}
    >
      <View className={["flex-row flex", wrapperClassName].join(" ")} pointerEvents='none' >
        {LeftIcon}
        <Text className={["text-[#000] text-base font-inter-700", textClassName].filter(Boolean).join(" ")} >{label}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default Button;
