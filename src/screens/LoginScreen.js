import { useState, useContext, useLayoutEffect, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, Modal, StyleSheet, PermissionsAndroid, Alert } from "react-native";
import { useDispatch } from 'react-redux';
import Toast from "react-native-root-toast";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/context/auth-context';
import { login, loginn, passwordrecovery } from '../services/auth.services';
import { Colors } from "../constants/colors";
import { initUser } from "../store/redux/user";
import Layout from "../components/Layout";
import messaging from "@react-native-firebase/messaging";
import { AntDesign } from "@expo/vector-icons";
// import firebase from "@react-native-firebase";

// paul@baggagetaxi.com
// jvr4ryh3NAP!jty2q
// jvr4ryh3NAP!jty2q

export default function LoginScreen({ navigation }) {
    const dispatch = useDispatch();
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const authCtx = useContext(AuthContext);

    // const getFCMToken = async () => {
    //     try {
    //         const token = await messaging().getToken();
    //         console.log(token);
    //     } catch (e) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     // firebase.initializeApp()
    //     getFCMToken();

    //     messaging().onMessage(async remoteMessage => {
    //         console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //     });

    //     messaging().onNotificationOpenedApp(remoteMessage => {
    //         console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
    //     });

    //     messaging()
    //         .getInitialNotification()
    //         .then(remoteMessage => {
    //             if (remoteMessage) {
    //                 console.log(
    //                     'Notification caused app to open from quit state:',
    //                     JSON.stringify(remoteMessage),
    //                 );
    //             }
    //         });
    //     messaging().setBackgroundMessageHandler(async remoteMessage => {
    //         console.log('Message handled in the background!', remoteMessage);
    //     });
    // }, []);
    // useEffect(() => {
    //     PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

    //     const unsubscribe = messaging().onMessage(async remoteMessage => {
    //         Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //     });

    //     return unsubscribe;
    // }, []);
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const loginHandler = async () => {
        setIsAuthenticating(true);
        try {
            const res = await loginn({
                identity: username.toLowerCase(),
                password: password,
            });
            const { data } = res || {};
            const token = data?.token;
            authCtx.authenticate(token);
            dispatch(initUser({ data }));
            setIsAuthenticating(false);
            navigation.navigate("MultiPurposeMapScreen")
        } catch (error) {
            console.error(error?.response?.data);
            let message = "Authentication failed! Could not log you in. Please check your credentials or try again later!";
            if (error?.response?.data?.errors?.[0]) message = error.response.data.errors[0]
            Toast.show(message, { duration: Toast.durations.LONG });
            setIsAuthenticating(false);
        }
    }

    const userNameHandler = (enteredText) => {
        setUsername(enteredText);
    }

    const passwordHandler = (enteredText) => {
        setPassword(enteredText);
    }

    const handleForgetPassword = async () => {
        try {
            const resp = await passwordrecovery({ email: username })
            console.log(resp)
            if (resp?.status === 200 || resp?.status === 201) {
                Toast.show('Link Send it, Check your email ', { duration: Toast.durations.LONG, backgroundColor: "green", textColor: 'black' },)
            }
            setModalVisible(!modalVisible)
        } catch (error) {
            console.log("IIOIIOIIO", error)
            Toast.show('Error sending, try again ')
        }

    }
    if (isAuthenticating) {
        return <LoadingOverlay message="Logging you in..." />;
    }


    return (
        <Layout.ScrollView className="z-10 bg-transparent">
            <View className="w-full space-y-8 flex-1 items-center p-8 py-16 mt-[50px] px-0">
                {/* <Modal
                    animationType="slide"
                    transparent={true}
                    statusBarTranslucent

                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView} className='py-10'>
                        <View style={styles.modalView} className='py-10'>
                            <Text className="text-lg font-montserrat-700 my-5">Request new password</Text>
                            <Text className="font-montserrat-500">Enter the email address you have saved for this account.</Text>
                            <Input
                                className=""
                                type="email"
                                placeholder="name@example.com"
                                LeftIcon={
                                    <View className="h-full items-center justify-center px-3 w-12">
                                        <Image className="w-6" source={require('../../assets/icons/avatar.png')} resizeMode="contain" />
                                    </View>
                                }
                                value={username}
                                onChange={userNameHandler}
                            />
                            <Button
                                className="w-full mt-5"
                                style={{ backgroundColor: 'black' }}
                                textClassName={`text-[${Colors.primaryYellow}]`}
                                label="Send a link"
                                onPress={() => handleForgetPassword()}
                            />
                            <Button
                                className="w-full mt-5"
                                style={{ backgroundColor: 'white' }}
                                textClassName={`underline font-inter-400`}
                                label="Cancel"
                                onPress={() => setModalVisible(false)}
                            />
                        </View>
                    </View>
                </Modal> */}
                <Image className="w-full h-48 absolute bottom-0 z-0 " source={require('../../assets/bg.png')} resizeMode='cover' />
                {/* <Image className="w-full h-32 mb-5" source={require('../../assets/btaxi_logo.png')} resizeMode="contain" /> */}
                <View className="space-y-2 px-8" style={{}}>
                    <Text className=" font-sm text-[19px] mb-[11px] ">Log in</Text>
                    <Input
                        style={{ marginBottom: 7 }}
                        type="email"
                        placeholder="name@example.com"
                        LeftIcon={
                            <View className="h-full items-center justify-center px-3 w-12">
                                <Image className="w-6" source={require('../../assets/icons/avatar.png')} resizeMode="contain" />
                            </View>
                        }
                        value={username}
                        onChange={userNameHandler}
                    />
                    <Input
                        className=""
                        type="password"
                        placeholder="Enter your password"
                        LeftIcon={
                            <View className="h-full items-center justify-center px-3 w-12">
                                <Image className="w-4" source={require('../../assets/icons/lock.png')} resizeMode="contain" />
                            </View>
                        }
                        value={password}
                        onChange={passwordHandler}
                    />
                    <View className='flex items-end'>
                        <TouchableOpacity
                            className={` px-2.5 py-2 mt-2 rounded-none`}
                            textClassName={`text-[${Colors.primaryYellow}]`}
                            // onPress={loginHandler}
                            // onPress={() => setModalVisible(!modalVisible)}
                            onPress={() => navigation.navigate("Forgetpassword")}
                        >
                            <Text className="font-Montserrat-500 text-right underline" >
                                I forgot my password  </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className=" flex items-center w-full px-8 ">
                    <Button
                        style={{ backgroundColor: Colors.primaryYellow, marginTop: -15 }}
                        className={`w-full`}
                        textClassName={`text-[black]`}
                        label="Log In"
                        onPress={loginHandler}
                    />
                    {/* <View className='mt-[25px] mb-[10px] w-full flex flex-row items-center justify-between'>
                        <View className='h-[1px] w-[30%] bg-[#aaa]'></View>
                          <Text className='text-[14px] font-normal text-center'>Or</Text>
                          <View className='h-[1px] w-[30%] bg-[#aaa]'></View>
                    </View>
                    <Button
                        style={{ gap: '20px' }}
                        LeftIcon={<AntDesign name="google" size={16} color="black" />}
                        wrapperClassName={"gap-[10px] items-center"}
                        className={`w-full border-neutral-400 border-[1px] rounded-[6px] py-[10px] bg-white flex justify-center mt-[20px]`}
                        textClassName={`font-inter-400 text-[14px]`}
                        label="Continue with Google"
                    // onPress={loginHandler}
                    />
                    <Button
                        style={{ gap: '20px' }}
                        LeftIcon={<AntDesign name="apple1" size={16} color="black" />}
                        wrapperClassName={"gap-[10px]"}
                        className={`w-full border-neutral-400 border-[1px] rounded-[6px] py-[10px] bg-white flex justify-center mt-[20px]`}
                        textClassName={`font-inter-400 text-[14px]`}
                        label="Continue  with Apple"
                    // onPress={loginHandler}
                    /> */}
                    <Text className='mt-[35px]'>Don’t have an account? </Text>
                    <Button
                        className="bg-white py-[2px] px-[10px] border mt-3 rounded-[6px]"
                        textClassName="text-[13px] text-black font-inter-500"
                        label="Sign Up"
                        onPress={() => navigation.navigate('PhoneScreen')} />
                </View>


            </View>
        </Layout.ScrollView>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        // backgroundColor: 'green'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 20,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});


