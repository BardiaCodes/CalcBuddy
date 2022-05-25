import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Modal,
  AsyncStorage,
  Button,
  FlatList,
  Dimensions,
} from "react-native";
import colors from "../config/colors";

import { Layout } from "@ui-kitten/components";
import Screen from "./Screen";
import AnswerChoice from "../components/AnswerChoice";
import Question from "../components/Question";
import defaultStyles from "../config/defaultStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppText from "../components/AppText";
import { MaterialIcons } from "@expo/vector-icons";
import { Constants } from "expo-constants";
import { useNavigation } from "@react-navigation/native";

let missed = [];
function WelcomeScreen({ route, navigation }) {
  let problems = route.params.unitList;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [chosen, setChosen] = useState(undefined);
  const [score, setScore] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);

  let handleQuestionClick = (choice) => {
    // console.log(choice);
    // console.log(problems[currentQuestion].key);
    let txt = "link_option_";
    txt += choice;
    setChosen(txt);
    if (choice == problems[currentQuestion].key) {
      handleCorrect();
    } else {
      handleIncorrect();
    }
  };

  let handleCorrect = () => {
    setCorrect(true);
    setScore(score + 1);
    setShowAnswers(true);
  };

  // let store = async (skill, unit) => {
  //   try {
  //     await AsyncStorage.setItem("Units", skill);
  //   } catch (error) {
  //     // Error saving data
  //   }
  // };

  let handleIncorrect = () => {
    setCorrect(false);
    setShowAnswers(true);
    missed.push({ title: problems[currentQuestion].question_name });
    // store(problems[currentQuestion].questionTitle, 3);
  };

  return (
    <>
      <Screen style={styles.container}>
        <Question
          text={problems[currentQuestion].link_question_prompt}
          onPress={() => {
            setModal3Open(true);
          }}
        />
        <AnswerChoice
          text={problems[currentQuestion].link_option_1}
          handlePress={() => handleQuestionClick(1)}
          status={
            (showAnswers && problems[currentQuestion].link_option_1) ==
            problems[currentQuestion].key
          }
        />
        <AnswerChoice
          text={problems[currentQuestion].link_option_2}
          handlePress={() => handleQuestionClick(2)}
          status={
            (showAnswers && problems[currentQuestion].link_option_2) ==
            problems[currentQuestion].correct
          }
        />
        <AnswerChoice
          text={problems[currentQuestion].link_option_3}
          handlePress={() => handleQuestionClick(3)}
          status={
            (showAnswers && problems[currentQuestion].link_option_3) ==
            problems[currentQuestion].key
          }
        />
        <AnswerChoice
          text={problems[currentQuestion].link_option_4}
          handlePress={() => handleQuestionClick(4)}
          status={
            (showAnswers && problems[currentQuestion].link_option_4) ==
            problems[currentQuestion].key
          }
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AppText style={styles.score}>Score: {score}</AppText>
          <TouchableOpacity onPress={() => setModalOpen(true)}>
            <MaterialIcons
              name="lightbulb"
              size={30}
              color="white"
              style={{ marginLeft: 160, marginTop: 25 }}
            />
          </TouchableOpacity>
        </View>
      </Screen>
      <Modal visible={showAnswers} animationType="slide">
        {correct == true && (
          <View style={[styles.modal, { backgroundColor: "#D9FFE5" }]}>
            <AppText
              style={{
                fontSize: 40,
                marginTop: 90,
                fontWeight: "900",
                color: defaultStyles.colors.teal,
              }}
            >
              🎉 CORRECT! 🎉
            </AppText>
            <View style={styles.whiteBox}>
              <AppText style={styles.gen}>You answered:</AppText>
              <Image
                style={[styles.logo, { marginBottom: 20 }]}
                source={{
                  uri: problems[currentQuestion][chosen],
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setShowAnswers(false);
                setCurrentQuestion(currentQuestion + 1);
              }}
            >
              <AppText
                style={{ color: "white", fontWeight: "bold", fontSize: 25 }}
              >
                Keep Practicing
              </AppText>
            </TouchableOpacity>
          </View>
        )}
        {correct == false && (
          <View style={[styles.modal, { backgroundColor: "#FFD9D9" }]}>
            <AppText
              style={{
                fontSize: 40,
                marginTop: 90,
                fontWeight: "900",
                color: defaultStyles.colors.incorrect,
              }}
            >
              Incorrect
            </AppText>
            <View style={styles.whiteBox}>
              <AppText style={styles.gen}>You answered:</AppText>
              <Image
                style={styles.logo}
                source={{
                  uri: problems[currentQuestion][chosen],
                }}
              />
              <AppText style={[styles.gen, { marginTop: 20 }]}>
                The correct answer was:
              </AppText>
              <Image
                style={styles.logo}
                source={{
                  uri: problems[currentQuestion][
                    "link_option_" + problems[currentQuestion].key
                  ],
                }}
              />
            </View>
            <View style={styles.appTip}>
              <AppText style={styles.tipTitle}>💡 App Tip 💡</AppText>
              <AppText>
                <AppText style={{ fontWeight: "bold" }}>
                  Practice is essential.
                </AppText>{" "}
                Continue to practice questions relating to
                <AppText
                  style={{
                    fontWeight: "bold",
                    color: defaultStyles.colors.teal,
                  }}
                >
                  {" "}
                  {problems[currentQuestion].question_name}
                </AppText>
              </AppText>
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setShowAnswers(false);
                setCurrentQuestion(currentQuestion + 1);
              }}
            >
              <AppText
                style={{ color: "white", fontWeight: "bold", fontSize: 25 }}
              >
                Keep Practicing
              </AppText>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
      <Modal visible={modalOpen} animationType="slide">
        <View style={styles.modal2}>
          <AppText
            style={{
              fontSize: 35,
              fontWeight: "900",
              color: defaultStyles.colors.teal,
            }}
          >
            Recommended Practice Questions:
          </AppText>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              width: 360,
            }}
            data={missed}
            keyExtractor={(option) => {
              return option.title;
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: "#BBFFF0",
                  padding: 10,
                  marginVertical: 6,
                  borderRadius: 15,
                  paddingVertical: 20,
                }}
              >
                <AppText
                  style={{
                    fontWeight: "600",
                    fontSize: 20,
                    marginVertical: 10,
                    textAlign: "center",
                    color: "#253F3A",
                  }}
                >
                  {item.title}
                </AppText>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setModalOpen(false);
            }}
          >
            <AppText
              style={{ color: "white", fontWeight: "bold", fontSize: 25 }}
            >
              Back to Questions
            </AppText>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal visible={modal3Open} animationType="slide">
        <View style={styles.modal}>
          <Image
            style={styles.logo2}
            source={{
              uri: problems[currentQuestion].link_question_prompt,
            }}
          />
        </View>
        <Button title="Close" onPress={() => setModal3Open(false)}></Button>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyles.colors.teal,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 350,
    height: 100,
    backgroundColor: defaultStyles.colors.teal,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",

    flex: 1,
  },
  modal2: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 90,
    flex: 1,
  },
  logo2: {
    transform: [{ rotate: "90deg" }],
    width: Dimensions.get("window").height - 200,
    resizeMode: "contain",
    height: 300,
  },
  gen: {
    fontSize: 25,
    marginVertical: 20,
    fontWeight: "bold",
    color: defaultStyles.colors.teal,
  },
  tipTitle: {
    fontSize: 25,
    marginBottom: 15,
    fontWeight: "bold",
    color: "#CA8723",
  },
  logo: {
    height: 50,
    width: 300,
    resizeMode: "contain",
  },
  whiteBox: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    marginVertical: 20,
    borderRadius: 20,
    width: 350,
  },
  appTip: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    marginBottom: 30,
    borderRadius: 20,
    width: 350,
  },
  score: {
    color: "white",
    fontWeight: "800",
    fontSize: 30,
    marginTop: 20,
  },
});

export default WelcomeScreen;
