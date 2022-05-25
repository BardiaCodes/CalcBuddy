import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import { SvgUri } from "react-native-svg";
import { TouchableOpacity } from "react-native-gesture-handler";

function Question({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        style={styles.logo}
        source={{
          uri: text,
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 380,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    height: 300,
    width: 340,
    resizeMode: "contain",
  },
});

export default Question;
