import React, { useRef, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import SignatureScreen, {
  SignatureViewRef
} from "react-native-signature-canvas";

interface Props {
  text: string;
  onOK?: (signature: any) => void;
}

const styles = StyleSheet.create({
  preview: {
    width: 335,
    height: 114,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  previewText: {
    color: "#FFF",
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#69B2FF",
    width: 120,
    textAlign: "center",
    marginTop: 10
  }
});

const SignPad: React.FC<Props> = ({ text, onOK }) => {
  const ref = useRef<SignatureViewRef>(null);
  const [signature, setSign] = useState<string>();

  const handleSignature = async (signature: any) => {
    console.log(signature);

    setSign(signature);
    onOK?.(signature);
    console.log("signature link is ", signature);
  };

  const handleEmpty = () => {
    console.log("Empty");
  };

  const handleClear = () => {
    console.log("clear success!");
  };

  const handleEnd = () => {
    //ref.current?.readSignature();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.preview}>
        {signature ? (
          <Image
            resizeMode={"contain"}
            style={{ width: 335, height: 114 }}
            source={{ uri: signature }}
          />
        ) : null}
      </View>
      <SignatureScreen
        ref={ref}
        onEnd={handleEnd}
        onOK={handleSignature}
        onEmpty={handleEmpty}
        onClear={handleClear}
        autoClear={true}
        descriptionText={text}
      />
    </View>
  );
};

export default SignPad;
