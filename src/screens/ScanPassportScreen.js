import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AppConstants } from '../constants/AppConstants';
const ScanPassportScreen = () => {
    const [image, setImage] = useState(null);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    }
    console.log(image)
    const navigate=useNavigation()

    const userData = useSelector((state) => state.user.data);

    const userId = userData?.userId
    console.log(userData)

    const ChangeData = async()=>{
        let data ={
          passportFile: image
        }
        const token =userData?.token;

      
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        try{
            const apiUrl = `${AppConstants.BASE_BACKEND}/auth/${userId}`; 
            const response = await axios.patch(apiUrl, data,{headers});
            console.log('PATCH request successful');
            console.log('Response:', response.data);
        }catch(e){
            console.log("reponse", e)
        }
    }
   
  return (
    <View style={{backgroundColor:"white", flex:1}}>
        <View style={{ position: 'absolute', top: 50, left: 10 }}>
            <Pressable
              className="justify-center items-center"
              style={{
                backgroundColor: "#FFCC00",
                borderRadius: 25,
                height: 40,
                width: 40,
              }}
              onPress={ ()=> navigate.goBack()}
            >
              <AntDesign name="left" size={24} color="black" />
              {/* <Ionicons name="chevron-back" size={30} color="black" /> */}
            </Pressable>
            </View>
      <Text style={{alignSelf:"center", marginTop:150}}>Take the picture to passport </Text>
       <View style={{  marginTop:50 ,alignItems:"center"}}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <View style={{marginTop: 50,}}/>
           <Button title="Take PassPort Image" color={"#FFCC00"} onPress={pickImage} style={{backgroundColor:"#FFCC00", color:"black",}} />
           <View style={{marginTop: 50,}}/>
           <Button title="Submit" color={"#FFCC00"}  style={{backgroundColor:"#FFCC00", color:"black",marginTop:50}}  onPress={()=>navigate.navigate("PassportVerificationScreen")}/>
         </View>
         
    </View>
  )
}

export default ScanPassportScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      image: {
        width: 200,
        height: 200,
        
      },
})