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
let problems = [
  {
    question_slug: "factoring-with-e-no-calculator",
    question_name: "Factoring with $e$ (No Calculator)",
    question_id: "47c397ed-3140-4504-890e-58e981bb097a",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind the limit below:    \n\n$$ \\lim_{x\\to\\ln3}\\dfrac{e^{3x}-27}{e^{2x}-9} $$",
    option_1_id: "ec7b5ecb-1901-442d-b4f5-26dcf322ff0f",
    option_2_id: "b74bc49b-d33a-4ab8-9cd1-a97b6ccd0c1d",
    option_3_id: "96b3cbe2-4076-4089-8f41-2f74347eb71a",
    option_4_id: "b40af264-c04b-490c-98d0-7360c99a629d",
    option_1: "$\\dfrac{9}{2}$",
    option_2: "$3$",
    option_3: "$-3$",
    option_4: "The limit does not exist.",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-E9XW5admWxfJ.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-nXgvqACffMvN.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-Abu7HvvVM7bf.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-TFbWyB5PQsza.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-1qRveRz5XF2y.png",
  },
  {
    question_slug: "limit-of-a-rational-function-no-calculator",
    question_name: "Limit of a Rational Function (No Calculator)",
    question_id: "b41c1aa2-3537-4e2f-afaa-04a1aade4ce0",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvaluate the following limit:    \n\n$$\\lim _{ x\\xrightarrow { } \\infty }{ \\dfrac { 11{ x }^{ 2 }-2x+8 }{ 2-x } } $$\n\n",
    option_1_id: "ec9a4510-7582-4829-bd52-9f85516248da",
    option_2_id: "7ea60b45-2a25-4f45-96a7-d1a643638435",
    option_3_id: "88c878d7-3eb8-47db-88af-787b0292faf2",
    option_4_id: "f9e97148-1ca3-4aca-b26d-d225c2bbe5fa",
    option_1: "$-11$",
    option_2: "$2$",
    option_3: "$0$",
    option_4: "The limit does not exist.",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-X5AMgtP2u7H4.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-b5ukCPMVPeV2.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-a8jfedEsKa6K.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-vVDEydzUDg1s.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-yf2zQjjc1XMH.png",
  },
  {
    question_slug: "intervals-of-continuity-no-calculator",
    question_name: "Intervals of Continuity (No Calculator)",
    question_id: "5419d45b-ad1c-4899-bf21-130d04235afa",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nThe graph of $f$ is given. On which of the following intervals is $f$ continuous?  \n\n[s:5a40c2ec-9eee-4e87-8c1b-174cc0acf85a:Continuity Graph:image]",
    option_1_id: "65af4432-2dd4-4876-a5b9-245c1d52f58f",
    option_2_id: "7a669ff2-5cd6-4ce1-8ae5-27de853ee95c",
    option_3_id: "09f63cdf-f51c-476d-873b-cc027550bd19",
    option_4_id: "6df1fbbd-1783-4e4a-9f3c-887a2a970deb",
    option_1: "$-2\\leq x \\leq 0$ and $0 \\leq x < 3$",
    option_2: "$-2\\leq x < 3$",
    option_3: "$-2 \\leq x < 0$ and $0 < x \\leq 3$",
    option_4: "$-2\\leq x < 0$ and $0 < x < 3$",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-G1X9zaRzbQpt.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-6cD6X7b1DKeR.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-KA4fTMWvtvhQ.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-rRY1dx5k2GP7.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-qRKPZS91EnFd.png",
  },
  {
    question_slug: "limit-of-a-piecewise-function-no-calculator",
    question_name: "Limit of a Piecewise Function (No Calculator)",
    question_id: "96adf08d-88d5-45dc-b376-9211dfd75ab5",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nGiven:    \n\n$$ f(x) = \\left\\{ \\begin{array}{ll} \\ln(x+2) &  x \\geq -1 \\\\ x^3+2x^2-5x &  x < -1 \\end{array} \\right.$$  \n\n...find:    \n\n$$\\mathop {\\lim} \\limits_{x \\to -1}f(x)$$",
    option_1_id: "6c3d818d-126b-4245-882d-2a5cae341e29",
    option_2_id: "c5943ff8-84f2-41f0-8f0c-f913f5ea20ed",
    option_3_id: "4a353ea9-e4ff-40ed-9352-cfa4a41e63ac",
    option_4_id: "d9ffe151-4911-4be4-84b7-207ca4748154",
    option_1: "$-1$",
    option_2: "$0$",
    option_3: "$6$",
    option_4: "The limit does not exist.",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-4RTn1XK7wRKx.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-N6gGpP3puZ7D.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-dcb2KF4w1ghB.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-tN26mNZAjuFa.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-ApsxNUNN2jeK.png",
  },
  {
    question_slug: "piecewise-constant-calculator",
    question_name: "Piecewise Constant (Calculator)",
    question_id: "50cd727c-7573-40c6-aff7-ae9b527d89e8",
    question_prompt:
      "**A calculator is allowed on this question.**\n\nGiven the piece-wise function:    \n\n$$h(x)=\\begin{cases} { x }^{ 2 }-k\\quad \\quad \\quad\\quad  ;\\quad x<-1 \\\\ 2{ x }^{ 3 }+3{ x }^{ 2 }+1\\quad ;\\quad x\\ge -1 \\end{cases}$$  \n\nFind the value of $k$ for which $h(x)$ is continuous everywhere.",
    option_1_id: "33d6a7c6-5edc-4d0a-90a8-68aa695b5d3f",
    option_2_id: "bbc5bed0-a8fb-4a33-a07c-4d44e754141b",
    option_3_id: "2dcdf3c6-f3cf-4f94-ae91-05798eff9453",
    option_4_id: "78fd8786-4b88-40cb-8a6a-c7c93bf9565a",
    option_1: "$k=-5$",
    option_2: "$k=-3$",
    option_3: "$k=1$",
    option_4: "$k=-1$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-Ux7QQacwXdkJ.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-wHWhTC9Qb8GR.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-7fVRuJ6t94UZ.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-pSb5u8t2BYdU.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-mHh3rCchbM8e.png",
  },
  {
    question_slug: "discontinuities-from-a-graph-no-calculator",
    question_name: "Discontinuities from a Graph (No Calculator)",
    question_id: "e7ce2852-a8ef-43cc-bc29-e01523af0e5f",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nAt which $x$-value(s) does this function have a removable discontinuity?\n\n[s:9e208e24-fa53-4d94-8a5d-7d14425dc5da:Discontinuities from Graph:image]",
    option_1_id: "5316d499-e83d-483e-b4f9-93b197ed5798",
    option_2_id: "1bcb03f5-fb2b-4006-8cd3-37f71e309e2a",
    option_3_id: "389c21d6-2885-4fba-80e8-aeff0165e7e6",
    option_4_id: "03b9f980-99a9-4497-b2d3-ce2dc118cdf7",
    option_1: "$1$ only",
    option_2: "$2$ only",
    option_3: "$1$ and $3$ only",
    option_4: "$2$ and $3$ only",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-Ayu7MCJrbNu4.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-vtk9m9dAK8qj.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-9GGtY5n85REJ.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-63mN3BsP4DJ4.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-4SEMUUHjkntZ.png",
  },
  {
    question_slug: "algebraic-limit-involving-factoring-no-calculator",
    question_name: "Algebraic Limit Involving Factoring (No Calculator)",
    question_id: "73ecd3a2-73fe-47dc-8c92-ed71f56a7dfe",
    question_prompt:
      "**No calculator is allowed on this question.**\n\n$\\lim \\limits_{x \\to 4} \\dfrac{2x^2-13x+20}{x-4}$ is:",
    option_1_id: "28010da7-be35-499b-95eb-b3df6d8eb83b",
    option_2_id: "993f9b36-1976-48e9-a1a4-7560272462b0",
    option_3_id: "9520a5b0-8241-4c35-b310-01ad5fae20ab",
    option_4_id: "62fe5877-8ed8-4486-bd41-cd6eaec032cf",
    option_1: "Nonexistent.",
    option_2: "$-\\infty$",
    option_3: "$\\infty$",
    option_4: "$3$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-u2z9fkfdAKEC.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-gc57g7waAY5h.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-WK9hwdk31nUk.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-xnTCJUp8ht6z.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-w6r81wd6xafu.png",
  },
  {
    question_slug: "discontinuities-in-rational-functions-no-calculator-1",
    question_name: "Discontinuities in Rational Functions (No Calculator)",
    question_id: "b6485247-0d51-423b-99b7-7b31397139f5",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhich of the following describes a discontinuity for the function $y=\\dfrac{x^3-8}{x^2+2x-8}$?",
    option_1_id: "cee71a02-5c33-4346-bf53-9eec10cc52f3",
    option_2_id: "a9e1543a-6d11-494b-81f5-eac33d17303f",
    option_3_id: "3a62867c-e6f6-4636-bedb-f603348cd306",
    option_4_id: "493dc1a1-0882-4e48-9af7-04c9c391bf8b",
    option_1: "A vertical asymptote at $x=2$.",
    option_2: "A horizontal asymptote at $y=1$.",
    option_3: "An infinite discontinuity at $x=2$.",
    option_4: "A removable discontinuity at $x=2$.",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-Dwzx7w64SmD8.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-cuvMDV4pyeNt.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-9Tpn4Xhwpzjq.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-sRdjbzp2R7Vw.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-r83XpuaDK5M3.png",
  },
  {
    question_slug: "horizontal-asymptotes-no-calculator",
    question_name: "Horizontal Asymptotes (No Calculator)",
    question_id: "fca24404-76bf-4192-9643-ba0a476a59a0",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind the horizontal asymptote(s) for the following function:    \n\n$$f(x)=\\dfrac{4x-3}{\\sqrt{3x^2-1}}$$",
    option_1_id: "1bad313f-066c-4bb9-9c10-dc636c987943",
    option_2_id: "624d772f-2d33-4201-9c79-8b735a8931a8",
    option_3_id: "3b3ad7ca-ae5f-4720-b73f-90e98813dbc4",
    option_4_id: "71a65bb8-5ddf-424f-884b-144d48c466ac",
    option_1: "$\\dfrac{4}{\\sqrt{3}}$",
    option_2: "$-\\dfrac{4}{\\sqrt{3}}$",
    option_3: "$\\dfrac{4}{\\sqrt{3}}$ and $-\\dfrac{4}{\\sqrt{3}}$",
    option_4: "There are no horizontal asymptotes.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-qG8V9ZGA4PN1.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-zTGyPVVCZxyF.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-rJJwbyRPZmxB.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-F29yp2mTKABw.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-zKc8hfV9357R.png",
  },
  {
    question_slug: "limits-using-orders-of-magnitude-no-calculator",
    question_name: "Limits Using Orders of Magnitude (No Calculator)",
    question_id: "1d9710fa-be4c-4b00-acaf-061e56c4cc8a",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvaluate the following limit as it approaches infinity.    \n\n$$\\lim_{ x \\to \\infty }\\frac{x^2+3x+4}{2x^2+4x+2}$$",
    option_1_id: "164aea73-c731-4bf0-aa84-3db28e0b7086",
    option_2_id: "f0e72995-f427-4a72-aa25-358384434dfe",
    option_3_id: "87062e77-75c3-4a0f-abfe-b6be641287ba",
    option_4_id: "ad5a7944-558b-4fb5-8329-c894d4d0d1cf",
    option_1: "$0$",
    option_2: "$\\infty$",
    option_3: "$\\dfrac{1}{2}$",
    option_4: "Nonexistent.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-Q6v4SVdx7Kvw.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-p3dZ88v9jXPz.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-KPA3Xqy4z35B.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-GCt67SFuCEJm.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-tM7rYHgx8MA1.png",
  },
  {
    question_slug: "another-algebraic-limit-with-factoring-no-calculator",
    question_name: "Another Algebraic Limit with Factoring (No Calculator)",
    question_id: "39f6d10b-201b-414e-85ab-2ea05a046e7d",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvaluate the following limit:    \n\n$$\\lim \\limits_{x \\to -3} \\dfrac{2x^2-18}{x^2-x-12}$$",
    option_1_id: "63c95525-0f4c-486b-8113-b53711d5388b",
    option_2_id: "1dff6331-156b-4770-864b-f8535e969b03",
    option_3_id: "28b7b405-3af4-46ac-9b33-8592d8af8f82",
    option_4_id: "6cbcc15b-7d6b-4956-8fd0-7cc049372cb5",
    option_1: "$0$",
    option_2: "$\\dfrac{6}{7}$",
    option_3: "$\\dfrac{12}{7}$",
    option_4: "The limit does not exist.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-tsfx8NYxzWGG.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-rmWzsHM4TPyp.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-XvK77udATNN9.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-rWp9THRbZAyw.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-19ZwpKBzXbzr.png",
  },
  {
    question_slug: "limit-of-a-logarithmic-function-no-calculator",
    question_name: "Limit of a Logarithmic Function (No Calculator)",
    question_id: "5dea1317-80b3-495a-b423-3763164a8ac4",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nIf $f(x)= \\dfrac{ \\ln x}{5x-1}$, find $\\lim \\limits_{x \\to 1} f(x)$.",
    option_1_id: "2ad7974a-040a-448c-84d5-5d5d4aa4bdb2",
    option_2_id: "837ae594-684c-42c9-841b-b2b17ecef03d",
    option_3_id: "57a1036e-2a91-4428-bd85-5c6ae847a0e6",
    option_4_id: "514902f6-c9ca-4e80-8c65-32b910f3c862",
    option_1: "$\\dfrac{1}{4}$",
    option_2: "$\\dfrac{e}{4}$",
    option_3: "$0$",
    option_4: "Nonexistent.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-92XJkEeB19ZT.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-NnPCVaAnkHN8.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-kyFc1HQ87pG7.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-hwMfwAa9Y2nd.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-xWN4uEtfVUx4.png",
  },
  {
    question_slug: "identify-any-asymptotes-no-calculator",
    question_name: "Identify Any Asymptotes (No Calculator)",
    question_id: "2e0b5d43-3afd-486f-aab4-0d87bb088065",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nDetermine all the asymptotes for the given function:    \n\n$$y=\\dfrac { { x }^{ 3 }+3x-7 }{ { -3x }^{ 4 }-12 } $$\n\n\n",
    option_1_id: "1d7fc99a-0ac2-443f-bddc-aa489a12b8b9",
    option_2_id: "67ae8dfd-0659-4cfc-abc9-167a7a672b1f",
    option_3_id: "c0d80d41-4d1b-4c43-a193-5dcdcce76783",
    option_4_id: "c541b642-8549-448c-b47b-913fc3d1e6d6",
    option_1: "$y=-\\dfrac{1}{3}$",
    option_2: "$x=0$",
    option_3: "$y=0$",
    option_4: "There are no asymptotes for the given function.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-PuZSq21WuUfH.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-fc2SzfmRTp4w.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-EygjmEUy1qgx.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-JgWCDqFbafma.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-kQwApHVXzXVQ.png",
  },
  {
    question_slug: "composite-limits-from-a-graph-no-calculator",
    question_name: "Composite Limits from a Graph (No Calculator)",
    question_id: "26d766a9-50ce-4a6e-bd18-633f3c689c8f",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nUse the graph of $f$ shown below to determine $\\displaystyle\\lim_{x\\to 1}f(f(x))$\n\n[s:2e56218f-5774-4a57-a911-aa81a2daff96:Piecewise for Composition:image]",
    option_1_id: "857ed3fa-a83a-4d7a-bfc9-f390a8c94de6",
    option_2_id: "1b9981a7-296b-49f9-b4b8-dddf601b4e7e",
    option_3_id: "128ed596-7e91-4a39-b6c6-3396e2dda36f",
    option_4_id: "2d729acd-aeaf-43c2-b4aa-60190ef844ec",
    option_1: "$-1$",
    option_2: "$0$",
    option_3: "$1$",
    option_4: "Nonexistent",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-zu2yG25x339x.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-zu5KNerDcaYu.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-bpFJKd47qpD2.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-bAGeScqndcSG.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-RnYmA2aH4vyA.png",
  },
  {
    question_slug: "find-all-the-asymptotes-no-calculator",
    question_name: "Find All the Asymptotes (No Calculator)",
    question_id: "5e181dc6-d878-4042-b4a8-d503ff34d93e",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nDetermine all the  asymptotes for the given function:    \n\n$$y=\\dfrac { { 4x }^{ 2 }-11x+6 }{ { x }^{ 2 }-4 } $$\n\n\n",
    option_1_id: "5c53a3c2-06d9-48db-a9fc-d7cf1edf9183",
    option_2_id: "0e921a22-c646-45f4-81c2-b400829315df",
    option_3_id: "dfcdcf0c-26fd-41fc-93d1-6a9987aa6637",
    option_4_id: "6708ac18-2e7b-429b-8d4b-874e5e0124d9",
    option_1: "$y=4 ; x=-2$",
    option_2: "$x=-2 ; x=2$",
    option_3: "$y=4 ; x=2$",
    option_4: "$y=4 ; x=2 ; x=-2$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-KkxjRszr38Ww.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-Es5CZQAnBaEN.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-GCZMgN9K2hcp.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-Mj6DXWAfXX61.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-pQ2a7EtjhhSV.png",
  },
  {
    question_slug: "limit-at-infinity-dealing-with-a-square-root-no-calculator",
    question_name:
      "Limit At Infinity: Dealing with a Square Root (No Calculator)",
    question_id: "bec22fbf-d0be-4292-ab37-9bf3a5cbf1c6",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nCompute the limit of:    \n\n$$\\lim_{x\\rightarrow {\\infty} }\\left ( x-\\sqrt{x^{2}-3x} \\right )$$\n",
    option_1_id: "33d604b6-9426-4ebd-824f-056742493187",
    option_2_id: "6146d4ce-e4ab-41c6-a67e-a31eea952d72",
    option_3_id: "e6c136c6-b56d-4b7b-953a-1685926c984a",
    option_4_id: "23c6cc43-1b4d-47f6-8a0a-85bd26f039f7",
    option_1: "$\\sqrt{3}$",
    option_2: "$\\dfrac {3}{2}$",
    option_3: "$0$",
    option_4: "The limit does not exist.",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-fXSCT6cdysrn.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-p8YC7AjCfXCk.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-UVYuCwAJ7DGt.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-bbyBEP96gtAX.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-TxVdF4y7SNXM.png",
  },
  {
    question_slug: "limit-statements-no-calculator",
    question_name: "Limit Statements (No Calculator)",
    question_id: "67813034-ca5d-4758-b42d-dd7004f07253",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhich of the following limit statements are true for the function $f\\left( x \\right) =\\dfrac { \\left( { x }^{ 2 }-1 \\right) }{ x^2 } $?\n\n\n>**I.** $\\mathop {\\lim }\\limits_{x \\to 0} f(x) =  - \\infty$  \n\n>**II.** $\\mathop {\\lim }\\limits_{x \\to \\infty} f(x) =  -1$  \n\n>**III.** $\\mathop {\\lim }\\limits_{x \\to \\infty} f(x) =  1$    \n",
    option_1_id: "69580c34-c375-4c51-93dd-790feadc01cd",
    option_2_id: "de0598d4-9d22-49f8-9bcd-f79710b04ec1",
    option_3_id: "f7a8e584-1c5c-453b-aac3-9641b5e4899b",
    option_4_id: "0920bc46-ce6a-4aad-9a68-6459fb960427",
    option_1: "I only.",
    option_2: "II only.",
    option_3: "I and II only.",
    option_4: "I and III only.",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-pM5BzrwkgAxE.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-fZvqkVr68evt.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-jptZUQv5nCsv.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-nrh9tArKETt4.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-xdc6UGM7avUB.png",
  },
  {
    question_slug: "limit-of-a-piecewise-function-no-calculator-1",
    question_name: "Limit of a Piecewise Function (No Calculator)",
    question_id: "6d28b415-cba2-42fb-9021-78fd2cf16186",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nGiven the function $f$, shown below, evaluate $\\displaystyle \\lim_{x\\to 1^-}f(x)$.  $$f(x)=\\begin{cases} x^2+3x-5\\text{  if  } x<1\\\\5x -7 \\text{  if  } x = 1\\\\ \\cos{(\\pi x)} -2\\text{  if  } x>1\\end{cases}$$",
    option_1_id: "66616e97-1e59-4a91-aa0d-c633baa03353",
    option_2_id: "6f55d7ae-55b1-45ac-b3be-2e9f9c24fc05",
    option_3_id: "af6088c8-32fc-41df-bc5b-e7e59a357f9b",
    option_4_id: "2ca278ae-e234-4f2c-8b00-fb63d019874f",
    option_1: "$-1$",
    option_2: "$-2$",
    option_3: "$-3$",
    option_4: "Nonexistent",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-V5sh5kf4HRAP.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-VxmgpVdfATYp.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-NcNYgWuJTNH3.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-kwG6gSMUazaf.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-McrpMK6Xvxtm.png",
  },
  {
    question_slug: "absolute-value-limit-easy-no-calculator",
    question_name: "Absolute Value Limit Easy (No Calculator)",
    question_id: "5fd858a9-7937-410c-af4a-8538123185aa",
    question_prompt:
      "**No calculator is allowed on this question.**\n\n$\\lim \\limits_{x \\to 2} \\dfrac{|2-x|}{x}$ is:",
    option_1_id: "836ab2b2-697b-45a3-a6ea-8f0433af663c",
    option_2_id: "001015d9-d5f2-4315-a372-c3199623be69",
    option_3_id: "0d39ba6a-68ca-43d5-96a4-a676f36dee99",
    option_4_id: "a725e858-859f-49ce-8a52-5316d6ee5982",
    option_1: "$1$",
    option_2: "$2$",
    option_3: "$0$",
    option_4: "$-1$",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-Ru8D7MSdMjwj.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-8B8K3FDxrU5s.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-2Eubq8kVBbqU.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-5V3aXX9bKnmz.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-4PSUbdcF5h7p.png",
  },
  {
    question_slug: "limits-and-square-root-functions-no-calculator",
    question_name: "Limits and Square Root Functions (No Calculator)",
    question_id: "baa352ff-a91b-4b5d-adc4-d8a98f0a6d24",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nCompute the limit:    \n\n$$\\lim_{ x \\to5}\\frac{\\sqrt{x+4}-3}{x-5}$$",
    option_1_id: "993390a3-b63f-45b1-819e-653b19d15754",
    option_2_id: "ce2cb917-72b6-42de-880e-026333a82054",
    option_3_id: "d5b4fd00-3e5a-4bb1-b049-5f4ed851c0d7",
    option_4_id: "053b0f4a-3833-4d27-83a3-763c5fc3a749",
    option_1: "$0$",
    option_2: "$\\dfrac{1}{6}$",
    option_3: "$\\dfrac{1}{12}$",
    option_4: "Nonexistent.",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-e5Q4FPVtJE6A.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-zYZy9mHESmPN.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-drtZft4GChdX.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-WfWTxwvRbMW3.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-4UkCMqJdNsVG.png",
  },
  {
    question_slug: "testing-a-piecewise-function-limit-no-calculator",
    question_name: "Testing a Piecewise Function Limit (No Calculator)",
    question_id: "ed2f81fa-b8fa-4328-8070-954aeeb11ed5",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nIf $ f(x) = \\left\\{ \\begin{array}{ll} \\ln x & \\quad 0 \\lt x \\leq 2 \\\\ x^2 \\ln 2 & \\quad 2 \\lt x \\leq 4 \\end{array} \\right. $ then, $\\lim \\limits_{x \\to 2} f(x)$ is:",
    option_1_id: "141a68db-9356-41f1-8141-2a133f6a70fa",
    option_2_id: "82286541-41f9-4cfc-82e2-a542ec934f06",
    option_3_id: "92eb4862-5312-4cec-aeb8-f1d4f4c3aaa6",
    option_4_id: "6507a153-f746-4823-bb0f-72547bb19f7e",
    option_1: "$\\ln 2$",
    option_2: "$\\ln 8$",
    option_3: "$\\ln 16$",
    option_4: "The limit does not exist.",
    key: "option_4_id",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-hGqq3zW9KKFH.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-1DQZnZU66awD.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-hg6tU8FReXau.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-6WTWDRFu5kB4.png",
  },
  {
    question_slug:
      "comparing-the-rates-of-change-of-two-functions-no-calculator",
    question_name:
      "Comparing the Rates of Change of Two Functions (No Calculator)",
    question_id: "07bab4fe-ad87-40f8-9f08-4b38426d40c9",
    question_prompt:
      "**No calculator is allowed on this question.** \n\n Evaluate:\n\n$$\\lim _{ x\\rightarrow \\infty  }{ \\dfrac { \\log _{ 2 }{ x }  }{ { x }^{ 2 } }  } $$",
    option_1_id: "73297a98-c260-43eb-a4fe-c645eb2795c8",
    option_2_id: "3dd001e4-0e69-4ca9-9a03-757378825ed6",
    option_3_id: "a16db632-4e61-47f5-9fb8-cd21dad34e2d",
    option_4_id: "e289658f-d724-4f3a-bb1e-f64b7cef8b17",
    option_1: "$0$",
    option_2: "$1$",
    option_3: "$2$",
    option_4: "$\\infty $",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-B8A62RN9VhaE.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-g82YMNBSvCjH.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-PPy7EjgNWtZE.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-HzN1sdKdPRXs.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-kZR6C1fdnuA2.png",
  },
  {
    question_slug: "asymptote-challenge-no-calculator",
    question_name: "Asymptote Challenge (No Calculator)",
    question_id: "b4850bd6-5bfb-4d02-aab2-b7d3334d897f",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind all asymptotes for the graph of the given function:    \n\n$$y=\\dfrac { \\left( { 2x }^{ 2 }-6 \\right) }{ x } $$\n\n\n",
    option_1_id: "667c5c89-dfa9-446e-8d6b-c87d007f4814",
    option_2_id: "37046dcb-0e2a-425d-b695-9c473c555147",
    option_3_id: "10267cfc-a8be-4862-8042-e1afe5b0be1f",
    option_4_id: "bb269b75-4c69-4376-953f-f2b755cb2721",
    option_1: "$y=2 ; x=0$",
    option_2: "$y=2x^{2} ; x=0$",
    option_3: "$y={ 2x } ; x=0$",
    option_4: "$y= 2x - 6 ; x=0$",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-2r6T6jTGhxCp.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-avpj4cruncXW.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-xTJec1HEkYuk.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-kNRJb71vjF4b.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-P21Yf2f9fnyR.png",
  },
  {
    question_slug: "a-limit-from-a-table-calculator",
    question_name: "A Limit From a Table (Calculator)",
    question_id: "bb7ede71-f575-4a40-bd10-34b0d26b883a",
    question_prompt:
      "Using a table, find $\\lim\\limits _{ x\\rightarrow { -1 }^{ - } }{ \\cfrac { 1 }{ \\sqrt { { x }^{ 2 }-1 }  }  } $.",
    option_1_id: "b2b9204e-83ff-4195-8b2b-a6707df711d3",
    option_2_id: "d8405c7e-e138-47c2-b20c-f5c93b898ec8",
    option_3_id: "db410cbf-b6d2-4cb3-9fd2-0d2d985b847d",
    option_4_id: "c63926fd-6271-4df0-bcec-298af866a922",
    option_1: "$2.182$",
    option_2: "$\\infty$",
    option_3: "$7.053$",
    option_4: "nonexistent",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-eFSFdHhSxSQ4.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-AWsDryR3Asd6.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-QnzCxJS6sTfQ.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-dB5tjD3WMrxS.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-2ks5AWSMZx3k.png",
  },
  {
    question_slug: "identify-the-horizontal-asymptote-no-calculator",
    question_name: "Identify the Horizontal Asymptote (No Calculator)",
    question_id: "f07f2263-2607-4e0b-8c49-34c127c23d49",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind the horizontal asymptote for the given function:    \n\n$$y=\\dfrac { ( 3x+2 ) ( x-4 ) }{ ( 5x-3 ) ( -2x+1 ) } $$\n\n\n",
    option_1_id: "e4f8eb06-f592-4f7b-bb84-7498bc67697a",
    option_2_id: "2c4b682f-6edb-4ad6-b3c7-ca11d019c141",
    option_3_id: "d864408d-c9f8-4e77-85fe-78856165d67e",
    option_4_id: "f4f64e26-3532-4950-bb20-9f127a7f58cc",
    option_1: "$y=-\\dfrac{ 3 }{ 10 }$",
    option_2: "$y=\\dfrac{ 1 }{ 2 }$",
    option_3: "$y=\\dfrac{ 3 }{ 5 }$",
    option_4: "There is no horizontal asymptote in this case.",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-71yBZPaM5q6N.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-NGyR6CXtYfjW.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-4bUBjXNscdXP.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-PpqJt1D4JUtE.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-Zb8VrbjCKavA.png",
  },
  {
    question_slug: "limits-by-algebraic-simplification-no-calculator",
    question_name: "Limits by Algebraic Simplification (No Calculator)",
    question_id: "c56b8564-d040-48bd-9bd2-7787a28139f3",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvaluate the limit:    \n\n$$\\lim_{ x \\to2}\\frac{2x^{3}-16}{x-2}$$",
    option_1_id: "f7c1c23d-6fc7-46d8-b1a9-112359b4cef2",
    option_2_id: "5e6829b2-4a14-4a06-ba2d-90ee3c38a3e3",
    option_3_id: "1feaaba3-6f96-4a54-98a7-336c34920d87",
    option_4_id: "de955ab3-87aa-43d1-a935-010cc38c28a8",
    option_1: "$12$",
    option_2: "$0$",
    option_3: "$24$",
    option_4: "Nonexistent.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-dbm4MknVdWrE.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-8BK73e1ggcgh.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-7wQy22C8AnXU.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-j4Vbc217ePaq.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-JugbhAmNPm1g.png",
  },
  {
    question_slug:
      "limits-with-jumps-and-infinite-discontinuities-no-calculator",
    question_name:
      "Limits with Jumps and Infinite Discontinuities (No Calculator)",
    question_id: "a56cd9a7-4386-4729-b8ba-88cbe1e96496",
    question_prompt:
      "**No calculator is allowed on this question.**\n\n[s:aabf2da6-290f-4d85-b496-7d1f83449eca:Jump and Infinite Discontinuity:image]  \n\nWhich of the following  sets of statements accurately describes​ the above graph of $f(x)$?",
    option_1_id: "f047e1a1-f201-4755-96bb-276a5e050226",
    option_2_id: "04526b61-4541-4d90-9660-346047d0d521",
    option_3_id: "9bf00aa7-7532-4690-87fb-f6160f20a2de",
    option_4_id: "92a82404-f070-43c2-a2ee-1a040fb728d6",
    option_1:
      "$f(-1)=1$  \n$\\lim _{ x\\rightarrow { 0 }^{ + }} f(x) =3 $  \n$\\lim _{ x\\rightarrow { 2 }^{ - } }{f(x)  } =1$",
    option_2:
      "$f(0)=3$  \n$\\lim _{ x\\rightarrow { 2 }^{ -}} f(x) =1 $  \n$\\lim _{ x\\rightarrow { -1 }^{ -} }{f(x)  } =0$\n",
    option_3:
      "$\\lim _{ x\\rightarrow { -1 }^{+}} f(x) =0 $  \n$\\lim _{ x\\rightarrow { 2 }}{f(x)} =1$  \n$\\lim _{ x\\rightarrow { 0 }} f(x) =3 $",
    option_4:
      "$\\lim _{ x\\rightarrow { c }}{f(x)  } $ does not exist for $c=-1$, $0$, and $2$. ",
    key: "option_1_id",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-EJyEzyk1dMNC.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-e6v7HwKcPMPK.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-Jpx4JT7F7Rgn.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-QQMpSayyga8t.png",
  },
  {
    question_slug: "difficult-piecewise-function-no-calculator",
    question_name: "Difficult Piecewise Function (No Calculator)",
    question_id: "217a7bb2-b5f5-4582-a1dc-003b2364ce7d",
    question_prompt:
      "**No calculator is allowed on this question.**\n\n$\\lim \\limits_{x \\to 2} \\dfrac{x^2-2x}{\\sqrt{x^2-4x+4}}$ is:",
    option_1_id: "883ebf72-455e-4eaa-939d-550a78867bdd",
    option_2_id: "1b00b1cf-ee86-4ce0-ad37-6bcd1272dfc3",
    option_3_id: "ca08555c-337b-4920-a03c-85bc5f3d1068",
    option_4_id: "4ebebd4a-9c10-47e7-96fb-f17ca47f56d5",
    option_1: "$-2$",
    option_2: "$-1$",
    option_3: "$2$",
    option_4: "The limit does not exist.",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-QWrhj22gGNSa.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-St8djtqPUEgC.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-p8PQNBFdsNHe.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-3tc3Wua2PNGh.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-T3Y72f8F3Zyw.png",
  },
  {
    question_slug: "equal-limits-with-roots-no-calculator",
    question_name: "Equal Limits with Roots (No Calculator)",
    question_id: "4ccfe0fc-d7fd-43eb-9811-53029a884617",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhich of these is equivalent to $\\displaystyle\\lim_{x\\to 9}\\left(\\dfrac{x^2-81}{\\sqrt{x}-3}\\right)$?",
    option_1_id: "b2e0827e-ef00-48f7-8a96-0fb21e4fad65",
    option_2_id: "ae3ad99d-7dcc-42c7-819b-2e9060b77d98",
    option_3_id: "c10cac78-4280-4348-bc5e-e8ef5ae5eb83",
    option_4_id: "229d96b7-3de7-4f2a-b669-42e8a2466aef",
    option_1: "$\\displaystyle\\lim_{x\\to9}(x+9)(\\sqrt{x}+3)$",
    option_2: "$\\displaystyle\\lim_{x\\to9}(\\sqrt{x}+3)$",
    option_3: "$\\displaystyle\\lim_{x\\to9}(x^2+81)$",
    option_4: "$\\displaystyle\\lim_{x\\to9}(x+9)(x^2+81)$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-F1ATtJAy962z.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-5frcWq7zMEXP.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-gbzD46fkDyUR.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-vPhB5Cvs7g3u.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-Pg8xWD9mH5yA.png",
  },
  {
    question_slug: "interpreting-two-sided-limits-no-calculator",
    question_name: "Interpreting Two-sided Limits (No Calculator)",
    question_id: "5725088b-0548-46fb-9d6f-f376850b98d3",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nIf $\\lim \\limits_{x \\to {5^ - }} f(x)=-8.2$ and $\\lim \\limits_{x \\to 5} f(x)$ exists, then to what value does the limit $f(x)$ converge?",
    option_1_id: "3bc8099c-b256-44bc-b51f-8573651ce434",
    option_2_id: "7487c031-98de-4def-8018-455351a46ae7",
    option_3_id: "2f037482-f81a-4205-8491-c00d5afe046a",
    option_4_id: "ff4480a9-124c-4af2-8e7a-adb8e734f5ea",
    option_1: "$5$",
    option_2: "$8.2$",
    option_3: "$-8.2$",
    option_4: "$0$",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-PbAEb6fX3SCp.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-xsA9v54a8c9c.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-vVHtYtKe8xnt.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-bJZX1WGUe9Gr.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-SnUb7m3Hbyda.png",
  },
  {
    question_slug: "range-of-a-function-inverse-tangent-no-calculator",
    question_name: "Range of a Function, Inverse Tangent (No Calculator)",
    question_id: "cacb9d42-35bb-49d1-b20b-d18e9d555dbd",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind the range of the following function, $y=3\\sin({\\tan^{-1}x})$.",
    option_1_id: "fe7340f3-79a3-4839-8f5e-3c925e60a04d",
    option_2_id: "9d9bfb42-c159-457f-b1b7-33397a34e9a8",
    option_3_id: "cd8dda59-af96-4466-848d-30d464bab968",
    option_4_id: "fc02decf-8162-4322-98f8-1adde8ad9426",
    option_1: "$[0,3]$",
    option_2: "$[-3,3]$",
    option_3: "$[0,6]$",
    option_4: "The range cannot be determined from the given information.",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-VzFZWDCJc9fG.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-BnUaa6tUtKah.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-MxtrWEXFMGWT.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-qJ28eSMBaHPS.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-wj9mPj4yeXHS.png",
  },
  {
    question_slug: "find-a-limit-with-a-table-or-a-graph-calculator",
    question_name: "Find a Limit with a Table or a Graph (Calculator)",
    question_id: "4181a8e0-c564-4db2-bba8-cd6c1fc6aed8",
    question_prompt:
      "Using either a table or a graph, determine:\n\n$$\\lim\\limits _{ x\\rightarrow { 3 } }{ \\cfrac { { x }^{ 2 }-2x-3 }{ { x }^{ 2 }-5x+6 }  } $$",
    option_1_id: "a8cebdb6-b1db-4e5a-8fe8-2cf8f83f7217",
    option_2_id: "91da84b7-8067-4e85-bfbd-e6415cd67379",
    option_3_id: "76be09d4-09d8-4135-902b-980e0284d3ce",
    option_4_id: "679b1c3f-63bd-44f8-b421-6fcfe62fa2b7",
    option_1: "The limit does not exist ",
    option_2: "$4$",
    option_3: "$3$",
    option_4: "infinity",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-ZTSKvtGMwjXu.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-a6MA5XRAGXvC.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-ub8Pfejpy7Qt.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-C2KWjkpcQGxE.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-kCNpuXXwaEJW.png",
  },
  {
    question_slug: "indeterminate-form-infinity-minus-infinity-no-calculator",
    question_name:
      "Indeterminate Form: Infinity Minus Infinity (No Calculator)",
    question_id: "8d268152-cba4-4034-9258-7bfaaf511b9b",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind the following limit (if it exists):    \n\n$$\\lim _{ x\\xrightarrow { } \\infty }{ \\left( 5{ x }^{ 3 }-100{ x }^{ 2 } \\right) } $$\n\n\n",
    option_1_id: "83b5bbb1-4b59-43b8-8215-7e8fe4788ade",
    option_2_id: "2fa67d99-34ce-4cfa-a55c-bcf09ef549bb",
    option_3_id: "f3cb655e-3d0e-40b6-bbd5-3ad37343befe",
    option_4_id: "e5ab626d-9556-434c-ae4e-48b52d507680",
    option_1: "$-95$",
    option_2: "$5$",
    option_3: "$0$",
    option_4: "The limit does not exist",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-u5SdguhZUtDD.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-NcPBqtMUx8Pk.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-Tzva1rw5PkfN.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-TxBTDuBWhp3d.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-W49RWHPMU1HQ.png",
  },
  {
    question_slug: "comparing-magnitudes-no-calculator",
    question_name: "Comparing Magnitudes (No Calculator)",
    question_id: "464efe21-0fd5-463a-8eff-ee9b2d0f3a24",
    question_prompt:
      "**No calculator is allowed on this question.**\n\n$\\lim_{x \\to\\infty}f(x)$ is largest for which of the following functions?",
    option_1_id: "7a19d297-9a1b-43b2-8900-aeadc357ca65",
    option_2_id: "48af9428-0996-4903-91fc-e86c1b7cad3c",
    option_3_id: "8ca54c7e-6eec-491d-8036-fd14dfdfc93a",
    option_4_id: "3561243e-062d-449b-8c0e-90c992b6b126",
    option_1: "$f(x)=\\dfrac{\\sin{x}}{x}$",
    option_2: "$f(x)=\\dfrac{e^x}{x^3}$",
    option_3: "$f(x)=10x^5-4x^2$",
    option_4: "$f(x)=\\dfrac{1}{x}$",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-USE6Uf8MuC13.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-6DfYbA3GaBJz.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-VrQX3KcZGPfs.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-EaKbZsVUkWrg.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-YY4xRHHxw9NM.png",
  },
  {
    question_slug:
      "graphical-analysis-discontinuities-true-or-false-no-calculator",
    question_name:
      "Graphical Analysis: Discontinuities True or False (No Calculator)",
    question_id: "4ef66e46-a0d6-4e21-a686-f4d7c0224752",
    question_prompt:
      "**No calculator is allowed on this question.**\n\n[s:0f30a729-cf37-44e9-8929-e636706db962:Graphical_analysis_discontinuity:image]  \n\nAll of the following statements are true of the function graphed above **EXCEPT**:  \n\n(The blue vertical line at $x=-3$ is a vertical asymptote.)",
    option_1_id: "60c52a99-1307-4665-93ac-8cd0c6fc4c67",
    option_2_id: "63a44221-b83e-43ff-a68f-c126e748d89d",
    option_3_id: "a60b1e75-489b-4b93-9b1b-4ace87213e8a",
    option_4_id: "a0a15d0f-b229-4f4f-a6ec-48f7e9a6d657",
    option_1: "The function is continuous at $x=5$.",
    option_2: "The function is continuous at $x=1$.",
    option_3: "The function is discontinuous at $x=-3$.",
    option_4: "The function is discontinuous at $x=-6$.",
    key: "option_2_id",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-cQqmXJQFXV9C.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-7QMUmQUggDfb.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-m9srNEMdRpB7.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-tX9mENQyQ3Yf.png",
  },
  {
    question_slug: "finding-one-and-two-sided-limits-no-calculator",
    question_name: "Finding One- and Two-Sided Limits (No Calculator)",
    question_id: "04cf9eb3-d337-4e9c-920a-4eb1207b9aae",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nConsider the graph of $f(x)$ shown below.  \n\nWhich of the following statements are true?  \n \n[s:2324e578-f452-45cd-8e37-6bdbe674be98:TT_1.1_11_stem_01:image]  \n \n\n>**I.** $\\lim \\limits_{x \\to 0} f(x) = \\lim \\limits_{x \\to 3} f(x)$  \n\n>**II.** $\\lim \\limits_{x \\to 1^{-}} f(x)= \\lim \\limits_{x \\to 8^+} f(x)$  \n\n>**III.** $\\lim \\limits_{x \\to 5} f(x) = \\lim \\limits_{x \\to 8^-} f(x)$    \n",
    option_1_id: "f285f352-b655-4346-b5d3-3cce16a12919",
    option_2_id: "2ae95b3e-189d-46b4-9f72-bb0f95b1e115",
    option_3_id: "a1e602f1-358c-4020-96d3-8ea2dd910fb6",
    option_4_id: "249b2a81-0c34-422e-b070-25424c3b9796",
    option_1: "I only.",
    option_2: "II only.",
    option_3: "I and II only.",
    option_4: "I and III only.",
    key: "option_3_id",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-vKeYK29eTvys.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-ChF25zk44Qfc.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-8PKjKmQknaqt.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-ErCBaS14NN6r.png",
  },
  {
    question_slug: "piecewise-logarithmic-function-no-calculator",
    question_name: "Piecewise Logarithmic Function (No Calculator)",
    question_id: "0039126e-c9d6-4f53-8688-d47eec417db6",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nGiven the piece-wise function:  \n$$h(x)=\\begin{cases} \\ln\\left( 5c-{ 3x }^{ 2 } \\right) \\quad ;\\quad x\\ge 4 \\\\ \\ln\\left( 3c+2x \\right) \\quad ;\\quad x<4 \\end{cases}$$  \n\nFind the value of $c$ so that $h(x)$ is continuous at $4$.",
    option_1_id: "ded3f2e1-61c1-4c9a-9f85-7d0311c1f84e",
    option_2_id: "1640336c-18a1-402f-acfa-ef6cef729f49",
    option_3_id: "ee532c71-f5ad-454e-bd41-6cf0460a20a5",
    option_4_id: "7bfd9758-f232-417f-95b8-978795cf6f52",
    option_1: "$c=4$",
    option_2: "$c=92$",
    option_3: "$c=16$",
    option_4: "$c=28$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-UST8np9YYpUX.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-ks4kdg3feNU4.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-WcmHjcVYcRGF.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-8QQzbX8JMdG4.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-eCE92BJTXxGT.png",
  },
  {
    question_slug: "finding-the-limit-of-4-x-no-calculator",
    question_name: "Finding the Limit of $4^x$ (No Calculator)",
    question_id: "fc2fb559-6c98-4779-94fa-3e0a527563a3",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvaluate the limit of:    \n\n$$\\lim _{ x\\xrightarrow { } -2 }{ { 4 }^{ x } } $$",
    option_1_id: "6d0c6ff4-3ee0-4180-aed7-8cead176b0c1",
    option_2_id: "8a36a578-b639-48ad-9140-028c7156a093",
    option_3_id: "e5e86ff5-47c9-4c87-8ff7-5ed9b9995390",
    option_4_id: "b1a30f4d-5d78-4379-95f1-173ea20c5fcb",
    option_1: "$\\dfrac{1}{2}$",
    option_2: "$\\dfrac{1}{8}$",
    option_3: "$\\dfrac{1}{16}$",
    option_4: "The limit does not exist.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-7efvpDAdUJXF.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-huMvGvaR4UH8.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-Pk2C6Jaz7fcw.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-PmATsgR2zv6R.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-WhccfVTk7hED.png",
  },
  {
    question_slug: "which-is-a-squeeze-no-calculator",
    question_name: "Which is a Squeeze? (No Calculator)",
    question_id: "b050749a-bee9-4878-8f32-1c59125a5035",
    question_prompt:
      "**No calculator is allowed for this question.**\n\n<li>Three functions are defined as $f(x)=\\dfrac{\\sin{x}}{5x}$, $g(x)=\\dfrac{x}{\\sin{3x}}$, and $h(x)=\\dfrac{\\sin{3x}}{\\sin{4x}}$.  Each of the following inequalities is true on the interval $-\\frac{1}{2}\\leq x \\leq \\frac{1}{2}$.  Which of these could be used along with the squeeze theorem to determine the limit of the indicated function as $x$ approaches $0$?\n\n[ol-type=I]\n1. $\\quad x^2-\\frac{1}{3}\\leq f(x) \\leq \\frac{1}{3}$\n2. $\\quad \\frac{1}{3}(1-x^3)\\leq g(x) \\leq x^2+\\frac{1}{3}$\n3. $\\quad \\frac{1}{10}\\ln{(x+1)}+\\frac{1}{2}\\leq h(x)\\leq-x^2+\\frac{7}{4}$\n[/ol-type]",
    option_1_id: "b5a1388f-d765-4681-9a61-fc21ac623a2d",
    option_2_id: "afc06157-e9ca-401c-ba6d-22ee97bf15f1",
    option_3_id: "9e625aab-5898-41a8-bb20-03861e10e426",
    option_4_id: "df5f1741-fafb-4095-beaf-277b46f8da3a",
    option_1: "I only",
    option_2: "II only",
    option_3: "I and II only",
    option_4: "II and III only",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-KXF3khfs3gE3.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-PnKQ2cFeAJND.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-eYemQ74rbZQ5.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-TgfrthqyFwkP.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-qMVBducRz6Un.png",
  },
  {
    question_slug:
      "which-graph-fits-the-instantaneous-rate-of-change-no-calculator",
    question_name:
      "Which Graph Fits the Instantaneous Rate of Change?(No Calculator)",
    question_id: "17a5ef54-3686-49ee-969f-c71bd1ab2b10",
    question_prompt:
      "Given the graph of the instantaneous rates of change of $f(x)$ as a function of $x$, which of the following could represent $f(x)$?\n\n[s:617e6e67-835c-4a77-8788-d45229ca1367:Graph of Instantaneous Rates of Change:image]",
    option_1_id: "703a76bf-8545-49eb-b97b-5b0990e3cec1",
    option_2_id: "4732d362-f833-4396-982e-bb38353828cd",
    option_3_id: "5a2b630a-1714-48c6-8000-5e16709e96ef",
    option_4_id: "382c7563-e103-4f86-9de0-db175e1c256f",
    option_1: "[s:8fb2f4ca-249e-4d6e-b7be-1440129baf85:f(x) A:image]",
    option_2: "[s:f824c587-ab60-4c73-a57a-3530a344d8b0:f(x) B:image]",
    option_3: "[s:9e9056c3-2b38-4a74-bba2-fc16ee3566bf:f(x) C:image]",
    option_4: "[s:29d41fc4-9ba6-4ed5-9e29-008441ad3161:f(x) D:image]",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-94qMHMFgyW3T.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-qFBgCm1JqSYp.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-heRf9tyWVfjc.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-Cr57w5gNZC5X.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-W75Xr8Ffs62f.png",
  },
  {
    question_slug: "limits-from-graph-x-to-1-no-calculator",
    question_name: "Limits from Graph, $x$ to $1$ (No Calculator)",
    question_id: "4d437a2c-2246-4da1-a909-723921487b07",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nUsing the graph of the function $f(x)$, evaluate $\\lim_{ x \\to1} \\; f(x)$.  \n\n[s:efcfa9e3-6ea2-4174-a75e-ebb2d12e8f46:limit_function_step:image]",
    option_1_id: "c410f935-655e-4b67-a290-33c3f1c173ee",
    option_2_id: "936d1d1d-b20e-40b2-9264-e2ea6c8218ea",
    option_3_id: "2b77ee66-355a-4b8e-b612-cb2bc9597a7a",
    option_4_id: "23ee7808-008f-4295-952d-b03088b8b034",
    option_1: "$0$",
    option_2: "$1$",
    option_3: "$3$",
    option_4: "Nonexistent.",
    key: "option_4_id",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-v8hv7jGKUdTz.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-DrP87v6UC9w4.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-nkzRGZq2WwCN.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-Cpg6KX4RTVjn.png",
  },
  {
    question_slug: "another-one-sided-limit-no-calculator",
    question_name: "Another One-sided Limit (No Calculator)",
    question_id: "4de5773d-31c8-4228-b22d-45a0b034dcc6",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nLet:    \n\n$$ f(x) = \\left\\{ \\begin{array}{ll} x^2-7 & \\quad x \\lt -1 \\\\ -\\frac{2}{3}x+2 & \\quad x \\geq -1 \\end{array} \\right.$$  \n\nWhat is:    \n\n$$\\lim \\limits_{x \\to -1^+} f(x)?$$",
    option_1_id: "d3b59fc6-4361-4709-8cfb-a701c9ee3e62",
    option_2_id: "0e8e182b-71aa-472f-bbc8-3d2d98ca3c2b",
    option_3_id: "6f093a08-d0c0-4170-a21a-11a236795768",
    option_4_id: "2c26f8cb-6cac-4491-948d-553b37cd7de4",
    option_1: "$\\dfrac{8}{3}$",
    option_2: "$\\dfrac{4}{3}$",
    option_3: "$-9$",
    option_4: "$-6$",
    key: "option_1_id",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-NyhZZvVGqQXR.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-w8yxmyUpCwvg.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-xDpcSAejWbXv.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-xvFxZ9BEeFQk.png",
  },
  {
    question_slug: "vertical-asymptote-no-calculator",
    question_name: "Vertical Asymptote (No Calculator)",
    question_id: "80a653a0-371a-430f-9281-ce08841c38ba",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhich of the following statements guarantees that $x=4$ is a vertical asymptote of the function $f(x)$?\n\n\n>**I.** $\\mathop {\\lim }\\limits_{x \\to \\infty } f(x) = 4$  \n>**II.** $\\mathop {\\lim }\\limits_{x \\to {4^ + }} f(x) =  -\\infty$  \n>**III.** $\\mathop {\\lim }\\limits_{x \\to 4} f(x)$ does not exist    \n",
    option_1_id: "ce3e3daf-d415-4493-9926-54274c7b39cb",
    option_2_id: "f80c9d25-fd7c-4609-bfed-b52ee44c6ff4",
    option_3_id: "dc3373f0-960f-495b-acc6-8de3c5bbedfd",
    option_4_id: "4a634575-709c-4cba-9d8e-3b457d444397",
    option_1: "I only.",
    option_2: "II only.",
    option_3: "III only.",
    option_4: "II and III only.",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-HjhEfGgG3CyF.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-BCRrdJGxPbc7.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-P1bNtUYPptA9.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-ReY4BZdpbfQy.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-bXvbPeNu1Z2J.png",
  },
  {
    question_slug: "limit-to-k-no-calculator",
    question_name: "Limit to $k$ (No Calculator)",
    question_id: "aa7b213c-29fc-4de8-af3e-34b219b8b6ee",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nGiven:  For some real value of $k$:    \n\n$$\\lim _{ x\\rightarrow \\infty  }{ f(x)=k } $$  \n$$\\text{ and }$$  \n$$\\lim _{ x\\rightarrow -\\infty  }{ f(x)=k } $$  \n\nWhich of the following statements is true?\n\n\n",
    option_1_id: "5a6d21c4-3c1e-41f8-a9cf-1b9a1dabb9b1",
    option_2_id: "81a48c96-77e5-47d7-9d43-082bb0f513a3",
    option_3_id: "344e27e8-d3d7-4686-8ba7-2a4bb6162c1c",
    option_4_id: "5b46cea4-db7c-4c50-aca3-3e96d24e5574",
    option_1: "$y=k$ is a horizontal asymptote of $f\\left( x \\right)$",
    option_2: "$y=k$ is a vertical asymptote of $f\\left( x \\right)$",
    option_3: "$\\displaystyle\\lim_{x\\rightarrow k}f(x)=\\infty $",
    option_4: "$y=k$ is an oblique asymptote of $f\\left( x \\right)$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-8gDGr1Pb8GUE.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-uxFms7PQNTkB.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-tge6ZcnRnCkw.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-u5DqzTT7manr.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-1mFrwjwA51A2.png",
  },
  {
    question_slug: "cosine-limit-no-calculator",
    question_name: "Cosine Limit (No Calculator)",
    question_id: "102703e1-ce07-4cda-9eb7-ff99552c6c72",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind the limit:    \n\n$$\\lim _{ x\\rightarrow \\infty  }{ \\left( \\cos\\left( \\frac { 5x }{ { x }^{ 2 }+7 } +\\frac { \\pi  }{ 3 }  \\right)  \\right)  } $$\n\n\n",
    option_1_id: "c434f05e-2004-49d9-8ee6-bfc4dc67d884",
    option_2_id: "842f0927-5494-4233-a010-3a265c5540d0",
    option_3_id: "d2249ff5-47bf-4993-a84f-350a4c2e8a52",
    option_4_id: "7d40b73e-0765-44c5-8e73-895ba5a7e7c3",
    option_1: "$\\dfrac{1}{2}$",
    option_2: "$\\dfrac{\\sqrt{3}}{2}$",
    option_3: "$\\dfrac { \\pi  }{ 3 } $",
    option_4: "The limit does not exist.",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-SJrAnTFtSsdg.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-jH9qZbja4daM.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-6cUBmDBBXpfA.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-kYQYkNJj8CUa.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-AGR7yvuaw4Ng.png",
  },
  {
    question_slug:
      "find-a-b-to-make-piecewise-function-continuous-no-calculator",
    question_name:
      "Find $a\\ b$ to Make Piecewise Function Continuous (No Calculator)",
    question_id: "beb3a821-a81c-45bd-a3dd-ccd9260ef76c",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind the values of $a$, $b$ that make $f(x)$ continuous for all real numbers.    \n\n$$f(x)=\\begin{Bmatrix} a{ x }^{ 2 }+x-3 & x<0 \\\\ b{ x }^{ 2 }+x-a & 0\\le x<3 \\\\ { x }^{ 2 }-1 & x\\ge 3 \\end{Bmatrix}$$",
    option_1_id: "89240d96-23da-4974-b39a-9c31bd2c0f1e",
    option_2_id: "65896b02-8cf1-4bb9-8c2a-e79596298214",
    option_3_id: "4d8af57a-bc0c-406d-958d-aa13900fc3bd",
    option_4_id: "bc3bf001-a9f8-4e55-bb9a-5f8a44a9eae9",
    option_1: "$a=1$  \n$b=\\dfrac{2}{3}$",
    option_2: "$a=-3$  \n$b=\\dfrac {14}{9}$",
    option_3: "$a=-3$  \n$b=\\dfrac{2}{9}$",
    option_4: "$a=3$   \n$b=\\dfrac{8}{9}$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-rJd6QF1SfMj5.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-3f79rEvvuY22.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-dnJarGTfFv4Z.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-nK3bKvKqH6JX.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-uAmmvUj6Vwur.png",
  },
  {
    question_slug: "ivt-guarantees-calculator",
    question_name: "IVT Guarantees (Calculator)",
    question_id: "1dd474c2-a93a-4d4e-9502-dfec082b8af9",
    question_prompt:
      "**A calculator is allowed on this question.**\n\nLet $f$ be the function defined below. The Intermediate Value Theorem applied to $f$ on the interval $[2,4]$ guarantees a solution to which of the following equations?  $$f(x)=\\dfrac{4x^4+6x^2+10}{100-\\ln{\\left(\\frac{x^3+2}{2}\\right)}}$$\n\n[ol-type=I]\n1. $f(x)=6$\n2. $f(x)=12$\n3. $f(x)=24$ \n[/ol-type]",
    option_1_id: "535ee1d7-631d-4c86-b894-c7ade31a061f",
    option_2_id: "d106aa48-00ea-477c-80ee-4185ffb2e555",
    option_3_id: "f96b679a-99ad-4607-a867-ce249948fced",
    option_4_id: "9a4c1999-c701-47dd-9d34-e859ab8c3c6a",
    option_1: "I only",
    option_2: "III only",
    option_3: "I and II only",
    option_4: "None of these is guaranteed ",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-9yYQuUuJ253m.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-Hk6ErqyaA9GV.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-gj8ys9ZUfE9C.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-zwFcTG4X7GSm.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-xUv8JAM22yXR.png",
  },
  {
    question_slug: "discontinuity-with-absolute-value-functions-no-calculator",
    question_name:
      "Discontinuity with Absolute Value Functions (No Calculator)",
    question_id: "414f0cce-8f66-4d9c-a412-a5d846dc1a74",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhat type of discontinuity occurs with the following function?    \n\n$$f(x)=\\dfrac{|x+1|}{|x-1|}$$\n\n",
    option_1_id: "b88be061-7a99-48fe-8c2e-4d9e05458b3e",
    option_2_id: "c71330a8-4bbc-41ea-a1d5-3989b056782a",
    option_3_id: "f5d702bc-803c-4cfa-a005-79f3a8d16848",
    option_4_id: "1af4bfa0-0675-4739-9aad-cc6d51688939",
    option_1:
      "Removable discontinuity at $x=-1$ and infinite discontinuity at $x=1$. ",
    option_2:
      "Infinite discontinuity at $x=-1$ and removable discontinuity at $x=1$. ",
    option_3: "Infinite discontinuity at $x=1$. ",
    option_4: "Removable discontinuity at $x=1$.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-6mrQMf39sPXB.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-PMN5R2cA2yJB.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-sbrSfveJ1nzT.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-n1YxMaV4e8wn.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-PRvv6PNynJhA.png",
  },
  {
    question_slug: "limit-with-multiple-variables-no-calculator",
    question_name: "Limit with Multiple Variables (No Calculator)",
    question_id: "caf23ff6-d6a3-4b2c-bb1b-99391fec1ea2",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nIf $a \\neq 0$, then evaluate the following limit:    \n\n$$\\lim \\limits_{x \\to a} \\frac{x^2-a^2}{a^4-x^4}$$",
    option_1_id: "5b58bcec-85f2-414d-a47a-cf06d2fb3c9c",
    option_2_id: "2caea78b-19be-4dd6-816a-a11925aa4244",
    option_3_id: "41d56967-a367-4537-a7aa-d9be75f49e66",
    option_4_id: "f8736580-9e9a-41e5-b98c-80d499ea2c8e",
    option_1: "$-\\dfrac{1}{a^2}$",
    option_2: "$-\\dfrac{1}{2a^2}$",
    option_3: "$-\\dfrac{1}{6a^2}$",
    option_4: "The limit does not exist.",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-h6rzy2ADzk2d.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-CREqGgw4UXYt.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-fQvVGgQrpCTw.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-86DJt5AN6XBY.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-Rju72AEvNAUp.png",
  },
  {
    question_slug: "limit-of-fraction-with-polynomials-no-calculator",
    question_name: "Limit of Fraction with Polynomials (No Calculator)",
    question_id: "cc2fff1d-e76b-4f65-8a65-a52fa49e7c0b",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvaluate the limit of:    \n\n$$\\lim _{ x\\xrightarrow { } \\infty }{ \\dfrac { 4{ x }^{ 2 }-9x+4 }{ { -x }^{ 3 }+{ x }^{ 2 }-5x+2 } } $$",
    option_1_id: "dfe3da6d-6cb1-473c-8e0f-1f6757c21646",
    option_2_id: "0b30d7d8-8bf4-4111-be65-d754d2cefff7",
    option_3_id: "72602932-0f14-4749-964c-acc66abf680f",
    option_4_id: "1b78d803-9fde-45c4-8c84-c33978f812c9",
    option_1: "$0$",
    option_2: "$4$",
    option_3: "$16$",
    option_4: "$3/2$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-uS3xTC7vQdPh.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-Gk4ZY4cvDGg1.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-7GqRShJt9PWG.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-XrRS4r44kYKx.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-pPhfZQFntJcD.png",
  },
  {
    question_slug: "piecewise-functions-continuity-and-limits-no-calculator",
    question_name: "Piecewise Functions, Continuity and Limits (No Calculator)",
    question_id: "9d59b81c-6ab1-428b-9312-0969c0ccfe2c",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhich of the following statements correctly describes graph below?  \n[s:03836305-438d-4c47-a54f-3e5de98c6cce:Continuous, Non Differentiable Fcn:image]",
    option_1_id: "00b47a00-b16d-4287-9e53-a3b5d8d47c0c",
    option_2_id: "de7f253a-a893-4c8f-9ef9-57a4a0bab7d2",
    option_3_id: "2120cb8a-6c0a-4370-a887-8b1a0884fb09",
    option_4_id: "e2fc30aa-bec7-485e-9d8d-a437ad6877a9",
    option_1:
      "$f(0)=0$    \n\n$ \\lim _{ x\\rightarrow 0 }{ f(x) } $ exists.  \n\nThe function is continuous at $x=0$.",
    option_2:
      "$f(0)=1$    \n\n$ \\lim _{ x\\rightarrow 0 }{ f(x) } $ exists.  \n\nThe function is continuous at $x=0$.",
    option_3:
      "$f(0)=1$    \n\n$ \\lim _{ x\\rightarrow 0 }{ f(x) } $ does not exist.  \n\nThe function is not continuous at $x=0$.",
    option_4:
      "$f(0)=0$    \n\n$ \\lim _{ x\\rightarrow 0 }{ f(x) } =0$  \n\nThe function is continuous at $x=0$.",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-GvTP6wJBzt7q.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-1Mv3vXvfcSx3.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-jJWK5Qjj5u5V.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-7yrdzTCgN3AP.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-4pG79DzazMcR.png",
  },
  {
    question_slug: "definition-of-vertical-asymptote-no-calculator",
    question_name: "Definition of Vertical Asymptote (No Calculator)",
    question_id: "cea96bfa-f5de-4ffa-86a2-366f7b6c27d2",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nGiven $\\mathop {\\lim }\\limits_{x \\to {3^ - }} f(x) = \\infty$. Which of the following must be true?\n\n\n>**I.** $f(x)$ has a horizontal asymptote at $y=3$  \n>**II.**  $f(x)$ has a vertical asymptote at $x=3$  \n>**III.**  $f(x)$ is unbounded    \n",
    option_1_id: "fd095a15-f7a5-4d02-b107-9645782f23eb",
    option_2_id: "b3fc2eae-3170-44ac-a522-c301f7443c43",
    option_3_id: "da4c444c-514c-476f-9308-9d1f585f32a2",
    option_4_id: "ee9f2e66-66ae-43a8-8d42-a688b6c9a749",
    option_1: "I only",
    option_2: "II only",
    option_3: "I and II only",
    option_4: "II and III only",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-SjWAJCuGyvXA.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-HxUeQb1ErrGg.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-7987jSmva9mz.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-DPhczEYKMDaN.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-kW8QHRnqgmK7.png",
  },
  {
    question_slug: "infinite-discontinuities-no-calculator",
    question_name: "Infinite Discontinuities (No Calculator)",
    question_id: "d3b87bad-67b5-482c-81bf-4a523d822ba4",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhich of the following statements is true for the given function?    \n\n$$y=\\frac{x^3+2}{27-8x^3}$$",
    option_1_id: "0c271d63-640d-40b1-8bd4-042e1030960e",
    option_2_id: "2d2e1d55-925b-4984-aec8-6819457d227f",
    option_3_id: "a5a299f3-57cc-47a4-ae1b-a6136393a502",
    option_4_id: "14334e46-5886-4e8a-a8b6-fb6df0d0e209",
    option_1: "The function is defined for all values of $x$.",
    option_2: "There is no horizontal asymptote for the graph of the function.",
    option_3:
      "The line $x=\\dfrac{3}{2}$ is a vertical asymptote for the function.",
    option_4:
      "The line $y=\\dfrac{1}{27}$ is a horizontal asymptote for the function.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-J916r4QcwvNT.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-U4vyRHTCtCQ8.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-u2xUAcQw74GP.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-nG3VBb2N8keV.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-89UT1T9HPN65.png",
  },
  {
    question_slug: "which-point-has-the-rate-of-change-no-calculator",
    question_name: "Which Point Has the Rate of Change? (No Calculator)",
    question_id: "d3c8b445-e262-4b12-a9ab-c31209bcb7f4",
    question_prompt:
      "At which point does the function have an approximate instantaneous rate of change of $0$?\n\n[s:4db1d67b-b670-456a-93b4-11c311621aff:Instantaneous Rate of Change Points:image]",
    option_1_id: "dd77201b-430d-4aec-bd66-003e8353c3dc",
    option_2_id: "d937dcdc-76dc-45d9-ab5c-34bf1029b135",
    option_3_id: "26e5d9f8-2e39-48f7-8745-6a60830a7845",
    option_4_id: "cce1a370-24b9-473a-bb65-8c9415e718a1",
    option_1: "Point $A$",
    option_2: "Point $B$",
    option_3: "Point $C$",
    option_4: "Point $D$",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-untxXzV5XKHt.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-c1rgkjZfBNcu.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-aCc7dPWv1YPU.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-5eFMSC8ZZhaM.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-6w3WaEHzMztr.png",
  },
  {
    question_slug:
      "which-representation-shows-the-one-sided-limit-no-calculator",
    question_name:
      "Which Representation Shows the One Sided Limit? (No Calculator)",
    question_id: "4ff20be2-eb4b-4b73-b66d-319d7739b78b",
    question_prompt:
      "Which representation shows $\\lim\\limits _{ x\\rightarrow { 3 }^{ + } }{ f(x) } =7$?",
    option_1_id: "c49d475c-af10-4796-b16b-ef0cc8f53804",
    option_2_id: "017510ce-7374-4296-b1f3-c4d85d7466c8",
    option_3_id: "e609f17a-0f40-4cab-96aa-fb987d1e2f4d",
    option_4_id: "f3966c55-dab4-4329-a80c-add46fac138d",
    option_1: "[s:b986e051-35d2-4363-a0b3-9a56712a8a47:Piecewise at 3:image]",
    option_2: "[s:ea84d7ec-601b-4335-8d15-b123351af8ee:f(3)=7:image]",
    option_3:
      "|   $x$  |   $f(x)$  |\n|:------:|:---------:|\n|  $2.9$ |  $1.899$  |\n| $2.99$ |  $1.995$  |\n|   $3$  | undefined |\n| $3.01$ |  $7.011$  |\n|  $3.1$ |  $7.155$  |",
    option_4:
      "|   $x$  |  $f(x)$ |\n|:------:|:-------:|\n|  $2.9$ | $6.734$ |\n| $2.99$ | $6.988$ |\n|   $3$  |   $7$   |\n| $3.01$ | $2.988$ |\n|  $3.1$ | $2.875$ |",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-hnDhEXwecr9p.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-Vq24xTHqJqQw.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-s4csuhU2GzBE.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-EJm99T8gRnnx.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-haJRXHxQBjjE.png",
  },
  {
    question_slug: "identifying-graph-lim-x-rightarrow-1-f-x-2-no-calculator",
    question_name:
      "Identifying Graph $\\lim_{x\\rightarrow 1}{f(x)=2}$ (No Calculator)",
    question_id: "21bae343-6419-4cae-b8d0-561454717a57",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhich graph of $f(x)$ has the following limit:    \n\n$$\\lim _{ x\\rightarrow 1 }{ f(x)=2 } $$",
    option_1_id: "d41c55c3-99b8-455e-8321-75396f1562e9",
    option_2_id: "bb8c3332-7560-4171-861f-d6d65d4bd74c",
    option_3_id: "c6d8c28f-f538-40fc-aa34-5e10bdac592d",
    option_4_id: "116d2ad3-8026-462a-bd23-637cd1730188",
    option_1:
      "[s:d5feb68c-ee75-4458-a4f5-822cd4f1703d:Limit as x approaches 1 DNE:image]",
    option_2:
      "[s:8a1bffd2-ceb8-474b-9569-95ed7a3ed59f:Limit as x Approaches 1:image]",
    option_3:
      "[s:12064a72-c649-4ca3-ad8d-d02ac5222583:Limit as x approaches 1 Continuous:image]",
    option_4:
      "[s:59a300ce-06e6-4b75-a5aa-cb068c0cc77d:Limit as x approaches 1 DNE2:image]",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-hMgHxu8d93Fr.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-FfDbPkuZjmpw.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-g81CRuWqzN18.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-fKJCC77pJGVj.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-vym5E7UCqAFY.png",
  },
  {
    question_slug: "limits-at-infinity-rational-function-no-calculator",
    question_name: "Limits at Infinity: Rational Function (No Calculator)",
    question_id: "0aafa066-839f-4e9e-9634-5f8d3fbe8d1c",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nCalculate the limit of:    \n\n$$\\lim _{ x\\xrightarrow { } \\infty }{ \\dfrac { x+9 }{ \\sqrt { 16{ x }^{ 2 }-2x } } } $$\n",
    option_1_id: "2b9ca3ea-5b76-403c-a61b-019a02a4a650",
    option_2_id: "f207bfc7-ec33-49d7-b318-ea29a0f328a6",
    option_3_id: "0fd15047-82cd-4c53-b3ce-acaa3144787d",
    option_4_id: "97a49824-6567-4241-a920-bf83bc989399",
    option_1: "$1$",
    option_2: "$\\dfrac { 1 }{ 4 } $",
    option_3: "$\\dfrac { 1 }{ 16 }$",
    option_4: "The limit does not exist.",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-aNc5fRaPv2wh.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-2qhh9yyRqWbP.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-ABKXmByjQZZB.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-zT3EF87yysHW.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-JSTy1B15WNUG.png",
  },
  {
    question_slug: "continuity-of-piecewise-cosine-functions-no-calculator",
    question_name: "Continuity of Piecewise Cosine Functions (No Calculator)",
    question_id: "d1146a07-067c-40e9-97ec-b99d5ff32cf0",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nDiscuss the continuity of:   \n$$f(x)=\\begin{Bmatrix} \\cos(x)\\quad  & x<-\\pi  \\\\ |\\cos(x)| & -\\pi \\le x\\le \\frac { \\pi  }{ 2 }  \\\\ { \\cos }^{ 2 }(x) & x>\\frac { \\pi  }{ 2 }  \\end{Bmatrix}$$",
    option_1_id: "89240d96-23da-4974-b39a-9c31bd2c0f1e",
    option_2_id: "65896b02-8cf1-4bb9-8c2a-e79596298214",
    option_3_id: "4d8af57a-bc0c-406d-958d-aa13900fc3bd",
    option_4_id: "bc3bf001-a9f8-4e55-bb9a-5f8a44a9eae9",
    option_1: "$f(x)$ is has a jump discontinuity at $x=\\dfrac {\\pi }{2}$.",
    option_2: "$f(x)$ is continuous on  $[-2\\pi , 0]$.",
    option_3: "$f(x)$ is continuous on $(-\\pi , \\pi ]$.",
    option_4: "$f(x)$ is continuous for all real numbers.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-av7MNDqt1WmG.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-dGy6jehKjPA5.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-cRxNGwUa3pjn.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-CWqPpFnf6ep9.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-PASjda2rwSku.png",
  },
  {
    question_slug: "does-the-limit-exist-no-calculator",
    question_name: "Does the Limit Exist? (No Calculator)",
    question_id: "16a6dcf3-b931-4cd4-9e23-1ae5fb24cad7",
    question_prompt:
      "Consider the graph below:\n\n[s:30b9ca75-01c4-471f-9c51-5a33d5e1974c:Discontinuous Graph:image]\n\nDoes $\\lim\\limits _{ x\\rightarrow 2 }{ f(x) } $ exist? Why or why not?",
    option_1_id: "b247494a-4b17-4d62-aded-05c7eb1c558b",
    option_2_id: "3e5d24c5-eecd-4ce7-9610-4d54afcb2d5d",
    option_3_id: "f63ccfef-e575-4a06-855c-902e292bad0d",
    option_4_id: "b852bda2-bb7b-4a57-8a5e-91f80db41e33",
    option_1: "**Yes** because $f(2)=2$.",
    option_2:
      "**Yes** because the function approaches a value from both the left and the right.",
    option_3:
      "**No** because the limit from the left is not equal to the limit from the right.",
    option_4: "**No** because the function is not continuous at $x=2$.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-AANFR4vkrXgK.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-3JT8MPMhGGm8.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-M1kznr73nu6k.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-eeZCMm2NYxEb.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-fCNn4rFQg1Hh.png",
  },
  {
    question_slug: "equal-limit-with-trig-functions-no-calculator",
    question_name: "Equal Limit with Trig Functions (No Calculator)",
    question_id: "d2fedf6e-ab18-4f09-9830-ef2795343ce8",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nIf the function $h$ is defined as $h(x)=\\dfrac{1-2\\sin^2{x}}{\\cos{x}-\\sin{x}}$, which of these is equivalent to $\\displaystyle\\lim_{x\\to\\frac{\\pi}{4}}h(x)$?",
    option_1_id: "e25d2c7b-c777-402e-9806-f66ea0a7da27",
    option_2_id: "4692b6ca-c469-4e2a-aa98-322719d537ff",
    option_3_id: "57ad25a1-04a9-4041-9665-8c5a1ae2b275",
    option_4_id: "96b33660-000f-4322-b758-0b776f823042",
    option_1:
      "$\\displaystyle \\lim_{x\\to\\frac{\\pi}{4}}(\\cos{x}-\\sin{x})$",
    option_2: "$\\displaystyle\\lim_{x\\to\\frac{\\pi}{4}}(\\cos{x}+\\sin{x})$",
    option_3: "$\\displaystyle\\lim_{x\\to\\frac{\\pi}{4}}(1-2\\sin^2{x})$",
    option_4:
      "$\\dfrac {\\displaystyle\\lim_{x\\to\\frac{\\pi}{4}}(1-2 \\sin^2{x})}{\\displaystyle\\lim_{x\\to\\frac{\\pi}{4}}(\\cos{x}-\\sin{x})}$",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-3s6P4hbAvUsk.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-yfYYP3EbFp7E.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-hKTggvURcAj6.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-aQVGWHTRwTgt.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-8XXEHwJmBqeZ.png",
  },
  {
    question_slug: "discontinuity-of-a-rational-function-no-calculator",
    question_name: "Discontinuity of a Rational Function (No Calculator)",
    question_id: "cd0e3884-5b63-4aa1-bf9b-7f987ccefbb3",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhich of these is true about the function $f(x)=\\dfrac{x^2+2x}{x^3+5x^2+6x}$?",
    option_1_id: "c062d8e1-d57c-48df-b93c-0e0d017f9448",
    option_2_id: "ab32726f-e143-4c4d-9b9e-1ef2e8868d59",
    option_3_id: "140cc91a-88da-40e1-a60e-0a83fac6f783",
    option_4_id: "416f8bab-8a4e-49d9-8ac3-9cd8864b6836",
    option_1:
      "There are removable discontinuities at $x=-3$, $x=-2$, and $x=0$.",
    option_2:
      "There are discontinuities due to vertical asymptotes at $x=-3$, $x=-2$, and $x=0$.",
    option_3:
      "There are removable discontinuities at $x=-2$ and $x=0$ and a discontinuity due to a vertical asymptote at $x=-3$. ",
    option_4:
      "There is a removable discontinuity at $x=-3$ and discontinuities due to vertical asymptotes at $x=-2$ and $x=0$. ",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-nwbV6X3NFRWm.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-znTy3X4T9k6e.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-bSa9N6Ea9Cys.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-YCzffGA2du17.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-t519VhExPHae.png",
  },
  {
    question_slug: "limit-existence-with-table-no-calculator",
    question_name: "Limit Existence with Table (No Calculator)",
    question_id: "4e513fb2-9c1e-420a-9fc9-afd731422f37",
    question_prompt:
      "|   $x$   |  $f(x)$ |\n|:-------:|:-------:|\n|  $-0.1$ | $1.899$ |\n| $-.001$ | $1.995$ |\n|   $0$   |   $2$   |\n|  $.001$ | $4.011$ |\n|   $0.1$  | $4.101$ |\n\nGiven the table above, does $\\lim\\limits _{ x\\rightarrow 0 }{ f(x) }$ exist? Why or why not?",
    option_1_id: "c241f2ec-2d28-4a97-9d94-4646297596dc",
    option_2_id: "50ecb61b-33d3-47fd-9e9e-2ffd2ecaeaaf",
    option_3_id: "6df48e39-7907-4379-a951-2c239c3e59ba",
    option_4_id: "46590ece-add9-4ab8-b018-8a1fa4e3f95b",
    option_1:
      "Yes, the limit exists becuase as $x$ gets closer and closer to $0$, $f(x)$ gets closer and closer to $2$. Therefore $\\lim\\limits _{ x\\rightarrow 0 }{ f(x) } =2$.",
    option_2:
      "Yes, the limit exists becuase $f(0)=2$. Therefore $\\lim\\limits _{ x\\rightarrow 0 }{ f(x) } =2$.",
    option_3:
      "No, the limit does not exist because there is a discontinuity at $x=0$.",
    option_4:
      "No, the limit does not exist because the function is not approaching the same value from both the right and left sides as $x$ approaches $0$.",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-D2aAgHFfCntr.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-vyNjVcKsBPeD.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-yySPs5Y8G6Be.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-swQCAN5GCgDz.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-JDa3K3BcXePU.png",
  },
  {
    question_slug: "continuity-within-a-domain-no-calculator",
    question_name: "Continuity Within a Domain (No Calculator)",
    question_id: "dcc43dac-0007-48c1-8d4e-f22048573689",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nChoose the function that is not continuous over the domain $x>0$.",
    option_1_id: "8f7844c2-e313-4736-9d1c-945d1de3b7bc",
    option_2_id: "c086603a-ddc4-4b89-a85a-89c2f51d9a32",
    option_3_id: "a14cb10f-ef0e-4a31-81bb-bdd91566f54a",
    option_4_id: "3e182d6f-040b-4527-91d2-dc476fd98613",
    option_1: "$y=\\dfrac{5-2x}{x^3+x^2+x+1}$",
    option_2: "$y=\\sqrt{x+2}$",
    option_3: "$y=\\ln{x}$",
    option_4: "$y=\\dfrac{x^2-25}{x^3-7x^2-14x+48}$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-qRHvMwNGxWJR.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-sV8wSCCRWDzj.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-KXMMDFBQNs79.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-Pyy3PHWJKgTw.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-R9h63fCAaypF.png",
  },
  {
    question_slug: "right-hand-limit-involving-a-radical-no-calculator",
    question_name: "Right Hand Limit Involving a Radical (No Calculator)",
    question_id: "9dc1eae2-6895-4e9a-b564-6dccd8360f45",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvaluate the following limit:    \n\n$$\\lim _{ x\\xrightarrow { } { 9 }^{ + } }{ \\dfrac { x-9 }{ \\sqrt { x-9 } } } $$\n\n\n\n\n\n",
    option_1_id: "70e1af56-fda1-4bdc-93db-2c2d7ae051d7",
    option_2_id: "102de1c9-ca1a-407b-ac0f-3baeb41f8870",
    option_3_id: "b70417ff-0afd-46eb-a053-2e9f4bc252dd",
    option_4_id: "f1b04c41-c23d-426c-9cb0-b0963da8ecf2",
    option_1: "$0$",
    option_2: "$1$",
    option_3: "$\\sqrt{3}$",
    option_4: "The limit does not exist.",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-k21C6zJrr1rt.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-87saDsTpfwJs.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-gjkxVtwfGJF5.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-YTgbfZMATrD9.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-sG8jCsEUESBg.png",
  },
  {
    question_slug: "one-sided-limit-x-to-2-no-calculator",
    question_name: "One-Sided Limit, $x$ to $2$ (No Calculator)",
    question_id: "9e266d63-28e1-4ba2-b0ef-74c0b2998296",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nCompute the limit $\\lim_{ x \\to2} \\; f(x)$ given:  \n\n$$f(x) = \\left\\{\n  \\begin{array}{ll}\n  (x+1)^2 & \\quad x \\leq 2 \\\\\n  x+7 & \\quad x > 2\n  \\end{array}\n  \\right.$$",
    option_1_id: "c410f935-655e-4b67-a290-33c3f1c173ee",
    option_2_id: "936d1d1d-b20e-40b2-9264-e2ea6c8218ea",
    option_3_id: "2b77ee66-355a-4b8e-b612-cb2bc9597a7a",
    option_4_id: "23ee7808-008f-4295-952d-b03088b8b034",
    option_1: "$0$",
    option_2: "$4$",
    option_3: "$9$",
    option_4: "Does not exist.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-nN8kjqN56R9d.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-sjME2ujG8ata.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-UuQkrZudjhHP.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-MHCNA8KrjjTR.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-64nNCMwa2TMH.png",
  },
  {
    question_slug: "find-the-limit-of-a-piecewise-function-no-calculator",
    question_name: "Find the Limit of a Piecewise Function (No Calculator)",
    question_id: "5b7752e8-e67a-431b-8d15-fe4fc4cf83c5",
    question_prompt:
      "Given:\n\n$$ f(x) = \\left\\{ \\begin{array}{ll} \\frac { { x }^{ 2 } }{ { x }^{ 2 }-16 } \\quad x\\le 0 \\\\ \\frac { { -x }^{ 2 } }{ { x }^{ 2 }-1 } \\quad x>0 \\end{array} \\right.$$\n\n...find $\\lim\\limits _{ x\\rightarrow 1 }{ f(x) } $.",
    option_1_id: "96cd3500-6ff1-4ef9-a145-c42e7fe879c6",
    option_2_id: "230feadf-4e14-464f-b8f7-b8d07f751ca3",
    option_3_id: "ece3c18a-2a60-4c1d-b3b5-743d552b7dab",
    option_4_id: "49e3edd8-ff2d-4db9-8b75-1748d6616b04",
    option_1: "Nonexistent",
    option_2: "$\\infty$",
    option_3: "$-\\infty$",
    option_4: "$0$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-zKD5RUQG9wfM.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-YQqFnd2aqHXC.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-TXd5QwHZbKH3.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-P4FEeyqUmJvf.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-kZwYkSvRYkx2.png",
  },
  {
    question_slug: "which-graph-fits-the-description-no-calculator",
    question_name: "Which Graph Fits the Description? (No Calculator)",
    question_id: "2984a9c7-77a5-475f-8904-221bcb38a9e9",
    question_prompt:
      "Identify the graph that fits the following description:\n\n* $\\lim\\limits _{ x\\rightarrow 1^{ + } }{ f(x) } =0$\n* $\\lim\\limits _{ x\\rightarrow 3 }{ f(x) } =1$\n* $f(1)=2$\n* $\\lim\\limits _{ x\\rightarrow 1^{ -} }{ f(x) } =3$",
    option_1_id: "7f99ec8d-b514-4989-a7b3-715786e4025d",
    option_2_id: "7af1002e-fd5c-49ce-98b3-8dbe4433616a",
    option_3_id: "169ee509-704b-426b-b052-1ec9395cd7fe",
    option_4_id: "37953306-0058-4775-a2b3-a72d5d768d97",
    option_1: "[s:1bd42df7-de4a-4562-85b2-64de722e92af:piecewise a:image]",
    option_2:
      "[s:e55fe7c8-8ddf-4881-83ad-ae9b2640b896:correct piecewise:image]",
    option_3: "[s:db4325ea-83fb-4256-8802-6e897091bead:piecewise b:image]",
    option_4: "[s:3704c987-9e01-4185-b4d8-ac397e39e2ec:piecewise d:image]",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-c94eT4maAmTM.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-2BbdqBMvEP4v.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-3Pbyk9scNRPJ.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-rz2qx3dptY9M.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-s4sM8YJfM4Pb.png",
  },
  {
    question_slug: "limits-of-continuous-functions-x-to-3-no-calculator",
    question_name: "Limits of Continuous Functions, $x$ to $3$ (No Calculator)",
    question_id: "968afc23-2a85-417d-a78c-94a65dd1392e",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nCompute the limit, $\\lim_\\limits{ x \\to -3 }3^{x}$.",
    option_1_id: "c410f935-655e-4b67-a290-33c3f1c173ee",
    option_2_id: "936d1d1d-b20e-40b2-9264-e2ea6c8218ea",
    option_3_id: "2b77ee66-355a-4b8e-b612-cb2bc9597a7a",
    option_4_id: "23ee7808-008f-4295-952d-b03088b8b034",
    option_1: "$27$",
    option_2: "$\\dfrac{1}{27}$",
    option_3: "$-\\dfrac{1}{9}$",
    option_4: "$-27$",
    key: "option_2_id",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-ShcUCz7n7ZjK.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-YSajjDncQYab.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-4bP9xuueebAe.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-FErUf9zyzNWS.png",
  },
  {
    question_slug: "compute-the-limit-no-calculator",
    question_name: "Compute the Limit (No Calculator)",
    question_id: "33e67fb6-f61f-4f98-8af5-8b0ee9c2320f",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvaluate:  $$\\lim_{x\\to2}  \\dfrac{x^2-4}{x-2}$$",
    option_1_id: "a36ed5a3-5521-474e-a731-6cc11580b6cb",
    option_2_id: "8ae336a9-086b-47a6-b99e-fe2e2c16b81c",
    option_3_id: "885c96f9-a457-4673-acca-669aea930440",
    option_4_id: "f2baf709-6980-41ba-8a36-9e05159c72fe",
    option_1: "$0$",
    option_2: "$1$",
    option_3: "$4$",
    option_4: "Nonexistent",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-hkMRMSp6Z11g.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-7cqTAxPWFv8b.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-WdBSxkRYJk2s.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-ZZ196QVD6bAC.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-sDwQwyH36gGZ.png",
  },
  {
    question_slug: "easy-limit-question-no-calculator",
    question_name: "Easy Limit Question (No Calculator)",
    question_id: "db6d7ce3-8fae-44d8-9f46-6df8afc962c8",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvaluate the following limit:    \n\n$$\\lim \\limits_{x \\to 3} \\dfrac{x^2-x-6}{x^2-5x+6}$$",
    option_1_id: "9d50742a-2ad2-492c-b300-ac74f96f4736",
    option_2_id: "86fd9bdc-1f9b-483b-ba9e-2101cb118f92",
    option_3_id: "cdd5c113-1e0b-406b-a9e7-ef9ad634330a",
    option_4_id: "988e8a7e-261a-4a1e-866a-fc2d36eb90b2",
    option_1: "$5$",
    option_2: "$4$",
    option_3: "$1$",
    option_4: "$0$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-bPsMcQYKZ8Se.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-D4RJ1Zzc3RJp.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-VUvVaGujk5SN.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-j6eNKja7B3Nd.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-u3BkVvmsEJWR.png",
  },
  {
    question_slug: "continuity-for-piecewise-functions-no-calculator",
    question_name: "Continuity for Piecewise Functions (No Calculator)",
    question_id: "00c8623f-a250-4b0a-84a3-8a9d60644870",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind the value of $c$ that makes $f(x)$ continuous at $x=2$:    \n\n$$ f(x) = \\left\\{ \\begin{array}{ll} x^2+c & x \\leq 2 \\\\ 2x-1 & x > 2 \\end{array} \\right.$$",
    option_1_id: "7987471a-40d9-46d3-ab67-0ec1b02f2c02",
    option_2_id: "abc9052c-0902-4f48-b457-2e88ba1fc72b",
    option_3_id: "9fd4f95e-1cb7-49f1-ac52-fe2197f57451",
    option_4_id: "6dd932c1-3e08-44c5-95bc-1e9543f9557d",
    option_1: "$\\sqrt{3}$",
    option_2: "$1$",
    option_3: "$-1$",
    option_4: "$0$",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-gG1PHjemRD2M.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-RCb81vbZQrZe.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-pMFXQWCmV8fz.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-77MmZwy83sfB.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-WZr2YxsVuPB6.png",
  },
  {
    question_slug: "requirements-for-continuity-no-calculator",
    question_name: "Requirements for Continuity (No Calculator)",
    question_id: "1b11603d-9c49-4a20-8cb7-50ffe3d64b52",
    question_prompt:
      "Which of the following is **NOT** required for $f(x)$ to be continuous at $x=c$?",
    option_1_id: "d4a5516b-7e74-4af1-abc8-fdb0a67432e3",
    option_2_id: "9ce020a8-2e10-4355-949e-8f6bbb78bee3",
    option_3_id: "2d933017-13ac-4860-8494-c8b24e64c302",
    option_4_id: "b06e6b7d-1774-4277-9828-6a4a60fa1577",
    option_1: "$f(x)$ is not a piecewise function",
    option_2: "$f(c)$ exists",
    option_3:
      "$\\lim\\limits _{ x\\rightarrow { c }^{ - } }{ f(x) } = \\lim\\limits _{ x\\rightarrow { c }^{ +} }{ f(x) } $",
    option_4: "$\\lim\\limits _{ x\\rightarrow { c } }{ f(x) } $ exists",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-tkvS8J2JxDs2.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-tqEBPjMbw2HW.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-QP52Rhbz6m22.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-xfcMKHsje4Ua.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-8Mz28TedS133.png",
  },
  {
    question_slug: "intermediate-value-theorem-no-calculator",
    question_name: "Intermediate Value Theorem (No Calculator)",
    question_id: "d33b65ff-9e48-43b2-a283-e534a2044ec5",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nConsider the  function $f\\left( x \\right) ={ x }^{ 3 }+1$  on the closed interval $[1,3]$.  \n\nAccording to  the Intermediate Value Theorem, there exists some number $c$ in the open interval $(1, 3)$ such that $f(c)=$",
    option_1_id: "9ac08dd2-00f5-46ac-baa9-0b5e25741910",
    option_2_id: "adf47424-48b1-4f9b-ab08-2389e1f22adf",
    option_3_id: "62c6de7c-9597-4503-82a9-c0d1fa6bf87c",
    option_4_id: "760d94f7-e858-454d-ac51-94a9303b798c",
    option_1: "$0$",
    option_2: "$1$",
    option_3: "$3.56$",
    option_4: "$1.79$",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-ubpP1UrDberJ.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-VtS4Nrfx3GBq.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-DvAwDXUw66Hk.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-wG1rbnu7uK5w.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-edA4CqPj72TY.png",
  },
  {
    question_slug: "limit-to-an-unknown-no-calculator",
    question_name: "Limit to an Unknown (No Calculator)",
    question_id: "09f165c9-1323-4187-bc93-28485f5fed33",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nGiven that $a\\neq 0$, evaluate the limit of:    \n\n$$\\lim _{ x\\xrightarrow { }{ \\frac {4}{a} }}{ \\dfrac { { a }^{ 2 }{ x }^{ 2 }-4ax-2{ a }^{ 2 }bx+8ab }{ ax-4 } } $$",
    option_1_id: "42fd1c5a-e9d2-441e-bf0b-0d9d33108d52",
    option_2_id: "06500284-7eeb-4769-8c40-b192ae02f44a",
    option_3_id: "ffb5c85d-171b-478b-8420-0042a810f237",
    option_4_id: "3fc97edd-a067-475e-83cb-6ee29e53e1cb",
    option_1: "$4-2ab$",
    option_2: "$-4-2ab$",
    option_3: "$-2-4ab$",
    option_4: "The limit does not exist.",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-PFP674KkvgkE.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-tpBt9EqK42bf.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-S3CYMGj5PDF4.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-yUVywkd19QY9.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-fxGY1xBwRwAG.png",
  },
  {
    question_slug: "making-equal-limits-no-calculator",
    question_name: "Making Equal Limits (No Calculator) | 1 of 1",
    question_id: "b8d1aa49-fa60-43c9-b20f-cee8b13732d3",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhich of these is equivalent to $\\displaystyle\\lim_{x\\to -1}\\left(\\dfrac{x+1}{x^2-3x-4}\\right)$?",
    option_1_id: "808c497a-4c80-45f2-82bc-7d48948a2625",
    option_2_id: "7ca03e06-9404-4642-a19e-6a2281a9a815",
    option_3_id: "f1c03dbb-7574-4e83-ad4f-1aed896179ba",
    option_4_id: "e6928a91-5db8-4e84-8fc7-44d1075babf5",
    option_1: "$\\displaystyle\\lim_{x\\to -1}(x-4)$",
    option_2: "$\\displaystyle\\lim_{x\\to -1}(x+4)$",
    option_3: "$\\displaystyle\\lim_{x\\to -1}\\left(\\frac{1}{x-4}\\right)$",
    option_4: "$\\displaystyle\\lim_{x\\to -1}\\left(\\frac{1}{x+4}\\right)$",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-fMfJhKWyWzt7.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-8ZNS3WyUgHSd.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-gNYqBH8QFaF9.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-BFP9MYcPgBbq.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-EkCdVJBd8BEe.png",
  },
  {
    question_slug: "limits-from-a-table-no-calculator",
    question_name: "Limits from a Table (No Calculator)",
    question_id: "0f7e4458-7da8-49bb-a1b2-c657d418b90e",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nThe table below gives the values of three functions, $h$, $j$, and $k$, near $x = 1$.  \n\nBased on the values given, for which of the functions does it appear that the limit as $x$ approaches 1 is 3?  \n\n   \n| $$x \\hspace{1.5cm}$$|0.7|0.8|0.9|1|1.1|1.2|1.3|  \n|--|--|--|--|--|--|--|--|    \n| $h(x)$|3.017|3.007|3.001|3|3.001|3.007|3.017|    \n| $j(x)$|-1|-1|-1|3|3|3|3|    \n| $k(x)$|2.977|2.988|2.998|undefined|2.998|2.988|2.977|\n\n",
    option_1_id: "94d3a401-b515-4590-972e-99772e188061",
    option_2_id: "26e5e705-396a-45ce-a422-a54c30b19845",
    option_3_id: "3ac0668c-bddb-494a-b4dc-9e73085c84f6",
    option_4_id: "ecbb8624-b607-4699-a8f3-e0d74174732c",
    option_1: "$h$ only.",
    option_2: "$h$ and $j$ only.",
    option_3: "$h$ and $k$ only.",
    option_4: "$h$, $j$, and $k$.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-yAUfXT1m92FW.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-FR5rssDJqP54.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-k2zFydP4ZAtb.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-aevY94B6g8tC.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-FJNqZyC5Q4mp.png",
  },
  {
    question_slug: "which-shows-the-instantaneous-rate-of-change-no-calculator",
    question_name:
      "Which Shows the Instantaneous Rate of Change? (No Calculator)",
    question_id: "bfcc9e42-bab9-4aec-98df-2666c531bd27",
    question_prompt:
      "Given the graph of $f(x)$:\n\n[s:5953f414-2496-49c9-a201-8d6ed8f84dd7:f(x) piecewise:image]\n\n...which of the following graphs show the instantaneous rates of change of $f(x)$ as a function of $x$?",
    option_1_id: "73ea4d79-5843-45f3-a706-ea8b7775a5ca",
    option_2_id: "d8f0eab0-a440-4537-af4e-a71fac47382b",
    option_3_id: "17a2a333-8ebd-4de5-a998-52dab463f484",
    option_4_id: "1a34c66a-3f9d-46c0-ac35-1ba1cb66edd5",
    option_1: "[s:afced152-965a-4216-a61a-420bb675c724:f(x) piecewise A:image]",
    option_2: "[s:8708f46f-1a4d-4814-90fb-69359ceb9da1:piecewise f(x) B:image]",
    option_3: "[s:78e866c0-cfd0-4d3c-9700-d168b93c3990:f(x) piecewise C:image]",
    option_4: "[s:add5fda4-0e3f-4eec-9ec8-c2e23401ca20:f(x) piecewise D:image]",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-jeN8s9P9qX2H.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-dV8gWrTjR3dN.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-vttYxCCfJKt2.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-3ws82nVzzTmE.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-u2xZEt92fDYG.png",
  },
  {
    question_slug: "range-of-a-function-no-calculator",
    question_name: "Range of a Function (No Calculator)",
    question_id: "5ce91db8-da8d-4f15-8d52-f9bf5a47cd98",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhich of the following indicates the range of the following function?    \n\n$$f(x)=|5\\sin{2x}|$$",
    option_1_id: "3312e6ea-2b4f-4dfc-a7b2-9555677d97c9",
    option_2_id: "2ac46d00-f75b-4c34-b716-c640308f7707",
    option_3_id: "a4c7f4d0-0973-4582-8faf-e2154b981f57",
    option_4_id: "a70957ef-683b-49b9-9ae3-163c2ce77208",
    option_1: "$[-5,5]$",
    option_2: "$[0,5]$",
    option_3: "$[0,10]$",
    option_4: "The function is unbounded.",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-Z3zvsm9MnFU1.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-trQ1CejH6whX.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-7N3ZhB1KRXWm.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-bwrxmj9FgNey.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-MsyvGbNewVaP.png",
  },
  {
    question_slug: "existence-of-limit-no-calculator",
    question_name: "Existence of Limit (No Calculator)",
    question_id: "6d731b34-f230-43ea-9f74-5f3b93463cbd",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nLet $f$ be defined as $ f(x) = \\left\\{ \\begin{array}{ll} k-\\sqrt[3]{7+x^2} & \\quad x \\lt 1 \\\\ \\ln x & \\quad x \\gt 1 \\end{array} \\right.$ for a constant, $k$.  \n\n\nFor what value of $k$ will $\\lim \\limits_{x \\to 1} f(x)$ exist?",
    option_1_id: "f0e31dc8-3fa5-451e-abb7-34b21ac8bdd2",
    option_2_id: "211a3c6c-6ab8-4223-b752-23879610e0ac",
    option_3_id: "e75b6dad-1aab-4582-8101-1cd56e8ee75d",
    option_4_id: "f74be3bd-a768-4fc3-9907-0f218a4e3284",
    option_1: "$3$",
    option_2: "$2$",
    option_3: "$1$",
    option_4: "$0$",
    key: "option_2_id",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-CtvcWN4DhB49.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-v7ZC5PAkntt5.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-9QnbpFmsST1C.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-w8eCyUkAETKc.png",
  },
  {
    question_slug: "graph-to-find-the-limit-calculator",
    question_name: "Graph to Find the Limit (Calculator)",
    question_id: "79689b1a-2ca0-4230-9e19-af333afae58b",
    question_prompt:
      "Find:\n\n$$\\lim\\limits _{ x\\rightarrow 3 }{ \\cfrac { { x }^{ 3 }-{ x }^{ 2 }-3x-9 }{ x-3 }  } $$\n\n...by graphing the function.",
    option_1_id: "064ed659-38a4-4b8f-89ce-60db0998cd8d",
    option_2_id: "3bd5dd58-b72d-4f50-974e-57ee37685bd2",
    option_3_id: "b6e55383-e9fc-4ed8-89b0-b5cc9a3ffe3e",
    option_4_id: "85c10725-90f8-4aa8-b0d2-bbe1d083613c",
    option_1: "The limit does not exist",
    option_2: "$18$",
    option_3: "$17$",
    option_4: "$0$",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-qtwJ2w717yfC.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-mKmcAFVzv3Gp.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-Db9mDBHrmu58.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-t4mrcwRG4hrX.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-QytX5qRsFYnE.png",
  },
  {
    question_slug: "the-limit-of-an-exponential-function-no-calculator",
    question_name: "The Limit of an Exponential Function (No Calculator)",
    question_id: "d8add6bd-daf6-48d4-a554-9902fe8a88b2",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind the limit of:    \n\n$$\\lim _{ x\\xrightarrow { } \\infty }{ \\dfrac { 3{ e }^{ x } }{ 9+2{ e }^{ 5x } } } $$\n\n\n",
    option_1_id: "87727b2b-f7cb-42a1-9e49-0a391e7ad6f7",
    option_2_id: "e229f52b-59e0-4816-82e7-adb6b4285859",
    option_3_id: "ebcf67a6-9626-47a2-9910-1c0b7cb8fa56",
    option_4_id: "58549e82-c017-4e67-b37b-007db4cf5d96",
    option_1: "$\\dfrac{ 1 }{ 3 }$",
    option_2: "$0$",
    option_3: "$\\dfrac{3}{2}$",
    option_4: "The limit does not exist.",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-Vce8fCpWu7f5.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-GDQz1eFHEs1S.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-SZS5bsb4WMkD.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-fNZRsgMFhRea.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-Ubutu6JSQE7v.png",
  },
  {
    question_slug: "limits-from-graphs-no-calculator",
    question_name: "Limits from Graphs (No Calculator)",
    question_id: "d7fef711-fab1-4a84-8b2f-7d1d29fa47fe",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nThe graph of $f(x)$ is shown in the figure below.  \n\nWhich of the following statements about $f(x)$ is true?  \n \n[s:7bb4244f-02ee-42a5-b62b-da179c605a15:TT_1.1_01_stem_01:image]",
    option_1_id: "7ec59eb4-cb6d-4815-aba7-81a4123370fb",
    option_2_id: "f77061d7-1e62-4a56-875e-ed2838b8bb7b",
    option_3_id: "02449c57-bd6c-426f-a20f-d6bd09e18234",
    option_4_id: "a6651650-0790-467b-b63c-dc3665639edc",
    option_1: "$\\lim\\limits_{x \\to a} f(x) = \\lim\\limits_{x \\to b} f(x)$",
    option_2: "$\\lim\\limits_{x \\to b} f(x) = 3$",
    option_3: "$\\lim\\limits_{x \\to a} f(x) = 2$",
    option_4: "$\\lim\\limits_{x \\to a} f(x)$ does not exist.",
    key: "option_3_id",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-GUPWqpsMasbM.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-a968aHu8Bubt.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-dm18GbW48zhF.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-3Xb26wANzvJz.png",
  },
  {
    question_slug: "limit-of-a-sum-calculator",
    question_name: "Limit of a Sum (Calculator)",
    question_id: "7c81162b-aef4-40bf-bf46-7ba378a5bab3",
    question_prompt:
      "**A calculator is allowed on this question.**\n\n| Function  |                          Limit                    |\n|:-------------:|:--------------------------------:|\n| $f(3)=5$  |$$\\lim_{x\\to 3} f(x)  = 5$$  |\n| $g(3)=6$ |$$\\lim_{x\\to 3} g(x) = 4$$  |\n\n\nThe table above gives selected function values and limit values for the functions $f$ and $g$.  Use these to evaluate this limit: $$\\lim_{x\\to 3} (2f(x)+ g(x))$$",
    option_1_id: "0124cdf0-3ce9-45e8-88f7-aaafbba450dd",
    option_2_id: "e617b69e-2e1c-4b42-8b8c-5c33c3759130",
    option_3_id: "93e144f6-2889-47b7-9a68-c84e58358747",
    option_4_id: "2212e5a1-7d4c-46fd-bc64-64ac20576305",
    option_1: "$14$",
    option_2: "$16$",
    option_3: "$18$",
    option_4: "$30$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-56nmAFGJkjp4.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-WmD6tgZqMDC5.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-xmTUwYHypdps.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-6RkG7rbrhZBg.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-RxYaaqy4ubdk.png",
  },
  {
    question_slug: "graphical-distinction-between-limits-no-calculator",
    question_name: "Graphical Distinction Between Limits (No Calculator)",
    question_id: "ccd026bc-a067-427c-a8f6-1fdb1ccba4c3",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFor the function $f(x)$ whose graph is shown, which of the following are equal?  \n \n[s:4dec5dfc-00bb-4fdf-ac42-10e8eb1d5234:TT_1.1_07_stem_01:image]  \n \n\n>**I**. $\\lim\\limits_{x \\to 2} f(x)$  \n\n \n\n>**II**. $\\lim\\limits_{x \\to 3} f(x)$  \n\n \n\n>**III**. $\\lim\\limits_{x \\to 4} f(x)$  \n\n \n\n>**IV**. $\\lim\\limits_{x \\to 6} f(x)$    \n",
    option_1_id: "7b99c024-0696-4380-8a3f-c6dfbbcf616e",
    option_2_id: "42873e31-400f-423b-8d8d-68f46f67eb84",
    option_3_id: "602c37a2-b96d-43e2-a929-8a50767e8795",
    option_4_id: "0a562a40-7031-4f37-b977-d9a1842c6cf0",
    option_1: "I, II, III, and IV.",
    option_2: "I, II, and IV only.",
    option_3: "II and IV only.",
    option_4: "I and III only.",
    key: "option_4_id",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-nacpQjTf7zdh.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-Xwtcwru2pmFH.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-2wvnAh23ShTp.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-QMHNzdrCb2Cb.png",
  },
  {
    question_slug: "which-graph-fits-no-calculator",
    question_name: "Which Graph Fits? (No Calculator)",
    question_id: "bdae2ade-9729-48ac-aac3-2b284847da6b",
    question_prompt:
      "Which graph meets the following requirements?\n\n* $\\lim\\limits _{ x\\rightarrow { 2 }^{ - } }{ f(x) } =-\\infty $\n* $\\lim\\limits _{ x\\rightarrow { 2 } }{ f(x) } =-\\infty $\n* $\\lim\\limits _{ x\\rightarrow { 7 }^{ + } }{ f(x) } =\\infty $\n* $\\lim\\limits _{ x\\rightarrow { 7 } }{ f(x) } $ does not exist",
    option_1_id: "414737aa-9fa7-4d5a-b944-a94f7063de72",
    option_2_id: "e61d0d18-9bf5-468f-bd97-e8466b4ef93e",
    option_3_id: "d58afde9-a637-4990-b879-b2c474f1f2ce",
    option_4_id: "0bc7896a-ab02-462b-8117-c66932870fdd",
    option_1:
      "[s:aa4c4dc7-2b1b-4707-b8d8-c6e6fcbe4654:A infinity piecewise:image]",
    option_2:
      "[s:fd54c5f6-039a-4e51-a533-0992db7b96fa:B infinity piecewise:image]",
    option_3:
      "[s:f74d35cf-f98c-4031-a30b-da73ec9149c6:Correct infinity piecewise:image]\n\n",
    option_4:
      "[s:11ee50ef-c1e3-43cd-b55d-53aba4a54e75:D infinity piecewise:image]",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-fPhzKWRwKwRb.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-NePvUGFUf7WM.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-c8ADv5WKdsWc.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-T9UDt8fhZ6UT.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-KVbtXaKq4Txy.png",
  },
  {
    question_slug: "horizontal-asymptotes-absolute-value-no-calculator",
    question_name: "Horizontal Asymptotes, Absolute Value (No Calculator)",
    question_id: "d234361c-52df-45ea-add6-8828aec0dfda",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind the horizontal asymptote(s) for the graph of the following function $f(x)=\\frac{|x-1|}{x+4}$.",
    option_1_id: "5360f810-bc9e-4756-b211-2db84da13589",
    option_2_id: "6c8271a5-4999-4d22-8338-9af833349bf7",
    option_3_id: "cc38fe0a-1e29-4371-98dd-d0ff496088ea",
    option_4_id: "cd0ad03c-66f4-4641-ada3-8f451216930f",
    option_1: "There are no horizontal asymptotes.",
    option_2: "$y=1$ only.",
    option_3: "$y=-1$ only.",
    option_4: "$y=1$ and $y=-1$.",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-YRnjgVEmtgd4.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-2qSn9EmgWskS.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-p1NYDk31DHvX.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-sCzHDgvZePzp.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-jdjK2yvJ2ftA.png",
  },
  {
    question_slug: "determining-continuity-no-calculator",
    question_name: "Determining Continuity (No Calculator)",
    question_id: "cdae9a80-3b35-4646-924e-ec0caaf17586",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nDetermine if the function $f(x)=\\dfrac{x-9}{\\sqrt{x}-3}$ is discontinuous at $x=9$. Include rationale.",
    option_1_id: "4b07243d-dc5e-4363-a232-d5de9ee0ccc1",
    option_2_id: "7fac90d6-f3e4-482d-b75c-c6b5a71ce070",
    option_3_id: "1b13c530-c7dc-4d81-aa7b-e9b45efc54de",
    option_4_id: "caa3d93d-278f-471d-99d8-4b07ce8e2c63",
    option_1: "It is discontinuous because $f(9)$ is undefined. ",
    option_2:
      "It is discontinuous because $\\displaystyle\\lim_{x\\to 9}f(x)$ is nonexistent. ",
    option_3:
      "It is continuous because $\\displaystyle\\lim_{x\\to 9}f(x) =  f(9)$.",
    option_4:
      "It is continuous at $x=9$ because all three conditions for continuity are met. ",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-cw5SdmkhXCgA.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-M8r59U1m8tCS.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-qa7VqB8Zes5T.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-jsXhcYcJ5hyb.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-ASNasUyAnGzM.png",
  },
  {
    question_slug: "algebraic-limit-with-absolute-value-no-calculator",
    question_name: "Algebraic Limit with Absolute Value (No Calculator)",
    question_id: "d96bd927-1ca1-4a92-9211-8227849547ae",
    question_prompt:
      "**No calculator is allowed on this question.**\n\n$\\lim \\limits_{x \\to 0} \\dfrac{2|x|}{3x}$ is:",
    option_1_id: "e99c6057-e8bf-42fb-ab8e-85b3642041c6",
    option_2_id: "7fd95127-5cb7-4941-ac6f-0f75bbda6c78",
    option_3_id: "8d259c66-3832-49e0-a72e-d8a353fa7bb4",
    option_4_id: "1376ed5b-00ab-4d7f-9b65-000f093d1395",
    option_1: "$\\dfrac{2}{3}$",
    option_2: "$0$",
    option_3: "$-\\dfrac{2}{3}$",
    option_4: "Nonexistent.",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-kgpuKUxpqtVB.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-aR6HrBckEvEc.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-txkXpP4Rr4pG.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-9D3udqEtz3Jm.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-brukJB4S377f.png",
  },
  {
    question_slug: "which-shows-the-limit-does-not-exist-no-calculator",
    question_name: "Which Shows the Limit Does Not Exist? (No Calculator)",
    question_id: "7c1fb631-0099-454b-a1c0-57abe1922c4b",
    question_prompt:
      "Which of the following shows that $\\lim \\limits_{ x\\rightarrow 0 }{ f(x) } $ does not exist?",
    option_1_id: "173a3df7-e9ff-4fe7-8250-2a86f72bba5b",
    option_2_id: "be65bfd5-1b80-4a53-bbb9-3f659872b7a2",
    option_3_id: "f5d2e415-014e-4242-9ccc-fd4d93af6e6e",
    option_4_id: "4523bd6d-9bac-4b39-989f-d062898fb945",
    option_1:
      "|   $x$   |   $f(x)$  |\n|:-------:|:---------:|\n|  $-0.1$ |  $4.333$  |\n| $-0.01$ |  $4.030$  |\n|   $0$   | undefined |\n|  $0.01$ |  $3.970$  |\n|  $0.1$  |  $3.727$  |",
    option_2:
      "[s:8844ac70-548e-405b-a85c-dcaef12cd06f:f(x) hole at (0, 1):image]",
    option_3:
      "|   $x$   |  $f(x)$ |\n|:-------:|:-------:|\n|  $-0.1$ | $1.899$ |\n| $-0.01$ | $1.995$ |\n|   $0$   |   $7$   |\n|  $0.01$ | $2.003$ |\n|  $0.1$  | $2.189$ |",
    option_4: "[s:95fdfd36-3c08-42cc-b447-820db210438a:Oscillating at 0:image]",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-jNVdnWsZmnja.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-pUCP3a5QEKFu.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-Ce4bybg7jRZ3.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-WUtfKwFCCcVS.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-3kPEMfPfzHgE.png",
  },
  {
    question_slug: "where-is-the-discontinuity-no-calculator",
    question_name: "Where is the Discontinuity? (No Calculator)",
    question_id: "a83fda57-a2e8-459b-8db0-3743e1bb923e",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nGiven the function $f$ below, determine which of the following statements is false.\n\n$$f(x)=\\begin{cases}2x-1\\text{   ,   }x<1\\\\2-x^2\\text{   ,   }1\\leq x < 2\\\\-2\\text{  ,   }x=2\\\\x^2-3x\\text{  ,  }2<x<3\\\\x+1\\text{  ,  }x\\geq 3\\end{cases}$$",
    option_1_id: "edb9fad3-4b95-4b2a-8ef9-6c2a6525fe24",
    option_2_id: "06b701ba-c3e0-42f6-8854-3018bc052469",
    option_3_id: "b40904b2-c753-4b98-aab4-c48845cda675",
    option_4_id: "75f556cd-17f0-4138-90b6-c41f0c1a61fe",
    option_1: "The function is continuous at $x=0$.",
    option_2: "The function is continuous at $x=1$.",
    option_3: "The function is continuous at $x=2$.",
    option_4: "The function is continuous at $x=3$.",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-wCa5zC3gujJd.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-GYWy27s37d8M.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-SVuBxZrFRBKy.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-utGkreBb6J2W.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-fcxu8r6qrVsn.png",
  },
  {
    question_slug: "limits-and-indeterminate-forms-no-calculator",
    question_name: "Limits and Indeterminate Forms (No Calculator)",
    question_id: "9036ff27-ea99-4110-81df-cf33fbac6fe1",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvaluate the limit:    \n\n$$\\lim_{ x \\to4}\\dfrac{x^4-7x^3+12x^2+4x-16}{x-4}$$",
    option_1_id: "2ba1f245-37ac-4178-b9ed-ace9c6d7eb90",
    option_2_id: "2b6643c7-5b91-4818-b507-02bf7c65a4a5",
    option_3_id: "59640439-c071-4ac5-9be0-7b117d75215b",
    option_4_id: "d4fefd32-3a07-482f-8a26-f745ae7247a7",
    option_1: "$16$",
    option_2: "$0$",
    option_3: "$20$",
    option_4: "Nonexistent.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-E4w65Fp2xcPC.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-fSQw6tTjQGJh.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-XQKp7H8Qpg6T.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-CEvtqhYCjuaF.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-3kyPZm7EU9cd.png",
  },
  {
    question_slug: "the-same-instantaneous-rate-of-change-calculator",
    question_name: "The Same Instantaneous Rate of Change (Calculator)",
    question_id: "21a8d0ea-235e-471c-a78a-65711294024a",
    question_prompt:
      "Which of the following functions have the same instantaneous rate of change when $x=1$ and $x=2$?",
    option_1_id: "f4468e5f-fa42-4835-b3e5-e73021d92be9",
    option_2_id: "c8e05f94-d6d1-447e-9bb9-c14426de4655",
    option_3_id: "795b0610-2f51-400a-8ca6-d047cd30726e",
    option_4_id: "d10d24c1-d1fb-450b-9add-d21b0da2a8c9",
    option_1: "$f(x)=3x$",
    option_2: "$f(x)={ x }^{ 2 }$",
    option_3: "$f(x)=\\sin { x } $",
    option_4: "$f(x)={ x }^{ 3 }$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-TFKptSk2Wawr.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-DEQbhA82mRVa.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-99ynTtH9Ge4k.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-8cdbJbZV6DFD.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-U2XEDg183nyT.png",
  },
  {
    question_slug: "does-squeeze-theorem-apply-no-calculator",
    question_name: "Does Squeeze Theorem Apply? (No Calculator)",
    question_id: "787f2fb2-5fc1-4fbe-9f64-884edb374e09",
    question_prompt:
      "**No calculator is allowed on this problem. **\n\nThere exists three functions who satisfy the relationship $m(x) \\leq n(x) \\leq p(x)$ over the entire real number system.  \n\nIf it is known that $\\displaystyle\\lim_{x\\to 5}m(x) = 1$ and $\\displaystyle\\lim_{x\\to 5}p(x)= 2$.  Determine $\\displaystyle\\lim_{x\\to 5}n(x)$.",
    option_1_id: "078a0595-0f43-495d-b033-e3ed9335000a",
    option_2_id: "caf45da3-6d74-4cfa-9962-a55e74e44aa4",
    option_3_id: "1205eddc-52bd-4f94-a997-901d45a405c2",
    option_4_id: "b3e8935a-5515-4042-afb4-af87402b9091",
    option_1: "$1$",
    option_2: "$1.5$",
    option_3: "$2$",
    option_4: "Cannot be determined from the given information",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-yPX4MeXQM8wV.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-F58RQcjD3DaS.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-7fWdhkgYX94j.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-MnBCdchzEYFv.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-b6uJRYVvzdkb.png",
  },
  {
    question_slug: "which-limit-exists-no-calculator",
    question_name: "Which Limit Exists? (No Calculator)",
    question_id: "a03ac36b-2ddc-4f2c-92b2-878e3fff957a",
    question_prompt:
      "Which table shows a function where $\\lim\\limits _{ x\\rightarrow 0 }{ f(x) }$ exists?",
    option_1_id: "f911ac3a-02ef-4a37-a9d6-eb8ebc3f83dc",
    option_2_id: "9a3f6b40-751b-4a88-8763-12772cedf27d",
    option_3_id: "5db91bbb-5902-42f8-aa5c-bd4e3191d91e",
    option_4_id: "1e16f233-c267-4b90-b076-ab40c4c664fe",
    option_1:
      "|   $x$   |  $f(x)$  |\n|:-------:|:--------:|\n|  $-0.1$ | $12.646$ |\n| $-0.01$ | $12.983$ |\n|   $0$   |   $13$   |\n|  $0.01$ |  $2.143$ |\n|  $0.1$  |  $2.548$ |",
    option_2:
      "|   $x$   |  $f(x)$  |\n|:-------:|:--------:|\n|  $-0.1$ |   $7.5$  |\n| $-0.01$ |  $7.999$ |\n|   $0$   |   $-3$   |\n|  $0.01$ |  $-3.01$ |\n|  $0.1$  | $-3.478$ |",
    option_3:
      "|   $x$   |  $f(x)$ |\n|:-------:|:-------:|\n|  $-0.1$ |  $5.9$  |\n| $-0.01$ | $5.999$ |\n|   $0$   |  $2.5$  |\n|  $0.01$ | $6.001$ |\n|  $0.1$  |  $6.1$  |",
    option_4:
      "|   $x$   |   $f(x)$  |\n|:-------:|:---------:|\n|  $-0.1$ | undefined |\n| $-0.01$ | undefined |\n|   $0$   |    $20$   |\n|  $0.01$ |  $20.114$ |\n|  $0.1$  |  $20.572$ |",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-KSDWDw1Zqbmt.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-krgH1r78p4dY.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-Q8N4gp8NFHVS.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-BzfUGgZcuBtp.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-NyVVNJbBTqJZ.png",
  },
  {
    question_slug: "radical-x-no-calculator",
    question_name: "Radical x (No Calculator)",
    question_id: "501e93af-4797-4add-8b1f-efca6af713ad",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvaluate the limit of:    \n\n$$\\lim _{ x\\xrightarrow { } 4 }{ \\dfrac { x-4 }{ \\sqrt { x } -2 } } $$",
    option_1_id: "1d9640d5-8722-4fab-a3e9-4c4958d74d02",
    option_2_id: "247d857c-31a7-4034-8e47-fe09765046d2",
    option_3_id: "78a6a913-1215-4f38-a008-05d9be5a6856",
    option_4_id: "8678aa23-2dfe-4087-9fef-3cc5fb336746",
    option_1: "$8$",
    option_2: "$4$",
    option_3: "$0$",
    option_4: "The limit does not exist.",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-5p7KdCrfraFU.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-NvTuBdPbz8Dj.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-VhJMJCmFYSKR.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-sPc86RySnesY.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-CqFhCUTEjFUJ.png",
  },
  {
    question_slug: "infinite-limits-of-trig-functions-no-calculator-bc-only",
    question_name:
      "Infinite Limits of Trig Functions (No Calculator) (BC Only)",
    question_id: "1d45df38-1bdc-4f4c-acfc-7bc918bb54cc",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nCalculate the limit:    \n\n$$\\lim _{ x\\rightarrow -\\infty  }{ \\dfrac { 3\\sin(x) }{ 2x }  } $$",
    option_1_id: "fc90cb7f-67c1-4684-9ef4-ec5ffc923d6e",
    option_2_id: "2faa8a7c-f8e6-49c6-baf5-7a6ca057569e",
    option_3_id: "f4d59f23-56d1-4138-a275-cc0c3ea410b2",
    option_4_id: "ca7e14be-e13c-452c-9cd6-19d8c579e91a",
    option_1: "$\\dfrac{3}{2}$",
    option_2: "$\\dfrac{-3}{2}$",
    option_3: "0",
    option_4: "The limit does not exist.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-KrEcXxEsY1pU.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-q5wXHSdtmycA.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-M6mAPsAzU8gd.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-J5MKYcrpvqPt.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-9MRczcmjYgKZ.png",
  },
  {
    question_slug: "compare-the-limits-no-calculator",
    question_name: "Compare the Limits (No Calculator)",
    question_id: "d3753d81-8b52-4946-a0cc-620cd00c27d3",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nThree functions have limits defined as $\\displaystyle\\lim_{x\\to1}f(x)=L$, $\\displaystyle\\lim_{x\\to1}g(x)=M$, and $\\displaystyle\\lim_{x\\to1}h(x)=N$.  Each of these functions is also shown below.  Which of the following inequalities is true?\n\n$$f(x)=\\begin{cases}2x^2+3x-3\\text{   ,   }x\\leq1\\\\1+2x-x^2\\text{   ,   }x>1\\end{cases}$$\n\n\n| $x$ |$0.58$|$0.82$|$0.95$|$0.99$|$1$|$1.001$|$1.01$|$1.12$|$1.4$|\n|------|-------|---------|----------|--------|------|----------|---------|---------|--------|\n|$g(x)$|$3.8$|$3.89$|$3.91$|$3.99$|$4$|$4.03$|$4.12$|$4.33$|$4.41$|\n\n\n[s:234cd99a-fa9e-42e0-bb83-4697fa5752c3:Graph Piecewise h:image]",
    option_1_id: "2e85e765-6d45-4d1b-8642-21561e36fd53",
    option_2_id: "549ae6a6-dcc7-4d1c-87ca-a4e148d5d876",
    option_3_id: "306ee6ab-a394-4f47-8699-612a2dfce4e5",
    option_4_id: "c7e56881-05dc-45b9-9129-dc85166902ac",
    option_1: "$L<M<N$",
    option_2: "$M<N<L$",
    option_3: "$M<L<N$",
    option_4: "$N<L<M$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-GYrxpnVwF8JR.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-5ESKpU29V4hz.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-6ND447bq3pdX.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-u8bYpFPtZTxt.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-FYdaHVBqtMtC.png",
  },
  {
    question_slug: "easy-algebraic-limit-no-calculator",
    question_name: "Easy Algebraic Limit (No Calculator)",
    question_id: "6d7c224b-40de-4598-b06e-31fe4fc919c9",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvaluate the following limit:    \n\n$$\\lim \\limits_{x \\to -2} x^2+3x-12$$",
    option_1_id: "b33fac84-fa41-4b41-b9d3-da4dd8f19e21",
    option_2_id: "e2284fbb-1f6d-411f-8748-96002d07094d",
    option_3_id: "836a0790-c763-43e2-b418-894b1d9a1929",
    option_4_id: "d4938693-e338-4212-bf58-b2112edcae4b",
    option_1: "$22$",
    option_2: "$-22$",
    option_3: "$-14$",
    option_4: "$14$",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-DxNBgeAfuM6T.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-P46fxsNshXTu.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-2knvH7QrqFN1.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-5tAYkPhSG4X9.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-5sUc1AAWjFTc.png",
  },
  {
    question_slug: "calculating-limits-of-piecewise-no-calculator",
    question_name: "Calculating Limits of Piecewise (Calculator)",
    question_id: "206f3d25-73c1-44ae-9a46-d6858a1cfb35",
    question_prompt:
      "**A calculator is allowed on this question.**\n\nConsider the function given by:    \n\n$$ f(x) = \\left\\{ \\begin{array}{lll} -x-1 &  x \\lt -1 \\\\ -x^2+1 &  -1< x < 1 \\\\ x + 1 &  x \\ge 1 \\end{array} \\right.$$  \n\nFor which values of $a$ does $\\lim \\limits_{x \\to a} f(x)$ **NOT** exist?",
    option_1_id: "927cacf8-fb47-41f0-b8fc-577d921b9ee7",
    option_2_id: "29fd5fdc-5ef5-4aea-9c12-ecbf26d2ee3f",
    option_3_id: "f19b11c1-64fc-44ac-bb1c-15d753a19658",
    option_4_id: "64eba04f-0427-4f0f-adc5-3a0fb75f156b",
    option_1: "$a = 1$ or $-1$ only.",
    option_2: "$a = -1$ only.",
    option_3: "$a = 1$ only.",
    option_4: "$\\lim \\limits_{x \\to a} f(x)$ exists for all values of $a$.",
    key: "option_3_id",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-sfMYeYDBzXHG.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-Qc359xB1UEyq.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-HseJvdWA77Hb.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-HMV81ngfVtqU.png",
  },
  {
    question_slug: "algebraic-limit-involving-trig-no-calculator",
    question_name: "Algebraic Limit Involving Trig (No Calculator)",
    question_id: "4db1006d-9166-4c14-bd05-45d321ca48ab",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvaluate the following:    \n\n$$\\lim\\limits_{x \\to {{\\frac{\\pi }{2}}^ + }} \\dfrac{{18}}{{3 - {e^{\\sec x}}}}$$",
    option_1_id: "a17a0f83-0e4e-4199-ab28-5cc66b24c78d",
    option_2_id: "f836148c-4320-49cf-bd0a-473078af9f61",
    option_3_id: "227e9a79-ed3e-4777-9c66-76303bdf7337",
    option_4_id: "f0f8bf52-5c98-43d7-a9ca-6d4ec35013bc",
    option_1: "$9$",
    option_2: "$6$",
    option_3: "$\\dfrac{9}{2}$",
    option_4: "Nonexistent.",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-c2GChuVP6VfH.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-Tn1VREkSbUrx.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-A49fN6eZwcTx.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-8dGuWxccZVJr.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-Duv1SvScBPjB.png",
  },
  {
    question_slug: "which-table-best-shows-the-limit-no-calculator",
    question_name: "Which Table Best Shows the Limit? (No Calculator)",
    question_id: "c8d4fc4e-bbc2-4a98-8deb-3d0664db3c63",
    question_prompt:
      "Select the table that best represents:\n\n$$\\lim\\limits _{ x\\rightarrow 1 }{ \\cfrac { { x }^{ 3 }-5{ x }^{ 2 }+4 }{ x-1 }   }$$ .",
    option_1_id: "b0f9f503-9e17-4454-bc94-1d73f6cccf11",
    option_2_id: "53bc66c6-39ed-4de0-877a-8359a6378a7f",
    option_3_id: "779da956-9283-42b2-ac04-8c62fc1da7da",
    option_4_id: "c01e9ef6-23a8-4d94-9a16-28b1f5fbe81c",
    option_1:
      "| $x$ | $\\cfrac { { x }^{ 3 }-5{ x }^{ 2 }+4 }{ x-1 } $ |\n|:--:|:-------------------------------:|\n| $-1$ |               $0$                |\n|  $0$ |                $-4$                |\n|  $1$ |            undefined            |\n|  $2$ |                $-6$                |\n|  $3$ |                $-4$                |",
    option_2:
      "|  $x$  | $\\cfrac { { x }^{ 3 }-5{ x }^{ 2 }+4 }{ x-1 } $ |\n|:---:|:-------------------------------:|\n|  $0$  |                $-4$                |\n|  $0.5$ |               $-5.25$               |\n|  $1$  |            undefined            |\n| $1.5$ |               $-6.25$               |\n|  $2$  |                $-6$                |",
    option_3:
      "|  $x$  | $\\cfrac { { x }^{ 3 }-5{ x }^{ 2 }+4 }{ x-1 } $\n|:---:|:-------------------------------:|\n|  $0.5$  |                $-5.25$                |\n|  $0.75$ |               $-5.6875$               |\n|  $1$  |            undefined            |\n| $1.25$ |               $-6.1875$               |\n|  $1.5$  |                $-6.25$                |",
    option_4:
      "|  $x$  | $\\cfrac { { x }^{ 3 }-5{ x }^{ 2 }+4 }{ x-1 } $\n|:---:|:-------------------------------:|\n|  $0.9$  |                $-6.79$                |\n|  $0.99$ |               $-6.9799$               |\n|  $1$  |            undefined            |\n| $1.01$ |               $-7.0199$               |\n|  $1.1$  |                $-7.19$                |",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-Yd78fcBxPUUZ.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-D1FwXXNFc6ND.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-j6s7sCGP48kA.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-JeWK9JDQDpNQ.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-cFNMp9J5hrHq.png",
  },
  {
    question_slug: "easy-limit-of-exponential-function-no-calculator",
    question_name: "Easy Limit of Exponential Function (No Calculator)",
    question_id: "0497ddf9-ed4d-47fd-a59b-ff5062b849cd",
    question_prompt:
      "**No calculator is allowed on this question.**\n\n$\\lim \\limits_{x \\to 0} e^{2x}-1$ is:",
    option_1_id: "da17a641-6dd0-4ed1-a9da-938c6300e2d2",
    option_2_id: "ac53c88f-c411-44b1-97b8-6656f4afc934",
    option_3_id: "34d323bc-9543-4f77-81ff-34adc8673cc5",
    option_4_id: "05a16e57-9815-47db-adb6-0f56a314d750",
    option_1: "$e^2$",
    option_2: "$2$",
    option_3: "$1$",
    option_4: "$0$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-F4cxgkhUz3U5.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-9TVfjMdVbh44.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-KHsBaJCwyf8t.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-k2shRSJkyDHH.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-BTQzvnkaxZdV.png",
  },
  {
    question_slug: "limits-at-a-removable-discontinuity-point-no-calculator",
    question_name: "Limits at a Removable Discontinuity Point (No Calculator)",
    question_id: "b12f17bf-c867-4778-af2b-341d92af8ee5",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nGiven the following limit function:    \n\n$$\\lim_{x \\to 5}\\frac{x^2-2x+c}{x-5}$$  \n\nFor what value of $c$ does the limit exist?  \n\n(No calculator)",
    option_1_id: "aa3b0c7f-c47b-4f1e-8c25-e6c2bd372aab",
    option_2_id: "6b41aa3d-5424-432a-9b4b-01bed12c05f6",
    option_3_id: "3b1c6b48-7bdd-49a3-9f17-8a9ce782522c",
    option_4_id: "eead4da2-7580-47d7-9ae2-281720a56a1e",
    option_1: "$-5$",
    option_2: "$-15$",
    option_3: "$0$",
    option_4: "$3$",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-yf35GEQmqUus.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-Z16ctW37buX8.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-4ksCcCpAf3Xb.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-hFkvZ6MFFTn1.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-4HvaTmetWxS1.png",
  },
  {
    question_slug: "estimate-the-average-rate-of-change-calculator",
    question_name: "Estimate the Average Rate of Change (Calculator)",
    question_id: "8c3c54d2-9ead-4b45-bcd2-387f88d147a1",
    question_prompt:
      "What is the average rate of change of $f(x)={ x }^{ 3 }$ on the interval $0\\le x\\le 3$?",
    option_1_id: "abce05d6-940b-44eb-b6ce-0554c103f327",
    option_2_id: "c98dc2db-ca7a-43f5-904a-9bf95643dd61",
    option_3_id: "106481c9-7494-4928-971e-501d75d8ac9d",
    option_4_id: "9d8b463c-4776-43f6-a4e8-e8db0cf09ef2",
    option_1: "$-9$",
    option_2: "$27$",
    option_3: "$9$",
    option_4: "$-27$",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-5DccXbcQjYHw.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-dBH3atwpt2bv.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-cDSaxZ75bbRS.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-43HFXVx7yab3.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-qCVTSHvmUNPY.png",
  },
  {
    question_slug:
      "comparing-rates-of-change-approaching-infinity-no-calculator",
    question_name:
      "Comparing Rates of Change Approaching Infinity (No Calculator)",
    question_id: "cdd79793-7cca-4d3d-9910-2eb5dde86339",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvaluate:\n\n$$\\lim _{ x\\rightarrow \\infty  }{ \\dfrac { { x }^{ 101 } }{ { e }^{ x } }  } $$",
    option_1_id: "b99197eb-b9ca-4957-b990-a8c31dff46cd",
    option_2_id: "a06162f3-a2cb-486b-b293-04a9bd17795a",
    option_3_id: "7194c92e-6732-4068-bad8-1277c8c471bc",
    option_4_id: "09fb073d-6f4a-4c82-a733-1ed6cff146f5",
    option_1: "$0$ ",
    option_2: "$1$",
    option_3: "$101$",
    option_4: "$\\infty$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-rfn2GfG4HEBr.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-Zs5ZaFw8FFJG.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-QttMCjv2hE5D.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-uZTEUy8RmAwp.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-65FVxG5bDXV2.png",
  },
  {
    question_slug: "continuity-from-a-graph-no-calculator",
    question_name: "Continuity from a Graph (No Calculator)",
    question_id: "42d5e993-dc1e-48fb-ab77-44d521c4ed9e",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nDiscuss the continuity​ of the graph of $f(x)$:  \n\n[s:4b8307ed-29f7-4e05-a042-86a0cbcf3324:Absolute Values:image]\n",
    option_1_id: "b88be061-7a99-48fe-8c2e-4d9e05458b3e",
    option_2_id: "c71330a8-4bbc-41ea-a1d5-3989b056782a",
    option_3_id: "f5d702bc-803c-4cfa-a005-79f3a8d16848",
    option_4_id: "1af4bfa0-0675-4739-9aad-cc6d51688939",
    option_1: "$f(x)$ is continuous for all $x$.",
    option_2:
      "$f(x)$ is continuous for all $x$ such that  $x\\neq 0$ and $x\\neq 2$.",
    option_3: "$f(x)$ is continuous for $x\\neq 0$.",
    option_4: "$f(x)$ is continuous for $x\\neq 2$.",
    key: "option_4_id",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-X2Sxj18a8xkV.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-7udAvcNtSkx7.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-VeCrx3gSyKWR.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-THyu5AGYcdNP.png",
  },
  {
    question_slug: "upper-and-lower-bounds-no-calculator",
    question_name: "Upper and Lower Bounds (No Calculator)",
    question_id: "d2892d96-17c0-40d9-ad07-d039d1ad48f3",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhich of the following functions has a lower bound but no upper bound?",
    option_1_id: "c5ded748-d990-4059-abf6-6a54d8ad1e5a",
    option_2_id: "bd581d04-9617-41cb-953e-0f1d6b885dce",
    option_3_id: "3047f421-a47f-4e87-acc2-3b834cc6a9aa",
    option_4_id: "d882b8ae-749a-4392-a3e3-5bbfbb4a4543",
    option_1: "$y=e^{x^2}$",
    option_2: "$y=\\sin{x}$",
    option_3: "$y=\\dfrac{1}{x}$",
    option_4: "$y=\\ln{x}$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-kZ19Hg4WjUbJ.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-dYKCqFhtnF84.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-xbB2PfAx4wvr.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-7tb7Mqxdqgtm.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-GJjQVjPy9tV4.png",
  },
  {
    question_slug: "find-the-limit-given-three-requirements-no-calculator",
    question_name: "Find the Limit Given Three Requirements (No Calculator)",
    question_id: "662c5dc9-2ad2-4315-b335-61cdee013b76",
    question_prompt:
      "Find $\\lim\\limits _{ x\\rightarrow 2 }{ f(x) } $ given the following information:\n\n* $f(x)$ is continuous at $x=2$\n* $f(2)=4$\n* $\\lim _{ x\\rightarrow { 2 }^{ - } }{ f(x) } = \\lim _{ x\\rightarrow { 2 }^{ + } }{ f(x) } $",
    option_1_id: "4100b050-c9a3-424b-8b3e-b759492001fa",
    option_2_id: "2026a409-4210-4891-9da6-3e246e9a6ff6",
    option_3_id: "ef717b92-468f-408d-a634-6a38c44758b7",
    option_4_id: "7a3f3200-6fc0-4bbc-a2ad-9f543f1f79fa",
    option_1: "Nonexistent",
    option_2: "Not enough information",
    option_3: "$\\lim\\limits _{ x\\rightarrow 2 }{ f(x) }=2$",
    option_4: "$\\lim\\limits _{ x\\rightarrow 2 }{ f(x) }=4$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-M4qfjxS795FQ.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-5kyM77KDRuup.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-yCB11D8nBxaZ.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-ABvznHAqVTf2.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-97D2fASmEka6.png",
  },
  {
    question_slug:
      "discrete-point-function-limits-and-continuity-no-calculator",
    question_name:
      "Discrete Point Function, Limits and Continuity (No Calculator)",
    question_id: "9b5639ba-006c-47a4-97e7-c6e705bc6080",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhich of the following statements accurately describes the graph of $f(x)$?  \n [s:047959bf-d608-43e0-835a-aba474141a97:Graph Points 1:image]",
    option_1_id: "00b47a00-b16d-4287-9e53-a3b5d8d47c0c",
    option_2_id: "de7f253a-a893-4c8f-9ef9-57a4a0bab7d2",
    option_3_id: "2120cb8a-6c0a-4370-a887-8b1a0884fb09",
    option_4_id: "e2fc30aa-bec7-485e-9d8d-a437ad6877a9",
    option_1:
      "$f(1)=2$    \n\n$\\lim _{ x\\rightarrow 1 }{ f(x)}=2$    \n\n$f(x)$ is not continuous on  $[0.5, 1]$.",
    option_2:
      "$f(1)$ does not exist    \n\n$\\lim _{ x\\rightarrow 1 }{ f(x)=f(1) }$    \n\n$f(x)$ is not continuous on  $[0.5, 1]$.",
    option_3:
      "$f(1)=2$    \n\n$\\lim _{ x\\rightarrow 0.5 }{ f(x) }$ does not exist.    \n\n$f(x)$ is not continuous on  $[0.5, 1]$.\n",
    option_4:
      "$f(1)=2$    \n\n$\\lim _{ x\\rightarrow 0.5 }{ f(x) }$ does not exist.    \n\n$f(x)$ is continuous on  $[0.5, 1]$.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-A6TNwChw3tdp.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-dtt5YFuccupX.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-Q42ez56X88Kt.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-mR3xQnpJMStD.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-jPeHqCD6fWT6.png",
  },
  {
    question_slug: "limit-for-a-piecewise-function-no-calculator",
    question_name: "Limit for a Piecewise Function (No Calculator)",
    question_id: "547a60e0-a8cb-48e4-a52e-90e75d3fa180",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nGiven the function $f$ below, determine $\\displaystyle\\lim_{x\\to5}f(x)$.\n\n$$f(x)=\\begin{cases} \\dfrac{(x^2-25)\\cos{(\\pi x)}}{\\lvert x+3\\rvert}\\text{ ,  } x\\neq5\\\\2\\pi \\text{ ,  } x = 5\\end{cases}$$",
    option_1_id: "89d92ad6-455b-4ada-9e82-7c17addc8c09",
    option_2_id: "58d2a665-5948-47cc-a2d5-acb6ae9aeb14",
    option_3_id: "7a6e1bb3-e790-4861-85cf-1026ce38a121",
    option_4_id: "27fc7e78-c382-46a2-99c8-d654e2f6c70e",
    option_1: "$2\\pi$",
    option_2: "$0$",
    option_3: "$-\\frac{1}{8}$",
    option_4: "Nonexistent",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-9wM8RPGCu3kw.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-sprS84jugbT5.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-SU5PBeyUqQkk.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-M8bRJ42g1qE5.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-3Q5g8EYKDdQ7.png",
  },
  {
    question_slug: "joints-of-piecewise-function-no-calculator",
    question_name: "Joints of Piecewise Function (No Calculator)",
    question_id: "f72e97d4-4236-4bac-907b-3629abcc89a8",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nIf $ f(x) = \\left\\{ \\begin{array}{ll} \\ln x^3 & \\quad 0 \\lt x \\leq 2 \\\\ x^2 \\ln 2 & \\quad 2 \\lt x \\leq 4 \\end{array} \\right.$ then, $\\lim \\limits_{x \\to 2} f(x)$ is:",
    option_1_id: "d66734ec-3a6a-45e4-9d6c-c10411feda0f",
    option_2_id: "1902fb6c-937b-467a-ba60-2f65bf77d175",
    option_3_id: "c3c3a4e1-873e-41ec-8d03-c18c5b021982",
    option_4_id: "782977e3-8c83-4c6a-90cb-fcb784e2b213",
    option_1: "nonexistent",
    option_2: "$\\ln 2$",
    option_3: "$\\ln 8$",
    option_4: "$\\ln 16$",
    key: "option_1_id",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-1TAepJXNJxhk.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-5agmxFMmsEtb.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-qw6FNBqXqK3w.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-bCqZd7yXTeyX.png",
  },
  {
    question_slug: "creating-a-continuous-function-no-calculator",
    question_name: "Creating a Continuous Function (No Calculator)",
    question_id: "4fa9f730-3122-49a1-9bf5-16badcffed25",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhat function value must be assigned for $f(2)$ so that the following function is a continuous function for all real numbers?    \n\n$$f(x)=\\dfrac{x^2-6x+8}{x-2}$$    \n\n$$\\text{If }x \\neq 2$$",
    option_1_id: "c73b084d-f404-4f53-8d69-0319e0b75da8",
    option_2_id: "8ea6d7cc-f797-43fc-83a2-44bf3493bd0c",
    option_3_id: "dcfbd55b-4560-47b7-a0da-45a8aec7005e",
    option_4_id: "8d414b92-79a3-4678-9b41-b3c5ca74f305",
    option_1: "$-2$",
    option_2: "$4$",
    option_3: "$0$",
    option_4: "$2$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-3j6dDsdqAgUe.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-M2rhaq1UwxGB.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-JKztpDe61ftY.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-n4rdDGtA1rZp.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-HWWWNEeFTh5u.png",
  },
  {
    question_slug: "algebraic-limit-with-factoring-no-calculator",
    question_name: "Algebraic Limit with Factoring (No Calculator)",
    question_id: "aeea87ad-78a4-49b8-9a79-5bbef1dce7df",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvalulate the following limit:    \n\n$$\\lim \\limits_{x \\to 3} \\dfrac{x^2+2x-15}{x-3}$$",
    option_1_id: "7173a093-fb65-496c-9245-db0ce9ade985",
    option_2_id: "878ba743-798c-49e0-96fc-5a6a832e768c",
    option_3_id: "1352f6bb-0874-482e-9445-862d280b5440",
    option_4_id: "a83a9ea8-3395-46b9-8103-d7f0931f7079",
    option_1: "Nonexistent.",
    option_2: "$\\infty$",
    option_3: "$-\\infty$",
    option_4: "$8$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-hvDQVXbzST61.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-WWMz5kDz3eXP.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-7YnaYSyAYVUa.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-swKh7sY7GjAK.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-bmybeqmcX1De.png",
  },
  {
    question_slug: "limits-at-different-points-no-calculator",
    question_name: "Limits at Different Points (No Calculator)",
    question_id: "5d9140b2-1c65-4740-bc8a-cca2e5c571cd",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nChoose the function for which all of the following properties are true.\n\n\n>**I**. $\\lim_{x \\to0} \\: f(x)=-\\frac{1}{8}$  \n\n>**II**. $\\lim_{x \\to2} \\; f(x)=0$  \n\n>**III**. $\\lim_{x \\to -4} f(x) \\;$ is nonexistent    \n",
    option_1_id: "0b495759-2595-4765-a125-d60beb38fdb5",
    option_2_id: "799df763-bcc6-43b0-b09b-6ac38b650524",
    option_3_id: "fa2de90d-d2b4-47ba-9164-d5dcf900b354",
    option_4_id: "94aeab93-40db-474c-ba4f-2290f8cebb4f",
    option_1: "$f(x)=\\dfrac{x-1}{x^2+8x+8}$",
    option_2: "$f(x)=\\dfrac{x-2}{x^2+8x+16}$",
    option_3: "$f(x)=\\dfrac{x^2-2}{4x+16}$",
    option_4: "$f(x)=\\dfrac{x-2}{x^2-16}$",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-Vf2v6T6tapU4.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-CyXJRTTHSe1d.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-HTCcdaqTnX5W.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-pufx4hcT7Hau.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-3yjJYpADtH6x.png",
  },
  {
    question_slug: "infinite-limits-no-calculator",
    question_name: "Infinite Limits (No Calculator)",
    question_id: "fcd938ac-fd23-41b7-b931-4eb2eb9b85c5",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nIf $\\mathop {\\lim }\\limits_{x \\to a^-}{ f\\left( x \\right)} =\\infty$ and $\\mathop {\\lim }\\limits_{x \\to a^+} { f\\left( x \\right)}=-\\infty$, then ",
    option_1_id: "e1cd648d-50a6-444d-ab7a-e26f4e4f92f0",
    option_2_id: "5747579e-ddfd-4e39-aa40-8b402ee4f975",
    option_3_id: "c32a83ee-69f4-4c79-934b-448fa2eee1f7",
    option_4_id: "de0a1cd3-cae0-4787-bc3b-59ba28d44433",
    option_1: "$y=a$ is a horizontal asymptote of $f\\left( x \\right)$.",
    option_2: "$x=a$ is a vertical asymptote of $f\\left( x \\right)$.",
    option_3: "$f(x)$ is continuous at $x=a$ .",
    option_4: "$f(a)$ is undefined.",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-CYRV2517MvaQ.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-51GEUaTQpRjs.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-9CXwey2DWhSA.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-ATv7fBwZjsNC.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-U1GhfXGAhAuv.png",
  },
  {
    question_slug:
      "continuity-for-piecewise-functions-statements-no-calculator",
    question_name:
      "Continuity for Piecewise Functions, Statements (No Calculator)",
    question_id: "32bf2b69-b9f4-421f-bbdb-0b65bfd95c75",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nGiven:    \n\n$$ f(x) = \\left\\{ \\begin{array}{ll} x+1 & 0 \\leq x \\leq 1 \\\\ (x-2)^2+1 & 1< x < 2 \\\\ 2 & x \\ge 2\\end{array} \\right. $$  \n\nWhich statement is TRUE?",
    option_1_id: "4a3b54b1-2f6c-414a-b9f0-77ace70898b9",
    option_2_id: "8a1ec27e-a02b-4bb6-9af5-d9c6058f6df9",
    option_3_id: "bc038a31-ca98-4b49-b54c-9b12adb6f074",
    option_4_id: "5e683ee4-9a15-4f26-8ab7-bd8549bfe32f",
    option_1: "$f$ is discontinuous only at $x=2$.",
    option_2: "$f$ is continuous for all $x \\geq 0$.",
    option_3: "There is a vertical asymptote at $x=2$.",
    option_4: "$f$ is continuous for $0 \\leq x \\leq 2$.",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-Kd5ta9C7EChU.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-h2GV3W2Tx436.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-9KBMxt1YZvK8.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-g5aVEX4Tgdct.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-rfaF8ru6tG5y.png",
  },
  {
    question_slug: "piecewise-polynomial-functions-no-calculator",
    question_name: "Piecewise Polynomial Functions (No Calculator)",
    question_id: "df049b64-087d-46a5-87cb-8148667c129b",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nLet:    \n\n$$ f(x) = \\left\\{ \\begin{array}{ll} x^2-3 &  x \\lt -1 \\\\ -\\frac{1}{2}x+2 &  x \\geq -1 \\end{array} \\right. $$  \n\nWhat is:    \n\n$$\\lim \\limits_{x \\to -1^+} f(x)?$$",
    option_1_id: "5dd8aea1-5154-4d37-869f-51cb46e30d92",
    option_2_id: "8ef18587-7273-44c1-8502-602f2de570d0",
    option_3_id: "9850283d-9f0f-4870-ae05-439b2e3dbf27",
    option_4_id: "12fbc978-e43c-4de7-a5c7-509286a002fe",
    option_1: "$\\dfrac{3}{2}$",
    option_2: "$-2$",
    option_3: "$3$",
    option_4: "$\\dfrac{5}{2}$",
    key: "option_4_id",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-Ys8YSB8NPcuR.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-yN3Eg3BbvcD3.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-CFT9FcWZfhYk.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-qudBSJ1yyJuU.png",
  },
  {
    question_slug: "what-is-needed-for-ivt-calculator",
    question_name: "What is needed for IVT? (Calculator)",
    question_id: "8ddac16b-5bac-4863-b6b1-512cd96273c8",
    question_prompt:
      "**A calculator is allowed on this question.**\n\nFor a function $f$, it is known that $f(0)=12$ and $f(4)=-2$.  Which of the following statements, if true, would be individually sufficient to conclude that there exists a number $c$in the interval $[0,4]$ such that $f(c)=0$?\n\n[ol-type=I]\n1. $f$ is defined for all $x$ in the interval $[0,4]$\n2. $f$ is decreasing on the interval $[0,4]$\n3. $f$ is continuous on the interval $[0,4]$ \n[/ol-type]",
    option_1_id: "706a8acc-92aa-4baa-8937-abe182c0431f",
    option_2_id: "d519ae03-5a0e-43c1-8424-428cf0e85218",
    option_3_id: "91e04489-472f-40bd-9ee8-3925a834b8f3",
    option_4_id: "bccbae09-0a06-47a5-9375-44d8298a29ad",
    option_1: "I only",
    option_2: "II only",
    option_3: "III only",
    option_4: "II and III only",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-BwU6Vye6m9Z7.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-zVQUGFCeQcs8.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-sqZZCUscTX8B.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-stP7zgrXZyhp.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-69YtHrkjHaJU.png",
  },
  {
    question_slug: "limit-involving-opposite-factors-no-calculator",
    question_name: "Limit Involving Opposite Factors (No Calculator)",
    question_id: "f1023780-ad53-4d5b-9ea3-9c9e012b1de8",
    question_prompt:
      "**No calculator is allowed on this question.**\n\n$\\lim \\limits_{x \\to 4} \\dfrac{(x-4)^2}{4-x}$ is:",
    option_1_id: "b58f18d6-7fd9-4bce-a7f6-6093af60f8cb",
    option_2_id: "a2a21b9d-fc0a-471b-9a9d-db1ddc15babd",
    option_3_id: "db0f226a-28bd-4e1a-991e-b7f535ed01a6",
    option_4_id: "db2b07de-a2b2-4d7e-af7d-6bf90b2dd390",
    option_1: "$-1$",
    option_2: "$0$",
    option_3: "$1$",
    option_4: "The limit does not exist.",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-86wef5eh6nc1.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-3gP9J53wtH5e.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-sKJ9RmH1EQ72.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-6NTaTVuFbtc8.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-Exj6b7Ya2qed.png",
  },
  {
    question_slug: "where-are-the-vertical-asymptotes-calculator",
    question_name: "Where are the Vertical Asymptotes? (Calculator)",
    question_id: "d07c5230-c94a-4eca-8259-7eb8458cbda3",
    question_prompt:
      "List all vertical asymptotes of $f(x)=\\frac { { x }^{ 2 } }{ { x }^{ 2 }-9 } $.",
    option_1_id: "776395be-c77e-4eed-ba25-4808a2fdb9d3",
    option_2_id: "d78270fa-cc28-4b9b-9efe-b14b965bb53e",
    option_3_id: "b2dda2cc-18e8-4304-809e-2fd1ecd0e40d",
    option_4_id: "c61e7748-183a-47c4-a686-1f619cfd62d9",
    option_1: "$x=9$, $x=-9$",
    option_2: "$x=3$",
    option_3: "$x=3$, $x=-3$, $x=9$, $x=-9$",
    option_4: "$x=3$, $x=-3$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-VXzCpepRWb6T.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-xPaWDWX11Byf.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-Yc5wH3872qMm.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-TpZsDvxxXSPY.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-Vh5wyFmz36eg.png",
  },
  {
    question_slug: "find-the-limit-on-a-piecewise-function-calculator",
    question_name: "Find the Limit on a Piecewise Function (Calculator)",
    question_id: "80b8121b-98e7-42f7-bc52-2769852fcade",
    question_prompt:
      "Given:\n\n$$ f(x) = \\left\\{ \\begin{array}{ll} \\frac { 1 }{ x+3 } \\quad x\\le -3 \\\\ \\frac { -1 }{ { x }^{ 2 } }  \\quad x>-3 \\end{array} \\right.$$\n\n...find $\\lim\\limits_{ x\\rightarrow { -3 }^{ - } }{ f(x) } $.",
    option_1_id: "8beece7f-c354-4fdc-ac12-e2e07f70df7b",
    option_2_id: "1b200be9-47f2-4f07-bf8f-61990f51a0ed",
    option_3_id: "5f069ebb-7550-45be-a9cf-24a0b5006312",
    option_4_id: "9630974a-570e-4e52-868a-0bcfbc940a89",
    option_1: "Nonexistent",
    option_2: "$\\infty$",
    option_3: "$-\\infty$",
    option_4: "$\\dfrac { 1 }{ 3 } $",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-qDkBGqaZ2ZmS.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-d9QMuxQQ321B.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-gpswBvPF4mxP.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-9gXFbUCGRA5f.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-TXJhAcv399Km.png",
  },
  {
    question_slug: "where-is-the-function-discontinuous-no-calculator",
    question_name: "Where is the Function Discontinuous? (No Calculator)",
    question_id: "2294ad51-3b71-4d0f-821c-dfdc7f4d6536",
    question_prompt:
      "Where is the following function discontinuous? \n[s:dbc0f175-2468-4795-8390-8fa734346ef5:piecewise discontinuities:image]",
    option_1_id: "aa3b3c52-522d-45ea-b3d7-4c05a0586efc",
    option_2_id: "e9e0568f-c558-466e-aa41-27eb345dd93c",
    option_3_id: "00b7c5df-23ce-4c86-807c-6fa7cbe6599b",
    option_4_id: "f654310f-8c7d-41f9-b630-2c4314359c76",
    option_1: "$I$, $II$, and $III$",
    option_2: "$I$ and $II$ only",
    option_3: "$I$ and $III$ only",
    option_4: "$II$ and $III$ only",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-A5PhDKgC9PMW.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-CEYweGpzxtd2.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-dxdffGmrn4AD.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-DduRu8Q9zPkA.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-c5GS99N1aD5g.png",
  },
  {
    question_slug:
      "limit-of-a-function-with-step-discontinuity-point-no-calculator",
    question_name:
      "Limit of a Function with Step Discontinuity Point (No Calculator)",
    question_id: "509594d3-663e-466a-904c-296fc355df16",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nCompute the limit of the following function, $f(x)$ as it approaches $x\\to 4$.    \n\n$$\\lim_{ x \\to 4 }\\dfrac{|x-4|}{x-4}$$",
    option_1_id: "e30767ec-7c1c-4cc4-8f73-31fd78cb2067",
    option_2_id: "43356855-42fb-4f3f-9d4c-f149a115e7bc",
    option_3_id: "f9999969-5443-4669-8f34-414d620a0315",
    option_4_id: "b47f8bee-afa6-4187-9015-0ec157504bed",
    option_1: "$0$",
    option_2: "$1$",
    option_3: "$-1$",
    option_4: "Nonexistent.",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-mQU8SwFXzVMx.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-EUXYhtAPEXRT.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-gBznm4pmYYxk.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-E2V2GzrpCdQX.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-azVGRGeAZrtg.png",
  },
  {
    question_slug: "find-limits-by-removing-discontinuity-no-calculator",
    question_name: "Find Limits by Removing Discontinuity (No Calculator)",
    question_id: "82be6499-955b-494a-94cb-d1745df3586c",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvaluate $\\mathop {\\lim} \\limits_{ x \\to4}\\dfrac{x^2-7x+12}{x-4}$",
    option_1_id: "fb93f3bd-3b6b-482e-ad7e-52607281f3db",
    option_2_id: "377fe90e-9466-415a-b79a-48fbac84dec1",
    option_3_id: "ae818546-355b-4ce0-a481-ae70f7b9863c",
    option_4_id: "947f94c4-9bfc-4e00-8a13-b94419328f1d",
    option_1: "$0$",
    option_2: "$1$",
    option_3: "$\\infty$",
    option_4: "Nonexistent.",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-JcsvbaDfswpx.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-ZCvN1TrQTbZs.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-EC4pKRsmeuMp.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-7NJ7DDtd4wqA.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-u5jbRgYbwPAH.png",
  },
  {
    question_slug:
      "one-sided-limit-with-jump-infinite-discontinuity-no-calculator",
    question_name:
      "One Sided Limit with Jump/Infinite Discontinuity (No Calculator)",
    question_id: "bc5918d3-d41d-4a57-9480-7b2908b8235b",
    question_prompt:
      "**No calculator is allowed on this question.**\n\n[s:aabf2da6-290f-4d85-b496-7d1f83449eca:Jump and Infinite Discontinuity:image]  \n\nWhich of the following statements accurately describes​ the above graph of $f(x)$?",
    option_1_id: "f047e1a1-f201-4755-96bb-276a5e050226",
    option_2_id: "04526b61-4541-4d90-9660-346047d0d521",
    option_3_id: "9bf00aa7-7532-4690-87fb-f6160f20a2de",
    option_4_id: "92a82404-f070-43c2-a2ee-1a040fb728d6",
    option_1: "$f(0)$ does not exist",
    option_2: "$\\lim _{ x\\rightarrow { 0 }} f(x) $ does not exist.",
    option_3: "$\\lim _{ x\\rightarrow { 0 }^{ - }} f(x)=3 $",
    option_4: "$\\lim _{ x\\rightarrow { 0 }^{ + }} f(x) =\\infty  $",
    key: "option_2_id",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-sDf8CV4M6ZFC.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-ZyRBYC8GyDTe.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-pnneHg4bhVt3.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-fBf4c74Pv7rA.png",
  },
  {
    question_slug: "interpreting-limits-algebraically-no-calculator",
    question_name: "Interpreting Limits Algebraically (No Calculator)",
    question_id: "ece1abbf-f6e9-4922-97d5-594fa9f4c777",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nLet $f$ be a function defined for all real numbers.  \n\nWhich of the following statements about $f$ must be true?",
    option_1_id: "a9e156f7-5428-47eb-8049-4dcb8056fca9",
    option_2_id: "1aa4362a-751f-4815-8f13-2d4c6687610f",
    option_3_id: "def3a336-6e32-4510-af18-aeea3aac3d6f",
    option_4_id: "b651c6ba-cd44-4e83-adb6-265c442f8e20",
    option_1: "If $\\lim\\limits_{x \\to 3} f(x) = 4$, then $f(3) = 4$.",
    option_2:
      "If $\\lim\\limits_{x \\to 3} f(x) = 4$ , then $4$ is in the range of $f$.",
    option_3:
      "If $\\lim \\limits_{x \\to {3^ + }} f(x) = \\lim \\limits_{x \\to {3^ - }} f(x)$, then $f(3) = \\lim \\limits_{x \\to {3^ + }} f(x) $.",
    option_4:
      "If $\\lim \\limits_{x \\to {3^ + }} f(x) \\ne \\lim \\limits_{x \\to {3^ - }} f(x)$, then $\\lim \\limits_{x \\to 3} f(x)$ does not exist.",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-rfwWHcQ8exaT.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-1RNe1DW1YBfC.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-159PcyTydmZ1.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-3Y6JGYrpbpV5.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-G8BChRsmyEMH.png",
  },
  {
    question_slug: "limit-with-fraction-and-root-no-calculator",
    question_name: "Limit with Fraction and Root (No Calculator)",
    question_id: "4528f183-1c6a-47bf-b35c-8ec3c6bccf0f",
    question_prompt:
      "**No calculator is allowed on this question.**\n\n$\\lim \\limits_{x \\to 25} \\dfrac{\\sqrt{x} -5}{25-x}$ is:",
    option_1_id: "3801bf9a-756a-4bbc-ad7a-8c6202ddfed3",
    option_2_id: "050b40a6-b9d1-4229-981b-f99126137fda",
    option_3_id: "df49bac4-44c7-48a0-8f24-8f290fdf7921",
    option_4_id: "c6016d83-0a98-4b50-9afd-e28a6dc5218f",
    option_1: "$-\\dfrac{1}{10}$",
    option_2: "$0$",
    option_3: "$\\dfrac{1}{10}$",
    option_4: "The limit does not exist.",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-amA72mpy6dNn.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-Zy3XP4gstZU8.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-u4YdCa2kZYWY.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-UbnNTR6TC12Q.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-kf4Rdz3bRCmR.png",
  },
  {
    question_slug: "finding-limits-graphically-no-calculator",
    question_name: "Finding Limits Graphically (No Calculator)",
    question_id: "495748bb-ac2c-4332-8943-f052a4f60151",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nChoose the statement below that is **not** true about the function, $f(x)$, shown in the graph.  \n\n[s:c0e808db-4254-46eb-8793-683c602dbd70:Jump Discontinuity:image]",
    option_1_id: "808f3f2b-a166-4be5-bcf8-ff7a4019abd2",
    option_2_id: "b4e75069-1257-455a-9659-7f2b241b6c83",
    option_3_id: "05945f0c-5c95-4a6e-bb56-d30e74e2322f",
    option_4_id: "385290f7-b6b8-4bcc-8751-352c119422b5",
    option_1: "$\\lim_{x \\to 1^-}f(x)=1$",
    option_2: "$\\lim_{x \\to 1^+}f(x)=0$",
    option_3: "$f(1)=1$",
    option_4: "$\\lim_{x \\to 1}f(x)=1$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-YwvwWjDMNpqB.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-mt3bYsJmCFcH.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-ZaTbwRPwNhHy.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-uymbTYuH9Z3h.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-F6KkRxZjK6ke.png",
  },
  {
    question_slug: "limit-of-a-natural-log-no-calculator",
    question_name: "Limit of a Natural Log (No Calculator)",
    question_id: "b3848422-9923-4972-8c06-2a48c29140bb",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind the limit.    \n\n$$\\lim _{ x\\rightarrow 2 } \\left[ \\ln \\left( \\dfrac { x }{ e^{ x-1 } } \\right) \\right] $$",
    option_1_id: "3640fe52-baa7-455a-ac7d-a9759b033601",
    option_2_id: "dfffac2f-3d18-4abf-bea7-740c4721c94a",
    option_3_id: "5df7e309-a891-4877-88f8-d6b0c6f0e450",
    option_4_id: "b71fadfc-a036-4a2e-a8ad-7501ea5c3985",
    option_1: "$\\ln 2$",
    option_2: "$2$",
    option_3: "$1$",
    option_4: "$\\ln2 – 1$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-AYs8hvvtk4qp.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-Yd44DK3hQFjP.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-MCWvNpFYSNYq.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-JtpK7xmFdrvj.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-xWmRCZxwpKE1.png",
  },
  {
    question_slug: "comparing-magnitudes-of-functions-no-calculator",
    question_name: "Comparing Magnitudes of Functions (No Calculator)",
    question_id: "4cbf2b0b-4faf-42a3-90c3-6e35b47e2e36",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nAs $x$ gets infinitely large, which of the following functions resembles the graph of $y=e^x$?",
    option_1_id: "01a677ea-e2ed-4958-960f-5f8a77300a87",
    option_2_id: "76d95de8-bcac-4c6b-8713-f5ed106ebd5a",
    option_3_id: "b82fadec-8e50-4c19-a905-c5e7425b9b7b",
    option_4_id: "fb905dbe-6dda-475b-bd38-81427cf6bbf2",
    option_1: "$y=\\dfrac{e^x}{e^x-1}$",
    option_2: "$y=\\ln{x}$",
    option_3: "$y=\\sqrt{x-2}$",
    option_4: "$y=4x^3+10x^5+e^x$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-Jxd9EDFMfpJj.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-6m8DenCHks6r.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-bFCfzm77ySHf.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-uwVH7Bcaj7Zt.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-2JW8ypPXjNte.png",
  },
  {
    question_slug: "which-function-matches-the-table-calculator",
    question_name: "Which Function Matches the Table? (Calculator)",
    question_id: "a5080aa8-0527-4ebc-ab38-c35b6fcdb914",
    question_prompt:
      "Which function matches the table shown and satisfies $\\lim\\limits _{ x\\rightarrow 3 }{ f(x) } =4$?\n\n|   $x$  |  $f(x)$  |\n|:------:|:--------:|\n|  $2.9$ |  $1.979$ |\n| $2.99$ | $3.7908$ |\n|   $3$  |    $4$   |\n| $3.01$ | $4.2108$ |\n|  $3.1$ |  $6.181$ |",
    option_1_id: "3aca55ec-4050-4646-8de4-0d9f36d18a59",
    option_2_id: "b3911092-9f0d-4253-8968-290ebb2441f4",
    option_3_id: "5573016d-5f92-4bfd-9036-450acc954190",
    option_4_id: "433c2979-d567-4d62-97c0-ba54028a8b86",
    option_1: "$f(x)=\\sqrt { x-3 } +4$",
    option_2: "$f(x)=\\cfrac { { x }^{ 2 }-2x-3 }{ x-3 }$",
    option_3: "$f(x)=x+1$",
    option_4: "$f(x)={ x }^{ 3 }-{ x }^{ 2 }-14$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-A5Mvka8XC8Hn.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-Tgu4gRZJnudB.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-YEQYsXNfdxWG.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-AM96s5JfYA8R.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-E2B7Hgb95BJs.png",
  },
  {
    question_slug: "limit-of-exponential-no-calculator",
    question_name: "Limit of Exponential (No Calculator)",
    question_id: "f75199b1-21ce-4c2b-8549-24c814866ee3",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvaluate the following limit:    \n\n$$\\lim \\limits_{x \\to 0} e^x+1$$",
    option_1_id: "d1675304-5b70-4ccc-a37f-f82a7c63c07e",
    option_2_id: "00d65202-1efe-4b8e-8593-3d7266ac4eeb",
    option_3_id: "c568f18e-0d2a-4a92-afca-1f3f3f8f91c1",
    option_4_id: "08a3abe3-16af-4aca-bd8b-8e36891dca7c",
    option_1: "$2$",
    option_2: "$e$",
    option_3: "$1$",
    option_4: "$0$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-S5zGaZnXbUPA.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-Q2djphkQyFQ8.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-7yTFQbd64mUS.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-HGYUHFybhFBp.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-axrZ85Zhz4Gj.png",
  },
  {
    question_slug: "discontinuities-from-a-graph-2-no-calculator",
    question_name: "Removable Discontinuity on a Graph (No Calculator)",
    question_id: "4dd0859b-2f90-4535-87c0-900af5fd10e7",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nAt which $x$-value(s) does this function have a removable discontinuity?\n\n[s:05c141b6-8ad7-4f7d-863e-450bb43fd821:Graph of Discontinuities:image]",
    option_1_id: "112db5cc-b586-4ca7-b305-f3e3cf7c1359",
    option_2_id: "ab41cc48-dfaa-432c-b774-eb68fa1d51cc",
    option_3_id: "34411926-de00-4525-bd83-501763a28ca9",
    option_4_id: "ea6b35bb-18ac-4b6f-b089-5b97416fffe3",
    option_1: "$1$ only",
    option_2: "$3$ only",
    option_3: "$1$ and $3$ only",
    option_4: "$1$ and $5$ only",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-XgqG7Hsv5g1y.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-yqeqYZ7cHCT2.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-mNVAmFUHHEJA.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-9bgXy5cfPvXU.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-RZWDtk5QQs3R.png",
  },
  {
    question_slug: "finding-limit-from-graph-no-calculator",
    question_name: "Finding Limit from Graph (No Calculator)",
    question_id: "38751acc-2f92-4e84-8cfc-808ef697be39",
    question_prompt:
      "[s:30b9ca75-01c4-471f-9c51-5a33d5e1974c:Discontinuous Graph:image]\n\nFind $\\lim\\limits _{ x\\rightarrow { 2 }^{ + } }{ f(x)}$.",
    option_1_id: "221abdaf-dfab-48ce-b0ad-ad81996db3ec",
    option_2_id: "135f1074-a78a-4094-ac06-279e059f63dc",
    option_3_id: "960d8ada-9ed9-44f0-a8ad-419895b25982",
    option_4_id: "c5737f38-a4ea-4eda-a3f0-170d3d6e9cf5",
    option_1: "$0.9$",
    option_2: "$2$",
    option_3: "The limit does not exist",
    option_4: "$1.5$",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-zUnXUG3rGkED.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-bqgsuw12tF9m.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-F6vmA2tECU16.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-JUC5PsnM4cdT.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-9gXa2q3qMVvb.png",
  },
  {
    question_slug: "piecewise-function-continuity-lhopitals-rule-no-calculator",
    question_name:
      "Piecewise Function Continuity: L'Hopital's Rule (No Calculator)",
    question_id: "8c019d9c-59be-42fe-b0a3-b1399e7d7133",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind the relationship between $a$ and $b$ that makes $f(x)$ continuous for all real numbers:    \n\n$$f(x)=\\begin{Bmatrix} \\dfrac { 1-\\cos(2x) }{ x } + a & x<0 \\\\ 4b\\cos(x) & 0\\le x \\end{Bmatrix}$$",
    option_1_id: "1d76dee0-2f9a-4a46-81c3-8845e1620b86",
    option_2_id: "5db40c20-aac2-4aea-a92b-2099eed6eeab",
    option_3_id: "7a73efde-2312-4dc0-9ab4-841034cf48b8",
    option_4_id: "506293eb-82bc-49df-bd68-1fedc4164aa2",
    option_1: "$b=\\dfrac {1-a}{4}$",
    option_2: "$a=0$\n$b$ can be any real number.",
    option_3: "$b=\\dfrac{a}{4}$",
    option_4:
      "There is no relationship between $a$ and $b$ that can make $f(x)$ continuous.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-7NKJy4bDEnj4.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-HnUSpjxfEQe3.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-KCVdyCVx984y.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-vP5pbsw3Eppy.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-FHEkdxx8PKXb.png",
  },
  {
    question_slug: "squeeze-or-no-squeeze-no-calculator",
    question_name: "Squeeze or No Squeeze (No Calculator)",
    question_id: "3772eeee-e284-406f-a970-1b607753a396",
    question_prompt:
      "**No calculator is allowed for this question.**\n\nLet $m$ and $n$ be functions defined as $m(x)=\\frac{1}{2}x^3+x^2-2x-2$ and $n(x)=\\cos{\\left(\\frac{\\pi}{2}(x+1)\\right)}+2$.   Given $f$ is a function that satisfies $m(x)\\leq f(x) \\leq n(x)$ on the interval $[-1,1]$, what is $\\displaystyle\\lim_{x\\to 0} f(x)$?",
    option_1_id: "8306cb38-a49d-49f6-9978-821b045b2689",
    option_2_id: "43df639a-4942-4d49-b896-744dea944757",
    option_3_id: "4730db1f-7a4e-4354-b956-225899359f6a",
    option_4_id: "f4585728-8df7-4487-97cc-4f443ead58a7",
    option_1: "$-2$",
    option_2: "$0$",
    option_3: "$2$",
    option_4: "This limit cannot be determined from the information given",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-vxDCxVVMFFP2.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-GhbrWREYSrWe.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-tTk9Rs7egVek.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-QeZxbvZWC72M.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-u2CUmd6DYjsU.png",
  },
  {
    question_slug: "the-squeeze-theorem-calculator",
    question_name: "The Squeeze Theorem (Calculator)",
    question_id: "9780ae52-230d-4a58-a55b-2b775688d10e",
    question_prompt:
      "**A calculator is allowed on this question.**\n\nFind $\\lim \\limits_{x \\to 0} \\left(3k+kx^2 \\sin \\dfrac{1}{x} \\right)$ if $k$ is a positive constant.",
    option_1_id: "1c7f97a4-642f-4506-b8f7-8e283335ee42",
    option_2_id: "a80d6ce1-eb37-4176-9727-d271fa17ec74",
    option_3_id: "978bb8e4-753e-4ab7-bbbc-d8d5eebb3825",
    option_4_id: "145fe588-37a9-437a-b18d-b3698dd8a77e",
    option_1: "$3k$",
    option_2: "$\\dfrac{7k}{2}$",
    option_3: "$0$",
    option_4: "$-3k$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-Mkkdxk4Q6rJr.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-Cv1XM9QH7213.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-hbdJAYeKdvMp.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-aprf6W94WMYT.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-pPgyWaQT94p4.png",
  },
  {
    question_slug: "unbounded-function-no-calculator",
    question_name: "Unbounded Function (No Calculator)",
    question_id: "958cddc2-d7b9-4b6d-bc78-7619b193f652",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhich of the following functions is/are unbounded?\n\n\n>**I.** $y=\\dfrac{5}{1-x}$  \n>**II.** $y=e^{5x}$  \n>**III.** $y=\\tan^{-1}x$    \n",
    option_1_id: "9067b5f0-60cd-4802-8b76-89ef1d5d9463",
    option_2_id: "e8c37e83-ae0e-490f-a153-0b4791ff008d",
    option_3_id: "c9918ba9-9b6b-4402-90a4-5d5b03d6a7b0",
    option_4_id: "33d4e4aa-a431-41f6-b813-51c7b9cca30e",
    option_1: "I only.",
    option_2: "II only.",
    option_3: "III only.",
    option_4: "I and II only.",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-NJsxTHjW6Yzv.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-8BYrkN87ys3S.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-UQD9meWDZhwZ.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-Dg3am2S9smRv.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-zUM6MSY8WNnu.png",
  },
  {
    question_slug: "another-rational-function-limit-no-calculator",
    question_name: "Another Rational Function Limit (No Calculator)",
    question_id: "87c6d041-bc9e-486a-994b-aba1cc36c456",
    question_prompt:
      "**No calculator is allowed on this question.**\n\n$\\lim \\limits_{x \\to 2} \\dfrac{x^2+4x-12}{x^2-4}$ is:",
    option_1_id: "0964b20c-9a36-4b38-983d-981c25e2d1e8",
    option_2_id: "ebb3ab37-f47a-47ed-9213-52093e6c95ae",
    option_3_id: "785096c4-47be-4bac-8328-eff411b925c8",
    option_4_id: "d38e4861-f0ac-40b4-813f-c372f7c84fd3",
    option_1: "$0$",
    option_2: "$2$",
    option_3: "$8$",
    option_4: "Nonexistent.",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-8hkSJN3WHvxc.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-bDC52amZxfQT.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-hySWwu1wdqe9.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-82zCa61XR6uS.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-xcfz3yDGzwyf.png",
  },
  {
    question_slug: "intermediate-value-theorem-1-no-calculator",
    question_name: "Intermediate Value Theorem 1 (No Calculator)",
    question_id: "7cf28155-a692-460d-9f0e-5af431dc7e9e",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nConsider the function values for $f(x)$ in the table below.  \n\nIf the Intermediate Value Theorem can be applied on the interval $[-4,4]$ what is the minimum number of zeroes for the function on the interval?  \n\n\n| x | y |  \n|---|:---:|  \n| -4 | -2 |  \n| -2 | 1 |  \n| 0 | 0 |  \n| 2 | 1 |  \n| 4 | -2 |\n\n",
    option_1_id: "7ce85dd1-1197-408f-9e09-794986f27dcf",
    option_2_id: "1adeec69-7841-4d44-82d7-dab840a9831c",
    option_3_id: "d1e42545-32c9-4edb-9526-a9729c1412b7",
    option_4_id: "c04947b5-604b-4f80-ba13-b18b0ffc828f",
    option_1: "$0$",
    option_2: "$1$",
    option_3: "$2$",
    option_4: "$3$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-Hs5yHjC3a1Kx.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-h3hBHHFnyKvY.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-uzXm78pyej71.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-7Yz3ME5gYTKe.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-79tZshb7cVjA.png",
  },
  {
    question_slug:
      "which-best-shows-instantaneous-rate-of-change-no-calculator",
    question_name:
      "Which Best Shows Instantaneous Rate of Change? (No Calculator)",
    question_id: "439ea19d-2060-41e9-aa33-31d565db5ea8",
    question_prompt:
      "Which of the following intervals would be the best to use to find the instantaneous rate of change of $f(x)={ x }^{ 2 }+3x-2$ at $x=3$?",
    option_1_id: "c57ee537-e49d-45d9-88ef-ee3c8a8dea96",
    option_2_id: "8e4c1aef-86e6-480f-9055-4fbd52d9e6bf",
    option_3_id: "358bf5a0-3f12-4ca9-9aa3-df228202a37d",
    option_4_id: "3c709bad-8a02-443e-8f6a-99cc52b3eafc",
    option_1: "$2.5\\le x\\le 3$",
    option_2: "$3\\le x\\le 3.5$",
    option_3: "$2.5\\le x\\le 3.5$",
    option_4: "$2\\le x\\le 3$",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-BvnaG8UWARWQ.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-yJqgZbsWaKhV.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-F8WJEU3FK1GH.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-chd99M8pyByw.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-VtFQuTMu3r6M.png",
  },
  {
    question_slug: "limits-at-infinity-a-rational-function-no-calculator",
    question_name: "Limits at Infinity: A Rational Function (No Calculator)",
    question_id: "281739ad-c859-4b65-9d8b-c05a56af33d0",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind the indicated limit:    \n\n$$\\lim _{ x\\xrightarrow { } \\infty } \\dfrac { { x }^{ 2 }-5x+3 }{ { x }^{ 3 }-5x-8 } $$\n\n\n\n",
    option_1_id: "775f4371-705b-4aaf-a6fa-c7770bf969de",
    option_2_id: "5e496ad7-fcb3-4d2c-adbb-2479013e7adf",
    option_3_id: "238550fe-4ff1-4f9c-9b64-7b563e05baf4",
    option_4_id: "21e6747e-61e4-41ec-bb51-462d3a3b8ed8",
    option_1: "$1$",
    option_2: "$-\\dfrac { 3 }{ 8 } $",
    option_3: "$0$",
    option_4: "The limit does not exist.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-xz36T6y91c3f.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-NnHB5A1sbQYm.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-ZjBKxj97Vv7K.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-bzQWHv5H5pyC.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-uvnuFF3cvetu.png",
  },
  {
    question_slug: "functions-from-limits-no-calculator",
    question_name: "Functions from Limits (No Calculator)",
    question_id: "f033f812-ad63-46dd-913f-7b6398321a4a",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nA function $f$ satisfies $\\displaystyle\\lim_{x\\to1}f(x)=2$.  Which of these could be the function $f$?\n\nI.  $\\quad f(x)=\\begin{cases} x^2-3x+4\\text{  ,  } x<1\\\\ 6x-3\\text{  ,  }x\\geq 1\\end{cases}$\n\nII.  \n\n| $x$ |$0.5$|$0.78$|$0.92$|$0.99$|$1$|$1.001$|$1.04$|$1.11$|$1.4$|\n|------|-------|---------|----------|--------|------|----------|---------|---------|--------|\n|$f(x)$|$1.8$|$1.89$|$1.91$|$1.99$|und|$1.93$|$1.9$|$1.88$|$1.79$|\n   \n \nIII. \n\n [s:cb87e411-2194-48b3-9960-ffe44883deaa:Quadratic with Hole:image]",
    option_1_id: "0dceb18f-58d3-4386-b26d-a1144fbf0a49",
    option_2_id: "7f4042be-3828-4e7b-9321-c48e4b7d6fe5",
    option_3_id: "050379cf-f245-470f-8a58-7eae0672b4ca",
    option_4_id: "31356259-a1be-4037-b887-0f1ad713e2cd",
    option_1: "I only",
    option_2: "II only",
    option_3: "I and II only",
    option_4: "II and III only",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-MYUdgJS27UZ6.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-FdBGGC26h7zG.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-whCDfXCr5f93.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-VavJEbN78hWJ.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-xk4sz6nfM7Uq.png",
  },
  {
    question_slug: "limits-by-algebraic-simplification-1-no-calculator",
    question_name: "Limits by Algebraic Simplification 1 (No Calculator)",
    question_id: "c804c1b0-e7cc-4ffb-b1fd-f291eef61227",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nCompute the limit:    \n\n$$\\lim_{h \\to0} \\frac{(1+h)^3-1}{h}$$",
    option_1_id: "95b6e3dd-683e-4974-a77f-692ab36e1c0f",
    option_2_id: "6d5fb331-27b2-4251-9337-68cf0afafda4",
    option_3_id: "974dc54b-fb4f-4a9a-b829-240196c9d97f",
    option_4_id: "0e268e45-75ed-40da-b44a-c2f3874f6205",
    option_1: "$0$",
    option_2: "$3$",
    option_3: "$7$",
    option_4: "Nonexistent.",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-pynDVt3J5YZk.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-ykq5CW1f9u2Q.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-Ahbqr9KePtyj.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-zuWBKdw5q1vp.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-SzqC426STgRE.png",
  },
  {
    question_slug: "which-table-fits-the-description-no-calculator",
    question_name: "Which Table Fits the Description? (No Calculator)",
    question_id: "065eee0c-db72-4b5a-a166-27774b6c5739",
    question_prompt:
      "Identify the table that fits the following description:\n\n* $\\lim\\limits _{ x\\rightarrow { 0 }^{ - } }{ f(x)=20 } $\n* $\\lim\\limits _{ x\\rightarrow 0 }{ f(x) } $ exists \n* $f(0)\\neq20$",
    option_1_id: "0acf5b60-1adb-41b8-9381-be39b67a4e1e",
    option_2_id: "38ed9296-64b4-400c-ab81-351acde7c88c",
    option_3_id: "4644cde1-feae-4741-9ab5-738d37498ea6",
    option_4_id: "09a00670-2168-4060-96ba-ccedc1cc04a2",
    option_1:
      "|    $x$   |  $f(x)$  |\n|:--------:|:--------:|\n|  $-0.1$  | $19.610$ |\n| $-0.001$ | $19.988$ |\n|    $0$   |    $5$   |\n|  $0.001$ | $20.022$ |\n|  $0.01$  | $20.411$ |",
    option_2:
      "|    $x$   |  $f(x)$  |\n|:--------:|:--------:|\n|  $-0.1$  | $19.610$ |\n| $-0.001$ | $19.988$ |\n|    $0$   |   $20$   |\n|  $0.001$ | $20.022$ |\n|  $0.01$  | $20.411$ |",
    option_3:
      "|    $x$   |  $f(x)$  |\n|:--------:|:--------:|\n|  $-0.1$  | $19.610$ |\n| $-0.001$ | $19.988$ |\n|    $0$   |    $5$   |\n|  $0.001$ |  $5.012$ |\n|  $0.01$  |  $5.987$ |",
    option_4:
      "|    $x$   |  $f(x)$  |\n|:--------:|:--------:|\n|  $-0.1$  | $19.610$ |\n| $-0.001$ | $20$ |\n|    $0$   | $20.897$ |\n|  $0.001$ |  $5.012$ |\n|  $0.01$  |  $5.987$ |",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-ynnTx52MhrNU.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-AeQuUFh9zFyG.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-TU4mC2YbbyyT.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-v5uZZgB7SpAj.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-xGWwhu56WAvT.png",
  },
  {
    question_slug: "estimate-the-rate-of-change-at-a-point-no-calculator",
    question_name: "Estimate the Rate of Change at a Point (No Calculator)",
    question_id: "8bdb2e4a-a897-4b85-837b-1e13dc867a69",
    question_prompt:
      "Which of the following is the best estimate for the rate of change of $f(x)=\\sin(x)$ at $x=0$?\n\n[s:e8c774f7-1fb8-40d1-9b05-144852110505:sin(x):image]",
    option_1_id: "5495179d-bf0d-474b-b1d2-2210b7c22ab5",
    option_2_id: "530d5c00-22ca-45d2-a397-a8e6df60f7e2",
    option_3_id: "59629dd8-5556-4e19-aded-a3bcfb033740",
    option_4_id: "553a4675-2dbf-40e2-9fbc-794ad35f4d26",
    option_1: "$0$",
    option_2: "$1$",
    option_3: "$-1$",
    option_4: "$0.5$",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-mjshwUf3wzzA.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-bb9vnPRaDt1R.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-5BEn3kDaZGz4.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-Xjq2gRFPHxgP.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-ep2e4svxec3B.png",
  },
  {
    question_slug: "limit-as-x-approaches-infinity-no-calculator",
    question_name: "Limit as $x$ Approaches Infinity (No Calculator)",
    question_id: "53c41860-2e97-4adc-bc73-78a4097809db",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvaluate the limit:    \n\n$$\\lim _{ x\\rightarrow \\infty  }{ \\frac { { x }^{ 4 }+9{ x }^{ 2 }-10 }{ { x }^{ 3 }-8 }  }  $$\n\n\n",
    option_1_id: "5dccbd5a-5347-4cea-99f4-86ccb8c8691d",
    option_2_id: "50870f79-398a-457f-bcb9-a75d5ca7fe42",
    option_3_id: "5c1293bb-6b4b-48d5-bb6f-6e00ca44a76a",
    option_4_id: "75d854fc-1d20-4050-a3cd-faf6b518380d",
    option_1: "$0$",
    option_2: "$1$",
    option_3: "$\\dfrac{5}{4}$",
    option_4: "$\\infty$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-PHxyhUCRh7P8.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-UdhmsMps9HKe.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-JK5xNXatRk2z.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-uNHthBttnreB.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-uTvejRrqPAa6.png",
  },
  {
    question_slug: "limit-as-x-approaches-2-no-calculator",
    question_name: "Limit as $x$ Approaches $2$ (No Calculator)",
    question_id: "82203970-0f6f-48d3-8c10-3c551fd30bce",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind the given limit:    \n\n$$\\lim _{ x\\xrightarrow { } 2 }{ \\dfrac { { x }^{ 4 }-16 }{ 3{ x }^{ 2 }-5x-2 } } $$\n\n\n",
    option_1_id: "0b64412b-82be-45fb-8dd8-df70c191d475",
    option_2_id: "d21a4665-dd65-47a8-9db7-945f92304c0c",
    option_3_id: "4b245e7b-f446-4679-98bf-67f3e0c23e65",
    option_4_id: "b149b658-3da2-4a9d-ad5a-f94dbb884487",
    option_1: "$8$",
    option_2: "$\\dfrac{ 1 }{ 3 }$",
    option_3: "$\\dfrac{ 32 }{ 7 }$",
    option_4: "The limit does not exist.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-mVdCZzfD2aY2.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-We7Af3qDbRf3.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-1zZDfc38fuTu.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-evNwmq6ZcNdY.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-QxGhbGty6ySK.png",
  },
  {
    question_slug: "radical-to-infinity-no-calculator",
    question_name: "Radical to Infinity (No Calculator)",
    question_id: "2c363c8f-65bd-48ef-8c11-c8d05235f0d3",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind the limit.    \n\n$$\\lim _{ x\\xrightarrow { } \\infty }{ 4x-\\sqrt { { 16x }^{ 2 }-x  } } $$\n\n\n",
    option_1_id: "430da8bf-78ce-4e20-a4e4-6d899c67ac7e",
    option_2_id: "93438b1b-f93e-4360-9a02-706b94bed71f",
    option_3_id: "9defbd5b-b205-45af-8275-ce2ca3ce1c83",
    option_4_id: "a521fb3d-6cbf-44ca-b507-1cad2d77f330",
    option_1: "$-\\dfrac{1}{8}$",
    option_2: "$\\dfrac{ 1 }{ 8 }$",
    option_3: "$0$",
    option_4: "$\\infty$",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-xaWrs6fQNEKn.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-XA1NkyAG98TW.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-3yyjDqkXzaPa.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-76kbxGRREAQ9.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-GAHDDXb6dZXf.png",
  },
  {
    question_slug: "limits-at-infinity-no-calculator",
    question_name: "Limits at Infinity (No Calculator)",
    question_id: "8c30d958-8958-4150-b85a-89711747e3eb",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvaluate: $$ \\lim _{ x\\rightarrow -\\infty  }{ \\dfrac { 2{ x }^{ 2 }-4x+5 }{ 4{ x }^{ 2 }+7x-3 }  } $$",
    option_1_id: "9e54cd6b-d07f-439f-9902-56d76b505cd9",
    option_2_id: "62313ca5-56b4-4c6f-8a83-dc336bf016e6",
    option_3_id: "c30128a8-619b-4480-adbc-82cceaea9f73",
    option_4_id: "bd491c5d-cd62-40e0-b24b-5ddfcd8e41aa",
    option_1: "$\\dfrac { 1 }{ 2 }$ ",
    option_2: "$-\\dfrac { 5 }{ 3 } $",
    option_3: "$\\dfrac { 3 }{ 8 } $",
    option_4: "$-\\dfrac { 1 }{ 2 } $",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-RFS9c4pQ1HCm.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-jJdh4hAWWVEF.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-NumW2TPabgvb.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-kQVzQzStpzmR.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-y7advtwQwXRS.png",
  },
  {
    question_slug: "multiple-vertical-asymptotes-calculator",
    question_name: "Multiple Vertical Asymptotes (Calculator)",
    question_id: "86ff6bcd-3197-4304-9f3b-0e9622ea4b44",
    question_prompt:
      "**A calculator is allowed on this question.**\n\nWhat are the vertical asymptotes of the following function?    \n\n$$y=\\dfrac { 5 }{ { 2x }^{ 2 }-11x-21 } $$\n\n\n",
    option_1_id: "96965e76-eabf-4ef4-835c-aa7acca4cdde",
    option_2_id: "ea82b587-ce35-47aa-947a-8176a76d1372",
    option_3_id: "fde573f6-b71d-4d92-bd6e-1ff74477410c",
    option_4_id: "e2f4d689-12de-460c-b7bb-20db47bc92e0",
    option_1: "$x=-7 \\quad ;  \\quad x=\\dfrac{ 3 }{ 2 }$",
    option_2: "$x=-\\dfrac{ 3 }{ 2 } \\quad ; \\quad x={ 7 }$",
    option_3: "$x=3 \\quad  ; \\quad x=\\dfrac{7}{2}$",
    option_4: "There are no vertical asymptotes.",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-YXrfG7NZYmpY.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-DaTQ43ChCmYz.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-PrupRx589TBe.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-bXjkc99yyFFB.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-NtTFQ1Q47hT9.png",
  },
  {
    question_slug: "simple-limit-no-calculator",
    question_name: "Simple Limit (No Calculator)",
    question_id: "99844250-4fd3-4bb2-98e7-ebe9d2c4c795",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nCompute the limit of:    \n\n$$\\lim _{ x\\xrightarrow { } 10 }{ { x }^{ 2 }-5 } $$",
    option_1_id: "b9c5724f-4c6b-4d1b-b855-cdda6f792384",
    option_2_id: "a2b2550f-e330-4b17-91a1-9a724c70aa0b",
    option_3_id: "833543d9-0aa7-4beb-abd5-951dabeb644f",
    option_4_id: "9fda859b-15d1-410e-8c84-4f10b0d387e0",
    option_1: "$15$",
    option_2: "$105$",
    option_3: "$100$",
    option_4: "$95$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-Egrtz7bbd2N7.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-2QXEGAJh1acA.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-JHDvW8YesEjg.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-S3JvjN64rbvw.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-7qmWnm8EMPXx.png",
  },
  {
    question_slug:
      "finding-the-limit-of-a-fraction-with-polynomials-no-calculator",
    question_name:
      "Finding the Limit of a Fraction with Polynomials (No Calculator)",
    question_id: "2bb7fd4a-d0b9-46be-8847-41dfe6bf7389",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nCompute the limit of:    \n\n$$\\lim _{ x\\xrightarrow { } 4 }{ \\dfrac { 2{ x }^{ 2 }-4x-2 }{ { x }^{ 2 }-4 } } $$",
    option_1_id: "4831de4e-bbac-41f7-8799-244683d37243",
    option_2_id: "d1629098-d3c7-4f3d-af1f-f7d614482cb3",
    option_3_id: "723ee981-b862-4ecc-8c69-3b76bac7e89b",
    option_4_id: "618bad53-604e-41fc-a519-1709ccbcf33b",
    option_1: "$1$",
    option_2: "$\\dfrac{7}{6}$",
    option_3: "$2$",
    option_4: "$\\dfrac{6}{7}$",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-TXZ2X85dMNmW.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-pzVz8qXxqFjf.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-yhwcYdx7W5kX.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-ww21AS7Pbp73.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-TnrGZtBwJPwa.png",
  },
  {
    question_slug:
      "the-instantaneous-rate-of-change-does-not-exist-no-calculator",
    question_name:
      "The Instantaneous Rate of Change Does Not Exist (No Calculator)",
    question_id: "2a370a6c-4290-4193-8515-ef863d65456e",
    question_prompt:
      "[s:aa727506-d68c-4c2b-a1b1-68793f4ca352:f(x) piecewise roc:image]\n\nFor what $x$ value does the instantaneous rate of change of $f(x)$ not exist above?",
    option_1_id: "3d735b6d-326b-4185-b64f-e452b08b9782",
    option_2_id: "574e30c6-e564-407c-9b89-5b822d3c3fb3",
    option_3_id: "73a0309e-2216-4b48-ab5a-b1e57a9605d9",
    option_4_id: "f25c240c-0616-45f6-ad0a-0748fcc3a63f",
    option_1: "$x=-4$",
    option_2: "$x=-3$",
    option_3: "$x=1$",
    option_4: "$x=2$",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-DWEnzEwFxZ5q.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-zhsQytzp2mQC.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-fkkjmwAvg48X.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-DR9rVp9Yp8KE.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-9aYAuzdtGMQs.png",
  },
  {
    question_slug: "find-a-limit-using-a-table-calculator",
    question_name: "Find a Limit Using a Table (Calculator)",
    question_id: "5db34d81-efaa-48e4-bdf0-17f2deef1fa5",
    question_prompt:
      "Create a table to find $\\lim\\limits _{ x\\rightarrow 0 }{ \\cfrac { 1 }{ \\cos { x }  }  } $.",
    option_1_id: "7d480b0b-f628-4019-b7d2-8892d94f74ee",
    option_2_id: "74bc0bf8-312a-495b-afc2-1b1e20fae7d0",
    option_3_id: "a8e05479-3868-4467-8a98-77f83772357b",
    option_4_id: "ff5473ee-2053-4e59-b961-74ef9c72d9cf",
    option_1: "$1$",
    option_2: "$0$",
    option_3: "nonexistent",
    option_4: "$\\infty$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-YFkY4584wuMD.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-vpP98h3zx1mb.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-C8BVG88YpKA8.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-yB28AtdTJbZ2.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-9s3tvS6drnBx.png",
  },
  {
    question_slug: "analyzing-function-behavior-no-calculator",
    question_name: "Analyzing Function Behavior (No Calculator)",
    question_id: "13800ad9-ceb6-4734-bd22-58eca4f650ac",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nBased on the graph of $f(x)$ shown below, which of the following is **FALSE**?  \n\n[s:89408c31-baab-42f8-99e9-9e3dd526e758:Asymptote Graph:image]",
    option_1_id: "dc7c652b-5d81-4e72-94a5-74b4ad726d61",
    option_2_id: "5cb67bdc-6ccc-4779-aaff-6a2c8abb0433",
    option_3_id: "8a1bf00f-6555-4987-b6e5-004e11e22fa9",
    option_4_id: "b1caa7a1-1f32-4d4e-8e71-8fdf045bfc3e",
    option_1: "$\\lim_{x \\to \\infty}f(x)=3$",
    option_2: "$\\lim_{x \\to -\\infty}f(x)=3$",
    option_3: "$\\lim_{x \\to 0}f(x)=\\infty$",
    option_4: "$f(x)$ is bounded.",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-s8dRHDkU7yJm.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-KuhHTn5UHmvq.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-xCgTuqPwJHQb.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-MmQugMU4NArC.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-rkmnUeeheukK.png",
  },
  {
    question_slug: "limit-involving-greatest-integer-function-no-calculator",
    question_name: "Limit Involving Greatest Integer Function (No Calculator)",
    question_id: "ee93f075-7c95-4e70-8e63-56b851efefd7",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nIf $[x]$ represents the greatest integer that is less than or equal to $x$, then = $\\lim \\limits_{x \\to {0^ - }} \\dfrac{{1}}{{[x]}}$ is:",
    option_1_id: "3df06855-0460-485e-a929-cf15fb27d512",
    option_2_id: "2bad865b-304d-42fc-9f0a-89c082dc6776",
    option_3_id: "2b973a3f-06ad-4f27-bcac-f7c3b6faffc8",
    option_4_id: "16967b4d-737c-4624-950f-a5019194d8dc",
    option_1: "$0$",
    option_2: "$1$",
    option_3: "$-1$",
    option_4: "The limit does not exist.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-gAvzepsFr9Mm.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-8dNSPXkGN4av.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-wngm6jpxRAH7.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-Ja7zwsK3Gzpu.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-xnPW7hgB6fr1.png",
  },
  {
    question_slug:
      "limits-polynomial-divided-by-another-polynomial-no-calculator",
    question_name:
      "Limits : Polynomial Divided by Another Polynomial (No Calculator)",
    question_id: "26b6fce4-547c-4364-b4a5-897376487c36",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nCompute the limit of:    \n\n$$\\mathop {\\lim }\\limits_{x \\to \\infty } { \\dfrac { 3x+20 }{ -2x+15 } } $$\n",
    option_1_id: "97751171-cf53-4b4a-bc12-558de369f60c",
    option_2_id: "642896fc-bf0c-4490-a0c1-353f503d65ce",
    option_3_id: "c192c95e-bfe3-46e9-9f2c-67ac3009667e",
    option_4_id: "94dd4263-e226-42d5-b08f-eafb1f052e75",
    option_1: "$\\dfrac {4}{3}$",
    option_2: "$-\\dfrac {3}{2}$",
    option_3: "$1$",
    option_4: "Does not exist.",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-qQTDrGP4kZfP.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-RQjEC7HwRm8P.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-avfux2Xdz4Ng.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-muEQQCzFqw1y.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-StBy41bpmuXH.png",
  },
  {
    question_slug: "indeterminate-form-involving-infinity-no-calculator",
    question_name: "Indeterminate Form Involving Infinity (No Calculator)",
    question_id: "d8f68d48-df4d-4fe1-8199-f6559a2e60d6",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nCompute the limit of:    \n\n$$\\lim _{ x\\xrightarrow { } \\infty }{ \\dfrac { x+10 }{ 2x+15 } } $$",
    option_1_id: "8b51d2fa-0f4c-4e92-9c1c-e5613613a25d",
    option_2_id: "f9ee0bd9-a90d-40d0-ac90-2ef7839d8e24",
    option_3_id: "e71c7143-1fd0-4134-b714-f4d053b2c5e3",
    option_4_id: "a0d1d28b-e85b-47f4-8445-02f7e0f8efc2",
    option_1: "$\\dfrac {1}{3}$",
    option_2: "$\\dfrac {1}{2}$",
    option_3: "$1$",
    option_4: "Does not exist.",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-7Zd7FyfjHv39.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-R261jDFUrVhu.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-6a7p3uh2C519.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-tA2WVFMkAm8N.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-7ZvRrr9SJne1.png",
  },
  {
    question_slug: "limits-on-a-piecewise-function-calculator",
    question_name: "Limits on a Piecewise Function (Calculator)",
    question_id: "c7abc781-469b-4f9e-873b-cfa3f669f5ed",
    question_prompt:
      "$$ f(x) = \\left\\{ \\begin{array}{ll} \\cos { x } +1\\quad & x\\le \\pi \\\\ \\cos { x } \\quad & x>\\pi \\end{array} \\right.$$\n\nConsidering the above function, use a table to determine which of the following statements is true.",
    option_1_id: "5e75e616-4332-47c8-9881-b5383b14a766",
    option_2_id: "ba26376f-851b-458f-a276-c284e82132fd",
    option_3_id: "ddd363f8-7ab8-41e2-b2fa-d4ec5f9946c1",
    option_4_id: "bfe4a6f0-f056-4d23-8eb7-7a588ad94b0c",
    option_1:
      "$\\lim\\limits _{ x\\rightarrow { \\pi  }^{ - } }{ f(x) } =0$\n\n$\\lim\\limits _{ x\\rightarrow { \\pi  }^{ + } }{ f(x) } =-1$\n\n$\\lim\\limits _{ x\\rightarrow { \\pi  }}{ f(x) }$ does not exist",
    option_2:
      "$\\lim\\limits _{ x\\rightarrow { \\pi  }^{ - } }{ f(x) } =0$\n\n$\\lim\\limits _{ x\\rightarrow { \\pi  }^{ + } }{ f(x) } =-1$\n\n$\\lim\\limits _{ x\\rightarrow { \\pi  }}{ f(x) }=0$",
    option_3:
      "$\\lim\\limits _{ x\\rightarrow { \\pi  }^{ - } }{ f(x) } =-0.54$\n\n$\\lim\\limits _{ x\\rightarrow { \\pi  }^{ + } }{ f(x) } =-1$\n\n$\\lim\\limits _{ x\\rightarrow { \\pi  }}{ f(x) }$ does not exist",
    option_4:
      "$\\lim\\limits _{ x\\rightarrow { \\pi  }^{ - } }{ f(x) } =0$\n\n$\\lim\\limits _{ x\\rightarrow { \\pi  }^{ + } }{ f(x) } =0$\n\n$\\lim\\limits _{ x\\rightarrow { \\pi  }}{ f(x) }=0$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-yBMPWTYUUYvd.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-dqXuerU3ZS4s.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-hdr95sE6Cqpx.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-nUB8ramYwu4B.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-ktHYnF19Dvu2.png",
  },
  {
    question_slug: "understanding-squeeze-theorem-no-calculator",
    question_name: "Understanding Squeeze Theorem (No Calculator)",
    question_id: "f1d489e9-8f8a-4f40-af15-b8a3ec6c93c6",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nThe functions $f$, $g$, and $h$ satisfy the relationship $f(x)\\leq g(x) \\leq h(x)$ on the interval $[0,3]$.\n\nIt is also known that $\\displaystyle\\lim_{x\\to1}f(x)=4$ and $\\displaystyle\\lim_{x\\to1}h(x)=4$.  Which of these could be $\\displaystyle\\lim_{x\\to1}g(x)$?",
    option_1_id: "4236b523-6dd0-4656-a24c-1872be82e881",
    option_2_id: "4fdc5f82-06f6-4bd1-a418-58921179de4a",
    option_3_id: "6354ad45-d7d2-4f35-9527-ce7e8e9b4b7b",
    option_4_id: "42c00dba-3a5b-44d9-8764-12d42eef343f",
    option_1: "$3$",
    option_2: "$4$",
    option_3: "$5$",
    option_4: "The limit cannot be determined from the given information.  ",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-GPmczFgQ3PrU.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-XjguTb3EpRUF.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-CTTn851vERPv.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-W2GXURWutGwC.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-bKmgMtG4YFUc.png",
  },
  {
    question_slug: "limit-with-a-scary-root-no-calculator",
    question_name: "Limit with a Scary Root (No Calculator)",
    question_id: "187b18df-765a-4278-96bf-7cc3cd416608",
    question_prompt:
      "**No calculator is allowed on this question.**\n\n$\\lim \\limits_{x \\to 5} \\dfrac{x-5}{\\sqrt{5}-\\sqrt{x}}$ is:",
    option_1_id: "4cb99cb5-4ae5-47b3-a013-580b38a82721",
    option_2_id: "2e8ae1eb-c2eb-4ce9-8420-8c7e221b7ae8",
    option_3_id: "4a533c63-a8d8-4d4b-a38b-8354528a2037",
    option_4_id: "8b2a0087-0af1-4a11-9995-300139bf59a7",
    option_1: "$-2 \\sqrt{5}$",
    option_2: "$\\sqrt{5}$",
    option_3: "$10$",
    option_4: "$2 \\sqrt{5}$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-7pESHkJZBFuT.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-tTf9dceTMNTU.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-ydnBpyF5vz4x.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-85BU2ps1mBA5.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-gSKxSF5hu2Us.png",
  },
  {
    question_slug: "a-limit-as-x-approaches-infinity-no-calculator",
    question_name: "A Limit as $x$ Approaches Infinity (No Calculator)",
    question_id: "afc54f15-9073-4466-afb4-482291836c67",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nCompute the limit of:    \n\n$$\\lim _{ x\\xrightarrow { } \\infty }{ \\dfrac { 100 }{ { x }^{ 2 }+5 } } $$\n\n\n",
    option_1_id: "a954af5a-0ed8-4f78-8215-b03e78c99eb3",
    option_2_id: "0e2fbb31-4f22-431d-b18a-8f4e6d8c82ef",
    option_3_id: "9fcb0f4b-3990-4304-b7ab-88d0cc603957",
    option_4_id: "8c4ea81e-331b-4886-af10-afbe8b1fae7a",
    option_1: "$100$",
    option_2: "$20$",
    option_3: "$0$",
    option_4: "Nonexistent.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-38JDJDBY5Vxh.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-kaejfghSVwDh.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-Q5XuhEwKXV7V.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-vJ6nhwxqg3b7.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-WPn6Yuf1tnAe.png",
  },
  {
    question_slug: "applying-the-squeeze-theorem-no-calculator",
    question_name: "Applying the Squeeze Theorem (No Calculator)",
    question_id: "cd0deed8-c242-4318-b740-cf3d312d7391",
    question_prompt:
      "**No calculator is allowed for this question.**\n\nLet $u$ and $v$ be functions defined as $u(x)=-e^{x-2}-3$ and $v(x)=\\frac{1}{2}x^2 -3x$.   Given $f$ is a function that satisfies $u(x)\\leq f(x) \\leq v(x)$, what is $\\displaystyle\\lim_{x\\to 2} f(x)$?",
    option_1_id: "987f3664-c0eb-4a5c-9bd7-84da984a81f6",
    option_2_id: "aa876fb2-aebe-452d-b610-0509293760e3",
    option_3_id: "99b9c1fe-b968-437e-b9e0-7a0e649a3bd9",
    option_4_id: "981ec82f-2af0-4865-8c79-e8778028abce",
    option_1: "$-4$",
    option_2: "$-2$",
    option_3: "$0$",
    option_4: "The limit cannot be determined from the information given",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-yC9JgNzBrfJt.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-eeCnsr9rJWwM.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-a1qNHgyja8UM.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-ew9HVZUaPaQy.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-KCHJCYv9MCRD.png",
  },
  {
    question_slug: "horizontal-asymptotes-short-equation-no-calculator",
    question_name: "Horizontal Asymptotes, Short Equation (No Calculator)",
    question_id: "a2401301-382a-4dc6-aef5-6143eea13cb0",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhich of the following statements must be true, given the limit $\\mathop {\\lim}\\limits_{x \\to \\infty}f(x)=3$?\n\n\n>**I.** $f(c) \\ne 3$ for all values of $c$ in the domain of $f$  \n>**II.** $x=3$ is a vertical asymptote for the graph of $f(x)$  \n>**III.** $y=3$ is a horizontal asymptote for the graph of $f(x)$    \n",
    option_1_id: "10d55134-e8be-4ad1-9845-3038c95c347e",
    option_2_id: "8f45cd81-fe2b-4ef6-ab12-3984b4d664aa",
    option_3_id: "375a58b3-ac69-404e-b04a-f7208cc3c8c9",
    option_4_id: "691e016d-60f7-4153-8787-8b15ea11d25a",
    option_1: "I only",
    option_2: "I and II only",
    option_3: "III only",
    option_4: "I and III only",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-SwPFsXvjDE8T.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-5YB1sYJAsGE7.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-HesDvwR56rf3.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-DMua1UdthrpH.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-ZaJg6F4mxvWe.png",
  },
  {
    question_slug: "horizontal-asymptotes-fraction-no-calculator",
    question_name: "Horizontal Asymptotes, Fraction (No Calculator)",
    question_id: "99dada1a-c626-445e-86c2-5b25d53e3509",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind the horizontal asymptote(s) for the following function $f(x)=\\dfrac{2x^2+6x-5}{7x^2+3}$.",
    option_1_id: "18030d7d-4ae8-4e4c-98e8-4b0be0342b71",
    option_2_id: "cd329565-e943-4883-b907-2267b02cb1c0",
    option_3_id: "43586d4e-b0fc-49b5-b9d5-d18eab61d5b5",
    option_4_id: "d7b7d086-478e-46ff-93b2-eac6cd58cfba",
    option_1: "$y=\\dfrac{2}{7}$",
    option_2: "$y=\\dfrac{7}{2}$",
    option_3: "$y=0$",
    option_4: "$y=1$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-13DAh5VbhS5B.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-BXx7G1Ewu8CE.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-GHsqycr68t8w.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-7eWxw6Vd532F.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-qZ2EtrQ1qDk8.png",
  },
  {
    question_slug: "limit-with-absolute-value-function-no-calculator",
    question_name: "Limit with Absolute Value Function (No Calculator)",
    question_id: "cdc47ba9-5d43-457a-a960-86ffd1a65191",
    question_prompt:
      "**No calculator is allowed on this question.**\n\n$\\lim \\limits_{x \\to 2} \\dfrac{|x-2|}{x-2}$ is:",
    option_1_id: "f7311add-69cc-4645-8003-28578fc83676",
    option_2_id: "7cb42ea7-fe37-498a-be3c-5c8fc40393e7",
    option_3_id: "cced9ada-cb4a-4149-a763-d28070df8fda",
    option_4_id: "02dde226-dc43-4dbd-a811-e80870fec077",
    option_1: "$0$",
    option_2: "$-1$",
    option_3: "$1$",
    option_4: "Nonexistent.",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-WNVKDUuxE9bS.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-GS8kTAeXDEtx.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-9aewUmt6zq4z.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-kxDpzDhgPY9H.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-gFZu45jN75yZ.png",
  },
  {
    question_slug: "jump-discontinuity-limits-continuity-no-calculator",
    question_name: "Jump Discontinuity, Limits, Continuity (No Calculator)",
    question_id: "fd332b1e-aa4a-441b-956f-b8c85d68d234",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhich of the following statements correctly describes the graph below?  \n[s:d5feb68c-ee75-4458-a4f5-822cd4f1703d:Limit as x approaches 1 DNE:image]",
    option_1_id: "3a09aeff-fe65-4b10-ae95-1e9ad824eccb",
    option_2_id: "b00fc52d-99cb-4ec4-a47c-af4f52810dda",
    option_3_id: "f1b9039d-3109-4c62-b58d-3b1f53a36faa",
    option_4_id: "4fe8717b-b980-4aa1-a70e-190f05e2e9b3",
    option_1:
      "The function is not continuous at $x=1$.  \n$ \\lim _{ x\\rightarrow 1 }{ f(x) } $ does not exist.  \n$f(1)=1$",
    option_2:
      "The function is  continuous at $x=1$.  \n$ \\lim _{ x\\rightarrow 1 }{ f(x) } $ does not exist.  \n$f(1)=1$",
    option_3:
      "The function is not continuous at $x=1$.  \n$ \\lim _{ x\\rightarrow 1 }{ f(x) } $ exists.  \n$f(1)=1$",
    option_4:
      "The function is not continuous at $x=1$.  \n$ \\lim _{ x\\rightarrow 1 }{ f(x) } $ does not exist.  \n$f(1)=0.5$, and $f(1)=2$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-PhH7tfXEMxAh.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-fKb1ZSp28Mnx.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-RkGnsv8GDDgz.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-PT6qkbK4eXet.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-buRdTPAKrP5P.png",
  },
  {
    question_slug: "which-representation-shows-the-limit-no-calculator",
    question_name: "Which Representation Shows the Limit? (No Calculator)",
    question_id: "eef4952e-50c4-4bf7-9673-2ef56ad9b1c6",
    question_prompt:
      "Which of the following shows $\\lim\\limits _{ x\\rightarrow 0 }{ f(x) } =0$?",
    option_1_id: "0dcef807-b098-4d25-9d5a-4e580bcb3011",
    option_2_id: "16961ea3-9dcd-4326-9716-872a05e98f1c",
    option_3_id: "469857a5-9525-409e-bbba-f712491237bb",
    option_4_id: "0c659b9f-782f-4976-b320-4c5aab0a2654",
    option_1:
      "[s:8844ac70-548e-405b-a85c-dcaef12cd06f:f(x) hole at (0, 1):image]",
    option_2:
      "|   $x$   |  $f(x)$ |\n|:-------:|:-------:|\n|  $-0.1$ |  $-0.1$ |\n| $-0.01$ | $-0.01$ |\n|   $0$   |   $0$   |\n|  $0.01$ | $13.05$ |\n|  $0.1$  |   $14$  |",
    option_3:
      "$\\lim\\limits _{ x\\rightarrow { 0 }^{ - } }{ f(x) } =0$ and $\\lim\\limits _{ x\\rightarrow { 0 }^{ + } }{ f(x) } =0$",
    option_4: "[s:95fdfd36-3c08-42cc-b447-820db210438a:Oscillating at 0:image]",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-xXrUE2xazEj9.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-b8c9Kq8V7ptm.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-qVa4CFWC9VXA.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-jBmQ85j8RAKc.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-bJjbMwfSU4aR.png",
  },
  {
    question_slug: "algebraic-limit-involving-absolute-value-no-calculator",
    question_name: "Algebraic Limit Involving Absolute Value (No Calculator)",
    question_id: "6c3bd0f5-c376-4099-8087-406d7ed6c89b",
    question_prompt:
      "**No calculator is allowed on this question.**\n\n$\\lim \\limits_{x \\to 4} \\dfrac{{\\sqrt {{x^2} - 8x + 16} }}{{x - 4}}$ is:",
    option_1_id: "1d26febd-e46a-4f41-842d-d749f0f28a96",
    option_2_id: "d4bd9c7f-fea4-42a6-83f7-17d48d77ac99",
    option_3_id: "50e4414a-40e8-45d8-8ac3-33791d226541",
    option_4_id: "ebbbbed8-a156-4127-8a82-cf48f826d9ed",
    option_1: "$1$",
    option_2: "$-1$",
    option_3: "$0$",
    option_4: "The limit does not exist.",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-YSwkFXtFKaRz.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-Ur9yF8kEEc5E.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-GEQJgzcfUZGU.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-tPfs6uaJuDQs.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-XAXkBT62rESJ.png",
  },
  {
    question_slug: "piecewise-discontinuity-no-calculator",
    question_name: "Piecewise Discontinuity (No Calculator)",
    question_id: "f2986ca7-f9f9-46db-80f9-7d4579d27a7f",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nConsider the piecewise function:  \n\n$$f(x) = \\left\\{ {\\begin{array}{*{20}{c}}\n{5{x^2} - 2}&{x > 1}\\\\\n{{x^2} + 2}&{x < 1}\n\\end{array}} \\right.$$  \n\nFor what value, if any, is $f(x)$ discontinuous?  \n\nDescribe the type of discontinuity if one exists.",
    option_1_id: "087a7852-605d-45db-ba5a-52566ff44cd5",
    option_2_id: "712a027f-afe8-411d-bd06-884c478c47c7",
    option_3_id: "774be689-360d-487f-a8f1-f946b2d9c8ca",
    option_4_id: "6f7a497a-9ca5-49d4-a5a0-255d3ebc468c",
    option_1: "Discontinuous at $x=1$; removable point discontinuity.",
    option_2: "Discontinuous at $x=1$; non-removable point discontinuity.",
    option_3: "Discontinuous at $x=1$; non-removable jump discontinuity.",
    option_4: "The function $f(x)$ is continuous everywhere.",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-J9jWsWv85Sgb.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-5fB35sXQn9HN.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-hsvcFSTr43Sj.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-BuRWbfb9PW88.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-pBYR5HAVBX3u.png",
  },
  {
    question_slug: "creating-a-continuous-function-c-value-no-calculator",
    question_name: "Creating a Continuous Function, c Value (No Calculator)",
    question_id: "9b2e7174-be5c-4aff-b804-54a9496f6500",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind the value of $c$ that makes $f(x)$ continuous at $x=2$:    \n\n$$ f(x) = \\left\\{ \\begin{array}{ll} \\dfrac{x^3+2x^2-13x+10}{x^2+7x-18} &  x \\neq 2 \\\\ c &  x = 2 \\end{array} \\right. $$",
    option_1_id: "52b7fcf7-688f-4376-91b9-c334dec85c1e",
    option_2_id: "73ab0c42-7a73-42b1-815d-07e44d45d715",
    option_3_id: "78f11e6b-4fb1-4640-9db1-4ce46a8d82f2",
    option_4_id: "ab04aafe-e969-432b-b383-da65a9bbb66b",
    option_1: "$0$",
    option_2: "$5$",
    option_3: "$\\dfrac{7}{11}$",
    option_4: "$-\\dfrac{7}{11}$",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-65jXRymAPThQ.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-FsapNMSqafM2.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-7EQV4D3gesG5.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-HtF2UkKhDYzq.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-T2np9gZvtwgh.png",
  },
  {
    question_slug: "limit-at-negative-infinity-no-calculator",
    question_name: "Limit at Negative Infinity (No Calculator)",
    question_id: "85ff012c-5396-4da7-9838-a1ac6c613bfa",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nCompute the limit of:    \n\n$$\\lim_{x\\rightarrow {-\\infty} }\\left ( x-\\sqrt{x^{2}-3x} \\right )$$\n",
    option_1_id: "3a0902c7-a23f-49f1-aa15-68bcf51e7c01",
    option_2_id: "e840fe6c-a321-4933-968b-018220760d1f",
    option_3_id: "e767a10b-7764-42a9-bc3a-e589ef580bed",
    option_4_id: "739194e3-20a5-4d8e-9c90-7f0e8c80f86c",
    option_1: "$-\\sqrt{3}$",
    option_2: "$-\\dfrac {3}{2}$",
    option_3: "$0$",
    option_4: "The limit does not exist.",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-cpcsszVuUkM8.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-bAgYteZ5TyAS.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-KJe2DD7RgHa3.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-3uy3UgmGfaAs.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-7GC4vWjAMtsE.png",
  },
  {
    question_slug: "piecewise-quadratic-function-no-calculator",
    question_name: "Piecewise Quadratic Function (No Calculator)",
    question_id: "cb49034f-f418-4515-b45c-e480f54031cc",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nGiven the piecewise function:  \n\n$$f(x) = \\left\\{ {\\begin{array}{*{20}{c}}\n{2{x^2} - 3x + 7}&{x \\le 3}\\\\\n{{x^2} - 9}&{x > 3}\n\\end{array}} \\right.$$  \n\nFind any value(s) of $x$ where $f(x)$ is discontinuous and describe what kind of discontinuity it is.",
    option_1_id: "572eaf9b-ca78-429e-96b6-283ffd6f2b6c",
    option_2_id: "9089e6a6-b8d9-45d6-9cf9-fc59e9b87d3b",
    option_3_id: "352e3e82-d1b9-4c13-b71a-0ec1e96e35f6",
    option_4_id: "3cc041bc-ad55-4742-9703-6dc8730123e6",
    option_1: "Discontinuous at $x=3$; removable point discontinuity",
    option_2: "Discontinuous at $x=3$; non-removable jump discontinuity",
    option_3: "Discontinuous at $x=3$; non-removable infinite discontinuity",
    option_4: "The function is continuous everywhere",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-9Rw16kvkJttk.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-17C63W3nrnSR.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-ZN1Vgwb3vPbd.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-TGfJskW1RDKy.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-MXXq5rChrGWd.png",
  },
  {
    question_slug: "intermediate-value-theorem-no-calculator-1",
    question_name: "Intermediate Value Theorem (No Calculator)",
    question_id: "cc7f1218-a366-4a7e-b210-0bf2284da825",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nGiven that a function $f(x)$ is continuous and that $f(0)=2$ and $f(4)=-1$, which $y$-value must the function at some point equal on the interval $(0,4)$?",
    option_1_id: "f72ec760-d55e-4e09-9bcf-040c51a66f44",
    option_2_id: "793c00c5-733b-43b8-8834-dc52111361f5",
    option_3_id: "777f790c-9042-40b5-b794-6e00db2e3375",
    option_4_id: "dbbb084e-4157-4ed7-a1c3-3b5641feb06a",
    option_1: "$2$",
    option_2: "$0$",
    option_3: "$-1$",
    option_4: "$-2$",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-AGJ2aZgqF55C.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-KnynEwPTngYe.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-8BjMXUHsQSrh.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-MnC2GTmvdCQH.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-hFbwqK2QErex.png",
  },
  {
    question_slug: "create-a-table-to-find-limit-calculator",
    question_name: "Create a Table to Find Limit (Calculator)",
    question_id: "873f18c5-8ef0-4eaf-99e7-e3022608ccd7",
    question_prompt:
      "Create a table to find $\\lim\\limits _{ x\\rightarrow { 3 }^{ + } }{ \\cfrac { 1 }{ \\sqrt { -x+3 }  }  } $.",
    option_1_id: "8d4ea235-b38a-422d-8296-5b4f979d0480",
    option_2_id: "c1cd1d9d-2ddd-46f1-8dbb-c22f4916278a",
    option_3_id: "a04c00f0-0a77-4bc8-adb6-39c0d061de38",
    option_4_id: "fab51308-644a-4221-af52-15de2f8de8fb",
    option_1: "nonexistent",
    option_2: "$10$",
    option_3: "$\\infty$",
    option_4: "$31.6228$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-UUnh86MXnHzs.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-BmacMAFqveZH.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-Wz4zcM5jaeZs.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-vsdq9xdXJf8Y.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-229kPS9whsJ3.png",
  },
  {
    question_slug: "continuity-within-a-functions-domain-no-calculator",
    question_name: "Continuity Within a Function's Domain (No Calculator)",
    question_id: "8b710bb2-c402-4283-b1a2-7773e8315d4b",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhich of the following is not a point of discontinuity for the function $y=\\sqrt{2x-3}$?",
    option_1_id: "ca53baef-011a-47f2-ad69-b52fa0b68840",
    option_2_id: "3c2390f7-a19a-40d1-a90f-db16cbedc6ed",
    option_3_id: "3cc15d55-bf87-405d-988a-bc76ab8a7886",
    option_4_id: "2d5e3ab8-ae3e-4a29-beca-3b310911e254",
    option_1: "$x=0$",
    option_2: "$x=\\dfrac{3}{2}$",
    option_3: "$x=-1$",
    option_4: "$x=1$",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-keG6Un16YuPh.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-2RrmTbyw5emQ.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-S2Js4vnjRyeK.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-eHxUEUb1wDKt.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-3Xy6a3mYbYUg.png",
  },
  {
    question_slug: "negative-exponents-no-calculator",
    question_name: "Negative Exponents (No Calculator)",
    question_id: "1a76cedd-c35c-473e-b86d-9cb02120a849",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nCompute the limit.    \n\n$$ \\lim_{x\\to \\infty }\\dfrac{10}{5-15^{-\\frac{x}{2}}} $$",
    option_1_id: "f309529c-46b6-478f-875e-d5a57b7a0632",
    option_2_id: "3461b166-f5c9-4f7a-8b5f-8f796285cade",
    option_3_id: "cb620d60-fd0a-46c3-a77f-c36e1980ad27",
    option_4_id: "95406890-a7df-4a78-ac9d-f44fccb21258",
    option_1: "$-1$",
    option_2: "$1$",
    option_3: "$2$",
    option_4: "$10$",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-8YUGYVV76Yby.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-gfCxv2TyD8qz.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-j6u8zkqgpNCd.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-2fJgbRYkk9eY.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-aAtVXZbS696p.png",
  },
  {
    question_slug: "limits-and-continuity-of-piecewise-function-no-calculator",
    question_name:
      "Limits and Continuity of Piecewise Function (No Calculator)",
    question_id: "038848e9-03db-4ae5-84c6-937ed9594199",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nConsider the following piecewise function:    \n\n$$f(x)=\\left\\{ \\begin{matrix} 2{ x }^{ 2 } & x<0 \\\\ 2 & x=0 \\\\ 2\\sin{x} & x>0 \\end{matrix} \\right.$$  \n\n...which of the following pairs of statements about the continuity of the piecewise function is true?",
    option_1_id: "4a11d4f1-1367-4d2e-944a-4fe9c574eaaf",
    option_2_id: "660b1197-832b-42f0-a299-61ef612d164a",
    option_3_id: "54bd5795-7fbf-4ce7-a7c5-e599c78e479e",
    option_4_id: "0cd67458-8476-4408-9c69-e93c5c3f80ca",
    option_1:
      "$f(x)$ is continuous at all points in the domain.  \nThe limit exists for each point of $f(x)$ in the domain.",
    option_2:
      "$f(x)$ is continuous at all points on $(-1,0)$.  \nSince there is a removable discontinuity at $x=0$, the limit does not exist for each point of $f(x)$ in the domain.",
    option_3:
      "$f(x)$ is continuous at all points on $(-1,1)$.  \nThe limit exists for each point of $f(x)$ in the domain.",
    option_4:
      "$f(x)$ is continuous at all points on $(0,1)$.  \nThe limit exists for each point of $f(x)$ in the domain.",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-hpuk1sFZBfkb.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-d74WcraRJ8Uv.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-vCMFw6eBUjTq.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-vAUgTN6kXCup.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-r7dyucc9FUkU.png",
  },
  {
    question_slug: "which-function-matches-the-limit-no-calculator",
    question_name: "Which Function Matches the Limit? (No Calculator)",
    question_id: "f71d3cea-547d-4345-9b73-e8e4169b5812",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nA function $n$ satisfies the condition $\\displaystyle\\lim_{x\\to2}n(x)$ is nonexistent.  Which of these could be the function?",
    option_1_id: "44234a51-6303-4da8-b048-72b46fd7712b",
    option_2_id: "0fbba95a-9e7c-49d9-8081-0aa7c938cb45",
    option_3_id: "2d3541d9-daf6-4323-a686-e9b87d717f70",
    option_4_id: "d661e14d-1ed7-4337-b45c-c3211f54ae30",
    option_1: "$y=\\dfrac{x-2}{x+3}$",
    option_2:
      "[s:d47f8bf1-2ee0-4e56-b267-c88f96e7f594:Line with Hole:image]\n\n",
    option_3:
      "| $x$ |$1.58$|$1.82$|$1.95$|$1.99$|$2$|$2.001$|$2.01$|$2.12$|$2.4$|\n|----|-----|-------|--------|------|----|------|-----|------|-----|\n|$f(x)$|$4.8$|$4.89$|$4.99$|$1.99$|$5$|$10.03$|$10.12$|$10.33$|$10.41$|\n",
    option_4:
      "$y=\\begin{cases} 3x+1\\text{  ,  } x<2\\\\9\\text{  ,  }x=2\\\\x^2+3\\text{  ,  }x>2\\end{cases}$",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-AvpmKyKypyZr.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-CunDmmEy8G9N.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-jDN73zYzVS8M.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-WjUVDeYeBFnu.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-UAqaMsnMuhnn.png",
  },
  {
    question_slug: "error-in-continuity-no-calculator",
    question_name: "Error in Continuity (No Calculator)",
    question_id: "4ed44205-e2bb-432b-9de1-ea93be29b631",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nA student attempted to prove that the function $f(x)=\\dfrac{2x^2-9x+4}{x^2-x-12}$ was continuous at $x=4$.  In which step, if any, does an error first appear?\n\n**Step 1:**  $f(x)=\\dfrac{2x^2-9x+4}{x^2-x-12} = \\dfrac{(2x-1)(x-4)}{(x+3)(x-4)}$\n\n**Step 2:**   $\\displaystyle\\lim_{x\\to 4}f(x)=\\lim_{x\\to 4}\\dfrac{2x-1}{x+3}=1$\n\n**Step 3:**  $f(4)=\\dfrac{2x-1}{x+3}=1$\n\n**Step 4:** $f(4)=\\displaystyle\\lim_{x\\to 4}f(x)=1\\text{ so }f(x)\\text{ is continuous at }x=4$",
    option_1_id: "6ac19974-3db1-4d04-8e0f-617f1a113772",
    option_2_id: "5b0b580f-0e50-4547-be28-396826f0692b",
    option_3_id: "c2b56328-ab0f-4eeb-b794-21427e70719a",
    option_4_id: "67bf973f-40b8-4e83-a375-0ff75a4fc307",
    option_1: "$\\text{Step }1$",
    option_2: "$\\text{Step }2$",
    option_3: "$\\text{Step }3$",
    option_4: "There was no error.  The function is continuous at $x=4$.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-zTRqrqCmPs5T.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-VfMtzz9GScyG.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-4TjejebDmx5m.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-NC2J72rmG8Wq.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-Y52vX1x6H4MX.png",
  },
  {
    question_slug:
      "comparing-rates-of-change-to-negative-infinity-no-calculator",
    question_name:
      "Comparing Rates of Change to Negative Infinity (No Calculator)",
    question_id: "832ceff0-c7a0-4dee-8c8b-ae465d5a875d",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvaluate:\n\n$$\\lim _{ x\\rightarrow -\\infty  }{ \\dfrac { { x }^{ 102 } }{ { e }^{ x } }  } $$",
    option_1_id: "297b7220-5bfc-4684-a48a-a1124e4708fd",
    option_2_id: "7942d149-67d7-42c2-b4be-d30bb4169e2d",
    option_3_id: "5b49a032-7b43-495c-8986-01fce0d02d39",
    option_4_id: "57e911a6-df7c-4eab-9b99-fdd3616e3fa6",
    option_1: "$0$",
    option_2: "$1$",
    option_3: "$\\infty$",
    option_4: "$-\\infty$",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-SJR48b8CP1UT.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-VAhxQ4GNCsTJ.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-bhG21NWypXaP.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-7BCX2ZeAfm22.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-kaUnu1QxtjDt.png",
  },
  {
    question_slug: "rational-function-limit-no-calculator",
    question_name: "Rational Function Limit (No Calculator)",
    question_id: "c5e33e0f-41c5-4d01-bc58-7518483f569a",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind the following:    \n\n$$ \\lim_{x\\to1}\\dfrac{x^{5}-1}{x-1} $$",
    option_1_id: "64f740fd-4691-4bf9-8404-6db41ee8cb32",
    option_2_id: "d8d6d1d9-3f34-47c5-8f59-323698422909",
    option_3_id: "9dede02e-30ac-43ad-92f6-987b6fbeadb2",
    option_4_id: "b8ede374-7c90-4d41-979f-f92a895631e0",
    option_1: "$0$",
    option_2: "$1$",
    option_3: "$5$",
    option_4: "The limit does not exist.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-EJfcdJZJzpxV.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-T46K99PawTH5.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-1X2pStBzMRW8.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-WUt4XSSNHefr.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-aSNjgpZZVMaR.png",
  },
  {
    question_slug: "why-does-the-limit-not-exist-calculator",
    question_name: "Why Does the Limit Not Exist? (Calculator)",
    question_id: "618e5ab2-d837-4896-9902-72bc6c426229",
    question_prompt:
      "Based on the graph of  $\\cos { \\left(\\cfrac { 1 }{ { x }^{ 2 } } \\right) } $, why does $\\lim\\limits _{ x\\rightarrow 0 }{ \\cos { \\left(\\cfrac { 1 }{ { x }^{ 2 } } \\right) }  }$ not exist?",
    option_1_id: "097fa264-2911-42e6-bf52-ca06c7d2bf4f",
    option_2_id: "94150f82-0fcf-4de6-9bf2-14981ebd7c4e",
    option_3_id: "43119e1b-abfa-4b5f-9781-dc8e3ecb1e95",
    option_4_id: "f968c378-b7c0-41e0-88c9-a4cb1691c5bf",
    option_1: "The function is oscillating as $x$ approaches $0$.",
    option_2:
      "The limit does exist, $\\lim\\limits _{ x\\rightarrow 0 }{ \\cos { (\\cfrac { 1 }{ { x }^{ 2 } } ) }  }=1$.",
    option_3: "The left side limit does not equal the right side limit.",
    option_4: "The function is unbounded.",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-ahryYpwe5fzq.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-aegqCufSpvCB.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-qzk2GXum2VzE.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-6XKx33ENxuhm.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-q8qFDMF9hERs.png",
  },
  {
    question_slug: "algebraic-limit-and-challenging-exponential-no-calculator",
    question_name:
      "Algebraic Limit and Challenging Exponential (No Calculator)",
    question_id: "f65b92a8-0335-4e8e-9ba2-6443faca3074",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nConsider the function, $f(x) = \\dfrac{1}{{4 + {4^{1/x}}}}$.  \n\nFind the value of $\\lim \\limits_{x \\to {0^ - }}f(x)$.",
    option_1_id: "fb3b2a1f-733c-4300-819d-dddb8217f6e6",
    option_2_id: "e31c30be-5e96-4a18-999c-5f12d3b978e5",
    option_3_id: "05409d6e-e07a-47b4-bd89-5001152e0fa2",
    option_4_id: "7404cebc-932d-49a1-8e63-af4233e984ad",
    option_1: "$\\dfrac{1}{5}$",
    option_2: "$\\dfrac{1}{4}$",
    option_3: "$0$",
    option_4: "The limit does not exist.",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-Ad9eAhWnmyAJ.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-SA7ZuxJ41J8j.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-bc79XxPsgcKF.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-tmwbeRg7dHZW.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-t4WVa6Rs7A57.png",
  },
  {
    question_slug: "exponential-piecewise-function-no-calculator",
    question_name: "Exponential Piecewise Function (No Calculator)",
    question_id: "ddade753-4bf9-4143-96d1-a32e66fdbbae",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nIf $f(x) = \\left\\{ {\\begin{array}{*{20}{c}}\n{e^x}&{x \\lt \\ln 2}\\\\\n{2}&{x \\geq \\ln 2 }\n\\end{array}} \\right.$ then, $\\lim \\limits_{x \\to \\ln 2} f(x) =$",
    option_1_id: "34c52e43-45b1-46a1-8bf4-6f2002e13876",
    option_2_id: "c4f3fc24-51ba-4eec-bb84-b01ecd09c690",
    option_3_id: "f59f8561-0471-4a6c-9ff4-404a371f7b85",
    option_4_id: "b1474711-3509-4bfb-aebf-1a1a0f4f4a98",
    option_1: "Nonexistent.",
    option_2: "$\\ln 2$",
    option_3: "$2$",
    option_4: "$e^2$",
    key: "option_3_id",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-Unc4XSEvjUrG.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-qVrHSM69amxY.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-FVSvrUTMJGzN.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-sPjMAcJzKRAu.png",
  },
  {
    question_slug: "a-function-of-ordered-pairs-no-calculator",
    question_name: "A Function of Ordered Pairs (No Calculator)",
    question_id: "9d324fb9-f48a-46fb-ae00-ee3fb7e77b5a",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nSuppose we have a function $f(x)$ that is defined by the set of ordered pairs below:    \n\n$$\\left\\{ \\left( -5,3 \\right) ,\\left( -3,6 \\right) ,\\left( -2,0 \\right) ,\\left( 0,7 \\right) ,\\left( 3,1 \\right) \\right\\} $$  \n\nAt which of the values in the domain of $f(x)$ is $f(x)$ continuous?\n\n\n",
    option_1_id: "5e01b147-5cc1-43e6-b84a-506ae54e1f82",
    option_2_id: "43d112a8-5aca-4cd1-a47b-a314b091f4e0",
    option_3_id: "e92b51e6-dd77-4e7c-bd64-d45c31961b3a",
    option_4_id: "8672253b-cea7-409c-a178-925fe36fc97d",
    option_1: "$-2 $",
    option_2: "${-5,3}$",
    option_3: "${-3,0}$",
    option_4:
      "The function is not continuous at any of the values in the domain of $f$.",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-GBNDs48tkXJe.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-6tuHMuXMT8mm.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-HuVCMWfQcXEz.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-rnBt7KxQSpSH.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-GH61jxvPNTPZ.png",
  },
  {
    question_slug: "limits-with-removable-discontinuities-no-calculator",
    question_name: "Limits with Removable Discontinuities (No Calculator)",
    question_id: "34b0a42d-e11d-4e59-815b-aa5660f908f1",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind the following limit, if it exists:    \n\n$$\\lim _{ x\\rightarrow 2 }{ \\frac { { x }^{ 3 }+5{ x }^{ 2 }-14x }{ { x }^{ 2 }-7x+10 }  }  $$",
    option_1_id: "d41c55c3-99b8-455e-8321-75396f1562e9",
    option_2_id: "bb8c3332-7560-4171-861f-d6d65d4bd74c",
    option_3_id: "c6d8c28f-f538-40fc-aa34-5e10bdac592d",
    option_4_id: "116d2ad3-8026-462a-bd23-637cd1730188",
    option_1: "$0$",
    option_2: "$1$",
    option_3: "$-6$",
    option_4: "The limit does not exist.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-m2S5UmVaPK2u.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-DtbNEkTaqC33.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-zJjRWn2zVH6p.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-abs73YNWcsmR.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-FqNFjeXVdfAZ.png",
  },
  {
    question_slug: "types-of-discontinuities-power-functions-no-calculator",
    question_name: "Types of Discontinuities: Power Functions (No Calculator)",
    question_id: "ff7c2070-5ee2-4df6-90ff-8e36411dd488",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nOn which of the following intervals is $f(x)=x^\\frac{2}{3}$ not continuous?",
    option_1_id: "8b1f1ad2-8430-4088-af37-2de3657cf910",
    option_2_id: "faf47e9f-b560-4f00-ae04-d31eace7e3f0",
    option_3_id: "0bc8049c-32bf-4d63-9afc-a24fc48c1e9f",
    option_4_id: "be8acca8-5617-4e7b-8a40-b44bc4254de1",
    option_1: "$(-1,1)$",
    option_2: "$[-1,0]$",
    option_3: "$[0,1]$",
    option_4: "None; $f(x)$ is continuous on every interval.",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-a7y3vUkDhFft.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-y6MgmZyBxZRu.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-jy8GSKRketm8.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-dMTJJwu7yfjb.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-8MxdPcdASCwy.png",
  },
  {
    question_slug: "trig-square-root-no-calculator",
    question_name: "Trig Square Root (No Calculator)",
    question_id: "d0d27062-fc51-46a3-a1e6-41ee7194ffc6",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind the limit of:    \n\n$$\\lim _{ x\\xrightarrow { } \\infty }{ \\sqrt { \\left( \\dfrac { x+\\sin { x } }{ x-\\cos { x } } \\right) } } =$$\n",
    option_1_id: "e13c5d0e-1ff9-4f92-b825-e8c6f35b8e11",
    option_2_id: "20a910d9-edd3-461f-bea2-52baa7f60097",
    option_3_id: "9dcd98f3-643e-4a48-9237-d2ac7391a587",
    option_4_id: "270c6f04-0cde-4d7d-a39f-474c4e0d1096",
    option_1: "The limit does not exist.",
    option_2: "$1$",
    option_3: "$-1$",
    option_4: "$\\infty$",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-9XTcXh5hRnBu.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-qsaAWM6ge5JR.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-kdyNGPtq5bXk.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-2QvjTnjYu2Tx.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-5nXfzpX2GSjq.png",
  },
  {
    question_slug: "finding-the-limit-of-cfrac-x-x-no-calculator",
    question_name:
      "Finding the Limit of $\\cfrac { | x | }{ x }$ (No Calculator)",
    question_id: "5f2079ef-54dc-44d1-a089-272a778cb3d7",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvaluate the limit of:    \n\n$$\\lim _{ x\\xrightarrow { } 0 }{ \\dfrac { | x | }{ x } } $$",
    option_1_id: "e440f539-8731-432c-8395-e7a98a291a6a",
    option_2_id: "71c8a260-af5d-4a82-aaed-97dda4de7160",
    option_3_id: "8c9439e6-aecc-446d-9b9b-90ee02e9ba6c",
    option_4_id: "cb0f8c2d-eeb5-43d0-be0f-775eba4b30ee",
    option_1: "$1$",
    option_2: "$-1$",
    option_3: "$0$",
    option_4: "Nonexistent.",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-9dQwWJSDQ6Ju.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-ymtH9EZZz5e6.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-y8NAx681nsW8.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-yGvyjD1cVnN4.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-XCybh8k6abZS.png",
  },
  {
    question_slug: "limit-of-exponential-function-no-calculator",
    question_name: "Limit of Exponential Function (No Calculator)",
    question_id: "3c4307b6-bd70-4037-b2b3-14d45af9b9a7",
    question_prompt:
      "**No calculator is allowed on this question.**\n\n$\\lim \\limits_{x \\to -1} e^{x+1}+2$ is:",
    option_1_id: "234bd6e1-040e-48bc-872a-71a0c7344d0a",
    option_2_id: "54ad3aa7-3975-41b9-a786-efc41f38cc2b",
    option_3_id: "64c0d6cf-ac48-40de-93fb-2d9dc9d36914",
    option_4_id: "127b5ca6-da11-45a9-9737-aaf941e194f1",
    option_1: "$3$",
    option_2: "$2$",
    option_3: "$e^{-1}+3$",
    option_4: "$\\dfrac{1}{e}+2$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-GxxaMc5NeJth.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-Kt1sEYqdJc9g.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-byPHc3pSZcJW.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-KkN3mc2zyq4F.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-spDSrD72tXzU.png",
  },
  {
    question_slug: "which-is-guaranteed-by-ivt-no-calculator",
    question_name: "Which is guaranteed by IVT? (No Calculator)",
    question_id: "b545a0d2-4c55-452b-8964-8bbbf50b9bf3",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nA function $g$ is continuous on the interval $[-3,1]$.  It is known that $g(-3)=2$ and $g(1)=8$.  There is an $x$-value $c$ such that $-3<c<1$.  Which of the following must have a solution somewhere in the interval $(-3,1)$?",
    option_1_id: "3f53225b-266e-4a67-8e83-fc02ebb2f36a",
    option_2_id: "39c29c11-fb60-42b8-aaff-d8ce7f13fae0",
    option_3_id: "4ccf7097-6d89-4e3c-ba77-3e797da9d8d2",
    option_4_id: "cae520b8-e7b7-4cb6-a6cb-c93217d250c4",
    option_1: "$g(c)=0$",
    option_2: "$g(c)=2$",
    option_3: "$g(c)=5$",
    option_4: "$g(c)=10$",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-QS24x5wkMzpE.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-n2s6cKhwTFvg.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-vvsA2yCgWnAm.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-xQrg3S4q14ny.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-UV76bZSWC1bF.png",
  },
  {
    question_slug:
      "continuity-with-jump-and-infinite-discontinuities-no-calculator",
    question_name:
      "Continuity with Jump and Infinite Discontinuities (No Calculator)",
    question_id: "10adffea-bbdb-4bc7-a544-e62c3945ccfb",
    question_prompt:
      "**No calculator is allowed on this question.**\n\n[s:aabf2da6-290f-4d85-b496-7d1f83449eca:Jump and Infinite Discontinuity:image]  \n\nWhich of the following  sets of statements accurately describes​ continuity of the above graph of $f(x)$?",
    option_1_id: "89240d96-23da-4974-b39a-9c31bd2c0f1e",
    option_2_id: "65896b02-8cf1-4bb9-8c2a-e79596298214",
    option_3_id: "4d8af57a-bc0c-406d-958d-aa13900fc3bd",
    option_4_id: "bc3bf001-a9f8-4e55-bb9a-5f8a44a9eae9",
    option_1:
      "$f(x)$ is continuous for all $x$: $(-\\infty,-1)$U$(-1,0)$U$[0,2]$U$(2, \\infty)$.",
    option_2:
      "$f(x)$ is continuous for all $x$: $(-\\infty,-1)$U$(-1,0)$U$[0,2)$U$(2, \\infty)$.",
    option_3:
      "$f(x)$ is continuous for all $x$: $(-\\infty,-1)$U$[-1,0)$U$[0,2)$U$(2, \\infty)$.",
    option_4:
      "$f(x)$ is continuous for all $x$: $(-\\infty,-1)$U$[-1,0]$U$[0,2)$U$(2, \\infty)$.",
    key: "option_2_id",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-D3WnxRM1pzZZ.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-sZSVv2zeUbkn.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-xW3ENWB7g1SP.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-wm8j1GzQjuCa.png",
  },
  {
    question_slug: "approximate-instantaneous-rate-of-change-no-calculator",
    question_name: "Approximate Instantaneous Rate of Change (No Calculator)",
    question_id: "8fea62ee-4616-442b-a4ee-fe3af7595b4f",
    question_prompt:
      "At which point does the function have an approximate instantaneous rate of change of $2$?\n\n[s:4db1d67b-b670-456a-93b4-11c311621aff:Instantaneous Rate of Change Points:image]",
    option_1_id: "4ff14565-a4d4-44f1-98c1-f6b087ae38bf",
    option_2_id: "e1720636-5f68-4206-8e9f-c3a43d522529",
    option_3_id: "ce9ea9ad-5ffc-46e1-86a9-692bfa7eaeae",
    option_4_id: "12e6ab20-0458-441f-bc46-7140636d112e",
    option_1: "Point $A$",
    option_2: "Point $B$",
    option_3: "Point $C$",
    option_4: "Point $D$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-S9dPxEcdeeue.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-z6CbkFUGtuUp.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-FRdWnt9tuJ5f.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-yQFxu9wdBtZ7.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-5mdMfhgCsVQP.png",
  },
  {
    question_slug: "discontinuities-in-rational-functions-no-calculator",
    question_name: "Discontinuities in Rational Functions (No Calculator)",
    question_id: "2813a403-3ea5-4084-bcb1-2089d2ce2fd0",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhich of the following is not a removable point of discontinuity for the function:    \n\n$$f(x)=\\frac{x(x-2)(x-3)(x-4)^3}{x(x-2)^2(x-3)(x-4)^3}?$$",
    option_1_id: "1c58eb73-2758-404a-b349-6487251c6599",
    option_2_id: "c084a5ac-a082-4977-82de-3d3201adfa64",
    option_3_id: "ed023ecd-cde4-4b40-bb29-7128c4ce4758",
    option_4_id: "ee25a263-41e3-4533-8edb-cf05ef383927",
    option_1: "$x=0$",
    option_2: "$x=2$",
    option_3: "$x=3$",
    option_4: "$x=4$",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-2ztkMcjq79vT.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-KVncUmYdsKZ1.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-ezeDQnKtZtq3.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-xNr8FnqsRBTf.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-htgmfn4t9f8W.png",
  },
  {
    question_slug: "piecewise-function-and-continuity-no-calculator",
    question_name: "Piecewise Function and Continuity (No Calculator)",
    question_id: "1b25ef78-3fad-4db7-918f-cc62bfdeb8e5",
    question_prompt:
      "**A calculator is not allowed on this question.**\n\nFind the value of $a$ that will make the function below continuous on the interval $[0,\\infty)$:\n\n$$f(x) = \\begin{cases} ax+\\frac{ \\pi}{2 }, \\quad 0\\le x \\le \\frac{ \\pi}{ 2} \\\\  \\pi \\sin{x}, \\quad x \\ge \\frac{ \\pi}{2 } \\end{cases}$$",
    option_1_id: "03c1b831-1fb8-4eab-9748-97d4cc780494",
    option_2_id: "a6c396c7-5ca8-4a54-bcc8-619aacf62251",
    option_3_id: "1ff6405d-bd0d-4c72-9d21-e411d3855566",
    option_4_id: "69793b3d-24ef-4fe6-8414-d8586f383d95",
    option_1: "$a=1$",
    option_2: "$a=-1$",
    option_3: "$a=\\dfrac{\\pi}{2}$",
    option_4: "$a=\\pi$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-6AJKpkzRj8Bc.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-xXke2SvZDZwR.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-8DWCwxwqqyVn.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-CeRA6pRJW3fJ.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-94VnwdXVhnDN.png",
  },
  {
    question_slug:
      "locating-discontinuities-at-vertical-asymptote-no-calculator",
    question_name:
      "Locating Discontinuities at Vertical Asymptote (No Calculator)",
    question_id: "cb95202a-2070-4bea-86d0-4a96eaf2b275",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nGiven the function $f(x)=\\dfrac{x^2-x-12}{x^2-6x+8}$, at which $x$-value(s) is there a discontinuity due to a vertical asymptote?\n\n[ol-type=I]\n1. $x=-3$\n2. $x=2$\n3. $x=4$\n\n[/ol-type]",
    option_1_id: "e6031f69-1310-4920-9158-fcfffa0cc098",
    option_2_id: "9eb21446-6a37-4b21-9ae5-1a87c1f9749c",
    option_3_id: "0ddf0879-9f54-4a31-8416-1161b2a5383a",
    option_4_id: "6b76c8c5-0dc4-4e1e-8288-ae756d3941b9",
    option_1: "I only",
    option_2: "II only",
    option_3: "I and II only",
    option_4: "II and III only",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-eZtqgnBKeF3Z.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-4D41ve8tmfeM.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-vwsQrfktZHPq.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-pffgK8FSeG1e.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-1arUdsusvVNw.png",
  },
  {
    question_slug: "upper-and-lower-bounds-hard-no-calculator",
    question_name: "Upper and Lower Bounds Hard (No Calculator)",
    question_id: "fab79249-8520-418a-958e-cb76354350b3",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhich of the following functions has an upper bound but no lower bound?",
    option_1_id: "07b10e0d-c8b1-49a1-a4ce-d5adcd7fe91b",
    option_2_id: "ca2ff1e3-f281-4bdf-b787-0f4cdcaedc05",
    option_3_id: "82c475c1-f51b-421f-97b6-55b474c94bc3",
    option_4_id: "6f47d69d-2b2e-4e8b-af47-30c4120b0d93",
    option_1: "$y=\\tan^{-1}x$",
    option_2: "$y=\\dfrac{1}{1-x^2}$",
    option_3: "$y=\\dfrac{|x|}{x}$",
    option_4: "$y=-e^{-x}$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-z1bXKx5rst9z.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-n26JsD9dGp1Q.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-uX7xtvJ7m4RS.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-Jb2Nxq5mJ2fu.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-pwrwUQ7S3Dh4.png",
  },
  {
    question_slug: "guaranteed-values-with-ivt-no-calculator",
    question_name: "Guaranteed Values with IVT (No Calculator)",
    question_id: "4345dac7-fd3c-4951-b4ba-7f248a0bba93",
    question_prompt:
      "**No calculator is allowed on this question.**\n\n| $x$ |$0$|$2$|$4$|$6$|$8$|$10$|\n|----|-----|-------|--------|------|----|------|\n|$f(x)$|$-4$|$3$|$9$|$-1$|$-2$|$1$|\n\nA function $g$ is continuous on the interval $[0,10]$.  The table above gives values of the function at selected $x$-values.  What is the fewest possible number of zeroes of $g$ on the interval $[0,10]$?",
    option_1_id: "5f8221c5-4c00-4afa-abbb-47e5f2a5e9d4",
    option_2_id: "1ba2bf6c-65ce-4fd7-970f-801584054e92",
    option_3_id: "9a0edafe-0228-41c9-98c4-5544496a8956",
    option_4_id: "91faf398-c7e1-4d3a-a910-67f75b0d7182",
    option_1: "Zero, because none of the function values shown is $0$",
    option_2: "One, because the function is continuous and $f(0)<0<f(10)$",
    option_3:
      "Two, because there are two times the function switches from positive values to negative values",
    option_4:
      "Three, because the function is continuous and $f(0)<0<f(2)$, $f(4)>0>f(6)$, and $f(8)<0<f(10)$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-ybxaWMJMzFrV.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-zqTvzqatj61p.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-bbSSZT9NapWn.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-bH3FCPtK1xzu.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-pdFXs4yXAU3q.png",
  },
  {
    question_slug: "graphical-analysis-discontinuities-no-calculator",
    question_name: "Graphical Analysis: Discontinuities (No Calculator)",
    question_id: "59c5ae23-0019-4ad3-b4de-577d32309717",
    question_prompt:
      "**No calculator is allowed on this question.**\n\n[s:0f30a729-cf37-44e9-8929-e636706db962:Graphical_analysis_discontinuity:image]  \n\nAt which of the following locations of the function graphed above is there a removable discontinuity?\n",
    option_1_id: "02ade2a5-f954-400a-b05b-09bbed31c013",
    option_2_id: "bc9f1f50-e6e7-44d8-a70b-2de136369f37",
    option_3_id: "977e8b2b-fd45-4090-8489-6a84f90a068c",
    option_4_id: "abe76117-e13c-44bd-94c6-dcdc33b58094",
    option_1: "$x=5$",
    option_2: "$x=1$",
    option_3: "$x=-3$",
    option_4: "$x=-6$",
    key: "option_4_id",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-4s5GtdKU6rPt.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-E2HQymx7erYf.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-qf3yXT9QzvMU.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-dxcwwjJSvwZF.png",
  },
  {
    question_slug: "relative-magnitudes-of-functions-no-calculator",
    question_name: "Relative Magnitudes of Functions (No Calculator)",
    question_id: "81c6d9ec-39c9-4cdb-a82d-5885b433c98e",
    question_prompt:
      "**No calculator is allowed on this question.**  \n\nOrder the following three functions in increasing order of magnitude as $x$ approaches infinity.\n\n> **I.** $f(x)=2{ e }^{ x }$\n\n> **II.** $f(x)=200{ x }^{ 5 }$\n\n> **III.** $f(x)=50 \\ln(x)$",
    option_1_id: "69df9207-d42c-477a-8ee0-34fb654ca7e5",
    option_2_id: "7e484c8d-5a41-4630-a2a2-0fa8a304745e",
    option_3_id: "09e07a0d-2038-4d6b-9c4f-93f005f61631",
    option_4_id: "27a4caad-af40-4636-b842-6d2551993b26",
    option_1: "I, II, III",
    option_2: "II, III, I",
    option_3: "III, I, II",
    option_4: "III, II, I",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-1vjTJh88QGfF.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-q3HNqPzD1Tqp.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-p7Kj2Gwyf4K8.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-j94tNR1tWcuc.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-cH3JkqAP41VT.png",
  },
  {
    question_slug: "true-for-f-x-tan-2x-no-calculator",
    question_name: "True for $f(x) = \\tan {(2x)}$ (No Calculator)",
    question_id: "dcce1200-d393-4a96-bc59-29c2eaac95ce",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhich of the following statements is true for $f(x) = \\tan {(2x)}$?\n\n\n>**I.** $\\mathop {\\lim }\\limits_{x \\to \\frac{\\pi }{4}} f(x)$ does not exist.  \n>**II.** $\\mathop {\\lim }\\limits_{x \\to {{\\frac{\\pi }{4}}^ + }} f(x) = \\infty $  \n>**III.** $\\mathop {\\lim }\\limits_{x \\to {{\\frac{\\pi }{4}}^ - }} f(x)\\, = \\infty $    \n\n\n",
    option_1_id: "2ccb8b0f-f534-45a8-b3e4-a53cb7778b84",
    option_2_id: "a2bdaa83-b46c-4435-9f11-29cec55555e5",
    option_3_id: "22eab3c4-c35a-4b0d-bf46-eeb018430e96",
    option_4_id: "1e866481-c943-4a1d-85fc-448003a84162",
    option_1: "I only.",
    option_2: "I and II only.",
    option_3: "I and III only.",
    option_4: "I, II, and III.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-C4Zyh2TPmp7j.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-1UGJM9Wu1S2d.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-RmrH3jrU8krV.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-8sWrf364qSVG.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-pXfywTKbv7XQ.png",
  },
  {
    question_slug: "satisfy-the-intermediate-value-theorem-no-calculator",
    question_name: "Satisfy the Intermediate Value Theorem (No Calculator)",
    question_id: "a4af23cc-15c0-420b-87ec-f82274683f57",
    question_prompt:
      "**A calculator is not allowed on this question.**\n\nLet $f(x)$ be a continuous function on the closed interval $[a,b]$ such that $f(1)=5$ and $f(2)=8$; then:",
    option_1_id: "f4ba3d1c-b958-4d40-80a3-b77553368cfd",
    option_2_id: "17057ca2-1b0b-42b5-b72f-b1fa829fb3d7",
    option_3_id: "430cf803-0ef8-446c-a3e6-6d025965b1d0",
    option_4_id: "c594b0e8-e9d8-4942-9b0e-40127f192c12",
    option_1:
      "There is, at least, a number $c$ between $1$ and $2$ such that $f(c)=7$.",
    option_2:
      "There is, at least, a number $c$ between $5$ and $8$ such that $f(c)=1.5$.",
    option_3:
      "There is, at least, a number $c$ between $1$ and $2$ such that $f'(c)=0$.",
    option_4:
      "There is, at least, a number $c$ between $5$ and $8$ such that $f'(c)=0$.",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-Cq2suwESB91X.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-XAESgZ82Sx1f.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-zhUAEXTpkqJk.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-7mYcbFqB4bmv.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-j6A7yp5E8z3n.png",
  },
  {
    question_slug: "requirements-of-continuity-no-calculator",
    question_name: "Requirements of Continuity (No Calculator)",
    question_id: "4e8ff93a-8295-4eea-ab68-95757123b566",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nIf we know for a function $f(x)$ that $f(3)=5$, which of the following must be true in order for $f(x)$ to be continuous at $x=3$?\n\n\n>**I.** $\\mathop {\\lim }\\limits_{x \\to {3^ + }} f(x) = \\mathop {\\lim }\\limits_{x \\to {3^ - }} f(x)$  \n>**II.** $\\mathop {\\lim }\\limits_{x \\to 3} f(x) = 5$  \n>**III.** $\\mathop {\\lim }\\limits_{x \\to 5} f(x) = 3$    \n\n",
    option_1_id: "88630e3a-1b9c-498b-979e-d6e586d9aea9",
    option_2_id: "47a059e3-c31d-4e95-af37-2f5306a9c54c",
    option_3_id: "f38628ed-45a7-4191-aed1-1eb0f313ae0d",
    option_4_id: "1c343793-6ede-4c2f-b7c4-c49b7f4a8a09",
    option_1: "I only.",
    option_2: "III only.",
    option_3: "I and II only.",
    option_4: "I, II, and III.",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-h1WTgznXXtKY.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-JjnkKE8zsgPE.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-QHD5JAJ24WZW.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-MfveRZ27e9By.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-d94PYEXq8C9D.png",
  },
  {
    question_slug:
      "which-function-has-the-instantaneous-rate-of-change-calculator",
    question_name:
      "Which Function Has the Instantaneous Rate of Change? (Calculator)",
    question_id: "d778dbfb-8b98-4655-b348-928ff120893d",
    question_prompt:
      "Which of the following functions has an instantaneous rate of change of approximately $2$ when $x=1$?",
    option_1_id: "d70cf0e0-5656-42dd-b445-499711e43014",
    option_2_id: "9dd89ae9-02bf-4bbe-96ca-e441ab3aee04",
    option_3_id: "9443df76-c585-4f74-a39d-f58978ecd39e",
    option_4_id: "5337e0b7-802f-4c36-83b6-29916440010f",
    option_1: "$f(x)=\\cos(x)$",
    option_2: "$f(x)={2x}^{2}$",
    option_3: "$f(x)=3x$",
    option_4: "$f(x)={x}^{2}$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-A5m3NZeBXBkT.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-uUxeEQu4A84a.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-YW9WYnwXxSBE.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-PjSHSZNgH8ZF.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-21chA8bDPYnV.png",
  },
  {
    question_slug: "limit-with-discontinuity-no-calculator",
    question_name: "Limit with Discontinuity (No Calculator)",
    question_id: "3253d92e-c00f-4404-944e-4db63d3742d7",
    question_prompt:
      "Consider $g(x)$ below:\n\n[s:ee587c01-bace-46ba-bde2-a4320d1d5a3b:Removable Discontinuity:image]\n\nFind $\\lim\\limits _{ x\\rightarrow 1 }{ g(x) } $.",
    option_1_id: "5b3da2d4-c069-4999-9ab6-97c3709778d4",
    option_2_id: "099ae309-1682-4b37-bb38-6da49d35d373",
    option_3_id: "92f22c09-1951-49ed-a195-da140ee636c5",
    option_4_id: "4b1591f3-5b41-43f4-82d8-90192855067d",
    option_1: "The limit does not exist",
    option_2: "$0$",
    option_3: "$2$",
    option_4: "$1$",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-sQm6f98xhKAd.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-yjJ8BJq6ZEYP.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-A3Xzpc9MubPH.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-xxBevpRUDu9c.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-y5ndNu3PWnhy.png",
  },
  {
    question_slug: "complex-fraction-no-calculator",
    question_name: "Complex Fraction (No Calculator)",
    question_id: "c6c0d346-4f67-424f-8999-8e61fc60c3cf",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nFind the limit:    \n\n$$ \\lim_{x\\to0}\\dfrac{\\dfrac{1}{5+x}-\\dfrac{1}{5}}{x} $$\n\n",
    option_1_id: "0e652d53-5d23-41a7-b172-2b32a8ff78f8",
    option_2_id: "5889faae-acd5-4821-a6f3-1a1d9cac703d",
    option_3_id: "a915983f-9f80-4ff3-9988-449b6223749d",
    option_4_id: "fa937d19-ab3c-4ae0-a5a2-1be5c9791f62",
    option_1: "$\\dfrac{1}{5}$",
    option_2: "$-\\dfrac{1}{5}$",
    option_3: "$-\\dfrac{1}{25}$",
    option_4: "$\\dfrac{1}{25}$",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-YBY3WYqy66Rs.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-6D7bAGQSJRM9.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-8Mv4xTvYBJRY.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-QJ3BG11xdgbV.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-xqDrqe3n7T3P.png",
  },
  {
    question_slug: "limits-with-trig-no-calculator-bc-only",
    question_name: "Limits with Trig (No Calculator) (BC Only)",
    question_id: "c9b5c7cb-2ca0-4458-ac5d-4ed4abb9b8f5",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nCalculate the following limit:    \n\n$$\\lim _{ x\\rightarrow -2 }{ \\frac { \\sin(\\pi x)-x }{ x-2 }  } $$",
    option_1_id: "fc90cb7f-67c1-4684-9ef4-ec5ffc923d6e",
    option_2_id: "2faa8a7c-f8e6-49c6-baf5-7a6ca057569e",
    option_3_id: "f4d59f23-56d1-4138-a275-cc0c3ea410b2",
    option_4_id: "ca7e14be-e13c-452c-9cd6-19d8c579e91a",
    option_1: "$-\\dfrac { 1 }{  2 } $\n",
    option_2: "$-\\dfrac { 1 }{ 4 } $",
    option_3: "$\\dfrac { 1 }{ 2 }$",
    option_4: "Undefined.",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-UepNwCNYDT6H.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-fYvqNuvJzuXF.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-MPUPPpb5rHdw.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-jfHkcsdS3zBJ.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-AtHq1aSAgDGf.png",
  },
  {
    question_slug: "trigonometric-squeeze-theorem-no-calculator",
    question_name: "Trigonometric Squeeze Theorem (No Calculator)",
    question_id: "0392acf0-2b22-485a-a456-f172bcb69d0d",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nEvaluate: $\\displaystyle\\lim_{x\\to 0} \\dfrac{\\sin(4x)}{4x}$",
    option_1_id: "5c1fe2ee-aa12-4ecf-85d6-99f57cd08d23",
    option_2_id: "cda96265-32e4-4109-8f49-abb11fbe8905",
    option_3_id: "f5593f70-cfde-486b-9cc9-f28b004c85f4",
    option_4_id: "a27c84f5-c801-4ea7-9a98-d1a39c1a5a03",
    option_1: "$0$",
    option_2: "$1$",
    option_3: "$4$",
    option_4: "Nonexistent",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-zJmCFZcbCNju.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-d9uDPKpKRsYw.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-2ARx9ScPRw7P.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-jxVwAgDABnX4.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-KdNeNR6EQ49d.png",
  },
  {
    question_slug: "find-a-one-sided-limit-using-a-table-calculator",
    question_name: "Find a One Sided Limit Using a Table (Calculator)",
    question_id: "8c32d9e9-70f3-438a-a5cb-322cdf7d2b05",
    question_prompt:
      "Create a table to find $\\lim\\limits _{ x\\rightarrow { 4 }^{ + } }{ \\sqrt { { x }^{ 2 }-16} -7 } $.",
    option_1_id: "2f75efbd-3d48-4a84-bda8-3939fc065782",
    option_2_id: "f7d9bd10-f7dc-4053-9ec0-bbd7d8faf092",
    option_3_id: "dc0c062a-25c7-4dc3-91d2-316cd4e17ee2",
    option_4_id: "598a75e8-5058-4fa8-beb6-738301484f92",
    option_1: "$4$",
    option_2: "nonexistent ",
    option_3: "$-7$",
    option_4: "infinity",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-cgbEVNQYzsrh.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-NHqvdU9mUNPk.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-wPAA3Wa1rW1R.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-Ye6352wYFgQd.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-v6tR1KbVqr4S.png",
  },
  {
    question_slug: "determining-squeeze-theorem-no-calculator",
    question_name: "Determining Squeeze Theorem (No Calculator)",
    question_id: "0a6b4cfa-c617-450c-ae6c-bf4476dc6adf",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nA function is defined as $f(x)=\\dfrac{\\sin{(3x)}}{\\tan{(2x)}}$.  Each of the following inequalities is true on the interval $-1\\leq x\\leq 1$.  Which of these could be used along with the squeeze theorem to determine the limit of the indicated function as $x$ approaches $0$?\n\n[ol-type=I]\n1. $\\quad -6\\left(x^2-\\frac{1}{4}\\right)\\leq f(x)\\leq \\frac{3}{2}$\n2. $ \\quad -\\sec{(2x)}+\\frac{3}{2}\\leq f(x)\\leq x^4+\\frac{3}{2}$\n3. $\\quad 12\\cos{x}-\\frac{21}{2}\\leq f(x)\\leq -\\sin\\left(x-\\dfrac{\\pi}{2}\\right)+\\frac{1}{2}$\n[/ol-type]",
    option_1_id: "a399bd58-fb5a-4a5d-b2c7-78d46b668eeb",
    option_2_id: "9d913be9-f939-4f98-bd65-c3d266caf09e",
    option_3_id: "db34c083-f96e-4f8b-bf49-1a0020193aea",
    option_4_id: "bb1a8176-35d2-45aa-bc50-962915f933fe",
    option_1: "I only",
    option_2: "II only",
    option_3: "I and III only",
    option_4: "II and III only",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-Djrj6qjsUYFA.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-uWMcuHj8MD41.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-8faTZFxTcR85.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-msgARgK5D5pa.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-jHVR4gWXNR95.png",
  },
  {
    question_slug: "ivt-with-a-new-function-no-calculator",
    question_name: "IVT with a New Function (No Calculator)",
    question_id: "a66f0c3e-4aa0-470e-b473-8b259e8f1b14",
    question_prompt:
      "**No calculator is allowed on this question.**\n\n| $x$ |$1$|$2$|$3$|$4$|$5$|$6$|\n|----|-----|-------|--------|------|----|------|\n|$f(x)$|$-1$|$1$|$4$|$-1$|$-2$|$3$|\n\nThe table above gives select values of a continuous function $f$.  Another function is defined as $g(x)=3f(x)-5$.  Based on this information, which of the following equations is guaranteed to have a solution in the interval $(1, 6)$?\n\n[ol-type=I]\n1. $g(x)=-5$\n2. $g(x)=0$\n3. $g(x)=5$\n[/ol-type]",
    option_1_id: "993b3654-5251-41d2-831f-4606de299d10",
    option_2_id: "0176a32c-9fcb-49fd-8ce6-65db4b23d948",
    option_3_id: "037f016b-4ee3-4797-8981-720e6dbf790e",
    option_4_id: "58805a84-94c3-48c8-bda2-21f192268926",
    option_1: "II only",
    option_2: "I and II only",
    option_3: "II and III only",
    option_4: "I, II, and III",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-SSpXppGbMQuf.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-1zNQTXCZJj7M.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-3mSb2jgB9a9T.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-XJnrxqMXXPXk.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-27N9ughcYyYH.png",
  },
  {
    question_slug: "applying-ivt-calculator-allowed",
    question_name: "Applying IVT (Calculator)",
    question_id: "bba7c535-b1b6-4d84-89f6-bd7782472742",
    question_prompt:
      "**A calculator is allowed on this question.**\n\nA function $f$ is defined as $f(x)=2x-3\\sin{\\left(\\dfrac{x}{2}\\right)}$.  The Intermediate Value Theorem applied to $f$ on the closed interval $[1,4]$ guarantees a solution in $(1,4)$ to which of the following equations?",
    option_1_id: "20de1a34-81c1-42be-96ba-5df46df44fc4",
    option_2_id: "ae3938e3-2c34-42f4-8a83-f69197d61dbf",
    option_3_id: "3b1fbe81-8d58-4449-a11c-91788f9d0c2c",
    option_4_id: "246ee512-af6d-4e29-8580-d0477d48aadc",
    option_1: "$f(x)=-2.534$",
    option_2: "$f(x)=0$",
    option_3: "$f(x)=4.823$",
    option_4: "$f(x)=8.917$",
    key: "option_3_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-vccpMGC6sMty.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-jappbcCRCzyS.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-Z5qQah1u6f6d.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-UyUwj3j5PhYY.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-YEKc4sqpjFYf.png",
  },
  {
    question_slug: "find-the-limit-with-an-asymptote-no-calculator",
    question_name: "Find the Limit with an Asymptote (No Calculator)",
    question_id: "c595e0db-6680-445a-b479-503b9b3bcc03",
    question_prompt:
      "Find $\\lim \\limits_{ x\\rightarrow { 4 } }{ f(x) } $.\n\n[s:c3620b62-2904-477c-8017-a5b0d5ece66e:Limit at Asymptote:image]",
    option_1_id: "8ce12b04-bb69-4214-bfd7-f29604e83209",
    option_2_id: "9d5fe809-98aa-4f70-a0aa-cd539d8415e7",
    option_3_id: "90412179-2401-4e20-8350-0c7eaeac30e0",
    option_4_id: "09a9d451-23aa-47ca-9fb4-69e1ce61cef5",
    option_1: "$\\infty$",
    option_2: "Nonexistent",
    option_3: "$4$",
    option_4: "$-\\infty$",
    key: "option_2_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-cmGd9KbhqXNJ.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-ujNpzqyGmsDm.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-Hqey6PWVt4yv.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-7UgwBPPCQZkm.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-RVATZX2CU8Xp.png",
  },
  {
    question_slug: "infinite-limits-graphically-no-calculator",
    question_name: "Infinite Limits Graphically (No Calculator)",
    question_id: "1a6e182a-da12-43bb-8699-9e3d986283e1",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nWhich of the following limits that describe the behavior of the function, $f(x)$, shown in the graph is **FALSE**?  \n\n[s:3551f92b-e3da-4c25-97f1-c2f200c1048c:Infinite Limit:image]",
    option_1_id: "f2463dc9-e070-4064-a573-ddca99988ab4",
    option_2_id: "21e81b87-9d1b-45a1-9726-d14e43b92c30",
    option_3_id: "1bc297d0-9435-42f8-b3a7-fe232462682f",
    option_4_id: "15df97d8-f986-4c67-b8e9-fe6adbc2bb89",
    option_1: "$\\lim \\limits_{x \\to \\infty}f(x)=5$",
    option_2: "$\\lim \\limits_{x \\to \\infty}f(x)=0$",
    option_3: "$\\lim \\limits_{x \\to 1}f(x)$ is nonexistent",
    option_4: "$\\lim \\limits_{x \\to -\\infty}f(x)=0$",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-tCMvK2jnkVrD.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-VeggXr2ESHnV.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-wHG2KDnTY7YM.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-zyKxsRZ4NR1E.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-VTnUkbM9bWTB.png",
  },
  {
    question_slug: "finding-limits-logarithmic-expressions-no-calculator",
    question_name: "Finding Limits: Logarithmic Expressions (No Calculator)",
    question_id: "37c886e0-200f-4893-9286-92ea4b12cd8a",
    question_prompt:
      "**No calculator is allowed on this question.**\n\nCalculate the limit:    \n $$\\lim _{ x\\rightarrow \\infty  }{ \\log { \\left( \\dfrac { { x }^{ 4 }-150 }{ { x }^{ 4 }+150 }  \\right)  }  } $$\n\n",
    option_1_id: "192eac8d-9ee0-469b-bf90-516c5de533c1",
    option_2_id: "ca2768f3-6ab3-4ddd-b83e-fbfd8881b001",
    option_3_id: "8e4500fa-a5e9-40df-9968-1f57347b056a",
    option_4_id: "6811dba3-97a2-401b-a71a-b924bd7668f0",
    option_1: "$0$",
    option_2: "$1$",
    option_3: "$10$",
    option_4: "The limit does not exist.",
    key: "option_1_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-NdcvfAkyseMe.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-UdMdbYEtSmD8.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-EguNgYbVugnJ.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-4DepSZuDb9fd.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-6qfqtWEJXU6y.png",
  },
  {
    question_slug: "find-the-limit-from-the-graph-no-calculator",
    question_name: "Find the Limit from the Graph (No Calculator)",
    question_id: "99444338-459a-4664-a1fc-1f643656e3a0",
    question_prompt:
      "**A calculator is not allowed on this question.** \n\nUsing the graph of $f(x)$, find $\\lim\\limits _{ x\\rightarrow 3 }{ f(x) } $\n[s:575d02c3-c5c9-45aa-bd31-080ac782dc03:Limit Piecewise f(x):image]",
    option_1_id: "0b43a235-28dc-459c-a4f6-fbbbc96a5bea",
    option_2_id: "b6ac46f6-294a-4080-ab34-b7dfaa716974",
    option_3_id: "ca21e261-dd19-4858-bd1a-ea26f094c614",
    option_4_id: "6a9bcf82-73b2-4dd4-a248-7839bc7b9a22",
    option_1: "$4$",
    option_2: "$2$",
    option_3: "$-1$",
    option_4: "The limit does not exist",
    key: "option_4_id",
    link_question_prompt:
      "https://latex2image-output.s3.amazonaws.com/img-cmYZEwW8Yfse.png",
    link_option_1:
      "https://latex2image-output.s3.amazonaws.com/img-TY6rEX5dPjCz.png",
    link_option_2:
      "https://latex2image-output.s3.amazonaws.com/img-Vyv8Z6T2c6Vy.png",
    link_option_3:
      "https://latex2image-output.s3.amazonaws.com/img-hFHm1c19CnKh.png",
    link_option_4:
      "https://latex2image-output.s3.amazonaws.com/img-q15KqVTNHhjh.png",
  },
];
let missed = [];
function WelcomeScreen(props) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showAnswers, setShowAnswers] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [chosen, setChosen] = useState(undefined);
  const [score, setScore] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);

  let handleQuestionClick = (choice) => {
    let txt = "link_option_";
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
            problems[currentQuestion].correct
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
            problems[currentQuestion].correct
          }
        />
        <AnswerChoice
          text={problems[currentQuestion].link_option_4}
          handlePress={() => handleQuestionClick(4)}
          status={
            (showAnswers && problems[currentQuestion].link_option_4) ==
            problems[currentQuestion].correct
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
                    "option" + problems[currentQuestion].correct
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
