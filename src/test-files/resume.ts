import resumeJson from "./resume.json";
import { Resume } from "@/types/Resume";

export const getResume = (): Resume => {
  return resumeJson;
};
