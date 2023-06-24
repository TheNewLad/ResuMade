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

const getStringWidth = (doc: jsPDF, str: string) => {
  return doc.getStringUnitWidth(str) * doc.getFontSize();
};

export const createPdf = ({ basics }: ResumeType) => {
  // const { name, email, phone, url, summary, location } = basics;
  let { width, height } = defaultPaperSize;
  let { top } = defaultMargin;
  const doc = new jsPDF({ format: "letter", unit: "pt" });
  doc.setFont("times");
  doc.setFontSize(18);
  doc.text(basics.name, width / 2, top, { align: "center" });
  doc
    .setFontSize(12)
    .text(
      `${basics.email} | ${basics.url} | ${basics.phone} | ${basics.location?.city}, ${basics.location?.region}`,
      width / 2,
      (top += 18),
      {
        align: "center",
      }
    );

  doc
    .setFontSize(14)
    .text("Summary", defaultMargin.left, (top += 36))
    .line(
      defaultMargin.left + getStringWidth(doc, "Summary"),
      top,
      width - defaultMargin.right,
      top
    );

  return doc;
};
