import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

function Correct(props) {
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        style={{
          backgroundColor: "#E3F2FD",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../assets/correct.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Correct;
