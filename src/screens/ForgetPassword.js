import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Input from "../components/ui/Input";
import Button from "../components/ui/Button"; // Assuming Button component is defined elsewhere
import { useSelector } from "react-redux";
import axios from "axios";
import { AppConstants } from "../constants/AppConstants";
import Toast from "react-native-root-toast";

const Forgetpassword = ({navigation}) => {
    const [email, setEmail] = useState("");
    const userData = useSelector((state) => state.user.data);

    const restpassword = async () => {
        try {
            const response = await axios.post(
                `${AppConstants.BASE_BACKEND}/auth/request-password-reset`,
                { email }
            );
             navigation.goBack()
            console.log(response.data);
            
        } catch (error) {
            
            Toast.show('Please enter valid email', { shadowColor: '#FFCC00' });
           
        }
    }

    const isEmailValid = email !== ""; 

    return (
        <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
            <AntDesign name="leftcircleo" size={24} color="black" style={{ marginLeft: 20, marginTop: 20 }} />
            </TouchableOpacity>
            <View style={{ marginHorizontal: 30, marginTop: "20%" }}>
                <Text style={{ fontSize: 18 }} className='mb-[4px] font-medium'>
                    Forgot password
                </Text>
                <Text style={{ fontSize: 12 }}>
                Enter the email address associated with your account and we will send you a link to reset your password
                </Text>
                <Input
                    placeholder={"Enter your email"}
                    className="border-[#FFCC00] mt-7"
                    // style={{ marginTop: "%", borderColor: "#FFCC00" }}
                    onChange={(text) => setEmail(text)}
                    value={email}
                />

                <TouchableOpacity
                className="h-12 mt-[20px]"
                    style={{

                        backgroundColor: isEmailValid ? "#FFCC00" : "#CCCCCC", 
                        // height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10,
                        opacity: isEmailValid ? 1 : 0.6,
                    }}
                    onPress={isEmailValid ? restpassword : null} 
                    disabled={!isEmailValid} 
                >
                    <Text style={{ color: "black", fontWeight: "bold" }}>Continue</Text>
                </TouchableOpacity>

                <View style={{ alignItems: "center", marginTop: 40 }}>
                    <Text>Don't have an Account?</Text>
                    <TouchableOpacity
                        style={{ height: 28, width: 70, borderWidth: 1, borderColor: "#ccc", alignItems: "center", justifyContent: "center", borderRadius: 6, marginTop: 15 }}
                    >
                        <Text style={{ fontWeight: "500" }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Forgetpassword;
