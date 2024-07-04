import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import { useSelector } from "react-redux";
import axios from "axios";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import * as ImagePicker from "expo-image-picker";
import { SelectList } from "react-native-dropdown-select-list";
import DatePicker from "react-native-date-picker";
import { AntDesign } from "@expo/vector-icons";
import { AppConstants } from "../constants/AppConstants";
const EditProfileScreen = ({navigation}) => {
  const updateData = useSelector((state) => state.user.userData);

  const userData = useSelector((state) => state.user.data);
  const [name, setName] = useState(userData ? userData?.firstName : "");
  const [name1, setName1] = useState(false);
  const [number, setNumber] = useState(userData ? userData?.phone : "");
  const [number1, setNumber1] = useState(false);
  const [apidata, setapiData]=useState({})
  const [email, setEmail] = useState(userData ? userData?.email : "");
  const [email1, setEmail1] = useState(false);
  const [lastName, setLastName] = useState(userData ? userData?.lastName : "");
  const [lastName1, setLastName1] = useState(false);
  const [whatsapp, setWhatApp] = useState(
    updateData ? updateData?.whatsAppNumber : ""
  );
  
  const [whatsapp1, setWhatApp1] = useState(false);
  const [otherNumber, setotherNumber] = useState(
    updateData ? updateData?.otherNumber : ""
  );
  const [otherNumber1, setotherNumber1] = useState(false);
  const [backup, setbackUp] = useState(updateData ? updateData?.backupEmail : "");
  const [backup1, setbackUp1] = useState(false);
 
  const [gender, setGender] = useState(updateData ? updateData?.gender: "");
  const userId = userData?.userId;
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [image, setImage] = useState(null);
  const [counrty, setCountry] = useState(updateData? updateData?.nationality:"");

  const country = [
    { value: "Afghanistan", code: "AF" },
    { value: "land Islands", code: "AX" },
    { value: "Albania", code: "AL" },
    { value: "Algeria", code: "DZ" },
    { value: "American Samoa", code: "AS" },
    { value: "AndorrA", code: "AD" },
    { value: "Angola", code: "AO" },
    { value: "Anguilla", code: "AI" },
    { value: "Antarctica", code: "AQ" },
    { value: "Antigua and Barbuda", code: "AG" },
    { value: "Argentina", code: "AR" },
    { value: "Armenia", code: "AM" },
    { value: "Aruba", code: "AW" },
    { value: "Australia", code: "AU" },
    { value: "Austria", code: "AT" },
    { value: "Azerbaijan", code: "AZ" },
    { value: "Bahamas", code: "BS" },
    { value: "Bahrain", code: "BH" },
    { value: "Bangladesh", code: "BD" },
    { value: "Barbados", code: "BB" },
    { value: "Belarus", code: "BY" },
    { value: "Belgium", code: "BE" },
    { value: "Belize", code: "BZ" },
    { value: "Benin", code: "BJ" },
    { value: "Bermuda", code: "BM" },
    { value: "Bhutan", code: "BT" },
    { value: "Bolivia", code: "BO" },
    { value: "Bosnia and Herzegovina", code: "BA" },
    { value: "Botswana", code: "BW" },
    { value: "Bouvet Island", code: "BV" },
    { value: "Brazil", code: "BR" },
    { value: "British Indian Ocean Territory", code: "IO" },
    { value: "Brunei Darussalam", code: "BN" },
    { value: "Bulgaria", code: "BG" },
    { value: "Burkina Faso", code: "BF" },
    { value: "Burundi", code: "BI" },
    { value: "Cambodia", code: "KH" },
    { value: "Cameroon", code: "CM" },
    { value: "Canada", code: "CA" },
    { value: "Cape Verde", code: "CV" },
    { value: "Cayman Islands", code: "KY" },
    { value: "Central African Republic", code: "CF" },
    { value: "Chad", code: "TD" },
    { value: "Chile", code: "CL" },
    { value: "China", code: "CN" },
    { value: "Christmas Island", code: "CX" },
    { value: "Cocos (Keeling) Islands", code: "CC" },
    { value: "Colombia", code: "CO" },
    { value: "Comoros", code: "KM" },
    { value: "Congo", code: "CG" },
    { value: "Congo, The Democratic Republic of the", code: "CD" },
    { value: "Cook Islands", code: "CK" },
    { value: "Costa Rica", code: "CR" },
    { value: "Cote Ivoire", code: "CI" },
    { value: "Croatia", code: "HR" },
    { value: "Cuba", code: "CU" },
    { value: "Cyprus", code: "CY" },
    { value: "Czech Republic", code: "CZ" },
    { value: "Denmark", code: "DK" },
    { value: "Djibouti", code: "DJ" },
    { value: "Dominica", code: "DM" },
    { value: "Dominican Republic", code: "DO" },
    { value: "Ecuador", code: "EC" },
    { value: "Egypt", code: "EG" },
    { value: "El Salvador", code: "SV" },
    { value: "Equatorial Guinea", code: "GQ" },
    { value: "Eritrea", code: "ER" },
    { value: "Estonia", code: "EE" },
    { value: "Ethiopia", code: "ET" },
    { value: "Falkland Islands (Malvinas)", code: "FK" },
    { value: "Faroe Islands", code: "FO" },
    { value: "Fiji", code: "FJ" },
    { value: "Finland", code: "FI" },
    { value: "France", code: "FR" },
    { value: "French Guiana", code: "GF" },
    { value: "French Polynesia", code: "PF" },
    { value: "French Southern Territories", code: "TF" },
    { value: "Gabon", code: "GA" },
    { value: "Gambia", code: "GM" },
    { value: "Georgia", code: "GE" },
    { value: "Germany", code: "DE" },
    { value: "Ghana", code: "GH" },
    { value: "Gibraltar", code: "GI" },
    { value: "Greece", code: "GR" },
    { value: "Greenland", code: "GL" },
    { value: "Grenada", code: "GD" },
    { value: "Guadeloupe", code: "GP" },
    { value: "Guam", code: "GU" },
    { value: "Guatemala", code: "GT" },
    { value: "Guernsey", code: "GG" },
    { value: "Guinea", code: "GN" },
    { value: "Guinea-Bissau", code: "GW" },
    { value: "Guyana", code: "GY" },
    { value: "Haiti", code: "HT" },
    { value: "Heard Island and Mcdonald Islands", code: "HM" },
    { value: "Holy See (Vatican City State)", code: "VA" },
    { value: "Honduras", code: "HN" },
    { value: "Hong Kong", code: "HK" },
    { value: "Hungary", code: "HU" },
    { value: "Iceland", code: "IS" },
    { value: "India", code: "IN" },
    { value: "Indonesia", code: "ID" },
    { value: "Iran, Islamic Republic Of", code: "IR" },
    { value: "Iraq", code: "IQ" },
    { value: "Ireland", code: "IE" },
    { value: "Isle of Man", code: "IM" },
    { value: "Israel", code: "IL" },
    { value: "Italy", code: "IT" },
    { value: "Jamaica", code: "JM" },
    { value: "Japan", code: "JP" },
    { value: "Jersey", code: "JE" },
    { value: "Jordan", code: "JO" },
    { value: "Kazakhstan", code: "KZ" },
    { value: "Kenya", code: "KE" },
    { value: "Kiribati", code: "KI" },
    { value: "Korea, Democratic PeopleRepublic of", code: "KP" },
    { value: "Korea, Republic of", code: "KR" },
    { value: "Kuwait", code: "KW" },
    { value: "Kyrgyzstan", code: "KG" },
    { value: "Lao People Democratic Republic", code: "LA" },
    { value: "Latvia", code: "LV" },
    { value: "Lebanon", code: "LB" },
    { value: "Lesotho", code: "LS" },
    { value: "Liberia", code: "LR" },
    { value: "Libyan Arab Jamahiriya", code: "LY" },
    { value: "Liechtenstein", code: "LI" },
    { value: "Lithuania", code: "LT" },
    { value: "Luxembourg", code: "LU" },
    { value: "Macao", code: "MO" },
    { value: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
    { value: "Madagascar", code: "MG" },
    { value: "Malawi", code: "MW" },
    { value: "Malaysia", code: "MY" },
    { value: "Maldives", code: "MV" },
    { value: "Mali", code: "ML" },
    { value: "Malta", code: "MT" },
    { value: "Marshall Islands", code: "MH" },
    { value: "Martinique", code: "MQ" },
    { value: "Mauritania", code: "MR" },
    { value: "Mauritius", code: "MU" },
    { value: "Mayotte", code: "YT" },
    { value: "Mexico", code: "MX" },
    { value: "Micronesia, Federated States of", code: "FM" },
    { value: "Moldova, Republic of", code: "MD" },
    { value: "Monaco", code: "MC" },
    { value: "Mongolia", code: "MN" },
    { value: "Montenegro", code: "ME" },
    { value: "Montserrat", code: "MS" },
    { value: "Morocco", code: "MA" },
    { value: "Mozambique", code: "MZ" },
    { value: "Myanmar", code: "MM" },
    { value: "Namibia", code: "NA" },
    { value: "Nauru", code: "NR" },
    { value: "Nepal", code: "NP" },
    { value: "Netherlands", code: "NL" },
    { value: "Netherlands Antilles", code: "AN" },
    { value: "New Caledonia", code: "NC" },
    { value: "New Zealand", code: "NZ" },
    { value: "Nicaragua", code: "NI" },
    { value: "Niger", code: "NE" },
    { value: "Nigeria", code: "NG" },
    { value: "Niue", code: "NU" },
    { value: "Norfolk Island", code: "NF" },
    { value: "Northern Mariana Islands", code: "MP" },
    { value: "Norway", code: "NO" },
    { value: "Oman", code: "OM" },
    { value: "Pakistan", code: "PK" },
    { value: "Palau", code: "PW" },
    { value: "Palestinian Territory, Occupied", code: "PS" },
    { value: "Panama", code: "PA" },
    { value: "Papua New Guinea", code: "PG" },
    { value: "Paraguay", code: "PY" },
    { value: "Peru", code: "PE" },
    { value: "Philippines", code: "PH" },
    { value: "Pitcairn", code: "PN" },
    { value: "Poland", code: "PL" },
    { value: "Portugal", code: "PT" },
    { value: "Puerto Rico", code: "PR" },
    { value: "Qatar", code: "QA" },
    { value: "Reunion", code: "RE" },
    { value: "Romania", code: "RO" },
    { value: "Russian Federation", code: "RU" },
    { value: "RWANDA", code: "RW" },
    { value: "Saint Helena", code: "SH" },
    { value: "Saint Kitts and Nevis", code: "KN" },
    { value: "Saint Lucia", code: "LC" },
    { value: "Saint Pierre and Miquelon", code: "PM" },
    { value: "Saint Vincent and the Grenadines", code: "VC" },
    { value: "Samoa", code: "WS" },
    { value: "San Marino", code: "SM" },
    { value: "Sao Tome and Principe", code: "ST" },
    { value: "Saudi Arabia", code: "SA" },
    { value: "Senegal", code: "SN" },
    { value: "Serbia", code: "RS" },
    { value: "Seychelles", code: "SC" },
    { value: "Sierra Leone", code: "SL" },
    { value: "Singapore", code: "SG" },
    { value: "Slovakia", code: "SK" },
    { value: "Slovenia", code: "SI" },
    { value: "Solomon Islands", code: "SB" },
    { value: "Somalia", code: "SO" },
    { value: "South Africa", code: "ZA" },
    { value: "South Georgia and the South Sandwich Islands", code: "GS" },
    { value: "Spain", code: "ES" },
    { value: "Sri Lanka", code: "LK" },
    { value: "Sudan", code: "SD" },
    { value: "Surivalue", code: "SR" },
    { value: "Svalbard and Jan Mayen", code: "SJ" },
    { value: "Swaziland", code: "SZ" },
    { value: "Sweden", code: "SE" },
    { value: "Switzerland", code: "CH" },
    { value: "Syrian Arab Republic", code: "SY" },
    { value: "Taiwan, Province of China", code: "TW" },
    { value: "Tajikistan", code: "TJ" },
    { value: "Tanzania, United Republic of", code: "TZ" },
    { value: "Thailand", code: "TH" },
    { value: "Timor-Leste", code: "TL" },
    { value: "Togo", code: "TG" },
    { value: "Tokelau", code: "TK" },
    { value: "Tonga", code: "TO" },
    { value: "Trinidad and Tobago", code: "TT" },
    { value: "Tunisia", code: "TN" },
    { value: "Turkey", code: "TR" },
    { value: "Turkmenistan", code: "TM" },
    { value: "Turks and Caicos Islands", code: "TC" },
    { value: "Tuvalu", code: "TV" },
    { value: "Uganda", code: "UG" },
    { value: "Ukraine", code: "UA" },
    { value: "United Arab Emirates", code: "AE" },
    { value: "United Kingdom", code: "GB" },
    { value: "United States", code: "US" },
    { value: "United States Minor Outlying Islands", code: "UM" },
    { value: "Uruguay", code: "UY" },
    { value: "Uzbekistan", code: "UZ" },
    { value: "Vanuatu", code: "VU" },
    { value: "Venezuela", code: "VE" },
    { value: "Viet Nam", code: "VN" },
    { value: "Virgin Islands, British", code: "VG" },
    { value: "Virgin Islands, U.S.", code: "VI" },
    { value: "Wallis and Futuna", code: "WF" },
    { value: "Western Sahara", code: "EH" },
    { value: "Yemen", code: "YE" },
    { value: "Zambia", code: "ZM" },
    { value: "Zimbabwe", code: "ZW" },
  ];
  const handleGenderChange = (itemValue) => {
    setSelectedGender(itemValue);
  };
  const handleDateConfirm = (date) => {
    setDate(date);
    const formattedDate = date.toLocaleDateString(); 
    setSelectedDate(formattedDate); 
    closeDatePicker();
  };
  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const closeDatePicker = () => {
    setShowDatePicker(false);
  };
  const [date, setDate] = useState(new Date());
  const ChangeData = async () => {
    let data = {
      firstName: name,
      phone: number,
      email: email,
      lastName: lastName,
      whatsAppNumber: whatsapp,
      otherNumber: otherNumber,
      backupEmail: backup,
      gender:gender,
      dateofbirth:date,
      nationality: counrty,
      
    };
    const token = userData?.token;
  
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const apiUrl = `${AppConstants.BASE_BACKEND}/auth/${userId}`;
      const response = await axios.patch(apiUrl, data, { headers });
      console.log(response);

    } catch (e) {
      console.log("reponse", e);
    }
  };
  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });



    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const timeOption = [
    {
      value: "Male",
    },
    {
      value: "Female",
    },
  ];
  const uploadProfileImage = async () => {
    const formData = new FormData();
    formData.append("profileimage", {
      uri: image,
      type: "image/jpeg",
      name: "profile.jpg",
    });

    const url = `${AppConstants.BASE_BACKEND}/auth/profileimage/${userId}`;
    const token = userData?.token;

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

    } catch (error) {
      console.error("Upload failed:", error.response.data);
    }
  };



  
  const Submitdata = async () => {
    ChangeData()
    // imageData()
    uploadProfileImage();
  };

  return (
    <View style={{ flexGrow: 1 }}>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <ScrollView style={{ marginTop: Platform.OS=='ios'? 110:90 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColorcenter: "#000",
              paddingLeft: 23,
              height: 60,
              alignItems: "center",
            }}
          >
            <Text style={{ width: "48%" }} className="font-montserrat-600 text-[16px]">Your Profile </Text>
            <TouchableOpacity
              style={{
                height: 35,
                width: 180,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
              }}
            >
              <Text className="font-montserrat-600 text-[16px]">Change Password</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View>
            <TouchableOpacity onPress={pickImage} style={{}}>
              {image && image ? (
                  
                <Image source={{ uri: image }}style={{
                  alignSelf: "flex-start",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginHorizontal:verticalScale(20),
                  borderRadius:40
                }}  className="w-20 h-20" />
              ) : (
                <Image
                  className="w-20 h-20"
                  style={{
                    alignSelf: "flex-start",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    marginHorizontal:verticalScale(20),
                  }}
                  source={require("../../assets/icons/avatar2.png")}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
            <AntDesign name="pluscircle" size={24} color="black" style={{alignSelf:"flex-end", width:"40%", marginTop:-25 }} />
            </View>
            <View style={{}}>
              <Text style={{ fontSize: 10 }}>First Name</Text>
              {name1 == false ? (
                <View style={styles.inptxt2}>
                  <Text style={{ fontSize: 15, width: 200 }}>{name}</Text>
                  <TouchableOpacity onPress={() => setName1(true)}>
                    <Image
                      source={require("../../assets/image.png")}
                      style={{
                        height: 15,
                        width: 15,
                        alignSelf: "center",
                        marginLeft: 15,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.inptxt2}>
                  <TextInput
                    style={{ fontSize: 15, width: 200 }}
                    placeholder="Email"
                    value={name}
                    onChangeText={(T) => setName(T)}
                  />
                  <TouchableOpacity>
                    <Image
                      source={require("../../assets/image.png")}
                      style={{
                        height: 15,
                        width: 15,
                        alignSelf: "center",
                        marginLeft: 15,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}

              <Text style={{ fontSize: 10, marginTop: 12 }}>Last name</Text>
              {lastName1 === false ? (
                <View style={styles.inptxt2}>
                  <Text style={{ fontSize: 15, width: 200 }}>{lastName}</Text>
                  <TouchableOpacity onPress={() => setLastName1(true)}>
                    <Image
                      source={require("../../assets/image.png")}
                      style={{
                        height: 15,
                        width: 15,
                        alignSelf: "center",
                        marginLeft: 15,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.inptxt2}>
                  <TextInput
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={(t) => setLastName(t)}
                    style={{ fontSize: 15, width: 200 }}
                  ></TextInput>
                  <TouchableOpacity>
                    <Image
                      source={require("../../assets/image.png")}
                      style={{
                        height: 15,
                        width: 15,
                        alignSelf: "center",
                        marginLeft: 15,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <View style={{ marginHorizontal: 30, width: "100%" }}>
            <Text style={{ fontSize: 10, marginTop: 15 }}>Phone number</Text>
            {number1 === false ? (
              <View style={styles.inptxt}>
                <Text style={{ fontSize: 15, width: "90%" }}>{number}</Text>
                <TouchableOpacity onPress={() => setNumber1(true)}>
                  <Image
                    source={require("../../assets/image.png")}
                    style={{
                      height: 15,
                      width: 15,
                      alignSelf: "center",
                      marginLeft: 15,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.inptxt}>
                <TextInput
                  style={{ fontSize: 15, width: "90%" }}
                  placeholder="Phone Number"
                  value={number}
                  inputMode="numeric"
                  onChangeText={(T) => setNumber(T)}
                />
                <TouchableOpacity >
                  <Image
                    source={require("../../assets/image.png")}
                    style={{
                      height: 15,
                      width: 15,
                      alignSelf: "center",
                      marginLeft: 15,
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
            <Text style={{ fontSize: 10, marginTop: 15 }}>WhatsApp number</Text>
            <View style={styles.inptxt}>
              {whatsapp1== true  ? (
                <TextInput
                  style={{ fontSize: 15, width: "90%" }}
                  placeholder="WhatsApp Number"
                  value={whatsapp}
                  inputMode="numeric"
                  onChangeText={(text) => setWhatApp(text)}
                />
              ) : (
                <Text style={{ fontSize: 15, width: "90%" }}>{whatsapp}</Text>
              )}
              <TouchableOpacity onPress={()=> setWhatApp1(true)}>
                <Image
                  source={require("../../assets/image.png")}
                  style={{
                    height: 15,
                    width: 15,
                    alignSelf: "center",
                    marginLeft: 15,
                  }}
                />
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 10, marginTop: 15 }}>Other number</Text>
            <View style={styles.inptxt}>
              {otherNumber1== true  ? (
                <TextInput
                  style={{ fontSize: 15, width: "90%" }}
                  placeholder="Other Number"
                  value={otherNumber}
                  inputMode="numeric"
                  onChangeText={(text) => setotherNumber(text)}
                />
              ) : (
                <Text style={{ fontSize: 15, width: "90%" }}>
                  {otherNumber}
                </Text>
              )}
              <TouchableOpacity onPress={()=> setotherNumber1(true)} >
                <Image
                  source={require("../../assets/image.png")}
                  style={{
                    height: 15,
                    width: 15,
                    alignSelf: "center",
                    marginLeft: 15,
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 10, marginTop: 15 }}>Email</Text>
            <View style={styles.inptxt}>
  {email1 == true ? (
     <Text style={{ fontSize: 15, width: "90%" }}>{email}</Text>
  ) : (
    <Text style={{ fontSize: 15, width: "90%" }}>{email}</Text>
  )}
  <TouchableOpacity onPress={()=> setEmail1(true)}>
    <Image
      source={require("../../assets/image.png")}
      style={{ height: 15, width: 15, alignSelf: "center", marginLeft: 15 }}
    />
  </TouchableOpacity>
</View>
            <Text style={{ fontSize: 10, marginTop: 15 }}>Backup Email</Text>
            <View style={styles.inptxt}>
              {backup1 ? (
                <TextInput
                  style={{ fontSize: 15, width: "90%" }}
                  placeholder="Backup Email"
                  value={backup}
                  onChangeText={(text) => setbackUp(text)}
                />
              ) : (
                <Text style={{ fontSize: 15, width: "90%" }}>{backup}</Text>
              )}
              <TouchableOpacity onPress={() => setbackUp1(!backup1)}>
                <Image
                  source={require("../../assets/image.png")}
                  style={{
                    height: 15,
                    width: 15,
                    alignSelf: "center",
                    marginLeft: 15,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#F6F6F6",
              paddingLeft: 30,
              height: 60,
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text style={{ width: "58%" }} className="font-montserrat-600 text-[16px]">Your Credentials </Text>
          </View>
          <View style={{ marginLeft: 30 }}>
            <Text style={{ fontSize: 10, marginTop: 15 }}>Gender</Text>
            <View
              style={{
                alignSelf: "center",
                justifyContent: "center",
                width: "100%",
                marginTop: 10,
                maxHeight: 200,
              }}
            >
              <View style={{ width: "90%" }}>
                <SelectList
                  setSelected={(T) => setGender(T)}
                  data={timeOption}
                  label="Gender"
                />
              </View>
            </View>
            <View style={{}}>
              <Text style={{ fontSize: 10, marginTop: 15 }}>Date of Birth</Text>
              {/* <Button title="Select Date" onPress={openDatePicker} /> */}
              <TouchableOpacity
                onPress={openDatePicker}
                style={{
                  height: 48,
                  width: "90%",
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "black",
                  alignItems: "center",
                  flexDirection: "row",
                
                }}
                className="mt-3"
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "black",
                    paddingLeft: 20,
                    width: "86%",
                  }}
                >
                  {selectedDate ? selectedDate : "Select Date"}
                </Text>
                <Image
                  source={require("../../assets/image.png")}
                  style={{ height: 15, width: 15, marginLeft: 15 }}
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DatePicker
                  date={date}
                  onDateChange={setDate}
                  mode="date"
                  style={{ width: 200 }}
                  modal
                  open={showDatePicker}
                  onConfirm={handleDateConfirm}
                  onCancel={closeDatePicker}
                />
              )}
            </View>
            <Text style={{ fontSize: 10, marginTop: 15 }}>Nationality</Text>
            <View
              style={{
                alignSelf: "center",
                justifyContent: "center",
                width: "100%",
                marginTop: 10,
                maxHeight: 400,
              }}
            >
              <View style={{ width: "90%" }}>
                <SelectList setSelected={(T) => setCountry(T)} data={country} />
              </View>
            </View>
{ userData?.passportApproveStatus == "unapproved" ?

<View>
<Text style={{ fontSize: 14, marginTop: 15, color: "red" }}>
  Passport Identity Verification
</Text>
<Text style={{ fontSize: 10, marginTop: 3, width: "89%" }}>
  Your Identification is needed for us to transport & Store your
  Baggage as per local laws.
</Text>
<Pressable
  style={{
    marginTop: 30,
    backgroundColor: "#F91414",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    width: "92%",
    borderRadius: 15,
  }}
  // className="flex-row rounded-xl bg-[#F91414] p-3 items-center justify-center space-y-2.5"
  onPress={() => navigation.navigate("PassportVerificationScreen")}
>
  <Text className="font-montserrat-600 text-base text-white">
    Scan Passport Picture Page
  </Text>
</Pressable>
</View> 


     : 
              
     <View style={{flexDirection:"row", marginTop:25}}>

     <View style={{width:'80%'}}>
       <Text style={{color:"#30CC00"}}>Passport Identity  Completed</Text>
       <Text className="text-[10px] max-w-[250px]">Your  Identification is needed for us to transport & Store your Baggage as per local laws.</Text>
     </View>
     <View style={{height:40, width:40, backgroundColor:"#30CC00"}} className='flex items-center justify-center rounded-full'>
       <AntDesign name="check" size={24} color="black" />
     </View>
  </View> 
       
        }



<TouchableOpacity style={{height:50, backgroundColor:"#FFCC00", borderRadius:15, alignItems:"center",justifyContent:"center", marginRight:30, marginVertical:25}} onPress={ Submitdata}>
                <Text style={{fontSize:19, fontWeight:"700"}}>Submit</Text>
            </TouchableOpacity> 


          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  image: {
   
    alignSelf: "flex-start",
    borderRadius: 50,

    marginHorizontal: 30,
  },
  inptxt2: {
    width: "85%",
    alignContent: "center",
    justifyContent: "center",
    height: 30,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  inptxt: {
    width: "86%",

    height: 30,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
});
