import { ResumeType } from "@/types/resume";
import { jsPDF } from "jspdf";

abstract class AbstractTheme {
  private resume: ResumeType;
  private pdf: jsPDF;

  constructor(resume: ResumeType) {
    this.resume = resume;
    this.pdf = new jsPDF();
  }

  abstract createPdf(): jsPDF;
}
