import { View, Text } from "react-native";
import Layout from "../components/Layout";

const SafetyDetailsScreen = ({ route, navigation }) => {
    const { title, subtitle } = route?.params || {};

    return (
        <Layout.BackgroundImageView className="px-8 pt-10 pb-2">
            <View className="pb-6 space-y-1">
                <Text className="font-montserrat-700 text-[28px]">{title}</Text>
                <Text className="font-montserrat-500 text-sm">{subtitle}</Text>
            </View>
        </Layout.BackgroundImageView>
    )
}

export default SafetyDetailsScreen