import { Camera, PermissionStatus } from "expo-camera";
import { CameraType } from "expo-camera/build/Camera.types";
import React, { useEffect, useRef, useState } from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export const CameraScreen = () => {
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [hasPermissionToCamera, setHasPermissionToCamera] = useState<
    boolean | undefined
  >(undefined);

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermissionToCamera(status === PermissionStatus.GRANTED);
    };

    getPermission();
  }, []);

  const toggleCameraType = () => {
    setCameraType(
      cameraType === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const ref = useRef(null);
  const [photoTaken, setPhotoTaken] = useState();
  const _takePhoto = async () => {
    const photo = await ref.current.takePictureAsync();
    setPhotoTaken(photo);
    console.debug(photo);
  };

  if (hasPermissionToCamera === undefined) {
    return <Text>Getting permission to access the camera.</Text>;
  }

  if (hasPermissionToCamera === false) {
    return <Text>No access to the camera.</Text>;
  }

  return (
    <View style={tw`flex justify-center`}>
      <Camera
        style={{ height: 400, width: "100%", alignSelf: "center" }}
        type={cameraType}
        ref={ref}
      >
        <View
          style={{
            backgroundColor: "transparent",
            flex: 1,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => toggleCameraType()}
            style={{
              alignItems: "center",
              alignSelf: "flex-end",
              flex: 0.1,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                marginLeft: 5,
                marginBottom: 10,
              }}
            >
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={tw`pt-8`}>
        <Button
          onPress={_takePhoto}
          title={"Take photo"}
        />

        {photoTaken ? (
          <Image
            source={{
              uri: photoTaken.uri,
            }}
            style={{ width: "100%", height: 400, alignSelf: "center" }}
          />
        ) : null}
      </View>
    </View>
  );
};
