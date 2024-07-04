// import React, { useEffect, useState } from 'react';
// import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
// import Layout from '../components/Layout';
// import BarcodeGenerator from '../components/BarcodeGenerator';
// import { AppConstants } from '../constants/AppConstants';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import Button from '../components/ui/Button';

// const CheckOutBarcode = ({ navigation, route }) => {
//   const userData = useSelector((state) => state.user.data);
//   const [details, setDetails] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const data = route.params;
//   const id = data?.orderData?._id;
//   const token = userData?.apiKey;

//   useEffect(() => {
//     getdata();
//   }, [route]);

//   const handleScanComplete = (data) => {
//     setSelectedImage(data);
//     navigation.navigate('CheckOutBarcode');
//   };

//   const scanButtonClickHandler = () => {
//     navigation.navigate('Barcode', { onScanComplete: handleScanComplete });
//   };

//   const getdata = async () => {
//     try {
//       const url = `${AppConstants.BASE_BACKEND}/booking/getBaggageDetails/${id}`;
//       const response = await axios.post(url, {}, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       setDetails(response.data);
//     } catch (error) {
//       console.log('Error fetching data:', error);
//     }
//   };

//   return (
//     <Layout.BackgroundImageView className="px-4 pt-10 pb-2">
//       <SafeAreaView style={styles.container}>
//         <View className='flex flex-col h-full justify-between' style={{ width: '90%', alignSelf: 'center' }}>
//           <View>
//             <View className='border-[#00000033] border-[1px] bg-white' style={{ height: '60%', marginTop: 40, borderRadius: 15 }}>
//               <View style={{ marginHorizontal: 10 }}>
//                 <Text className='' style={{ fontSize: 15, padding: 5 }}>The following Baggage pieces with your Barcode will be returned to you</Text>
//                 <BarcodeGenerator barcodeValue={details?.baggage_details || selectedImage} backendData={details?.baggage_details} />
//               </View>
//             </View>
//             <View className='border-[#00000033] border-[1px] bg-white mt-2 px-6 py-5 rounded-[10px]'>
//               <Text className='text-[10px] font-montserrat-700'>Recorded Damages from Check-In</Text>
//               <View className='border-[#00000033] border-[1px] py-[20px] rounded-[8px] px-[8px] mt-1'>
//                 <Text className='text-[10px] text-[#00000060]'>None</Text>
//               </View>
//             </View>
//             <Button label={'Scan Barcode'} textClassName={'font-inter-500'} style={{ marginTop: 25 }} onPress={scanButtonClickHandler} />
//           </View>
//           <View>
//             <Button label={'Continue'} />
//           </View>
//         </View>
//       </SafeAreaView>
//     </Layout.BackgroundImageView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {},
// });

// export default CheckOutBarcode;



import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Alert } from 'react-native';
import Layout from '../components/Layout';
import BarcodeGenerator from '../components/BarcodeGenerator';
import { AppConstants } from '../constants/AppConstants';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Button from '../components/ui/Button';
import Toast from 'react-native-root-toast';

const CheckOutBarcode = ({ navigation, route }) => {
  const userData = useSelector((state) => state.user.data);
  const [details, setDetails] = useState(null);
  const [scannedImages, setScannedImages] = useState([]); // State to hold scanned barcode
  const [allQrcode, setAllQrcode] = useState([])
  const [damageNote, setDamageNote] = useState()
  const data = route.params;
  const id = data?.orderData?._id;
  const token = userData?.apiKey;

  useEffect(() => {
    getdata();
  }, [route]);

  const handleScanComplete = (data) => {

    setScannedImages(prevImages => [...prevImages, data]);
    navigation.navigate('CheckOutBarcode');
  };


  const scanButtonClickHandler = () => {

    navigation.navigate('Barcode', { onScanComplete: handleScanComplete });
  };
  const getdata = async () => {
    try {
      const url = `${AppConstants.BASE_BACKEND}/booking/getBaggageDetails/${id}`;
      const response = await axios.post(url, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setDetails(response.data)
      setDamageNote(response)
      if (response?.data?.baggage_details) {
        const qrCodes = response.data.baggage_details.map(item => item.qrcode);
        setAllQrcode(qrCodes);
      }

    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const CompleteOrder = async () => {
    try {
      const url = `${AppConstants.BASE_BACKEND}/booking/orderReciveConfirm/${id}`;
      const response = await axios.post(url, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log("=========>", response?.data?.message);
      if (response.status === 201) {
        // Toast.show(response?.data?.message)
        navigation.navigate("ActivitiesScreen")
      }
    } catch (error) {
      console.log('Error confirming order:', error);

      // Alert.alert('Error', 'Failed to confirm order. Please try again later.');
    }
  };


  return (
    <Layout.BackgroundImageView className="px-4 pt-10 pb-2">
      <SafeAreaView style={styles.container}>
        <View className='flex flex-col h-full justify-between' style={{ width: '90%', alignSelf: 'center' }}>
          <View>
            <View className='border-[#00000033] border-[1px] bg-white' style={{ height: '60%', marginTop: 40, borderRadius: 15 }}>
              <View style={{ marginHorizontal: 10 }}>
                <Text className='' style={{ fontSize: 15, padding: 5 }}>The following Baggage pieces with your Barcode will be returned to you</Text>
                <BarcodeGenerator barcodeValue={details?.baggage_details} backendData={details?.baggage_details} selectedImage={scannedImages} />
              </View>
            </View>
            <View className='border-[#00000033] border-[1px] bg-white mt-2 px-6 py-5 rounded-[10px]'>
              <Text className='text-[10px] font-montserrat-700'>Recorded Damages from Check-In</Text>
              <View className='border-[#00000033] border-[1px] py-[20px] rounded-[8px] px-[8px] mt-1'>
                <Text className='text-[10px] text-[#00000060]'>None</Text>
              </View>
            </View>
            <Button label={'Scan Barcode'} textClassName={'font-inter-500'} disabled={allQrcode.length == scannedImages.length} style={{ marginTop: 25 }} onPress={scanButtonClickHandler} />
          </View>
          <View>
            <Button label={'I confirm that I received my Baggage'} textClassName={'font-inter-500 text-[15px]'} disabled={allQrcode.length > scannedImages.length} onPress={CompleteOrder} />
          </View>
        </View>
      </SafeAreaView>
    </Layout.BackgroundImageView>
  );
};

const styles = StyleSheet.create({

});

export default CheckOutBarcode;
