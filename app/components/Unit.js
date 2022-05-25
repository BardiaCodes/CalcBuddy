import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Constants } from "expo-constants";
import defaultStyles from "../config/defaultStyles";
import AppText from "./AppText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const window = Dimensions.get("window");

function Unit({ title, onPress }) {
  let nav = useNavigation();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: defaultStyles.colors.teal,
        },
      ]}
    >
      <AppText style={styles.header}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,

    justifyContent: "center",
    marginVertical: 5,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    fontWeight: "bold",
    color: "white",
  },
});

export default Unit;
