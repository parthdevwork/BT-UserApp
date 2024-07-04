import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Barcode from 'react-native-barcode-builder';

const BarcodeGenerator = ({ barcodeValue, backendData,selectedImage }) => {
 

 const renderItem = ({ item }) => {
  

  
  let MatchQrCode = false;

  
  if (selectedImage && Array.isArray(selectedImage)) {
    
    MatchQrCode = selectedImage.some(image => image === item.qrcode);
  }


    return (
      <View style={[styles.barcodeContainer]}>
        <View className='ml-[23px]'>
          <Barcode value={item.qrcode} format="CODE128" width={.6} height={36} lineColor= {MatchQrCode ? "#01A853" : "#851727"} />
        </View>
        <Text style={styles.bagIdText}>Bag{item.baggage_id}</Text>
        <Text style={styles.qrCodeText}>{item.qrcode}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={barcodeValue}
      numColumns={2}
      renderItem={renderItem}
      keyExtractor={(item) => item.qrcode.toString()} 
    />
  );
};

const styles = StyleSheet.create({
  barcodeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
    borderRadius: 10,
    width: 148,
    paddingTop: 10,
    margin: 5,
   
  },
  bagIdText: {
    color: '#212121',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
    transform: [{ rotate: '270deg' }],
    position: 'absolute',
    left: -6,
    top: 24,
  },
  qrCodeText: {
    color: '#757575',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
});

export default BarcodeGenerator;
