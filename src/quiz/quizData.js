/**
 * Quiz content, in display order. English lives here; translations live in
 * lang/*.json as quiz.<id>.text and quiz.<id>.o<optionIndex>.
 *
 * `correct` is an option index; null means the question is not scored.
 *
 * Picture questions load their art by convention:
 *   /assets/quiz/<id>/question.svg
 *   /assets/quiz/<id>/option-1.svg ... option-6.svg
 * A placeholder shows until those files exist. Set `correct` once art is added.
 * `optionFiles` lists the option numbers to show when a question has fewer than
 * six; `correct` is then a position in that list.
 */

const LIKERT_OPTIONS = [
  "Strongly Agree",
  "Agree",
  "Neutral",
  "Disagree",
  "Strongly Disagree",
];

const choice = (id, text, options, correct, extra = {}) => ({
  type: "question",
  id,
  text,
  options,
  correct,
  ...extra,
});
const likert = (id, text) =>
  choice(id, text, LIKERT_OPTIONS, null, { likert: true });
const picture = (id, correct = null, extra = {}) => ({
  type: "question",
  id,
  picture: true,
  correct,
  ...extra,
});
const numberGrid = (id, grid, options, correct) => ({
  type: "question",
  id,
  grid,
  options,
  correct,
});
const digits = (digitList) => ({ type: "digits", digits: digitList });
const milestone = (id, title, subtitle, description) => ({
  type: "milestone",
  id,
  title,
  subtitle,
  description,
});

export const quizFlow = [
  {
    type: "memorize",
    id: "word1",
    title: "Memorize this word",
    note: "You will be asked about it during the quiz",
    word: "Cognitive",
  },
  choice(
    "q1",
    "A farmer has 15 sheep. All but 8 die. How many are left?",
    ["7", "8", "15", "0", "3"],
    1,
  ),
  choice(
    "q2",
    "You pass the person in 3rd place. What place are you?",
    ["1", "4", "3", "2", "5"],
    2,
  ),
  choice(
    "q3",
    "How many corners does a cube have?",
    ["6", "4", "8", "5", "7"],
    2,
  ),
  likert("q4", "I prefer learning through hands-on experience"),
  choice(
    "q5",
    "What number comes next in this pattern?",
    ["20", "24", "30", "32", "36"],
    3,
    { sequence: "2, 4, 8, 16, ___" },
  ),
  choice("q6", "What number is missing?", ["13", "14", "15", "16", "17"], 2, {
    sequence: "3, 6, 9, 12, ___, 18",
  }),
  digits([7, 3, 8, 5]),
  choice("q7", "What was the 2nd digit?", ["7", "3", "8", "1", "5"], 1),
  digits([4, 9, 2, 6, 1]),
  choice("q8", "What was the 3rd digit?", ["9", "2", "6", "3", "4"], 1),
  digits([3, 8, 5, 1, 7, 4]),
  choice("q9", "What was the 4th digit?", ["5", "1", "7", "8", "4"], 1),
  likert("q10", "I easily visualize 3D objects in my mind"),
  picture("q11", 0),
  milestone(
    "m1",
    "You're keeping a great pace",
    "",
    "Staying focused under time pressure helps you notice details and decide quickly.",
  ),
  picture("q12", 5),
  picture("q13", 1),
  picture("q14", 0),
  picture("q15", 2),
  picture("q16", 0),
  picture("q17", 5),
  picture("q18", 5),
  picture("q19", 4),
  picture("q20", 5),
  picture("q21", 4),
  picture("q22", 0),
  milestone(
    "m2",
    "You're past the halfway point",
    "",
    "You've answered {percent}% of the questions. Keep going!",
  ),
  picture("q23", 4),
  choice(
    "q24",
    "Which word did we ask you to remember at the start?",
    ["Smart", "IQ", "Brain", "Cognitive", "Intelligence"],
    3,
  ),
  picture("q25", 2),
  picture("q26", 3),
  picture("q27", 0),
  picture("q28", 0),
  {
    type: "memorize",
    id: "number1",
    title: "Memorize this number",
    note: "You will be asked about it after the quiz",
    digits: [4, 7, 2, 6],
  },
  picture("q29", 3),
  numberGrid(
    "q30",
    [2, 4, 6, 4, 6, 8, 6, 8],
    ["8", "12", "9", "14", "10", "16"],
    4,
  ),
  picture("q31", 2),
  milestone(
    "m3",
    "A pattern is starting to show in how you think",
    "",
    "Every answer adds detail to your cognitive profile. A few more answers to complete it.",
  ),
  picture("q32", 5),
  picture("q33", 4),
  numberGrid(
    "q34",
    [3, 7, 4, 2, 8, 6, 5, 9],
    ["3", "6", "4", "14", "5", "16"],
    2,
  ),
  picture("q35", 4),
  milestone(
    "m4",
    "You Are Almost There!",
    "Only {left} Questions Left!",
    "You've answered {percent}% of the questions. Just {left} more until your IQ score is ready!",
  ),
  picture("q36"),
  likert("q37", "Effort over time can make a person smarter"),
  likert("q38", "I tend to compare my results with other people's"),
  {
    type: "memorize",
    id: "word2",
    title: "Memorize one more word",
    note: "You will be asked about it after the quiz",
    word: "Elephant",
  },
  choice(
    "q39",
    "What is your age?",
    ["18-25", "26-29", "30-44", "45-60", "61 or older"],
    null,
  ),
  choice(
    "q40",
    "What is your education level?",
    [
      "Some high school",
      "High school diploma",
      "College/trade school",
      "Bachelor's degree",
      "Graduate degree",
    ],
    null,
  ),
];
