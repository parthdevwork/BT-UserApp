// // import { useEffect, useState } from "react";

// // import { useSelector, useDispatch } from "react-redux";
// // import { View, Text, Image, Pressable, ScrollView, RefreshControl, Button } from "react-native";
// // import { Ionicons } from "@expo/vector-icons";
// // import OrderBadge from '../components/OrderBadge'

// // import Layout from "../components/Layout";
// // import { getOrdersByUser } from "../services/order.services";
// // import { updateToOrderList } from "../store/redux/order";
// // import Toast from "react-native-root-toast";
// // const ActivitiesScreen = ({ navigation }) => {
// //   const dispatch = useDispatch();

// //   const orderList = useSelector((state) => state.order?.orderList);
// //   const orders = (orderList.filter(
// //     (orderObj) =>
// //       orderObj.status == "hubpoint_reached" || orderObj.status == "completed"
// //   ) ?? []);
// //   // const order = orderData[0] || {}; // Get the First item for Recent Booking
// //   const filteredOrders = orderList.filter(
// //     (orderObj) =>
// //       orderObj.status === "created" || orderObj.status === "driver_enroute"
// //   );

// //   // const order = filteredOrders.length > 0 ? filteredOrders[0] : {};

// //   const { id, customer, payload, meta } = order || {};
// //   const { public_id } = customer || {};
// //   const { dropoff_time, dropoff } = payload || {};
// //   const { bags } = meta || {};
// //   const { name: dropoff_name } = dropoff || {};
// //   // const bookingCount = id ? 1 : 0;
// //   // const bookingCount = filteredOrders.length;
// //   const bookingCount = filteredOrders.length;

// //   const order = orderList[0]

// //   const [isLoading, setLoading] = useState(false);
// //   const userData = useSelector((state) => state.user.data);

// //   useEffect(() => {
// //     if (!userData?.userIdFleetbase && !userData?.contact_id && !userData?.public_id && !userData.id) return;
// //     onRefresh();
// //   }, [userData]);


// //   // const getBokings = async () => {
// //   //   try {
// //   //     const { data, status } = await getOrdersByUser(1, token)
// //   //     if (status === 200 || status === 201) {
// //   //       setbookings(data);
// //   //     } else if (status === 400 || status === 401) {
// //   //       handleLogOut();
// //   //     } else {
// //   //       console.error("FAIL data bokings")
// //   //     }
// //   //   } catch (error: any) {
// //   //     if (error?.response.status === 401) {
// //   //       toast.error("Please, Sign in again")
// //   //       handleLogOut();
// //   //     }
// //   //   }
// //   // }



// //   const onRefresh = () => {
// //     setLoading(true);
// //     // console.log({ userData })
// //     // getOrdersByContact(userData?.userIdFleetbase || userData?.public_id || userData?.contact_id || userData?.id)
// //     getOrdersByUser(userData?._id, userData?.token)
// //       .then((res) => {
        
// //         if (res != null ) {
// //           const dataList = res
// //           dispatch(updateToOrderList(dataList));
// //         }
// //       })
// //       .catch((err) => {
// //         console.error(err)
// //         console.log("first")
// //         Toast.show("Something went wrong!, try again or contact with customer support", { duration: Toast.durations.LONG });
// //       })
// //       .finally(() => setLoading(false));
// //   }

// //   return (
// //     <Layout.BackgroundImageView className="p-4 space-y-8">
// //       <ScrollView
// //         // contentContainerStyle={styles.scrollView}
// //         refreshControl={
// //           <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
// //         }>
// //         {/* <Pressable onPress={() => onRefresh()}style={{marginTop:50}} ><Text>Refresh</Text></Pressable> */}
// //         <Text className="font-montserrat-800 text-2xl py-3 text-left m mt-20">
// //         Active bookings
// //         </Text>

// //         {/* <View className="flex-row rounded-2xl bg-[#FFCC00] p-9 pr-6 pb-12 items-end space-y-2.5 justify-between">
// //           <View className="space-y-2.5">
// //             <View className="space-y-10">
// //               <Text className="font-montserrat-500 text-sm">
// //                 You have{" "}
// //                 {bookingCount > 1
// //                   ? `${bookingCount} bookings`
// //                   : bookingCount === 1
// //                     ? `${bookingCount} booking`
// //                     : "no booking"}{" "}
// //               </Text>
// //             </View>
// //             <Pressable
// //               disabled={bookingCount === 0}
// //               onPress={() => {
// //                 navigation.navigate("OrderDetailScreen", {
// //                   orderData: order,
// //                 });
// //               }}
// //               className="flex-row items-end space-x-1"
// //             >
// //               <Text className="font-montserrat-400 text-xs">
// //                 {bookingCount > 0 ? "Check your booking" : "Reserve your booking"}
// //               </Text>
// //               <AntDesign name="arrowright" size={12} color="black" />
// //             </Pressable>
// //           </View>
// //           <Image
// //             className="w-9 h-9"
// //             source={require("../../assets/icons/calendar.png")}
// //             resizeMode="contain"
// //           />
// //         </View> */}
// //         <Pressable
// //           disabled={orderList.length === 0}
// //           onPress={() => {
// //             navigation.navigate("OrderDetailScreen", {
// //               orderData: order,
// //             });
// //           }}
// //           className="py-4 relative"
// //         >
// //           <OrderBadge order={order} />
         
// //         </Pressable>

// //         {/* {id && (
// //           <View>
// //             <Shadow
// //               className="space-y-4 bg-white p-6 rounded-xl flex-1 w-full"
// //               distance={7}
// //             >
// //               {dropoff_name && (
// //                 <Text className="font-montserrat-700 text-base" numberOfLines={2}>
// //                   Arrival {dropoff_name}
// //                 </Text>
// //               )}
// //               <View className="flex-row justify-start items-end space-x-2">
// //                 <View className="space-y-4 flex-1">
// //                   {(dropoff_time || dropoff_name) && (
// //                     <View className="flex-row space-x-2.5 flex-1">
// //                       <View>
// //                         <Text className="font-montserrat-400 text-xs">
// //                           Drop-Off:
// //                         </Text>
// //                       </View>
// //                       <View className="flex-1">
// //                         {dropoff_time && (
// //                           <Text className="font-montserrat-600 text-xs">
// //                             {moment(dropoff_time).format("DD. MMM YYYY   HH:mm")}
// //                           </Text>
// //                         )}
// //                         {dropoff_name && (
// //                           <Text
// //                             className="font-montserrat-400 text-xs"
// //                             numberOfLines={2}
// //                           >
// //                             {dropoff_name}
// //                           </Text>
// //                         )}
// //                       </View>
// //                     </View>
// //                   )}
// //                   {(dropoff_time || dropoff_name) && (
// //                     <View className="flex-row space-x-2.5 flex-1">
// //                       <View>
// //                         <Text className="font-montserrat-400 text-xs">
// //                           Delivery:
// //                         </Text>
// //                       </View>
// //                       <View className="flex-1">
// //                         {dropoff_time && (
// //                           <Text className="font-montserrat-600 text-xs">
// //                             {moment(dropoff_time).format("DD. MMM YYYY   HH:mm")}
// //                           </Text>
// //                         )}
// //                         {dropoff_name && (
// //                           <Text
// //                             className="font-montserrat-600 text-xs"
// //                             numberOfLines={2}
// //                           >
// //                             {dropoff_name}
// //                           </Text>
// //                         )}
// //                       </View>
// //                     </View>
// //                   )}
// //                 </View>
// //                 {[undefined, null].indexOf(bags) === -1 && (
// //                   <View className="justify-end items-end space-y-3 flex-shrink-0 ml-auto">
// //                     <View>
// //                       <Text className="font-montserrat-700 text-xs text-right">
// //                         Total
// //                       </Text>
// //                       <Text className="font-montserrat-700 text-xs text-right">
// //                         {bags} Baggage
// //                       </Text>
// //                     </View>
// //                     <Pressable
// //                       onPress={() => {
// //                         navigation.navigate("OrderDetailScreen", {
// //                           orderData: order,
// //                         });
// //                       }}
// //                       className="bg-[#FFCC00] rounded-2xl px-5 py-2"
// //                     >
// //                       <Text className="font-montserrat-700 text-base">
// //                         Check-In
// //                       </Text>
// //                     </Pressable>
// //                   </View>
// //                 )}
// //               </View>
// //             </Shadow>
// //           </View>
// //         )} */}
// //         {orderList.length > 1 &&
// //           <Pressable
// //             className="flex flex-1 space-x-1 "
// //             style={{marginTop:182}}
// //             onPress={() =>
// //               navigation.navigate("PastBookingsScreen")
// //             }
// //           >
// //             <View className="flex rounded-2xl bg-[#FFCC00] p-4 pr-6  space-y-2.5 justify-between">
// //               <Text className="font-montserrat-700 text-base">Past</Text>
// //               <View className="space-y-2.5 flex-1 flex-row items-center justify-between">
// //                 {orders?.length === 0 ? (<></>
// //                   // <Text className="font-montserrat-500 text-sm">
// //                   //   You don't have any recent activity
// //                   // </Text>
// //                 ) : null}
// //                 <View className=" flex flex-row items-center">
// //                   <Image
// //                     className="w-12 h-12"
// //                     source={require("../../assets/icons/history.png")}
// //                     resizeMode="contain"
// //                   />
// //                   <Text className="font-montserrat-500 ">See more details</Text>
// //                 </View>
// //                 <Ionicons name="chevron-forward" size={32} color="#666666" />
// //               </View>
// //             </View>
// //           </Pressable>
// //         }
        
// //       </ScrollView>
// //     </Layout.BackgroundImageView>
// //   );
// // };

// // export default ActivitiesScreen;



// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { View, Text, Image, Pressable, ScrollView, RefreshControl } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import OrderBadge from '../components/OrderBadge';
// import Layout from "../components/Layout";
// import { getOrdersByUser } from "../services/order.services";
// import { updateToOrderList } from "../store/redux/order";
// import Toast from "react-native-root-toast";
// import { useFocusEffect } from '@react-navigation/native';
// const ActivitiesScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const orderList = useSelector((state) => state.order?.orderList);

//   const orders = orderList.filter(
//     (orderObj) =>
//       orderObj.status === "hubpoint_reached" || orderObj.status === "completed"
//   ) ?? [];

//   console.log("======>", orders);
//   const filteredOrders = orderList.filter(
//     (orderObj) =>
//       orderObj.status === "created" || orderObj.status === "driver_enroute"
//   );
//   const bookingCount = filteredOrders.length;
//   const order = orderList[0];
//   const [isLoading, setLoading] = useState(false);
//   const userData = useSelector((state) => state.user.data);

//   useFocusEffect(
//     React.useCallback(() => {
//       fetchData();
//     }, [])
//   );
//   useEffect(() => {
//     if (!userData?.userIdFleetbase && !userData?.contact_id && !userData?.public_id && !userData.id) return;
//   }, [userData]);

//   const fetchData = () => {
//     setLoading(true);
//     getOrdersByUser(userData?._id, userData?.token)
//       .then((res) => {
//         if (res != null) {
//           const dataList = res;
//           dispatch(updateToOrderList(dataList));
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         console.log("first");
//         Toast.show("Something went wrong!, try again or contact with customer support", {
//           duration: Toast.durations.LONG,
//         });
//       })
//       .finally(() => setLoading(false));
//   };
//   const orderData = useSelector((state) => state.order);

//   console.log("========>",orderData)
//   return (
//     <Layout.BackgroundImageView className="p-4 space-y-12 ">
//       <ScrollView
//         refreshControl={
//           <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
//         }
//       >
//         <Text className="font-montserrat-800 text-2xl py-3 text-left">
//           Active bookings
//         </Text>

//         <Pressable
//           disabled={orderList.length === 0}
//           onPress={() => {
//             navigation.navigate("OrderDetailScreen", {
//               orderData: order,
//             });
//           }}
//           className="py-4 "
//         >
//           <OrderBadge order={order} />
//         </Pressable>

//         {orderList.length > 1 && (
//           <Pressable
//             className="flex flex-1 space-x-1 "
//             style={{ marginTop: 182 }}
//             onPress={() => navigation.navigate("PastBookingsScreen")}
//           >
//             <View className="flex rounded-2xl bg-[#FFCC00] p-4 pr-6  space-y-2.5 justify-between">
//               <Text className="font-montserrat-700 text-base">Past bookings</Text>
//               <View className="space-y-2.5 flex-1 flex-row items-center justify-between">
//                 {orders?.length !== 0 ? null : (
//                   <View className=" flex flex-row items-center">                  
//                     <Text className="font-montserrat-500 ">See more details</Text>
//                     <Ionicons name="chevron-forward" size={20} color="black" />
//                   </View>
//                 )}
               
              
//               </View>
//             </View>
//           </Pressable>
//         )}
//       </ScrollView>
//     </Layout.BackgroundImageView>
//   );
// };

// export default ActivitiesScreen;


import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Pressable, ScrollView, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OrderBadge from '../components/OrderBadge';
import Layout from "../components/Layout";
import { getOrdersByUser } from "../services/order.services";
import { updateToOrderList } from "../store/redux/order";
import Toast from "react-native-root-toast";
import { useFocusEffect } from '@react-navigation/native';

const ActivitiesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.order?.orderList);
  const [isLoading, setLoading] = useState(false);
  const userData = useSelector((state) => state.user.data);

  // Fetch data when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  useEffect(() => {
    // Fetch data initially based on user data
    if (!userData?.userIdFleetbase && !userData?.contact_id && !userData?.public_id && !userData.id) return;
    fetchData();
  }, [userData]);

  const fetchData = () => {
    setLoading(true);
    getOrdersByUser(userData?._id, userData?.token)
      .then((res) => {
        if (res != null) {
          const dataList = res;
          dispatch(updateToOrderList(dataList));
        }
      })
      .catch((err) => {
        console.error(err);
        Toast.show("Something went wrong! Try again or contact customer support.", {
          duration: Toast.durations.LONG,
        });
      })
      .finally(() => setLoading(false));
  };

  const order = orderList[0]; // Assuming you want to display the first order
  const orders = orderList.filter(
    (orderObj) =>
      orderObj.status === "hubpoint_reached" || orderObj.status === "completed"
  ) ?? [];

  const bookingCount = orderList.filter(
    (orderObj) =>
      orderObj.status === "created" || orderObj.status === "driver_enroute"
  ).length;

  return (
    <Layout.BackgroundImageView className="p-4 space-y-12">
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
      >
        <Text className="font-montserrat-800 text-2xl py-3 text-left">
          Active bookings
        </Text>

        <Pressable
          disabled={orderList.length === 0}
          // onPress={() => {
          //   navigation.navigate("OrderDetailScreen", {
          //     orderData: order,
          //   });
          // }}
          className="py-4"
        >
          <OrderBadge order={order} checkIn={"yes"}/>
        </Pressable>

        {orderList.length > 1 && (
          <Pressable
            className="flex space-x-1 bottom-14 absolute w-full"
            style={{}}
            onPress={() => navigation.navigate("PastBookingsScreen")}
          >
            <View className="flex rounded-2xl bg-[#FFCC00] pl-4 pr-4 pt-5  justify-between">
              <Text className="font-montserrat-700 text-base">Past bookings</Text>
              <View className="  flex-row ">
                {orders.length !== 0 ? null : (
                  <View className="flex flex-row items-center mb-5">
                    <Text className="font-montserrat-500 text-[10px]">See more details</Text>
                    <Ionicons name="chevron-forward" size={12} color="black" />
                  </View>
                )}
              </View>
            </View>
          </Pressable>
        )}
      </ScrollView>
    </Layout.BackgroundImageView>
  );
};

export default ActivitiesScreen;
