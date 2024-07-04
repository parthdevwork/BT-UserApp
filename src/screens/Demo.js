import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import WebSocketService from './WebSocketService';

const Demo = ({ bookingId }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    WebSocketService.connect();
    WebSocketService.joinRoom(bookingId);

    WebSocketService.onLocationUpdate((data) => {
      setLocation(data);
      console.log('Location update received:', data);
    });

    return () => {
      WebSocketService.leaveRoom(bookingId);
      WebSocketService.disconnect();
    };
  }, [bookingId]);

  return (
    <View>
      <Text>Customer App</Text>
      {location && (
        <Text>
          Driver Location: {location.latitude}, {location.longitude}
        </Text>
      )}
    </View>
  );
};

export default Demo;




