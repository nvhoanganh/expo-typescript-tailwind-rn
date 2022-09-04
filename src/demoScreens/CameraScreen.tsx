import { Video } from "expo-av";
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
      const result = await Camera.requestMicrophonePermissionsAsync();
      setHasPermissionToCamera(
        status === PermissionStatus.GRANTED &&
          result.status === PermissionStatus.GRANTED
      );
    };

    getPermission();
  }, []);

  const toggleCameraType = () => {
    setCameraType(
      cameraType === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const ref = useRef<Camera>(null);
  const [photoTaken, setPhotoTaken] = useState();
  const [videoTaken, setVideoTaken] = useState<string>(null);
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);

  const _takePhoto = async () => {
    const photo = await ref.current.takePictureAsync();
    setPhotoTaken(photo);
    console.debug(photo);
  };

  const _recordVideo = () => {
    setIsRecordingVideo(true);
    ref.current
      .recordAsync({
        quality: "1080p",
        maxDuration: 120,
        mute: true,
      })
      .then(({ uri }) => {
        console.debug(uri);
        setVideoTaken(uri);
      });
  };

  const _stopRecordingVideo = () => {
    ref.current?.stopRecording();
    setIsRecordingVideo(false);
  };

  const video = useRef(null);
  const [status, setStatus] = useState({});

  if (hasPermissionToCamera === undefined) {
    return <Text>Getting permission to access the camera.</Text>;
  }

  if (hasPermissionToCamera === false) {
    return <Text>No access to the camera.</Text>;
  }

  return (
    <View style={tw`flex justify-center`}>
      <Camera
        style={{ height: 300, width: "100%", alignSelf: "center" }}
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
          title={"Take Photo"}
        />

        {!isRecordingVideo ? (
          <Button
            onPress={_recordVideo}
            title={"Record Video"}
          />
        ) : (
          <Button
            onPress={_stopRecordingVideo}
            title={"Stop Recording"}
          />
        )}

        {photoTaken ? (
          <Image
            source={{
              uri: photoTaken.uri,
            }}
            style={{ width: "100%", height: 400, alignSelf: "center" }}
          />
        ) : null}

        {videoTaken ? (
          <>
            <Video
              ref={video}
              style={{ width: "100%", height: 400, alignSelf: "center" }}
              source={{
                uri: videoTaken,
              }}
              useNativeControls
              resizeMode="contain"
              isLooping
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
            <Button
              title={status.isPlaying ? "Pause" : "Play"}
              onPress={() =>
                status.isPlaying
                  ? video.current.pauseAsync()
                  : video.current.playAsync()
              }
            />
          </>
        ) : null}
      </View>
    </View>
  );
};
