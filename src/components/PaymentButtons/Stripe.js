import React, { useState, useEffect } from 'react';
import { StripeProvider, usePlatformPay, confirmPlatformPayPayment, useStripe, PlatformPayButton, PlatformPay } from '@stripe/stripe-react-native';
import moment from 'moment';

import { StyleSheet, View, Alert, Platform } from 'react-native';
import Button from "../ui/Button";
import { } from '@stripe/stripe-react-native';
import { useSelector, useDispatch } from "react-redux";
import {
  updateData,
  setScreenType
} from "../../store/redux/order";
import Toast from "react-native-root-toast";
import { AppConstants } from '../../constants/AppConstants';


const Stripe = ({ onUpdatePayment }) => {
  const customAppearance = {
    // font: {
    //   family:
    //     Platform.OS === 'android' ? 'avenirnextregular' : 'AvenirNext-Regular',
    // },
    shapes: {
      borderRadius: 12,
      borderWidth: 0.5,
    },
    primaryButton: {
      shapes: {
        borderRadius: 20,
      },

    },
    colors: {
      icon: '#000000',
      primary: '#ffcc00',
      background: '#ffffff',
      componentBackground: '#f3f8fa',
      componentBorder: '#f3f8fa',
      componentDivider: '#000000',
      primaryText: '#000000',
      secondaryText: '#000000',
      componentText: '#000000',
      placeholderText: '#73757b',
    },
  };
  const { isPlatformPaySupported } = usePlatformPay();
  const dispatch = useDispatch();
  const API_URL = 'https://api.baggagetaxi.com';
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const orderData = useSelector((state) => state.order);
  const userData = useSelector((state) => state.user.data);

  // console.log("userData",userData)

  React.useEffect(() => {
    (async function () {

      if (await isPlatformPaySupported()) {
        setplatformEnable(true);
        return;
      }
    })();
  }, []);


  const [paymentIntentClientSecret, setpaymentIntentClientSecret] = useState('');
  const [platformEnable, setplatformEnable] = useState(false);

  const fetchPaymentSheetParams = async () => {
    console.log("userData", userData)
    try {
      const response = await fetch(`${AppConstants.BASE_BACKEND}/stripe/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "customer_metadata": {
            name: userData?.firstName + ' ' + userData?.lastName,
            email: userData.email,
            phone: userData.phone
          },
          amount: parseFloat(`${orderData?.payment?.amount}`) * 100,
          currency: orderData?.payment?.currency,
        })
      })

      const res = await response.json()
      console.log(res)
      const { paymentIntent = '', customer = '' } = res
      return {
        paymentIntent,
        customer,
      };
    } catch (error) {
    }
  };
  const initializePaymentSheet = async () => {

    try {

      const { paymentIntent = '', customer = '' } = await fetchPaymentSheetParams();
      setpaymentIntentClientSecret(paymentIntent)
      const { error, ...res } = await initPaymentSheet({
        returnURL: 'com.baggagetaxi://stripe-redirect',
        appearance: customAppearance,
        // applePay: {
        //   merchantCountryCode: 'AE',
        //   merchantId: 'merchant.com.baggagetaxi.customer',
        //   merchantName: 'BaggageTAXI',
        //   // cartItems:
        //   // setOrderTracking:orderData
        // },
        allowsDelayedPaymentMethods: true,
        customerId: customer,
        paymentIntentClientSecret: paymentIntent,
        merchantDisplayName: 'BaggageTAXI',
        // googlePay: {
        //   merchantName: 'BaggageTAXI',
        //   // testEnv: true,
        //   // amount: 100,
        //   // amount:
        //   currencyCode: 'AED',
        //   merchantId: 'com.baggagetaxi.customer2',
        //   merchantCountryCode: 'AE',
        //   // testEnv: true, // use test environment
        // },

      });
      if (!error) {
        setLoading(true);
      }
    } catch (err) {
      console.log(err)
    }
  };



  const openPaymentSheet = async () => {

    //

    const { error, ...res } = await presentPaymentSheet({ clientSecret: paymentIntentClientSecret });

    if (error) {
      console.log(`Error code: ${error.code}`, error.message);
    } else {

      Toast.show('Payment Success, Processing your order!');
      console.log('Success Your order is confirmed!')

      onUpdatePayment({ paymentStatus: 'SUCCESS', idStripe: paymentIntentClientSecret })


      // const customerId = userData?.contact_id;
      // const pickupString = `${orderData?.collect?.pickupDate} ${moment(
      //   orderData?.collect?.pickupTime,
      //   "hh:mm A"
      // ).format("HH:mm")}`;
      // const dropoffString = `${orderData?.delivery?.dropoffDate} ${moment(
      //   orderData?.delivery?.dropoffTime,
      //   "hh:mm A"
      // ).format("HH:mm")}`;
      // const createOrderData = {
      //   customer: customerId, //"contact_gPVlVge",
      //   driver: null,
      //   service_quote_uuid: null,
      //   meta: {
      //     bags: orderData?.delivery?.bagsCount,
      //   },
      //   qr_code: null,
      //   customer_type: "fleet-ops:contact",
      //   facilitator_type: "fleet-ops:contact",
      //   pickup: orderData?.collect?.id,
      //   dropoff: orderData?.delivery?.id,
      //   pickup_time: pickupString, //"2023-11-02 10:00:00",
      //   dropoff_time: dropoffString, //"2023-11-02 16:00:00",j
      // };

      setLoading(true);
    }
  };
  useEffect(() => {
    setLoading(true);
    initializePaymentSheet();

  }, []);

  //-----------Google pay

  const fetchPaymentIntentClientSecret = async () => {
    // Fetch payment intent created on the server, see above
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: 'usd',
      }),
    });
    const { clientSecret } = await response.json();

    return clientSecret;
  };

  const pay = async () => {
    const clientSecret = paymentIntentClientSecret

    const { error } = await confirmPlatformPayPayment(
      clientSecret,
      {

        applePay: {
          cartItems: [
            {
              label: 'Example item name',
              amount: 150,
              paymentType: PlatformPay.PaymentType.Immediate,
            },
          ],
          merchantCountryCode: 'AE',
          currencyCode: 'AE',
          requiredShippingAddressFields: [
            PlatformPay.ContactField.PostalAddress,
          ],
          requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
        },

        googlePay: {
          amount: '350',
          allowCreditCards: true,
          label: 'BaggagetaxiGoo',
          // testEnv: true,
          merchantName: 'My merchant name',
          merchantCountryCode: 'AE',
          currencyCode: 'AE',
          billingAddressConfig: {
            format: PlatformPay.BillingAddressFormat.Full,
            isPhoneNumberRequired: true,
            isRequired: true,
          },
        },
      }
    );


    // const { error: error2, paymentMethod } = await createPlatformPayPaymentMethod({
    //   googlePay: {
    //     amount: 12,
    //     currencyCode: 'USD',
    //     testEnv: true,
    //     merchantName: 'Test',
    //     merchantCountryCode: 'US',
    //   },
    // });

    // if (error2) {
    //   Alert.alert(error2.code, error2.message);
    //   return;
    // } else if (paymentMethod) {
    //   Alert.alert(
    //     'Success',
    //     `The payment method was created successfully. paymentMethodId: ${paymentMethod.id}`
    //   );
    // }


    if (error) {
      Alert.alert(error.code, error.message);
      console.log('error', error)
      return;
    }
    Alert.alert('Success', 'The payment was confirmed successfully.');
  };


  return (

    // <StripeProvider publishableKey="sk_test_51MvcYHGKPIuTtlzHd2I22n1dsi760dRg6tkx9sm725eKnJxkqK89ZavfrqcGFYt1oGbau73pxUJrBmejFZfLI8YC005wp8Ri9k" merchantIdentifier={`${Platform.OS === 'android' ? 'merchant.com.baggagetaxi.customer1' : 'merchant.com.baggagetaxi'}`} stripeAccountId='acct_1MvcYHGKPIuTtlzH' urlScheme='https://www.baggagetaxi.com' >
    <StripeProvider publishableKey="pk_live_51MvcYHGKPIuTtlzHVzi7sAQ3qrAtB11qCHp7NasXyLQY40YB2wIiKmZgNpGhMMtg8eVWBAQUER5hMsz8UcNKp6on000hgYp6h8" merchantIdentifier={`${Platform.OS === 'android' ? 'merchant.com.baggagetaxi.customer2' : 'merchant.com.baggagetaxi'}`} stripeAccountId='acct_1MvcYHGKPIuTtlzH' urlScheme='https://www.baggagetaxi.com' >
      <View className="flex gap-3 ">
        <Button
          disabled={!loading}
          color="#841584"
          onPress={openPaymentSheet}
          label="Checkout"
        />

        {/* {platformEnable && (
          <PlatformPayButton
            className="mt-2"
            onPress={() => pay()}
            type={PlatformPay.ButtonType.Order}
            appearance={PlatformPay.ButtonStyle.Black}
            borderRadius={7}
            style={{
              height: 45,
            }}
          />
        )} */}
      </View>

    </StripeProvider>

  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 20,
    // marginHorizontal: 100,
    // marginVertical: 100,
  },
});

export default Stripe;