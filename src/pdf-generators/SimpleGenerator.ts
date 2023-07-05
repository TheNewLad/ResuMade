import { BasePDFGenerator } from "@/pdf-generators/BasePDFGenerator";
import { jsPDF } from "jspdf";
import { ResumeType } from "@/types/resume";

export class SimpleGenerator extends BasePDFGenerator {
  constructor(resume: ResumeType) {
    const doc = new jsPDF({ format: "letter", unit: "pt" });
    super(resume, doc);
  }

  createPdf(): jsPDF {
    const documentFontSize = 12;
    const nameFontSize = 18;

    const { doc, resume, defaultMargin, defaultPaperSize, getStringWidth } =
      this;
    const { name, email, phone, url, summary, location } = resume.basics;

    doc.setFont("times");

    // Add name and contact info
    doc
      .setFontSize(nameFontSize)
      .text(name, defaultPaperSize.width / 2, defaultMargin.top, {
        align: "center",
      })
      .setFontSize(documentFontSize)
      .text(
        `${email} | ${url} | ${phone} | ${location?.city}, ${location?.region}`,
        defaultPaperSize.width / 2,
        (defaultMargin.top += nameFontSize),
        {
          align: "center",
        }
      );

    // Add summary
    if (summary) {
      doc
        .setFont("times", "bold")
        .setFontSize(documentFontSize)
        .text(
          "Summary",
          defaultMargin.left,
          (defaultMargin.top += documentFontSize * 2)
        )
        .setFont("times", "normal")
        .setFontSize(documentFontSize);

      const lines: any[] = doc.splitTextToSize(
        summary,
        defaultPaperSize.width - defaultMargin.left - defaultMargin.right
      );

      lines.forEach((line, index) => {
        doc.text(
          line,
          defaultMargin.left,
          (defaultMargin.top +=
            index === 0 ? documentFontSize * 1.5 : documentFontSize * 1.2)
        );
      });
    }

    return doc;
  }
}
