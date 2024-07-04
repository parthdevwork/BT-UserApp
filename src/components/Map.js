import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Colors } from "../constants/colors";
import FontAwesome from '@expo/vector-icons/FontAwesome5'
import Ionicons from '@expo/vector-icons/Ionicons';
// import { AppConstants } from '../constants/AppConstants';
import Button from "./ui/Button";
import { GOOGLE_MAP_KEY } from "@env";
function Map({ navigation, origin, destination, onMapReady, screenType, setOnMap = () => { }, onMap = -1, onLocationSet }) {
  const [mapRegion, setMapRegion] = useState(null); 
  const [location, setlocation] = useState({ latitude: 0.0, longitude: 0.0 })
  const refMap = useRef(null)

  useEffect(() => {
    if (origin && destination) {
      // Calculate the minimum and maximum coordinates for the bounding box
      const minLat = Math.min(origin?.latitude ?? 0, destination?.latitude ?? 0);
      const maxLat = Math.max(origin?.latitude ?? 0, destination?.latitude ?? 0);
      const minLng = Math.min(origin?.longitude ?? 0, destination?.longitude ?? 0);
      const maxLng = Math.max(origin?.longitude ?? 0, destination?.longitude ?? 0);

      // Calculate the center and delta of the bounding box
      const centerLat = (minLat + maxLat) / 2;
      const centerLng = (minLng + maxLng) / 2;
      const deltaLat = maxLat - minLat + 0.02;
      const deltaLng = maxLng - minLng + 0.1;

      // Adjust the centerLat to be slightly higher
      const adjustedCenterLat = centerLat - 0.01;

      setMapRegion({
        latitude: adjustedCenterLat,
        longitude: centerLng,
        latitudeDelta: deltaLat,
        longitudeDelta: deltaLng,
      });
    } else if (origin) {
      setMapRegion({
        latitude: origin?.latitude,
        longitude: origin?.longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      });
    }
  }, [origin, destination]);

  const setCaptureLocation = (e) => {

  }
  const setRegion = (e) => {

    setlocation(e)
    // if(onMap==-1){
    //   setOnMap()
    // }
  }

  const getPlace = () => {

    // setCoord(selectedLocation)
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location?.latitude},${location?.longitude}&key=${GOOGLE_MAP_KEY}&language=en`;
    // const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location?.latitude},${location?.longitude}&radius=10&key=${GOOGLE_MAP_KEY}&language=en`;
    // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=latitude,longitude&radius=radius&key=YOUR_API_KEY
    // 
    //  geocoder
    //     .geocode({ location: selectedLocation })
    //     .then((response) => {
    //         console.log("Response1", response);
    //         if (response.results[0]) {
    //         } else {
    //             window.alert("No results found");
    //         }
    //     })
    //     .catch((e) => window.alert("Geocoder failed due to: " + e));

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        let dato = {}
        console.log("data.results", data.results)
        if (data.results.length > 0) {
          const placeName = data.results[0]

          // console.log(data.result)

          if (!`${placeName?.formatted_address}`.includes("United Arab Emirates")) {
            alert('Only is available for United Arab Emirates')
            return;
          }

          // const structured_formatting = { main_text: placeName?.formatted_address }

          // dato = { value: placeName?.formatted_address, structured_formatting }

          // const len = placeName?.address_components.length - 1

          // let terms = []
          // for (let index = len; index >= 0; index--) {
          //   terms.push({ offset: len, value: placeName?.address_components[index]?.long_name });
          // }
          // terms = terms.reverse();
          // dato = { ...dato, terms, description: placeName?.formatted_address, ...placeName }

          console.log("first...", location, placeName.formatted_address)

          onLocationSet({ ...location, data: { ...placeName, description: placeName.formatted_address } })

        } else {
          console.log('No results found.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }



  return (

    <>
      <View className={"relative flex flex-1 mt-10"} >



        <MapView
          ref={refMap}

          provider={PROVIDER_GOOGLE}
          // provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
          key={screenType}
          style={styles.map}
          initialRegion={mapRegion}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}

          // onRegionChangeComplete={(e)=>setCaptureLocation(e)}
          // onRegionChange={(region) => setMapRegion(region)}
          onPointerEnterCapture={() => setCaptureLocation()}
          onPointerMoveCapture={() => setCaptureLocation()}
          onRegionChangeComplete={region => setRegion(region)}
        // onRegionChange={region => setRegion(region)}
        // onPress={()=>{console.log('!@#$$$');setOnMap(-1)}}
        >

          {destination?.latitude && origin?.latitude && (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAP_KEY}
              strokeWidth={3}
              strokeColor="blue"
              mode="DRIVING"
              onReady={(result) => {
                onMapReady(result);
              }}
            />
          )}
          {destination?.latitude && (
            <Marker
              title="Picked Location"
              coordinate={{
                latitude: destination?.latitude,
                longitude: destination?.longitude,
              }}
            />
          )}

          {origin?.latitude && (
            <Marker
              title="Current Location"
              coordinate={{
                latitude: origin?.latitude,
                longitude: origin?.longitude,
              }}
            />
          )}

        </MapView>
        {onMap !== -1 ?
          <View className={`absolute bottom-1/2 right-1/2 transform -translate-x-1/2 -translate-y-1/2 -mr-3 `}  >
            <FontAwesome name="map-pin" size={48} color={Colors.primary800} />
          </View> : <></>}
      </View>
      {onMap !== -1 ? <View style={styles.mainContainer} className="mb-20" >
        <View style={styles.headerContainer} className="flex flex-row justify-between px-5 py-1 items-center align-middle">
          <Text className="text-base font-montserrat-700">
            {onMap === 0 ? 'Collection' : 'Delivery'}
          </Text>

          <FontAwesome name="window-close" size={32} color={'#000'} onPress={() => setOnMap(-1)} />

        </View>
        <View style={styles.bottomContainer} >
          <Button
            disabled={(location.latitude === "" || location.longitude === "")}
            className=" w-full mt-6 h-11 "
            // textClassName="text-[#FFCC00] "
            label={`Confirm ${onMap === 0 ? 'pickup' : 'dropoff'}`}
            onPress={() => getPlace()}
          />
        </View>
      </View> : <></>}
    </>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  mainContainer: {
    // position: "flex",
    // bottom: 0,
    // left: 0,
    // right: 0,
    // flex:1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // elevation: 5,
  },
  headerContainer: {
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // marginTop: 16,
  },
  bottomContainer: {

    flex: 1,
    backgroundColor: "#fff",
    // borderTopStartRadius: 10,
    // borderTopEndRadius: 10,
    padding: 16,
  },
});
