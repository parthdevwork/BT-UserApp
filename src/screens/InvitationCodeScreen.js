import { useState } from "react";
import { View, Text, SafeAreaView, KeyboardAvoidingView } from "react-native";
import Toast from "react-native-root-toast";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { verifyEmail } from "../services/auth.services";
import { useDispatch } from "react-redux";
import { setUser } from "../store/redux/user";
import Spinner from "react-native-loading-spinner-overlay";

const InvitationCodeScreen = ({ route, navigation }) => {
  const { email } = route?.params || {};
  const [isLoading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const dispatch = useDispatch();


  const codeHandler = (enteredText) => {
    setCode(enteredText);
  };

  const handleContinuePress = async () => {
    navigation.navigate("TermsAgreementScreen");
    return
    setLoading(true);
    verifyEmail({ email, code })
      .then((res) => {
        const data = res?.data;
        console.log("Email",data)
        setLoading(false);
        if (data?.status === "OK") {
          dispatch(setUser({ data: data?.user }));
          navigation.navigate("TermsAgreementScreen");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("ERROR", error);
        Toast.show(
          `Error! - ${
            error?.response?.data?.errors[0] || "Please try again later."
          }`,
          {
            duration: Toast.durations.LONG,
          }
        );
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            padding: 16,
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View style={{ marginTop: 64 }}>
            <Text className="text-base font-montserrat-600 mt-4">
              Enter your invitation code received via email?
            </Text>
            <Input className={"mt-4"} value={code} onChange={codeHandler} />
          </View>
          <Button
            className="w-full mt-8"
            disabled={isLoading}
            label="Continue"
            onPress={handleContinuePress}
          />
        </View>
        <Spinner visible={isLoading} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default InvitationCodeScreen;
