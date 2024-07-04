import React from 'react';
import { StyleSheet } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const OTPInput = ({ value, onChange }) => {
  return (
    <OTPInputView
      className="mx-auto"
      style={styles.otpInput}
      pinCount={4}
      code={value}
      onCodeChanged={onChange}
      autoFocusOnLoad
      codeInputFieldStyle={styles.codeInputFieldStyle}
      keyboardType='phone-pad'
    />
  );
};

const styles = StyleSheet.create({
  otpInput: {
    maxWidth: 250,
    height: 60,

  },
  codeInputFieldStyle: {
    borderColor: "rgba(0, 0, 0, 0.50)",
    borderWidth: 1,
    borderRadius: 8,
    color: "black"
  }
});

export default OTPInput;