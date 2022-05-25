import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, StyleSheet } from "react-native";
import WelcomeScreen from "../screens/WelcomeScreen";
import Correct from "../screens/Correct";
import UnitsScreen from "../screens/UnitsScreen";

function AppNavigator({ navigation }) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true }}
      initialRouteName="Units"
    >
      <Stack.Screen name="Correct" component={Correct} />
      <Stack.Screen name="Questions" component={WelcomeScreen} />
      <Stack.Screen name="Units" component={UnitsScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppNavigator;
