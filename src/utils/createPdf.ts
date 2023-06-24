import { ResumeType } from "@/types/resume";
import { jsPDF } from "jspdf";

const convertInchesToPoints = (inches: number) => {
  return inches * 72;
};

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

const defaultMargin: Margin = {
  top: convertInchesToPoints(1),
  right: convertInchesToPoints(1),
  bottom: convertInchesToPoints(1),
  left: convertInchesToPoints(1),
};

const defaultPaperSize: PaperSize = {
  width: convertInchesToPoints(8.5),
  height: convertInchesToPoints(11),
};

const preIncrement = (value: number, increment: number) => {
  value += increment;
  return value;
};

export const createPdf = ({ basics }: ResumeType) => {
  // const { name, email, phone, url, summary, location } = basics;
  let { width, height } = defaultPaperSize;
  let { top } = defaultMargin;
  const doc = new jsPDF({ format: "letter", unit: "pt" });
  doc.setFont("times");
  doc.setFontSize(18);
  doc
    .text(basics.name, width / 2, top, { align: "center" })
    .text(basics.name, width / 2, preIncrement(top, 18), { align: "center" })
    .text(basics.name, width / 2, preIncrement(top, 18), { align: "center" });

  return doc;
};
