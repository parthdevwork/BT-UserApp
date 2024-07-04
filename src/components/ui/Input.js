import { useState } from 'react';
import { TextInput, View, Pressable, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

const Input = ({
  style, type, LeftIcon, RightIcon, placeholder,
  value, multiline = false, numberOfLines = 1, hideEyeIcon,
  editable = true, onChange, textStyle, styleWrap
}) => {
  const [showPassword, setShowPassword] = useState(false);

  let keyboardType = type;
  if (type === "email") keyboardType = "email-address";
  if (type === "number") keyboardType = "number-pad";

  return (
    <View style={style} className="flex-row w-full ">
      <View
      style={{borderColor:Colors.grayborder}}
        className={[
          " flex flex-row border  rounded-md w-full px-2 ",
          numberOfLines > 1 ? "" : "h-11", styleWrap,
        ].join(" ")}
      >
        {LeftIcon}
        {!!editable ?
          <TextInput
            className={" text-[#000] flex flex-1 " + textStyle}
            autoCapitalize='none'
            placeholder={placeholder}
            placeholderTextColor="rgba(0, 0, 0, 0.50)"
            secureTextEntry={type === "password" && !showPassword}
            keyboardType={type === "password" ? "default" : keyboardType}
            onChangeText={onChange}
            value={value}
            multiline={multiline}
            numberOfLines={numberOfLines}
            textAlignVertical={numberOfLines === 1 ? 'center' : "top"}
            verticalAlign={numberOfLines === 1 ? 'top' : "top"}
            editable={editable}
          /> : <Text className={`flex flex-1 self-center text-base ${textStyle}`} >{value}</Text>
        }
        {type === "password" && !hideEyeIcon && (
          <Pressable
            className="h-full items-center justify-center px-3"
                  
            onPress={() => setShowPassword((showPassword) => !showPassword)}
          >
            {showPassword && <Entypo name="eye" size={20} color="black" />}
            {!showPassword && (
              <Entypo name="eye-with-line" size={20} color="black" />
            )}
          </Pressable>
        )}
        {RightIcon}
      </View>
    </View>
  );

}

export default Input;
