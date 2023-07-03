import { ResumeType } from "@/types/resume";
import { jsPDF } from "jspdf";

interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface PaperSize {
  width: number;
  height: number;
}

export abstract class BasePDFGenerator {
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

  protected getStringWidth = (doc: jsPDF, str: string) => {
    return doc.getStringUnitWidth(str) * doc.getFontSize();
  };

  protected constructor(resume: ResumeType, doc: jsPDF) {
    this.resume = resume;
    this.doc = doc;
  }

  abstract createPdf(): jsPDF;

  async getPreviewUrl(): Promise<string> {
    const pdf = this.createPdf();
    return pdf.output("bloburl").toString();
  }

  viewPdf(): void {
    const pdf = this.createPdf();
    pdf.output("dataurlnewwindow");
  }

  savePdf(): void {
    const pdf = this.createPdf();
    pdf.save(`${this.resume.basics.name}-resume.pdf`);
  }
}

const convertInchesToPoints = (inches: number) => {
  return inches * 72; // 1 inch = 72 points
};