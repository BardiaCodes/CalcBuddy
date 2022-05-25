import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, StyleSheet } from "react-native";
import WelcomeScreen from "../screens/WelcomeScreen";
import Correct from "../screens/Correct";
import UnitsScreen from "../screens/UnitsScreen";
import Missed from "../screens/Missed";
import ActualWelcome from "../screens/ActualWelcome";

function AppNavigator({ navigation }) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true }}
      initialRouteName="Welcome"
    >
      <Stack.Screen name="Welcome" component={ActualWelcome} />
      <Stack.Screen name="Correct" component={Correct} />
      <Stack.Screen name="Questions" component={WelcomeScreen} />
      <Stack.Screen name="Units" component={UnitsScreen} />
      <Stack.Screen name="Statistics" component={Missed} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppNavigator;
