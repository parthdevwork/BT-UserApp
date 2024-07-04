import { View, Text, Image } from "react-native";
import Layout from "../components/Layout";

const FamilyAndSecurityScreen = ({ navigation }) => {
    return (
        <Layout.BackgroundImageView className="px-8 pt-10 pb-2">
            <Text className="font-montserrat-700 text-3xl">Family and Security </Text>
            <View className="divide-y divide-[#D9D9D9]">
                <View className="py-5">
                    <Text className="font-montserrat-700 text-base">Members</Text>
                    <Text className="font-montserrat-500 text-sm">Use your Family profile to pay with your family's shared payment method</Text>
                </View>
                <View className="flex-row items-start space-x-3.5 py-5 pt-2.5">
                    <Image
                        className="w-6 h-6 mt-1"
                        source={require('../../assets/icons/group.png')}
                        resizeMode="contain"
                    />
                    <View className="space-y-2">
                        <Text className="font-montserrat-700 text-base">Customer family member</Text>
                        <Text className="font-montserrat-500 text-sm">Accepted</Text>
                    </View>
                </View>
                <View className="flex-row items-start space-x-3.5 py-5 pt-2.5">
                    <Image
                        className="w-6 h-6 mt-1"
                        source={require('../../assets/icons/group.png')}
                        resizeMode="contain"
                    />
                    <View className="space-y-2">
                        <Text className="font-montserrat-700 text-base">Customer Name</Text>
                        <Text className="font-montserrat-500 text-sm">Organizer</Text>
                    </View>
                </View>
                <View className="w-full h-0.5 bg-[#D9D9D9] rounded-full"></View>
            </View>
            <View className="py-5 space-y-2">
                <Text className="font-montserrat-700 text-3xl">Settings</Text>
                <Text className="font-montserrat-500 text-sm">Choose your family’s shared payment method and where you want to get receipts</Text>
            </View>
            <View>
                <View className="flex-row items-start space-x-3.5">
                    <Image
                        className="w-6 h-6 mt-5"
                        source={require('../../assets/icons/payment.png')}
                        resizeMode="contain"
                    />
                    <View className="border-b border-[#D9D9D9] py-5 flex-1">
                        <Text className="font-montserrat-700 text-base">Payment methods</Text>
                    </View>
                </View>
                <View className="flex-row items-start space-x-3.5">
                    <Image
                        className="w-6 h-6 mt-5"
                        source={require('../../assets/icons/email.png')}
                        resizeMode="contain"
                    />
                    <View className="py-5 flex-1 space-y-2">
                        <Text className="font-montserrat-700 text-base">Email for receipt</Text>
                        <Text className="font-montserrat-500 text-sm">cutomer@gmail.com</Text>
                    </View>
                </View>
            </View>
            <Text className="font-montserrat-700 text-3xl py-2.5">Safety</Text>
            <View>
                <View className="flex-row items-start space-x-3.5">
                    <Image
                        className="w-6 h-6 mt-5"
                        source={require('../../assets/icons/security.png')}
                        resizeMode="contain"
                    />
                    <View className="border-b border-[#D9D9D9] py-5 flex-1">
                        <Text className="font-montserrat-700 text-base">Security</Text>
                        <Text className="font-montserrat-500 text-sm">Control your account security with 2-Step verifcation</Text>
                    </View>
                </View>
                <View className="flex-row items-start space-x-3.5">
                    <Image
                        className="w-6 h-6 mt-5"
                        source={require('../../assets/icons/security.png')}
                        resizeMode="contain"
                    />
                    <View className="py-5 flex-1">
                        <Text className="font-montserrat-700 text-base">Manage Trusted Contacts</Text>
                        <Text className="font-montserrat-500 text-sm">Share your booking  status with family and friends in a single tap</Text>
                    </View>
                </View>
            </View>
        </Layout.BackgroundImageView>
    )
}

export default FamilyAndSecurityScreen