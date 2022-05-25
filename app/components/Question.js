import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import { SvgUri } from "react-native-svg";

function Question({ text }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: text,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 380,
    height: 250,
    borderRadius: 10,
    marginBottom: 40,
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
