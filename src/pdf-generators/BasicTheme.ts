import { BasePDFGenerator } from "@/pdf-generators/BasePDFGenerator";
import { jsPDF } from "jspdf";
import { ResumeType } from "@/types/resume";

export class BasicTheme extends BasePDFGenerator {
  constructor(resume: ResumeType) {
    const doc = new jsPDF({ format: "letter", unit: "pt" });
    super(resume, doc);
  }

  createPdf(): jsPDF {
    const { doc, resume, defaultMargin, defaultPaperSize, getStringWidth } =
      this;
    const { name, email, phone, url, summary, location } = resume.basics;
    let { width, height } = defaultPaperSize;
    let { top } = defaultMargin;
    doc.setFont("times");
    doc.setFontSize(18);
    doc.text(name, width / 2, top, { align: "center" });
    doc
      .setFontSize(12)
      .text(
        `${email} | ${url} | ${phone} | ${location?.city}, ${location?.region}`,
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
  }
}
