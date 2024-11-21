import * as Yup from "yup";

export const quizDetailsSchema = Yup.object({
  title: Yup.string().required("Title is required."),
  description: Yup.string().required("Description is required."),
  category: Yup.string().required("Category is required."),
  difficulty: Yup.string().required("Difficulty is required."),
});

export const quizQuestionsSchema = Yup.array().of(
  Yup.object().shape({
    content: Yup.string().required("Question field is required"),
    answers: Yup.array()
      .of(
        Yup.object().shape({
          content: Yup.string().required("Answer field is required"),
          is_correct: Yup.boolean(),
        })
      )
      .test(
        "at-least-one-correct",
        "At least one answer must be marked as correct",
        (answers) => answers?.some((answer) => answer.is_correct)
      ),
  })
);
