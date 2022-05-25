import React, { useEffect, useState } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import AppText from "../components/AppText";
import defaultStyles from "../config/defaultStyles";

function Missed(props) {
  useEffect(() => {
    getData();
  }, []);

  const [val, setVal] = useState("");

  // let getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("Units");
  //     if (value !== null) {
  //       // We have data!!
  //       setVal(value);
  //     }
  //   } catch (error) {
  //     console.log("s");
  //     // Error retrieving data
  //   }
  // };
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Recommended Question Type:</AppText>
      <AppText style={styles.sub}>{val}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 51,
  },
  title: {
    fontWeight: "900",
    fontSize: 40,
    color: defaultStyles.colors.teal,
  },
  sub: {
    fontWeight: "500",
    fontSize: 20,
    marginVertical: 20,
  },
});

export default Missed;
