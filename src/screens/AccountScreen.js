import { useContext, useState, useEffect } from "react";
import { View, Text, Image, Pressable, Linking, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-root-toast";
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../store/context/auth-context";
import { setUser, setUserFromApi } from "../store/redux/user";
import { getDataUser } from '../services/auth.services'
import { registerAfterBooking } from "../services/auth.services";
import Layout from "../components/Layout";
import Input from "../components/ui/Input";
import Entypo from '@expo/vector-icons/Entypo';
import HelpButton from "../components/ui/HelpButton";
import axios from "axios";
import { AppConstants } from "../constants/AppConstants";
import { Montserrat_500Medium } from "@expo-google-fonts/montserrat";


const AccountScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const authCtx = useContext(AuthContext);

    const userData = useSelector((state) => state.user.data);

    const [imageSetting, SetImageSetting] = useState("")
    useEffect(() => {
        if (userData?.profileImage) {
            // console.log('-=-=-=-=->',userData?.profileImage);

            let updatedFilePath = userData?.profileImage.replace("/uploads/", "/uploads/profileImage/");

            SetImageSetting(updatedFilePath)
        }
    }, [userData ? userData : null])
    //    console.log("/*/*/*/*/*/*/*/*/*/", imageSetting);
    //  useEffect(()=>{
    //         console.log("/*/*/*/*/*/*/*/*",imageSetting);
    //  },[imageSetting])
    const [isLoading, setLoading] = useState(false);
    const [password, setPassword] = useState(null);
    const [repassword, setRepassword] = useState(null);
    const { isAuthenticated, logout } = authCtx;
    const { uuid = "", firstName = "", lastName = '', email = "", attachments = [], token, userId } = userData || {};
    const isPassportVerified = !!attachments?.[0]?.document_url;
    const fetchUserData = async () => {
        try {
            const res = await getDataUser(token, userId);
            dispatch(setUser(res?.data || {}));
        } catch (error) {
            console.log(error?.response?.status);
            if (error?.response?.status === 401) {
                Toast.show('Session Expired');
            }
        }
    };

    useEffect(() => {
        // Fetch user data when the component mounts or navigates back to
        const unsubscribe = navigation.addListener('focus', () => {
            fetchUserData();
        });

        return unsubscribe;
    }, [navigation]); // Dependency on navigation to re-fetch data on navigation changes


    const passwordHandler = (enteredText) => {
        setPassword(enteredText);
    }

    const repasswordHandler = (enteredText) => {
        setRepassword(enteredText);
    }


    useEffect(() => {
        updateUser()
    }, [])

    const updateUser = async () => {

        try {
            const res = await getDataUser(token, userId)

            dispatch(setUser(res?.data || {}));
        } catch (error) {
            console.log(error?.response?.status)
            if (error?.response?.status === 401) {
                Toast.show('Session Expired')
            }
        }
    }


    // const loginHandler = async () => {
    //     setLoading(true);
    //     try {
    //         const res = await registerCustomerSignup({
    //             uuid, name, email,
    //             password, password_confirmation: repassword
    //         });
    //         const data = res?.data?.customer || {};
    //         const token = data.token || "";
    //         authCtx.authenticate(token);
    //         dispatch(setUser(data));

    //         setLoading(false);
    //         navigation.navigate("ActivitiesTab", { screen: "ActivitiesScreen" })
    //     } catch (error) {
    //         console.error(error?.response?.data);
    //         let message = "Authentication failed! Could not log you in.";
    //         if (error?.response?.data?.error) message = error.response.data.error
    //         Toast.show(message, { duration: Toast.durations.LONG });
    //         setLoading(false);
    //     }
    // }
    const loginHandler = async () => {
        setLoading(true);
        try {
            const res = await registerAfterBooking({ password, id: userData.idOrder });
            setLoading(false);
            const data = res?.data || {};
            const token = data.token || "";
            authCtx.authenticate(token);
            dispatch(setUser(data));

            setLoading(false);
            navigation.navigate("ActivitiesTab", { screen: "ActivitiesScreen" })
        } catch (error) {
            console.error(error?.response?.data);
            let message = "Authentication failed! Could not log you in.";
            if (error?.response?.data?.error) message = error.response.data.error
            Toast.show(message, { duration: Toast.durations.LONG });
            setLoading(false);
        }
    }

    // const setData = async () => {
    //     try {

    //       const userData = await response.json();

    //       dispatch(setUserDataFromApi(userData));
    //     } catch (error) {
    //       console.error("Error fetching user data:", error);
    //       // Handle error scenarios if needed
    //     }
    //   };
    const fatchdata = async () => {

        const url = `${AppConstants.BASE_BACKEND}/auth/${userId}`;
        const token = userData?.token;

        console.log(userId, token)

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const resp = response?.data
            console.log(resp)
            dispatch(setUserFromApi(resp));

            navigation.navigate("EditProfileScreen")
        } catch (error) {
            navigation.navigate("EditProfileScreen")
            console.error("Upload failed:", error.response.data);
        }
    }

    const handlePress = (url) => {
        // Replace with your desired URL
        Linking.openURL(url)
            .then(() => console.log("Link opened successfully"))
            .catch((err) => console.error("Failed to open link:", err));
    };
    return (
        <Layout.BackgroundImageView className="p-7 mt-2">
            {!isAuthenticated &&
                <View className="rounded-2xl bg-[#FFCC00] p-6 space-y-2.5">
                    <Text className="font-montserrat-700 text-xl">Create a Password</Text>
                    <Text className="font-montserrat-500 text-sm" numberOfLines={1}>Login Name: {email}</Text>
                    <View className="space-y-5 w-full">
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            hideEyeIcon
                            value={password}
                            onChange={passwordHandler}
                        />
                        <Input
                            type="password"
                            placeholder="Re-enter your password"
                            hideEyeIcon
                            value={repassword}
                            onChange={repasswordHandler}
                        />
                    </View>
                    <Pressable className="flex-row items-end disabled:opacity-30" disabled={!password || !repassword} onPress={loginHandler}>
                        <Text className="font-montserrat-700 text-xl">Login</Text>
                        <AntDesign name="arrowright" size={24} color="black" />
                    </Pressable>
                </View>
            }
            {isAuthenticated &&
                // <View className="border rounded-2xl bg-white p-5 items-center justify-center space-y-2.5 mt-10">
                //     <Text className="font-montserrat-700 text-xl">Hello {firstName + ' ' + lastName}</Text>
                //     <Image
                //         className="w-20 h-20"
                //         source={require('../../assets/icons/avatar2.png')}
                //         resizeMode="contain"
                //     />
                // </View>
                <View>
                    <View style={{ flexDirection: "row", }}>
                        <View style={{ flexDirection: "column", width: "80%" }}>
                            <Text style={{ paddingTop: 15, fontSize: 22, fontWeight: "600" }}>{firstName + ' ' + lastName}</Text>
                            <View style={{ height: 22, width: 50, backgroundColor: "#D9D9D9", flexDirection: "row", borderRadius: 15, alignItems: "center", justifyContent: "center", gap: 5 }}>

                                <Entypo name="star" size={15} color="black" />
                                <Text>5</Text>
                            </View>
                        </View>
                        {userData?.profileImage ?
                         <TouchableOpacity  >
                            <Image
                                className="w-20 h-20"
                                style={{ alignSelf: "flex-end", alignItems: "flex-end", justifyContent: "flex-end", borderRadius: 50, right: 10 }}
                                // source={require('../../assets/icons/avatar2.png')}
                                

                                source={{ uri: imageSetting ? `${AppConstants.BASE_BACKEND}${imageSetting}` : "" }}
                                resizeMode="contain"
                            />
                            <View style={{ alignSelf: "flex-end", marginTop: -25, backgroundColor: "black", height: 24, width: 24, borderRadius: 15, right: 10 }} >
                                {/* ()=> navigation.navigate("EditProfileScreen") */}
                                <AntDesign name="plus" size={24} color="white" />
                            </View>
                        </TouchableOpacity> :
                            <TouchableOpacity >
                                <Image
                                    className="w-20 h-20"
                                    style={{ alignSelf: "flex-end", alignItems: "flex-end", justifyContent: "flex-end", borderRadius: 50, right: 10 }}
                                    source={require('../../assets/icons/avatar2.png')}


                                    // source={{uri:  imageSetting ? `${AppConstants.BASE_BACKEND}${imageSetting}`: ""}}
                                    resizeMode="contain"
                                />
                                <View style={{ alignSelf: "flex-end", marginTop: -25, backgroundColor: "black", height: 24, width: 24, borderRadius: 15, right: 10 }} >
                                    {/* ()=> navigation.navigate("EditProfileScreen") */}
                                    <AntDesign name="plus" size={24} color="white" />
                                </View>
                            </TouchableOpacity>
                        }

                    </View>
                </View>
            }

            <View style={{ flexDirection: "row", gap: 15 }}>
                <HelpButton text={"Help"} image={'help-with-circle'} type={"Entypo"} />

                <HelpButton text={"Wallet"} image={"wallet"} type={"Entypo"} onpress={() => navigation.navigate("WalletScreen")} />
            </View>
            <View style={{ flex: 1, height: 20, justifyContent: "center", backgroundColor: "#FFEC81", marginTop: 20, borderRadius: 20, gap: 15, paddingLeft: 15 }}>

                <Text style={{ fontWeight: "600" , }} className="font-montserrat-700"> Safety : Stay up tp date</Text>
                <Text style={{ fontSize: 11 , }} className="font-montserrat-500">Understand how we secure your baggage</Text>
            </View>
            <View className="divide-y divide-[#D9D9D9] flex-grow mt-5">
                <Pressable
                    className="flex-row items-center space-x-5 py-5"
                    disabled={!isAuthenticated}
                    onPress={fatchdata}
                >
                    <Image
                        className="w-6 h-6"
                        source={require('../../assets/icons/language.png')}
                        resizeMode="contain"
                    />
                    <View className=" flex-col  align-middle">
                    <Text className="font-montserrat-600 text-base">Profile</Text>
                    <Text className='font-montserrat-500 text-[10px]'>Manage your account</Text>
                    </View>
                    {/* {isAuthenticated && !isPassportVerified && */}
                    {isAuthenticated && !userData.passportFile &&
                        <Text className="font-montserrat-600 text-base text-[#F00F0F]">Please complete</Text>
                    }
                </Pressable>
                {/* <View className="flex-row items-center space-x-5 py-5">
                    <Image
                        className="w-6 h-6"
                        source={require('../../assets/icons/refer.png')}
                        resizeMode="contain"
                    />
                    <View>
                        <Text className="font-montserrat-600 text-base">Refer a friend about BaggageTAXI</Text>
                        <Text className="font-montserrat-600 text-base text-[#828282]">Get Paid 35AED credit</Text>
                    </View>
                </View> */}
                {/* <View className="flex-row items-center space-x-5 py-5">
                    <Image
                        className="w-6 h-6"
                        source={require('../../assets/icons/wallet.png')}
                        resizeMode="contain"
                    />
                    <Text className="font-montserrat-600 text-base">Wallet</Text>
                </View> */}
                {/* <View className="flex-row items-center space-x-5 py-5">
                    <Image
                        className="w-6 h-6"
                        source={require('../../assets/icons/language.png')}
                        resizeMode="contain"
                    />
                    <Text className="font-montserrat-600 text-base">Language</Text>
                </View> */}
                {/* <View className="flex-row items-center space-x-5 py-5">
                    <Image
                        className="w-6 h-6"
                        source={require('../../assets/icons/address.png')}
                        resizeMode="contain"
                    />
                    <Text className="font-montserrat-600 text-base">Saved Address</Text>
                </View> */}
                <Pressable className="" onPress={() => handlePress("https://www.baggagetaxi.com/terms-and-conditions")}>
                    <View className="flex-row items-center space-x-5 py-5">
                        <Image
                            className="w-6 h-6"
                            source={require('../../assets/icons/terms.png')}
                            resizeMode="contain"
                        />
                        <Text className="font-montserrat-600 text-base">Terms & Conditions</Text>
                    </View>
                </Pressable>
                <Pressable className="" onPress={() => handlePress("https://www.baggagetaxi.com/privacy-policy")}>
                    <View className="flex-row items-center space-x-5 py-5">
                        <Image
                            className="w-6 h-6"
                            source={require('../../assets/icons/legal.png')}
                            resizeMode="contain"
                        />
                        <Text className="font-montserrat-600 text-base">Legal</Text>
                    </View>
                </Pressable>
                <Pressable className="" onPress={() => logout()}>
                    <View className="flex-row items-center space-x-5 py-5">
                        <Image
                            className="w-6 h-6"
                            source={require('../../assets/icons/logout.png')}
                            resizeMode="contain"
                        />
                        <Text className="font-montserrat-600 text-base">Logout</Text>
                    </View>
                </Pressable>
            </View>
            {/* <View className="flex-row rounded-2xl bg-[#FFCC00] p-6 items-end space-y-2.5 relative ">
                <Pressable

                    onPress={() => {
                        try {
                            Linking.openURL(`tel:+971800108279`)
                        } catch (error) {
                            console.log('error', error)
                        }
                    }
                    }
                >
                    <View className="space-y-2.5" pointerEvents="none">
                        <Text className="font-montserrat-700 text-base">Having trouble using BaggageTAXI?</Text>
                        <Text className="font-montserrat-600 text-sm">Customer Service is here to help</Text>
                        <View className="flex-row items-end">
                            <Text className="font-montserrat-700 text-sm">Chat with the team</Text>
                            <AntDesign name="arrowright" size={24} color="black" />
                        </View>
                    </View>
                </Pressable>
                <Image
                    className="w-16 h-16 absolute bottom-0 right-2"
                    source={require('../../assets/icons/support.png')}
                    resizeMode="contain"
                />
            </View> */}
        </Layout.BackgroundImageView>
    )
}

export default AccountScreen