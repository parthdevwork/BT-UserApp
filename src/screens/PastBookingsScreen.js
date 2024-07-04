import { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, FlatList, Pressable, SafeAreaView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import moment from "moment";
import Layout from "../components/Layout";
import { getOrdersByContact } from "../services/order.services";
import { useSelector } from "react-redux";
import { DUBAI_TIMEZONE } from "../constants/dateTime";
import { capitalizeFirst, replaceUAE } from "../constants/utils";

const PastBookingsScreen = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const orderList1 = useSelector((state) => state.order);
  console.log("orderList1", orderList1)
  const orderList = useSelector((state) => state.order?.orderList) ?? [];
  console.log("orderList1", orderList)
  const orders = orderList.filter(
    (order) =>
      order.status === "hubpoint_reached" || order.status === "completed"
  );


  // const reversedorderList = orderList.slice().reverse();


  const Item = ({ item }) => {
    console.log(item)
    const order = item
    const { fdeliveryLocation, FdeliveryDate } = order.delivery || {};
    const { fcollectionLocation, FcollectionDate } = order.fcollection || {};
    const collectionLocation = capitalizeFirst(replaceUAE(fcollectionLocation))
    const deliveryLocation = capitalizeFirst(replaceUAE(fdeliveryLocation))

    const title = `To: ${deliveryLocation} -  ${moment(FdeliveryDate).tz(DUBAI_TIMEZONE).format("DD MMM YYYY HH:mm")}`

    if (!title) return null;

    const id = order.bookingExtId


    return (
      <Pressable
        onPress={() =>
          navigation.navigate("OrderDetailScreen", {
            orderData: order
          })
        }
        key={id}
        className="flex-row border rounded-xl items-center px-2 mx-4 py-3 space-x-2 mt-4"
      >
        <Entypo name="menu" size={24} color="#666666" />
        <View className="flex-1">
          {title && (
            <Text className="font-montserrat-700 text-xs">{title}</Text>
          )}
          {collectionLocation && (
            <Text className="font-montserrat-400 text-xs">
              From: {`${collectionLocation}`}
            </Text>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="space-y-2 bg-white flex-1">
      <View className="space-y-4 px-2 bg-white mt-20">
        <Text className="font-montserrat-700 text-base ml-3">Past</Text>
      </View>
      {isLoading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      )}
      {!isLoading && (
        <View className="space-y-4">
          {orderList?.length > 0 ? (
            <FlatList
              data={orderList}
              renderItem={({ item, i }) => <Item item={item} />}
              keyExtractor={(item) => item.id}
            />
          ) : (<></>
            // <Text className="text-sm font-montserrat-500 mt-2">
            //   You don’t have any recent activity
            // </Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

export default PastBookingsScreen