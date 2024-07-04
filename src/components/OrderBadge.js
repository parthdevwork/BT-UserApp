// import { View, Text, Pressable, StyleSheet, Image, Linking, Button, TouchableOpacity } from "react-native";
// import Layout from "../components/Layout";
// import { Colors } from "../constants/colors";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useSelector, useDispatch } from "react-redux";
// import { Images } from "../constants/images";
// import { DUBAI_TIMEZONE } from "../constants/dateTime";
// import { capitalizeFirst, replaceUAE } from "../constants/utils";
// import moment from "moment";
// import { useNavigation } from "@react-navigation/native";


// const OrderBadge = ({ order = {} }) => {
//     console.log("===>",order)
     
//     return (
//         <View style={[styles.boxContainer, {}]}>
//             <View style={{flexDirection:"row"}}>
//             <Text className="text-[16px] font-montserrat-700 mt-4 text-left ml-3">
//             Pick-Up 
//             </Text>
//             {/* <TouchableOpacity style={{height:25, width:90, borderRadius:15,backgroundColor:"#FFCC00", alignItems:"center", justifyContent:'center',alignSelf:"flex-end",marginLeft:"45%"}}>

//                 <Text style={{fontWeight:"600"}}>
//                 Check in
//                 </Text>
//             </TouchableOpacity> */}
//             </View>
//             <Text className="text-[10px] font-montserrat-500 mt-1 text-left " style={{paddingLeft:12}}>
//                 Order Number: {order?.bookingExtId || order?._id}
//             </Text>
//             <View
//                 style={{
//                     flexDirection: "row",
//                     padding: 12,
//                     justifyContent: "space-between",
//                     flexWrap: "wrap",
//                 }}
//             >
//                 <View style={{ flex: 0.8 }}>
//                     <View style={{ flexDirection: "row", marginTop: 8, gap:20 }} className='items-center' >
//                         <View className='flex flex-row'>
//                             <Text className="text-[12px] font-montserrat-400 w-[70px]">
//                                 Pick-up:{" "}</Text>
//                             <View className="max-w-[170px] w-full">
//                                 <Text className="text-sm font-montserrat-600">
//                                     {/* {order?.payload?.pickup_time.split('.')[0] || order?.payload?.pickup_time} */}
//                                     {moment(order?.fcollection?.FcollectionDate).tz(DUBAI_TIMEZONE).format("DD-MMM-YYYY HH:mm")}
//                                 </Text>
//                                 <Text className="text-xs font-montserrat-400 text-gray-800 ">
//                                     Meet at {`${capitalizeFirst(replaceUAE(order?.fcollection?.fcollectionLocation))}`}
//                                 </Text>
//                             </View>
//                         </View>
//                         <TouchableOpacity >
//                             {/* <Text className="underline text-[12px]">Edit</Text> */}
//                         </TouchableOpacity>
//                     </View>
//                     <View style={{ flexDirection: "row", marginTop: 8, gap:20 }} className='items-center' >
//                         <View className='flex flex-row'>
//                             <Text className="text-[12px] font-montserrat-400 w-[70px] ">
//                                 Delivery:{" "}</Text>
//                             <View className="max-w-[170px] w-full">
//                                 <Text className="text-sm font-montserrat-600">
//                                     {/* {order?.payload?.dropoff_time.split('.')[0] || order?.payload?.dropoff_time} */}
//                                     {moment(order?.delivery?.FdeliveryDate).tz(DUBAI_TIMEZONE).format("DD-MMM-YYYY HH:mm")}
//                                 </Text>
//                                 <Text className="text-xs font-montserrat-400 text-gray-800">
//                                 {`${capitalizeFirst(replaceUAE(order?.delivery?.fdeliveryLocation))}`}
//                                 </Text>
//                             </View>
//                         </View>
//                         <TouchableOpacity >
//                             {/* <Text className="underline text-[12px]">Edit</Text> */}
//                         </TouchableOpacity>
//                     </View>
//                 </View>

               
//             </View>
//             {/* <Button title="hello" onPress={() => navigation.navigate("Customer")}></Button> */}
            
//         </View>
//     );
// };


// export default OrderBadge;

// const styles = StyleSheet.create({
//     boxContainer: {
//         // padding: 8,
//         paddingLeft:20,
//         backgroundColor: "#fff",
//         borderRadius: 10,
//         margin: 2,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.8,
//         shadowRadius: 2,
//         elevation: 5,
//     },
// });



import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import moment from "moment";
import { DUBAI_TIMEZONE } from "../constants/dateTime";
import { capitalizeFirst, replaceUAE } from "../constants/utils";
import { Colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const OrderBadge = ({ order , checkIn}) => {

    const navigation = useNavigation()

    if (!order) {
        return (
            <View style={[styles.boxContainer, styles.noBookingContainer]}>
                <Text style={styles.noBookingText} className='text-[#212121] font-montserrat-600'>No booking Found</Text>
            </View>
        );
    }

    return (
        <View style={styles.boxContainer}>
            <View style={{ flexDirection: "row" , alignItems:"center", width:"100%" ,justifyContent:"space-between" }}>
                <Text style={styles.titleText} className="font-montserrat-700">Pick-Up</Text>
                { checkIn == "yes" && 
                <TouchableOpacity className="mr-3 p-1.5 rounded-[15px] px-4"    onPress={() => {
                    navigation.navigate("OrderDetailScreen", {
                      orderData: order,
                    });
                  }}  style={{alignSelf:"flex-end",  justifyContent:"flex-end", backgroundColor: Colors.primaryYellow}}>
                <Text className="font-montserrat-600">Check in</Text>
             </TouchableOpacity>
                }
                 
            </View>
            <Text style={styles.orderNumberText} className="font-montserrat-400">
                Order Number: {order.bookingExtId || order._id}
            </Text>
            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel} className="font-montserrat-400" >Pick-up:</Text>
                    <View style={styles.detailContent}>
                        <Text style={styles.detailTime}>
                            {moment(order.fcollection.FcollectionDate)
                                .tz(DUBAI_TIMEZONE)
                                .format("DD-MMM-YYYY HH:mm")}
                        </Text>
                        <Text style={styles.detailLocation}>
                            Meet at {capitalizeFirst(replaceUAE(order.fcollection.fcollectionLocation))}
                        </Text>
                    </View>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel} className="font-montserrat-400">Delivery:</Text>
                    <View style={styles.detailContent}>
                        <Text style={styles.detailTime}>
                            {moment(order.delivery.FdeliveryDate)
                                .tz(DUBAI_TIMEZONE)
                                .format("DD-MMM-YYYY HH:mm")}
                        </Text>
                        <Text style={styles.detailLocation}>
                            {capitalizeFirst(replaceUAE(order.delivery.fdeliveryLocation))}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    boxContainer: {
        paddingHorizontal: 20,
        paddingVertical:15,
        backgroundColor: "#fff",
        borderRadius: 10,
        margin: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height:.1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5,
    },
    noBookingContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    noBookingText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        padding: 20,
    },
    titleText: {
        fontSize: 18,
        fontWeight: "700",
        marginTop: 4,
        marginLeft: 3,
    },
    orderNumberText: {
        fontSize: 12,
        fontWeight: "500",
        marginTop: 1,
        marginLeft: 4,
    },
    detailsContainer: {
        padding: 12,
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    detailRow: {
        flexDirection: "row",
        marginTop: 8,
    },
    detailLabel: {
        fontSize: 12,
        fontWeight: "400",
        width: 70,
    },
    detailContent: {
        maxWidth: 170,
        width: "100%",
    },
    detailTime: {
        fontSize: 14,
        fontWeight: "600",
    },
    detailLocation: {
        fontSize: 12,
        fontWeight: "400",
        color: "#888",
    },
});

export default OrderBadge;
