import resumeJson from "./resume.json";
import { ResumeType } from "@/types/resume";

export const getResume = (): ResumeType => {
  return resumeJson;
};
