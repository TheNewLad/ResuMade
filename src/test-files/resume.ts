import resumeJson from "./resume.json";
import { Resume } from "@/types/resume";

export const getResume = (): Resume => {
  return resumeJson;
};
