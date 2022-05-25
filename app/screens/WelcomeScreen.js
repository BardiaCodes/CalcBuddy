import React, { useState } from "react";
import { View, StyleSheet, Image, Modal } from "react-native";
import colors from "../config/colors";
import { Layout } from "@ui-kitten/components";
import Screen from "./Screen";
import AnswerChoice from "../components/AnswerChoice";
import Question from "../components/Question";
import defaultStyles from "../config/defaultStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppText from "../components/AppText";

let problems = [
  {
    questionURL:
      "https://latex2image-output.s3.amazonaws.com/img-xBuGQUHDR6g8.png",
    questionTitle: "Find a Limit with a Table or a Graph (Calculator)",
    option1:
      "https://media.discordapp.net/attachments/706943886530183202/978898364064231464/equation_3.png",
    option2:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option3:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option4:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option1_id: "a8cebdb6-b1db-4e5a-8fe8-2cf8f83f7217",
    option2_id: "91da84b7-8067-4e85-bfbd-e6415cd67379",
    option3_id: "76be09d4-09d8-4135-902b-980e0284d3ce",
    option4_id: "679b1c3f-63bd-44f8-b421-6fcfe62fa2b7",
    correct: 1,
  },
  {
    questionURL:
      "https://latex2image-output.s3.amazonaws.com/img-Wk2tVNs89Xju.png",
    questionTitle:
      "Indeterminate Form: Infinity Minus Infinity (No Calculator)",
    option1:
      "https://media.discordapp.net/attachments/706943886530183202/978898364064231464/equation_3.png",
    option2:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option3:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option4:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option1_id: "a8cebdb6-b1db-4e5a-8fe8-2cf8f83f7217",
    option2_id: "91da84b7-8067-4e85-bfbd-e6415cd67379",
    option3_id: "76be09d4-09d8-4135-902b-980e0284d3ce",
    option4_id: "679b1c3f-63bd-44f8-b421-6fcfe62fa2b7",
    correct: 2,
  },
  {
    questionURL:
      "https://latex2image-output.s3.amazonaws.com/img-UPqApTD6aMBy.png",
    questionTitle: "Compute the Limit (No Calculator)",
    option1:
      "https://media.discordapp.net/attachments/706943886530183202/978898364064231464/equation_3.png",
    option2:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option3:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option4:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option1_id: "a8cebdb6-b1db-4e5a-8fe8-2cf8f83f7217",
    option2_id: "91da84b7-8067-4e85-bfbd-e6415cd67379",
    option3_id: "76be09d4-09d8-4135-902b-980e0284d3ce",
    option4_id: "679b1c3f-63bd-44f8-b421-6fcfe62fa2b7",
    correct: 1,
  },
  {
    questionURL:
      "https://latex2image-output.s3.amazonaws.com/img-skRuEPebYm5t.png",
    questionTitle: "Limit of a Piecewise Function (No Calculator)",
    option1:
      "https://media.discordapp.net/attachments/706943886530183202/978898364064231464/equation_3.png",
    option2:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option3:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option4:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option1_id: "a8cebdb6-b1db-4e5a-8fe8-2cf8f83f7217",
    option2_id: "91da84b7-8067-4e85-bfbd-e6415cd67379",
    option3_id: "76be09d4-09d8-4135-902b-980e0284d3ce",
    option4_id: "679b1c3f-63bd-44f8-b421-6fcfe62fa2b7",
    correct: 3,
  },
  {
    questionURL:
      "https://latex2image-output.s3.amazonaws.com/img-h6dvGAUuhujs.png",
    questionTitle: "Easy Limit Question (No Calculator)",
    option1:
      "https://media.discordapp.net/attachments/706943886530183202/978898364064231464/equation_3.png",
    option2:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option3:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option4:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option1_id: "a8cebdb6-b1db-4e5a-8fe8-2cf8f83f7217",
    option2_id: "91da84b7-8067-4e85-bfbd-e6415cd67379",
    option3_id: "76be09d4-09d8-4135-902b-980e0284d3ce",
    option4_id: "679b1c3f-63bd-44f8-b421-6fcfe62fa2b7",
    correct: 2,
  },
  {
    questionURL:
      "https://latex2image-output.s3.amazonaws.com/img-sAvrUtH7sSh3.png",
    questionTitle: "Another Algebraic Limit with Factoring (No Calculator)",
    option1:
      "https://media.discordapp.net/attachments/706943886530183202/978898364064231464/equation_3.png",
    option2:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option3:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option4:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option1_id: "a8cebdb6-b1db-4e5a-8fe8-2cf8f83f7217",
    option2_id: "91da84b7-8067-4e85-bfbd-e6415cd67379",
    option3_id: "76be09d4-09d8-4135-902b-980e0284d3ce",
    option4_id: "679b1c3f-63bd-44f8-b421-6fcfe62fa2b7",
    correct: 1,
  },
  {
    questionURL:
      "https://latex2image-output.s3.amazonaws.com/img-2kFCRgcb5mgY.png",
    questionTitle: "Limit of Fraction with Polynomials (No Calculator)",
    option1:
      "https://media.discordapp.net/attachments/706943886530183202/978898364064231464/equation_3.png",
    option2:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option3:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option4:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option1_id: "a8cebdb6-b1db-4e5a-8fe8-2cf8f83f7217",
    option2_id: "91da84b7-8067-4e85-bfbd-e6415cd67379",
    option3_id: "76be09d4-09d8-4135-902b-980e0284d3ce",
    option4_id: "679b1c3f-63bd-44f8-b421-6fcfe62fa2b7",
    correct: 2,
  },
  {
    questionURL:
      "https://latex2image-output.s3.amazonaws.com/img-vS7rQrv8Eved.png",
    questionTitle: "Interpreting Two-sided Limits (No Calculator)",
    option1:
      "https://media.discordapp.net/attachments/706943886530183202/978898364064231464/equation_3.png",
    option2:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option3:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option4:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option1_id: "a8cebdb6-b1db-4e5a-8fe8-2cf8f83f7217",
    option2_id: "91da84b7-8067-4e85-bfbd-e6415cd67379",
    option3_id: "76be09d4-09d8-4135-902b-980e0284d3ce",
    option4_id: "679b1c3f-63bd-44f8-b421-6fcfe62fa2b7",
    correct: 3,
  },
  {
    questionURL:
      "https://latex2image-output.s3.amazonaws.com/img-SBgqEswVQWSR.png",
    questionTitle: "Find Limits by Removing Discontinuity (No Calculator)",
    option1:
      "https://media.discordapp.net/attachments/706943886530183202/978898364064231464/equation_3.png",
    option2:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option3:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option4:
      "https://media.discordapp.net/attachments/706943886530183202/978900829245423616/equation_4.png",
    option1_id: "a8cebdb6-b1db-4e5a-8fe8-2cf8f83f7217",
    option2_id: "91da84b7-8067-4e85-bfbd-e6415cd67379",
    option3_id: "76be09d4-09d8-4135-902b-980e0284d3ce",
    option4_id: "679b1c3f-63bd-44f8-b421-6fcfe62fa2b7",
    correct: 1,
  },
];

function WelcomeScreen(props) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showAnswers, setShowAnswers] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [chosen, setChosen] = useState(undefined);

  let handleQuestionClick = (choice) => {
    let txt = "option";
    txt += choice;
    setChosen(txt);
    if (choice == problems[currentQuestion].correct) {
      handleCorrect();
    } else {
      handleIncorrect();
    }
  };

  let handleCorrect = () => {
    setCorrect(true);
    setShowAnswers(true);
  };

  let handleIncorrect = () => {
    setCorrect(false);
    setShowAnswers(true);
  };

  return (
    <>
      <Screen style={styles.container}>
        <Question text={problems[currentQuestion].questionURL} />
        <AnswerChoice
          text={problems[currentQuestion].option1}
          handlePress={() => handleQuestionClick(1)}
          status={
            (showAnswers && problems[currentQuestion].option1) ==
            problems[currentQuestion].correct
          }
        />
        <AnswerChoice
          text={problems[currentQuestion].option2}
          handlePress={() => handleQuestionClick(2)}
          status={
            (showAnswers && problems[currentQuestion].option2) ==
            problems[currentQuestion].correct
          }
        />
        <AnswerChoice
          text={problems[currentQuestion].option3}
          handlePress={() => handleQuestionClick(3)}
          status={
            (showAnswers && problems[currentQuestion].option3) ==
            problems[currentQuestion].correct
          }
        />
        <AnswerChoice
          text={problems[currentQuestion].option4}
          handlePress={() => handleQuestionClick(4)}
          status={
            (showAnswers && problems[currentQuestion].option4) ==
            problems[currentQuestion].correct
          }
        />
      </Screen>
      <Modal visible={showAnswers} animationType="slide">
        {correct == true && (
          <View style={styles.modal}>
            <AppText style={{ fontSize: 30 }}>Correct!</AppText>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setShowAnswers(false)}
            >
              <AppText
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 25,
                }}
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
                fontWeight: "bold",
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
              <AppText style={styles.gen}>The correct answer was:</AppText>
              <Image
                style={styles.logo}
                source={{
                  uri: problems[currentQuestion][
                    "option" + problems[currentQuestion].correct
                  ],
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setShowAnswers(false)}
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
    width: 300,
    height: 100,
    backgroundColor: defaultStyles.colors.purple,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 90,
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",

    flex: 1,
  },
  gen: {
    fontSize: 25,
    marginVertical: 20,
    fontWeight: "bold",
    color: defaultStyles.colors.teal,
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
    marginVertical: 30,
    borderRadius: 40,
  },
});

export default WelcomeScreen;
