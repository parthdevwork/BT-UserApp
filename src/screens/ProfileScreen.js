import { View, Text, Image, Pressable, Linking } from "react-native";
import { Entypo, Feather } from '@expo/vector-icons';
import Layout from "../components/Layout";
import { useSelector, useCallback } from "react-redux";

const ProfileScreen = ({ navigation }) => {
    const userData = useSelector((state) => state.user.data);
    const { name = "", attachments = [] } = userData || {};
    const isPassportVerified = !!attachments?.[0]?.document_url;
console.log("userData",userData);

    const handlePress = async (url) => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    };

    return (
        <Layout.BackgroundImageView className="p-8 space-y-5">
            <View className="space-y-3">
                {/* {!isPassportVerified && */}
                {!userData.passportFile &&
                    <Text className="font-montserrat-600 mt-10 text-base text-[#F00F0F]">Please complete your Identification below & add your picture</Text>
                }
                <View className="flex-row justify-between items-center">
                    <View className="items-start space-y-1.5">
                        <Text className="font-montserrat-700 text-3xl" numberOfLines={1}>{name}</Text>
                        <View className="flex-row items-center justify-center px-2 py-1 space-x-1 rounded-full bg-[#D9D9D9]">
                            <Entypo name="star" size={14} color="black" />
                            <Text className="font-montserrat-500 text-xs">5.0</Text>
                        </View>
                    </View>
                    <Image
                        className="w-14 h-14"
                        source={require('../../assets/icons/avatar2.png')}
                        resizeMode="contain"
                    />
                </View>
            </View>
            <View className="space-y-5 pb-3">
                <View className="flex-row space-x-5">
                    {/* <View className="rounded-xl bg-[#FFEC81] flex-1 p-5 space-y-2.5 items-center justify-center">
                        <Image
                            className="w-8 h-8"
                            source={require('../../assets/icons/help.png')}
                            resizeMode="contain"
                        />
                        <Text className="font-montserrat-500 text-sm">Help</Text>
                    </View> */}
                    <Pressable
                        className="rounded-xl bg-[#FFEC81] flex-1 p-5 space-y-2.5 items-center justify-center"
                        onPress={() => navigation.navigate("WalletScreen")}
                    >
                        <Image
                            className="w-8 h-8"
                            source={require('../../assets/icons/wallet2.png')}
                            resizeMode="contain"
                        />
                        <Text className="font-montserrat-500 text-sm">Wallet</Text>
                    </Pressable>
                </View>
                {/* <Pressable
                    className="flex-row rounded-xl bg-[#FFEC81] w-full p-5 space-x-5 items-center"
                    onPress={() => navigation.navigate("SafetyScreen")}
                >
                    <View className="flex-1 space-y-2">
                        <Text className="font-montserrat-700 text-sm">Safety : Stay up tp date</Text>
                        <Text className="font-montserrat-400 text-xs">Understand how we secure your baggage</Text>
                    </View>
                    <View className="relative">
                        <Image
                            className="w-16 h-16"
                            source={require('../../assets/icons/progress.png')}
                            resizeMode="contain"
                        />
                        <View className="flex-row absolute inset-0 w-full h-full items-center justify-center">
                            <Text className="font-montserrat-500 text-xl">1</Text>
                            <Text className="font-montserrat-500 text-base">/3</Text>
                        </View>
                    </View>
                </Pressable> */}
            </View>
            <View className="w-full h-1.5 bg-[#D9D9D9] rounded-full"></View>
            <View className="divide-y divide-[#D9D9D9] relative flex flex-grow">
                {/* <Pressable className="flex-row items-center space-x-5 py-5 pt-2.5" onPress={() => navigation.navigate("FamilyAndSecurityScreen")}>
                    <Image
                        className="w-6 h-6"
                        source={require('../../assets/icons/family.png')}
                        resizeMode="contain"
                    />
                    <View>
                        <Text className="font-montserrat-600 text-base">Family & Security</Text>
                        <Text className="font-montserrat-500 text-sm">Manage a family profile</Text>
                    </View>
                </Pressable> */}
                {/* <View className="flex-row items-center space-x-5 py-5">
                    <Image
                        className="w-6 h-6"
                        source={require('../../assets/icons/message.png')}
                        resizeMode="contain"
                    />
                    <Text className="font-montserrat-600 text-base">Messages</Text>
                </View> */}
                <Pressable className="flex mt-auto " onPress={() => handlePress("https://www.baggagetaxi.com/account/delete-account")}>
                    <View className="flex-row items-center space-x-5 py-5">
                        <Text className=" underline font-montserrat-600 text-base ">Delete my account</Text>
                    </View>
                </Pressable>

                {!userData.passportFile &&
                    <View>
                        <View className="flex-row justify-between py-5 space-x-2.5">
                            <View className="flex-row items-start space-x-4 flex-1">
                                <Image
                                    className="w-7 h-7 mt-1"
                                    source={require('../../assets/icons/passport.png')}
                                    resizeMode="contain"
                                />
                                <View className="flex-1">
                                    {!isPassportVerified && <Text className="font-montserrat-600 text-base text-[#F00F0F]">Passport Identity Verification</Text>}
                                    {isPassportVerified && <Text className="font-montserrat-600 text-base text-[#30CC00]">Passport Identity Completed</Text>}
                                    <Text className="font-montserrat-400 text-sm">Your Identification is needed for us to transport & Store your Baggage as per local laws.</Text>
                                </View>
                            </View>
                            {isPassportVerified &&
                                <View className="rounded-full w-12 h-12 bg-[#30CC00] items-center justify-center pt-1">
                                    <Feather name="check" size={32} color="black" />
                                </View>
                            }
                        </View>
                        {!isPassportVerified &&
                            <Pressable
                                className="flex-row rounded-xl bg-[#F91414] p-3 items-center justify-center space-y-2.5"
                                onPress={() => navigation.navigate("ScanPassportScreen")}
                            >
                                <Text className="font-montserrat-600 text-base text-white">Scan Passport Picture Page</Text>
                            </Pressable>
                        }
                    </View>
                }
            </View>
        </Layout.BackgroundImageView>
    )
}

export default ProfileScreen