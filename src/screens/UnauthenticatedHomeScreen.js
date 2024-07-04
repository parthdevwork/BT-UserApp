import { View, Image } from "react-native";
import Button from "../components/ui/Button";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { setUser, initUser } from "../store/redux/user";
import { useDispatch } from 'react-redux'
export default function UnauthenticatedHomeScreen({ navigation }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initUser({}))
    }, [])



    return (
        <Layout.ScrollView className="py-16 relative items-center">
            <Image className="w-full h-48 absolute bottom-0" source={require('../../assets/bg.png')} resizeMode='cover' />
            <View className="w-full p-8 space-y-28 flex-1 justify-center items-center">
                <Image className="w-full h-32" source={require('../../assets/btaxi_logo.png')} resizeMode="contain" />
                <View className="w-full space-y-5">
                    <Button
                        className="w-full"
                        label="Log In"
                        onPress={() => navigation.navigate("LoginScreen")}
                    />
                    <Button
                        className="bg-white px-2.5"
                        textClassName="text-sm text-black font-inter-500"
                        label="Create booking with no account"
                        onPress={() => navigation.navigate("HomeTab", { screen: "MultiPurposeMapScreen" })}
                    />
                </View>
            </View>
        </Layout.ScrollView>
    )
}