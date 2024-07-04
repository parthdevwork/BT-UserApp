// import { useState, useContext, useEffect } from "react";
// import { View, Text, StyleSheet, ScrollView, SafeAreaView, RefreshControl } from "react-native";
// import { useSelector, useDispatch } from "react-redux";
// import BookingSummary from "../components/BookingSummary";
// import { StackActions } from "@react-navigation/native";
// import { AuthContext } from "../store/context/auth-context";
// import { restartOrder } from "../store/redux/order"
// import { getDataOrder } from "../services/order.services"
// import Toast from "react-native-root-toast";



// const OrderCompletedScreen = ({ route, navigation }) => {
//   const { externalKey } = route?.params || {};
//   const authCtx = useContext(AuthContext);
//   const dispatch = useDispatch()
//   const { isAuthenticated } = authCtx;

//   const orderData = useSelector((state) => state.order);
//   const user = useSelector((state) => state.user.data);
//   const [visible, setVisible] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const [dataOrder, setdataOrder] = useState('');
//   const [pickupLocation, setPickupLocation] = useState({ latitude: '', longitude: '' });

//   useEffect(() => {
//     getdata();
//     if (user?.passportFile) {
//       navigation.navigate("ScanPassportScreen")
//     }
//     return () => {
//       dispatch(restartOrder())
//     }
//   }, [])

//   useEffect(() => {
//     getdata();
//     requestLocationPermission();
//   }, []);

//   // Function to request location permissions
//   const requestLocationPermission = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       console.log('Permission to access location was denied');
//       return;
//     }
//     await getLocation();
//   };

//   // Function to get current location
//   const getLocation = async () => {
//     try {
//       let location = await Location.getCurrentPositionAsync();
//       setPickupLocation(location.coords);
//     } catch (error) {
//       console.error('Error getting location:', error);
//     }
//   };

//   // Function to fetch order data
//   const getdata = () => {
//     setLoading(true);
//     getDataOrder(externalKey)
//       .then((res) => {
//         const data = res?.data;
//         setdataOrder(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setLoading(false);
//         Toast.show(
//           `Error! - ${error?.response?.data?.errors[0] || 'Please try again later.'}`,
//           {
//             duration: Toast.durations.LONG,
//           }
//         );
//       });
//   };
//   // Get data of the completed order when component mounts if there's an id in
 

// console.log(pickupLocation);
//   return (
//     <SafeAreaView className='flex-1' >
//  {pickupLocation?.latitude ? (
//             <Map origin={pickupLocation} />
//           ) : null}
//       <View style={styles.background} >
//         <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={() => getdata()} />}  >
       

//           {!!dataOrder?.fcollection &&
//             <BookingSummary
//               navigation={navigation}
//               onPressUpload={() => {
//                 // setVisible(false);
//               }}
//               orderData={orderData}
//               bookingInfo={dataOrder}
//               onPressDone={() => {
//                 setVisible(false);
//                 dispatch(restartOrder())
//                 setTimeout(() => {
//                   // navigation.dispatch(StackActions.popToTop());
//                   navigation.navigate("MultiPurposeMapScreen")
//                 }, 100);

//                 if (!isAuthenticated && !user?.userId) {
//                   navigation.navigate("AccountTab", {
//                     screen: "AccountScreen",
//                   });
//                 }
//               }}
//             />
//           }
//           {!isAuthenticated && !user?.userId ?
//             <Text className="text-xl text-center py-6 mb-12">Log in to view your order</Text> : <></>}
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };
// // {/* </Modal> */}

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
// });

// export default OrderCompletedScreen;


import { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, RefreshControl, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import BookingSummary from "../components/BookingSummary";
import { StackActions } from "@react-navigation/native";
import { AuthContext } from "../store/context/auth-context";
import { restartOrder, setScreenType } from "../store/redux/order";
import { getDataOrder } from "../services/order.services";
import Toast from "react-native-root-toast";
import * as Location from "expo-location"; // Add this import for Location

import Map from "../components/Map";
import { AntDesign } from "@expo/vector-icons";
const OrderCompletedScreen = ({ route, navigation }) => {
  const { externalKey } = route?.params || {};
  const authCtx = useContext(AuthContext);
  const orderData = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const { isAuthenticated } = authCtx;
  const screenType = orderData.screenType
  
  const [loading, setLoading] = useState(true);
  const [dataOrder, setdataOrder] = useState('');
  const [pickupLocation, setPickupLocation] = useState({ latitude: '', longitude: '' });

  useEffect(() => {
    getdata();
    requestLocationPermission();
    return () => {
      dispatch(restartOrder());
    };
  }, []);

  // Function to request location permissions
  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
    await getLocation();
  };

  // Function to get current location
  const getLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync();
      setPickupLocation(location.coords);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  // Function to fetch order data
  const getdata = () => {
    setLoading(true);
    getDataOrder(externalKey)
      .then((res) => {
        const data = res?.data;
        setdataOrder(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Toast.show(
          `Error! - ${error?.response?.data?.errors[0] || 'Please try again later.'}`,
          {
            duration: Toast.durations.LONG,
          }
        );
      });
  };
console.log(pickupLocation);
  return (
    <SafeAreaView style={{ flex: 1 }}>

      {/* <View style={{height:250,marginTop:-40}}>
      <View style={{ position: 'absolute', zIndex: 1, top:Platform.OS=="ios"? 9: 16, left: Platform.OS=="ios" ? 30:20 }}>
            <Pressable
              className="justify-center items-center"
              style={{
                backgroundColor: "#FFCC00",
                borderRadius: 25,
                height: 40,
                width: 40,
              }}
              onPress={()=>{ 
                navigation.navigate("ActivitiesScreen")
              }}
            >
              <AntDesign name="left" size={24} color="black" />
            </Pressable>
          </View>
       {pickupLocation?.latitude ? (
            <Map  />
          ) : null}
          </View> */}
      <View style={styles.background}>
        <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={() => getdata()} />}>
          
         

          {!!dataOrder?.fcollection &&
            <BookingSummary
              navigation={navigation}
              onPressUpload={() => {
                // setVisible(false);
              }}
              orderData={orderData}
              bookingInfo={dataOrder}
              onPressDone={() => {
                // setVisible(false);
                dispatch(restartOrder());
                setTimeout(() => {
                  navigation.navigate("MultiPurposeMapScreen");
                  Toast.show("Your Order is Confirn and please check in Booking")
                }, 100);

                if (!isAuthenticated && !user?.userId) {
                  navigation.navigate("AccountTab", {
                    screen: "AccountScreen",
                  });
                }
              }}
            />
          }
          {!isAuthenticated && !user?.userId ?
            <Text style={{ fontSize: 18, textAlign: 'center', paddingVertical: 12 }}>Log in to view your order</Text> : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff', // Adjust background color as needed
    borderRadius:20,
    // width:"99%"
    
  },
});

export default OrderCompletedScreen;
