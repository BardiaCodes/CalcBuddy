import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import MathJax from "react-native-mathjax";
import defaultStyles from "../config/defaultStyles";

import AppText from "./AppText";
const mmlOptions = {
  messageStyle: "none",
  extensions: ["tex2jax.js"],
  jax: ["input/TeX", "output/SVG"],

  tex2jax: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
    processEscapes: true,
  },
  TeX: {
    extensions: [
      "AMSmath.js",
      "AMSsymbols.js",
      "noErrors.js",
      "noUndefined.js",
    ],
  },
};

function AnswerChoice({ text, handlePress, color }) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor: color,
        },
      ]}
      onPress={handlePress}
    >
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
    width: 350,
    height: 90,
    borderRadius: 20,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 3,
  },
  latex: {
    width: 350,
    paddingLeft: 20,
    pointerEvents: "none",
  },
  logo: {
    height: 30,
    width: 200,
    resizeMode: "contain",
  },
});

export default AnswerChoice;
