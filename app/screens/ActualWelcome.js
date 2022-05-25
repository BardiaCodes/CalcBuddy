import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppText from "../components/AppText";

function ActualWelcome({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: "https://media.discordapp.net/attachments/706943886530183202/979045737209929758/dsaasfafs.png",
        }}
      />
      <AppText style={{ color: "white", fontSize: 30 }}>Welcome to</AppText>
      <AppText
        style={{
          color: "white",
          fontWeight: "900",
          fontSize: 100,
          textAlign: "center",
          lineHeight: 100,
          marginTop: 30,
        }}
      >
        Calc Buddy
      </AppText>
      <AppText
        style={{
          color: "white",
          fontSize: 30,
          textAlign: "center",
          marginTop: 20,
          fontWeight: "600",
        }}
      >
        The Best AP Calc BC practice app
      </AppText>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Units")}
      >
        <AppText style={{ fontWeight: "900", fontSize: 25, color: "#405DEC" }}>
          Prepare for a 5
        </AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#405DEC",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logo: {
    height: 200,
    width: 300,
    resizeMode: "contain",
  },
  btn: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 30,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});

export default ActualWelcome;
