import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import colors from "../config/colors";
import { Layout } from "@ui-kitten/components";
import Screen from "./Screen";
import AnswerChoice from "../components/AnswerChoice";
import Question from "../components/Question";
import defaultStyles from "../config/defaultStyles";

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

  let explosion;

  let handleQuestionClick = (choice) => {
    if (choice == problems[currentQuestion].correct) {
      handleCorrect();
    } else {
      handleIncorrect();
    }
  };

  let handleCorrect = () => {
    setShowAnswers(true);
  };

  let handleIncorrect = () => {
    setShowAnswers(true);
  };

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyles.colors.teal,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WelcomeScreen;
