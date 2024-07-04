import { View, ScrollView, ImageBackground } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements';

const Layout = ({ children, style }) => {
    const headerHeight = useHeaderHeight();

    return (
        <View className="flex-1 bg-white" style={[{ marginTop: headerHeight - 10 }, style]}>
            {children}
        </View>
    )
}

Layout.ScrollView = ({ children, style }) => {
    return (
        <Layout>
            <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-1" style={style}>
                    {children}
                </View>
            </ScrollView>
        </Layout>
    )
}

Layout.BackgroundImageView = ({ children, style }) => {
    return (
        <Layout>
            <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
{/* <ImageBackground resizeMode='cover' source={require('../../assets/gtaxi_background.png')} className="flex-1"> */}
                    <View className="flex-1" style={style}>
                        {children}
                    </View>
                {/* </ImageBackground> */}
            </ScrollView>
        </Layout>
    )
}

export default Layout;