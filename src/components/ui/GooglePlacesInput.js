import React from 'react';
import { View, Text, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Colors } from '../../constants/colors';
import { Images } from '../../constants/images';
import { GOOGLE_MAP_KEY } from '@env';
import { Montserrat_400Regular, Montserrat_400Regular_Italic, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

const GooglePlacesInput = ({
  placeholder = '',
  setopensearch = () => {},
  onLocationSet,
  setLocation,
  Location,
  pressContinue = true,
  placeholder1
}) => {

  return (
    <GooglePlacesAutocomplete
      enablePoweredByContainer={false}
      fetchDetails={true}
      placeholder={placeholder ? placeholder : placeholder1}
      
      listViewDisplayed={false}
      currentLocationLabel="Current location"
      debounce={200}
      currentLocation={true}
      enableHighAccuracyLocation={true}
      onPress={(data, details = null) => {

        setLocation(data);
        onLocationSet({
          latitude: parseFloat(details?.geometry?.location?.lat),
          longitude: parseFloat(details?.geometry?.location?.lng),
          data: data,
        });
      }}
      query={{
        key: GOOGLE_MAP_KEY,
        language: 'en',
        components: 'country:AE',
      }}
      styles={{
        container: {
          zIndex: 10,
          overflow: 'visible',
          height: 35,
          width: '100%',
          flexGrow: 0,
          flexShrink: 0,
          
  // fontFamily: 'Montserrat-Regular',
        },
        textInput: {

          borderColor:
            Location === '' && !placeholder && pressContinue
              ? 'red'
              : Colors.grayborder,
          borderWidth: 1,
          paddingRight: 15,
          fontSize: 14,
         
        },
        listView: {
          position: 'absolute',
          top: 100,
          backgroundColor: 'white',
          borderRadius: 5,
          zIndex: 100,
          overflow: 'scroll',
          maxHeight: 130,
        },
      
      }}
      onFail={(error) => console.error(error)}
      textInputProps={{ placeholderTextColor: Colors.gray700 , }}
      renderRow={(rowData) => {
        const title = rowData?.structured_formatting?.main_text;
        const address = rowData?.structured_formatting?.secondary_text;
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              source={Images.icons.location}
              style={{ height: 25, width: 25 }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 14,color: Colors.gray800 }} className="font-montserrat-400">
                {title}
              </Text>
              <Text style={{ fontSize: 12, color: Colors.gray500 }} className="font-montserrat-400">{address}</Text>
            </View>
          </View>
        );
      }}
    />
  );
};

export default GooglePlacesInput;
