import { View, Text, Pressable } from "react-native";
import Layout from "../components/Layout";

const SafetyScreen = ({ navigation }) => {
    const items = [
        {
            title: "Safety help",
            subtitle: "Text Text Text"
        },
        {
            title: "How do we Certify our Drivers",
            subtitle: "Text Text Text"
        },
        {
            title: "How we store your Baggage",
            subtitle: "Text Text Text"
        },
        {
            title: "Why we need your Passport Details",
            subtitle: "Text Text Text"
        }
    ]

    return (
        <Layout.BackgroundImageView className="px-8 pt-10 pb-2">
            <View className="divide-y divide-[#D9D9D9] border-b border-[#D9D9D9]">
                <View className="pb-6 space-y-1">
                    <Text className="font-montserrat-700 text-[28px]">Safety : Stay up to date</Text>
                    <Text className="font-montserrat-500 text-sm">Understand how we secure your baggage</Text>
                </View>
                {items.map((item, i) => {
                    const { title } = item;
                    return (
                        <Pressable
                            key={`${title.replace(/\s/g, '-')}${i}`}
                            className="flex-row items-center space-x-3.5 py-5"
                            onPress={() => navigation.navigate("SafetyDetailsScreen", item)}
                        >
                            <View className="w-4 h-4 rounded-full border-2" />
                            <Text className="font-montserrat-700 text-base">{title}</Text>
                        </Pressable>
                    )
                })}
            </View>
        </Layout.BackgroundImageView>
    )
}

export default SafetyScreen