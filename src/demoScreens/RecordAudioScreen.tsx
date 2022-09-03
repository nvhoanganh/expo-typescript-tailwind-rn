import { Audio } from "expo-av";
import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import tw from "twrnc";

export default function App() {
  const [recording, setRecording] = React.useState();
  const [recordingFileName, setRecordingFileName] = React.useState("");

  const startRecording = async () => {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    console.log("Stopping recording..");
    setRecording(undefined);

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecordingFileName(uri);

    console.log("Playing recording at", uri);
    await Audio.Sound.createAsync(
      { uri: uri },
      {
        shouldPlay: true,
      }
    );
  };

  return (
    <View style={styles.container}>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />

      {recordingFileName ? (
        <>
          <Text style={tw`text-center p-3 text-3xl`}>Playing:</Text>
          <Text style={tw`text-center py-5 text-sm`}>{recordingFileName}</Text>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
});
