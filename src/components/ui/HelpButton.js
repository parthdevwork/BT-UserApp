import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import Entypo from '@expo/vector-icons/Entypo';
import { FontAwesome5 } from '@expo/vector-icons';

const HelpButton = ({ image, text, type , onpress}) => {
  let Icon;

  switch (type) {
    case 'FontAwesome5':
      Icon = FontAwesome5;
      break;
    case 'Entypo':
      Icon = Entypo;
      break;
    // Add more cases for other icon libraries if needed
    default:
      Icon = FontAwesome5;
      break;
  }

  return (
    <TouchableOpacity style={{flex:1,height: 100, alignItems: "center", justifyContent: "center", backgroundColor: "#FFEC81" , marginTop:20, borderRadius:20, gap:10}} onPress={onpress}>  
      <Icon name={image} size={24} color="black" />
      <Text className="font-montserrat-500">{text}</Text>
    </TouchableOpacity>
  );
};

export default HelpButton;

const styles = StyleSheet.create({});