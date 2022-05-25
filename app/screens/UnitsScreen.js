import React from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import AppText from "../components/AppText";
import Unit from "../components/Unit";
import defaultStyles from "../config/defaultStyles";
import Screen from "./Screen";

function UnitsScreen(props) {
  const DATA = [
    {
      title: "Unit 1: Limits and Continuity",
    },
    {
      title: "Unit 2: Differentiation: Definition and Fundamental Properties",
    },
    {
      title:
        "Unit 3: Differentiation: Composite, Implicit, and Inverse Functions",
    },
    {
      title: "Unit 4: Contextual Applications of Differentiation",
    },
    {
      title: "Unit 5: Analytical Applications of Differentiation",
    },
    {
      title: "Unit 6: Integration and Accumulation of Change",
    },
    {
      title: "Unit 7: Differential Equations",
    },
    {
      title: "Unit 8: Applications of Integration",
    },
    {
      title:
        "Unit 9: Parametric Equations, Polar Coordinates, and Vector-Valued Functions",
    },
    {
      title: "Unit 10: Infinite Sequences and Series",
    },
  ];

  return (
    <Screen style={styles.container}>
      <AppText style={styles.header}>Select a Unit</AppText>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{
          width: Dimensions.get("window").width - 40,
        }}
        data={DATA}
        keyExtractor={(option) => {
          return option.title;
        }}
        renderItem={({ item }) => <Unit title={item.title} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginVertical: 30,
    fontWeight: "bold",
    fontSize: 30,
    color: defaultStyles.colors.teal,
  },
});

export default UnitsScreen;
