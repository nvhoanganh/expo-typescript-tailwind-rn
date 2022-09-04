import { Audio } from "expo-av";
import React, { useState } from "react";
import { Button, Linking, Text, View } from "react-native";
import tw from "twrnc";

export const AudioScreen = () => {
  const [soundLoaded, setSoundLoaded] = useState<Audio.Sound>();

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/bensound-thejazzpiano.mp3"),
      {
        shouldPlay: true,
      }
    );

    setSoundLoaded(sound);
  };

  const stopSound = async () => {
    if (soundLoaded) {
      await soundLoaded.stopAsync();
    }
  };

  return (
    <>
      <View style={tw`py-16 flex justify-center items-center`}>
        <Text>
          Music from{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() =>
              Linking.openURL(
                "https://www.bensound.com/royalty-free-music/track/the-jazz-piano"
              )
            }
          >
            www.bensound.com
          </Text>
        </Text>
      </View>
      <View style={tw`pt-8`}>
        {!soundLoaded ? (
          <Button
            onPress={playSound}
            title={"Play Now"}
          />
        ) : (
          <Button
            onPress={stopSound}
            title={"Stop Playing"}
          />
        )}
      </View>
    </>
  );
};
