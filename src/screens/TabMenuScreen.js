import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import { EvilIcons, Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';
import { ActivitiesStackNavigator } from '../navigation/StackNavigator';
import Map from '../components/Map';

const TabMenuScreen = ({ navigation }) => {
  const [selectedItem, setSelectedItem] = useState('1'); // Initialize to '1' for Home

  const data = [
    { id: '1', screen: "HOME", icon: "home", iconType: "Entypo", name:"Home" },
    { id: '2', screen: "BOOKING", icon: "tv", iconType: "FontAwesome", name: "ActivitiesScreen" },
    { id: '3', screen: "ACCOUNT", icon: "user", iconType: "EvilIcons", name: "AccountScreen" }
  ];
  const handleItemPress = (item) => {
    setSelectedItem(item.id);
    if (item.name === 'ActivitiesScreen') {
      navigation.navigate("ActivitiesScreen");
    }
    else if (item.name === 'Home') {
      navigation.navigate("MultiPurposeMapScreen");
      
    }
    else if (item.name === 'AccountScreen') {
      console.log("-====>account");
      navigation.navigate("AccountScreen");
      
    }
  }
  const renderItem = ({ item }) => {
    let IconComponent = null;

    if (item.iconType === "Entypo") {
      IconComponent = Entypo;
    } else if (item.iconType === "FontAwesome") {
      IconComponent = FontAwesome;
    } else if (item.iconType === "EvilIcons") {
      IconComponent = EvilIcons;
    }

    return (
      <TouchableOpacity
        style={[styles.item, { backgroundColor: selectedItem === item.id ? '#FFCC00' : 'transparent' }]}
        onPress={() => handleItemPress(item)}
      >
        <IconComponent name={item.icon} size={24} color="black" style={styles.icon} />
        <Text style={styles.title}>{item.screen}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
    <View  className='border-[1px] border-t-0 border-[#aaa] rounded-[14px]'>
      <View style={{  flexDirection: "row", alignItems: 'center', paddingLeft: 15, gap: 65 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Image source={require("../../assets/header-logo.png")} style={{ height: 50, width: 200, alignSelf: "center" }}  resizeMode='cover' />
      </View>
      
      <View style={{ alignItems: "center" }}>
        <FlatList
          scrollEnabled={false}
          data={data}
          horizontal={true}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
   
      </View>
    </View>
    {/* <View style={{flex:1,}} className='opacity-50 blur-lg' >
      <Map />
    </View> */}


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 45,
    width: 115,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,

  },
  title: {
    fontSize: 15,
  },
});

export default TabMenuScreen;
