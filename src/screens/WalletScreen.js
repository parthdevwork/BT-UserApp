import { useCallback, useState } from "react";
import { useRef, useMemo } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";


const CashCard = ({ style, onAddFundsPress }) => {

    const user = useSelector((state) => state.user.data);


    console.log("user", user?.wallet?.cash?.amount)

    return (
        <View style={style} className="rounded-xl bg-[#FFEC81] w-full p-3 items-start">
            <View className="space-y-5">
                <Text className="font-montserrat-700 text-sm">BaggageTAXi Cash</Text>
                <View className="flex-row space-x-2.5 justify-center items-center w-full">
                    <Text className="font-montserrat-700 text-3xl">{user?.wallet?.cash?.amount}</Text>
                    <Text className="font-montserrat-700 text-3xl">{user?.wallet?.cash?.currency}</Text>
                    <View className="px-6">
                        {/* <Ionicons name="chevron-forward" size={30} color="#666666" /> */}
                    </View>
                </View>
            </View>
            {/* <Pressable
                className="px-3 py-2 bg-white items-center justify-center rounded-full my-8"
                onPress={onAddFundsPress}
            >
                <Text className="font-montserrat-600 text-base">+ Add Funds</Text>
            </Pressable> */}
        </View>
    )
}

const PaymentMethodsItem = ({
    style, title, subtitle, imgSrc,
    wrapperClassName, imageClassName,
    titleClassName, iconClassName
}) => {
    return (
        <View style={style} className={["flex-row space-x-6 py-5", wrapperClassName].filter(Boolean).join(" ")}>
            <Image
                className={["w-6 h-6", imageClassName].filter(Boolean).join(" ")}
                source={imgSrc}
                resizeMode="contain"
            />
            <View className="flex-1">
                <Text className={["font-montserrat-700", titleClassName].filter(Boolean).join(" ")}>{title}</Text>
                {subtitle && <Text className="font-montserrat-700 text-base">{subtitle}</Text>}
            </View>
            <View className={["px-8", iconClassName].filter(Boolean).join(" ")}>
                <Ionicons name="chevron-forward" size={22} color="#666666" />
            </View>
        </View>
    )
}

const PaymentMethods = ({ style }) => {
    return (
        <>
            <View style={style} className="flex-row space-x-2.5 justify-between items-center">
                <Text className="font-montserrat-700 text-lg">Payment methods</Text>
                <View className="items-center justify-center rounded-full px-3 py-2 bg-[#E9E9E9]">
                    <Text className="font-montserrat-600 text-[11px] text-center">+ Add payment method</Text>
                </View>
            </View>
            <View style={style} className="divide-y divide-[#D9D9D9] border-b border-[#D9D9D9]">
                <PaymentMethodsItem
                    title="*** 1472"
                    subtitle="Card expired"
                    imgSrc={require('../../assets/icons/payment.png')}
                    wrapperClassName="pt-0"
                    imageClassName="mt-2"
                    titleClassName="text-base"
                    iconClassName="mt-2"
                />
                <PaymentMethodsItem
                    title="Apply Pay"
                    imgSrc={require('../../assets/icons/apple-pay.png')}
                    wrapperClassName="items-center"
                    titleClassName="text-sm"
                />
                <PaymentMethodsItem
                    title="Cash"
                    imgSrc={require('../../assets/icons/cash.png')}
                    wrapperClassName="items-center"
                    titleClassName="text-sm"
                />
            </View>
        </>
    )
}

const WalletScreen = ({ navigation }) => {
    const bottomSheetRef = useRef(null);
    const [isOpenBottomSheet, setOpenBottomSheet] = useState(false);
    const snapPoints = useMemo(() => ['45%'], []);

    const renderBackdrop = useCallback(props => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
        />
    ), []);

    return (
        <Layout.BackgroundImageView className="p-8 space-y-10">
            <CashCard onAddFundsPress={() => setOpenBottomSheet(true)} />
            {/* <PaymentMethods /> */}
            <BottomSheet
                ref={bottomSheetRef}
                enablePanDownToClose
                snapPoints={snapPoints}
                index={isOpenBottomSheet ? 0 : -1}
                handleIndicatorStyle={{ display: "none" }}
                backdropComponent={renderBackdrop}
                onClose={() => setOpenBottomSheet(false)}
            >
                <View className="divide-y divide-[#D9D9D9] px-5">
                    <View className="pb-3 px-8">
                        <Text className="font-montserrat-700 text-lg text-center">Add Funds</Text>
                    </View>
                    <View className="py-3 px-8">
                        <Text className="font-montserrat-600 text-lg">One-time purchase</Text>
                    </View>
                    <View className="py-3 px-8">
                        <Text className="font-montserrat-600 text-lg">Auto-refill</Text>
                    </View>
                    <View className="py-3 px-8">
                        <Text className="font-montserrat-600 text-lg">+ Add Funds with Cash</Text>
                        <Text className="font-montserrat-400 text-xs">Deposit can we made at Meet & Greet BaggageTaxi Team in Uniform with ID</Text>
                    </View>
                </View>
            </BottomSheet>
        </Layout.BackgroundImageView>
    )
}

export default WalletScreen