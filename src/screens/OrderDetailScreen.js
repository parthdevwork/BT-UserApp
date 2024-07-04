import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image, Linking, TouchableOpacity, Alert } from 'react-native';
import Layout from '../components/Layout';
import { Images } from '../constants/images';
import OrderBadge from '../components/OrderBadge';
import QRCode from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { AppConstants } from '../constants/AppConstants';
import Toast from 'react-native-root-toast';

const OrderDetailScreen = ({ navigation, route }) => {
  const { orderData } = route?.params || {};
  const userData = useSelector((state) => state.user.data);
  const [checkedData, setCheckedData] = useState(null);
   console.log('====>',orderData);
  const id = orderData?._id;
  const token = userData?.apiKey;

  useEffect(() => {
    ConfirmApi();
  }, []);

  const ConfirmApi = async () => {
    try {
      const url = `${AppConstants.BASE_BACKEND}/booking/getOrderRecivedStatus/${id}`;
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setCheckedData(response?.data);
    } catch (error) {
      console.log('Error confirming order:', error);
      // Alert.alert('Error', 'Failed to confirm order. Please try again later.');
    }
  };
 
  const handleConfirmReceive = () => {

    if (checkedData && checkedData.OrderReceivedByCustomer) {

      Toast.show('Order already received by customer');
    } else if (checkedData && checkedData.statusOrder === 'reached_dropoff' && !checkedData.OrderReceivedByCustomer) {

      navigation.navigate('CheckOutBarcode', { orderData });
    } else {

      Toast.show('Driver has not reach yet');
    }
  };

  const customerSupport = () => {
    return (
      <Pressable
        onPress={() => Linking.openURL(`tel:+97145757500`)}
        style={[styles.boxContainer, { width: '100%', marginTop: 12 }]}
      >
        <Text className="text-sm font-montserrat-600">Call</Text>
        <Text className="text-sm font-montserrat-600">Customer Service</Text>
      </Pressable>
    );
  };

  const chatWithPickPoint = () => {
    return (
      <Pressable
        onPress={() => Linking.openURL(`https://wa.me/97145757500`)}
        style={[styles.boxContainer1, { marginLeft: 12, flex: 1, height: 'auto', alignItems: 'center', justifyContent: 'center' }]}
      >
        <Image source={Images.icons.chat_pickup} style={{ height: 50, width: 50, alignSelf: 'center' }} resizeMode="contain" />
        <Text className="text-[13px] font-montserrat-700 mt-2 break-words" style={{ textAlign: 'center' }}>
          Track Handler
        </Text>
        <Text className="text-[8px] font-montserrat-600 text-[#aaa]" style={{ textAlign: 'center' }}>
          Activates within 10 mins prior arrival
        </Text>
      </Pressable>
    );
  };

  const qrCodeContainer = () => {
    return (
      <View style={[styles.boxContainer, { marginTop: 12, paddingLeft: 8 }]}>
        <Text className="text-[16px] font-montserrat-700 mt-4 text-center">Show QR Code to</Text>
        <Text className="text-[16px] font-montserrat-700 text-center">Pick-Up Your Baggage</Text>
        <View
          className="mt-[24px]"
          style={{
            flexDirection: 'row',
            flez: 1,
            padding: 8,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <View>
            <Text className="text-[14px] text-center font-montserrat-700">You have</Text>
            <Text className="font-montserrat-700 text-[16px] text-center">{orderData?.fcollection?.baggageCount}</Text>
            <Text className="text-[14px] text-center font-montserrat-700">checked Bags</Text>
            <TouchableOpacity
              style={{
                height: 30,
                backgroundColor: '#FFCC00',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                paddingHorizontal: 10,
                marginTop: 15,
                display: checkedData && checkedData.OrderReceivedByCustomer ? 'none' : 'flex', // Hide button if OrderReceivedByCustomer is true
              }}
              onPress={handleConfirmReceive}
            >
              <Text style={{ fontSize: 12 }}>Confirm & Receive</Text>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <QRCode
              value={orderData._id}
              size={180}
              logo={{ uri: Images.general.logob64 }}
              logoSize={25}
              logoBackgroundColor="transparent"
            />
            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>Pin:</Text>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}> {orderData?.bookingPin}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Layout.BackgroundImageView className="px-4 pt-5 pb-2">
      <View style={{ }}></View>
      <OrderBadge order={orderData} />
      <View style={{ flexDirection: 'row', width: '100%', marginTop: 12, justifyContent: 'center' }}>
        <View className="" style={{ flex: 1, width: '100%' }}>
          <Pressable
            onPress={() => navigation.navigate('Customer', { data: orderData })}
            style={[styles.boxContainer, { flex: 1, width: '100%' }]}
          >
            <Text className="text-sm font-montserrat-600">Chat with{"  "} Customer Service</Text>
          </Pressable>
          {customerSupport()}
        </View>
        {chatWithPickPoint()}
      </View>
      {qrCodeContainer()}
    </Layout.BackgroundImageView>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: .1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
  },
  boxContainer1: {
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: .1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default OrderDetailScreen;
