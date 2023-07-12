import {
  BasicsType,
  EducationType,
  ResumeType,
  WorkType,
} from "@/types/resume";
import { jsPDF } from "jspdf";

interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface PaperSize {
  readonly width: number;
  readonly height: number;
}

export abstract class BaseGenerator {
  protected resume: ResumeType;
  protected doc: jsPDF;

  protected defaultMargin: Margin = {
    top: convertInchesToPoints(1),
    right: convertInchesToPoints(1),
    bottom: convertInchesToPoints(1),
    left: convertInchesToPoints(1),
  };

  protected defaultPaperSize: PaperSize = {
    width: convertInchesToPoints(8.5),
    height: convertInchesToPoints(11),
  };

  protected getStringWidth = (str: string) =>
    Math.round(this.doc.getStringUnitWidth(str) * this.doc.getFontSize());

  protected splitLines = (text: string, offsetWidth: number = 0): any[] =>
    this.doc.splitTextToSize(
      text,
      this.defaultPaperSize.width -
        this.defaultMargin.left -
        this.defaultMargin.right -
        offsetWidth
    );

  protected constructor(resume: ResumeType, doc: jsPDF) {
    this.resume = resume;
    this.doc = doc;
  }

  abstract createPdf(): jsPDF;

  getPreviewUrl = async (): Promise<string> => {
    const pdf = this.createPdf();
    return pdf.output("bloburl").toString();
  };

  savePdf = (): void => {
    const pdf = this.createPdf();
    pdf.save(`${this.resume.basics.name}-resume.pdf`);
  };

  protected abstract writeHeader(text: string): void;

  protected abstract writeBasicInfo(basics: BasicsType): void;

  protected abstract writeSummary(summary: string): void;

  protected abstract writeWorkExperience(work: WorkType[]): void;

  protected abstract writeEducation(education: EducationType[]): void;
}

const convertInchesToPoints = (inches: number) => {
  return inches * 72; // 1 inch = 72 points
};
