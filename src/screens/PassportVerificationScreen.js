

import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, Platform, Image, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-root-toast";
import { Feather } from '@expo/vector-icons';
import Layout from "../components/Layout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";


import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { AppConstants } from "../constants/AppConstants";

const PassportVerificationScreen = ({ navigation }) => {

    const userData = useSelector((state) => state.user.data);
    const [isLoading, setLoading] = useState(false);
    const [passportNumber, setPassportNumber] = useState("");
    const { name = "", uuid = "", contact_id = "", token, userId } = userData || {};

    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [loading, setLoading1] = useState(false); 

    const handleYes = () => {
        setModalVisible(false);
        handleCameraPress();
    };

    const handleNo = () => {
        setModalVisible(false);
        handleGalleryPress();
    };

    const passportNumberHandler = (enteredText) => {
       
        setPassportNumber(enteredText.replace(/[^0-9a-zA-Z]/g, ''));
    };

    const uploadPassport = async () => {
      setLoading1(true); // Start loader

      try {
          const formData = new FormData();
          formData.append("passportfile", {
              uri: image,
              type: "image/jpeg",
              name: "profile.jpg",
          });

          const url = `${AppConstants.BASE_BACKEND}/auth/passportfile/${userId}`;
          const response = await axios.post(url, formData, {
              headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
              },
          });

          console.log("Upload successful:", response);
           navigation.navigate("EditProfileScreen")
          setLoading1(false);
      } catch (error) {
          console.log("Upload failed:", error);
         
          setLoading1(false); 
      }
  };

  const handleCameraPress = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
        alert('Permission to access camera is required!');
        return;
    }

    // Proceed with launching the camera
    try {
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!pickerResult.cancelled) {
            setImage(pickerResult.uri);
            console.log('Image URI set:', pickerResult.uri);
        } else {
            console.log('Image selection cancelled.');
        }
    } catch (error) {
        console.log('Error picking image from camera:', error);
        alert('Error picking image from camera. Please try again.');
    }
};

    const handleGalleryPress = async () => {
        let permissionResult;
        if (Platform.OS === 'web') {
            permissionResult = true;
        } else {
            permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        }

        if (permissionResult.granted === false) {
            alert('Permission to access media library is required!');
            return;
        }

        try {
            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log('Picker Result:', pickerResult); // Debugging
   
            if (!pickerResult.cancelled) {
              setImage(pickerResult.assets[0].uri);
            //   console.log('Image URI set:', pickerResult.assets[0].uri); 
            } else {
                console.log('Image selection cancelled.');
            }
        } catch (error) {
            console.log('Error picking image from gallery:', error);
            alert('Error picking image from gallery. Please try again.');
        }
    };

    return (
        <Layout.BackgroundImageView className="p-8 justify-between space-y-10">
            <View className=" space-y-10">
                <Text className="font-montserrat-700 text-2xl text-center">Passport Identity Verification</Text>
                <View className="space-y-3">
                    {name &&
                        <View className="flex-row justify-between space-x-5">
                            <View>
                                <Text className="font-montserrat-500 text-base">Full Name</Text>
                                <Text className="font-montserrat-700 text-lg">{name}</Text>
                            </View>
                            <View className="rounded-full w-10 h-10 bg-[#30CC00] items-center justify-center pt-1">
                                <Feather name="check" size={26} color="black" />
                            </View>
                        </View>
                    }
                    <View className="space-y-2">
                        <Text className="font-montserrat-500 text-base">Passport / ID number</Text>
                        <Input
                            type="text"
                            placeholder="Enter Passport / ID number"
                            value={passportNumber}
                            onChange={passportNumberHandler}
                        />
                    </View>
                </View>
  {loading && (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="gray" />
                </View>
            )}

                {image ?
                    <Image
                        style={styles.imagePreview}
                        source={{ uri: image }}
                        resizeMode="contain"
                    />
                    :

<View style={[styles.imagePreview, { alignItems: "center", justifyContent: "center", borderRadius: 15 ,borderColor:"gray", borderWidth:1}]}>              
          <Text>Upload Passport</Text>
                      </View>
                }
            </View>
                <Button label="Take Passport Image" color={"#FFCC00"} className=' bottom-[10%] w-full ' onPress={() => setModalVisible(true)} />
            <Button className="w-full" label="Continue" disabled={isLoading || !image} onPress={uploadPassport} />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Select Image Source</Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.yesButton]}
                                onPress={handleYes}
                            >
                                <Text style={styles.buttonText}>Camera</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.noButton]}
                                onPress={handleNo}
                            >
                                <Text style={styles.buttonText}>{Platform.OS === "android" ? "Gallery" : "Photos"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
          
        </Layout.BackgroundImageView>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
        width: "70%",
        height: "20%"
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: "15%"
    },
    button: {
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 2,
        minWidth: 100,
        alignItems: 'center',
    },
    yesButton: {
        backgroundColor: '#FFCC00',
    },
    noButton: {
        backgroundColor: '#FFCC00',
    },
    buttonText: {
        fontWeight: "500",
        fontSize: 16,
    },
    imagePreview: {
        width: '100%',
        aspectRatio: 4 / 3,
        borderRadius: 8,
        marginTop: 10,
    },
    loader:{
        alignItems:"center", justifyContent:"center"
    }
});

export default PassportVerificationScreen;
