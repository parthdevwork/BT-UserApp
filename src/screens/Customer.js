import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Map from '../components/Map';
import io from 'socket.io-client';
import Geocoder from "react-native-geocoding";
const socket = io("https://mapi-dev.baggagetaxi.com");

const Customer = ({ route }) => {
    const BookingDetail = route?.params?.data;
   
    console.log(BookingDetail?.fcollection?.fcollectionLocation)
  const bookingId=BookingDetail?._id
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    Geocoder.init("AIzaSyAs7KlAYPlsLH_7V3Nj2Wdhx-RiPt2HEAc");
    const [locationData, setLocationData] = useState("")
    const [time, setTime] = useState(0)
    const[distance, setDistance] = useState("")
    const getCoordinates = async() => {
      await Geocoder.from(BookingDetail?.fcollection?.fcollectionLocation)
        .then(json => {
          const location = json.results[0].geometry.location;
          setLocationData({
            latitude: location.lat,
            longitude: location.lng
          });
        })
        .catch(error => console.warn(error));
    };
    
    useEffect(() => {
        getCoordinates();
    }, [])
    useEffect(() => {
        if (bookingId) {
            // Join the room for the specific booking
            socket.emit('joinRoom', bookingId);

            // Listen for location updates
            socket.on('locationUpdate', (data) => {
                if (data.bookingId === bookingId) {
                    setTime(data?.duration)
                    setDistance(data?.distance)
                    setLocation({ latitude: data?.latitude, longitude: data?.longitude });
                }
            });

            // Cleanup on component unmount or bookingId change
            return () => {
                socket.off('locationUpdate');
                socket.emit('leaveRoom', bookingId);
            };
        }
    }, [bookingId]);

    const [refreshKey, setRefreshKey] = useState(0);
    const [onMap, setOnMap] = useState(-1);

    const handleLocationSet = (data) => {

        setRefreshKey((prevKey) => prevKey + 1);
        setOnMap(-1);
    };



    return (
        <View style={styles.container}>
               {time && time > 20 ? 
                <View style={styles.mapContainer}>
             
                {locationData?.latitude ? (
                    <Map
                        key={refreshKey}
                        origin={locationData}
                        destination={location.latitude !== null ? location : null}
                        onMapReady={() => {}}
                        setOnMap={(e) => setOnMap(e === -1 ? e : screenType)}
                        onMap={onMap}
                        onLocationSet={handleLocationSet}
                    />
                ) : null}
                <View style={{flexDirection:"row"}}>
                <Text style={{fontSize:20}}>Time:{time? time: null}</Text>
                <Text style={{fontSize:20}}>Distance:{distance? distance: null}</Text>
                </View>
            </View> : 
            <View style={{alignItems:"center", justifyContent:"center", flex:1,  backgroundColor:"white", width:"100%"}}>
            
            <Text style={{margin:50}}>It will show the Handler's location when it is 20 minutes away from the Pick-Up location.</Text>
            </View> }
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },
    mapContainer: {
     
        width: '100%',
        height:"98%"

    },
});

export default Customer;



