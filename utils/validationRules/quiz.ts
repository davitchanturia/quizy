import * as Yup from "yup";

export const quizDetailsSchema = Yup.object({
  title: Yup.string().required("Title is required."),
  description: Yup.string().required("Description is required."),
  category: Yup.string().required("Category is required."),
  difficulty: Yup.string().required("Difficulty is required."),
});
