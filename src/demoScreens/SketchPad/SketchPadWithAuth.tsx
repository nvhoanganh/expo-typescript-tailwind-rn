import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import RNBiometrics from "react-native-simple-biometrics";
import { SketchPadBase } from "./SketchPad";

const SketchPadWithAuth: React.FC = () => {
  // this will be false if
  // - no biometrics hardware
  // - permission was denied for face ID (iOS only)
  const [canAuth, setCanAuth] = useState(false);

  useEffect(() => {
    async function getToken() {
      const auth = await RNBiometrics.canAuthenticate();
      if (auth) {
        try {
          await RNBiometrics.requestBioAuth("prompt-title", "prompt-message");
          setCanAuth(true);
        } catch (error) {
          setCanAuth(false);
        }
      }
      setCanAuth(false);
    }
    getToken();
  }, []);

  return canAuth ? <SketchPadBase /> : <Text>Cann not aut</Text>;
};
export default SketchPadWithAuth;
