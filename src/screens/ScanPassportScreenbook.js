import { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, Image, Dimensions } from "react-native";
// import { AppState } from "react-native";
import * as Progress from 'react-native-progress';
import { AntDesign } from '@expo/vector-icons';
import { Camera, CameraType, PermissionStatus } from 'expo-camera';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { useSelector, useDispatch } from "react-redux";
import { updateData } from '../store/redux/order'

// import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import Layout from "../components/Layout";

const ScanPassportScreenbook = ({ navigation }) => {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const dispatch = useDispatch()

    // const [isNFCSupported, setNFCSupported] = useState(false);
    // const [isNFCEnabled, setNFCEnabled] = useState(false);
    const [isCameraEnabled, setCameraEnabled] = useState(false);
    const [passportPhoto, setPassportPhoto] = useState(null);
    const cameraRef = useRef();
    const croppedAreaRef = useRef();
    const fullAreaRef = useRef();
    const metaAreaRef = useRef();

    let progress = 0;
    if (passportPhoto) progress = 1

    const handleEnableCameraPress = async () => {
        const permissionResponse = await requestPermission();
        const isCameraEnabled = permissionResponse.granted;
        setCameraEnabled(isCameraEnabled);
    }

    const takePicture = async () => {
        const camera = cameraRef.current
        const fullArea = fullAreaRef.current
        const croppedArea = croppedAreaRef.current
        const metaArea = metaAreaRef.current

        const windowHeight = Dimensions.get('window').height;
        const oneForth = (1 / 4)
        const threeForth = (3 / 4)

        const fullAreaHeight = fullArea?.height || 0
        const croppedAreaHeight = croppedArea?.height || 0
        const metaAreaHeight = metaArea?.height || 0
        const emptyAreaHeight2 = windowHeight - fullAreaHeight
        const emptyAreaHeight = fullAreaHeight - (croppedAreaHeight + metaAreaHeight) - (emptyAreaHeight2 * (3 / 4))

        if (camera) {
            camera.takePictureAsync({
                onPictureSaved: async ({ width, height, uri }) => {
                    const originX = (width * oneForth) / 2
                    const originY = (emptyAreaHeight / fullAreaHeight) * height
                    const cWidth = width * threeForth
                    const cHeight = cWidth * threeForth

                    const manipResult = await manipulateAsync(
                        uri,
                        [{
                            crop: {
                                originX,
                                originY,
                                width: cWidth,
                                height: cHeight
                            }
                        }],
                        { base64: true, compress: 0.6, format: SaveFormat.JPEG }
                    ).catch((e) => { console.log("PictureManipulateError:", e); });

                    const base64 = manipResult?.base64 || null
                    const mUri = manipResult?.uri || null
                    const ext = mUri ? mUri.substring(mUri.lastIndexOf('.') + 1) : "";
                    setPassportPhoto(mUri)

                    const passportPhoto = (ext && base64) ? `data:image/${ext};base64,${base64}` : ""
                    // console.log("passportPhoto@@", { passportPhoto, base64 })
                    dispatch(updateData({ passportPhoto }))

                    // await uploadPassport({
                    //     customer_uuid: uuid,
                    //     doc_type: "passport_image",
                    //     document: passportPhoto
                    // });

                    navigation.goBack();

                    // navigation.replace("PassportVerificationScreen", { passportPhoto })
                }
            });
        }
    };

    useEffect(() => {
        async function checkCameraPermission() {
            if (permission?.status === PermissionStatus.UNDETERMINED) {
                const permissionResponse = await requestPermission();
                const isCameraEnabled = permissionResponse.granted;
                setCameraEnabled(isCameraEnabled);
                return;
            }

            if (permission?.status === PermissionStatus.DENIED) {
                setCameraEnabled(false);
                return;
            }

            setCameraEnabled(true);
            return;
        }

        // checkNFCSupport();
        checkCameraPermission();
    }, []);

    const MainView = (
        <View
            onLayout={(event) => { fullAreaRef.current = event.nativeEvent.layout }}
            className="flex-1 items-center justify-center w-full"
        >
            <View className="flex-1 w-full bg-black/75"></View>
            <View className="relative flex-row justify-center">
                <View className="flex-1 bg-black/75"></View>
                {!passportPhoto &&
                    <View
                        onLayout={(event) => { croppedAreaRef.current = event.nativeEvent.layout }}
                        className="w-4/5 aspect-[4/3] border-2 border-indigo-600"
                    ></View>
                }
                {passportPhoto &&
                    <View className="w-4/5 aspect-[4/3] border-2 border-indigo-600 bg-black">
                        <Image
                            className="flex-1"
                            source={{ uri: passportPhoto }}
                            resizeMode="contain"
                        />
                    </View>
                }
                <View className="flex-1 bg-black/75"></View>
                <View className="absolute w-11/12 border border-indigo-600 border-dashed bottom-1/4"></View>
            </View>
            <View onLayout={(event) => { metaAreaRef.current = event.nativeEvent.layout }}
                className="w-full bg-black/75 p-8 space-y-10 items-center"
            >
                <View className="h-12">
                    {isCameraEnabled && !passportPhoto &&
                        <Pressable className="flex-1 items-center justify-center px-5 bg-[#E9E9E9] rounded" onPress={takePicture}>
                            <Text className="text-base font-medium text-center text-black opacity-90">Take Picture</Text>
                        </Pressable>
                    }
                </View>
                <View className="items-center w-full space-y-4 mt-auto hidden">
                    <Text className="text-base font-semibold text-indigo-600">{progress * 100}%</Text>
                    <View className="w-full">
                        <Progress.Bar progress={progress} width={null} height={8} borderRadius={6} useNativeDriver color="#4f46e5" unfilledColor="rgba(79, 70, 229, 0.4)" borderWidth={0} />
                    </View>
                </View>
                <View className="h-20 justify-end">
                    {!isCameraEnabled &&
                        <>
                            <Text className="text-base font-medium text-center text-white opacity-60">Please enable camera on your device.</Text>
                            <Pressable onPress={handleEnableCameraPress}>
                                <Text className="text-base font-medium text-center text-white opacity-90">Enable Camera</Text>
                            </Pressable>
                        </>
                    }
                </View>
            </View>
        </View>
    )

    return (
        <Layout className="relative bg-black">
            <Pressable className="absolute top-12 left-5" onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={20} color="rgba(255, 255, 255, 0.6)" />
            </Pressable>
            <View className="flex-1">
                {!passportPhoto &&
                    <Camera ref={cameraRef} className="flex-1" type={CameraType.back}>
                        {MainView}
                    </Camera>
                }
                {passportPhoto && <>{MainView}</>}
            </View>
        </Layout>
    )
}

export default ScanPassportScreenbook