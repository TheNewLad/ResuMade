import { BasePDFGenerator } from "@/pdf-generators/BasePDFGenerator";
import { jsPDF } from "jspdf";
import { ResumeType } from "@/types/resume";

export class SimpleGenerator extends BasePDFGenerator {
  private documentFontSize = 12;
  private nameFontSize = 18;

  constructor(resume: ResumeType) {
    const doc = new jsPDF({ format: "letter", unit: "pt" });
    super(resume, doc);
  }

  createPdf = (): jsPDF => {
    const {
      doc,
      resume,
      defaultMargin,
      defaultPaperSize,
      nameFontSize,
      documentFontSize,
      writeHeader,
    } = this;

    console.log("createPdf", this);

    const { name, email, phone, url, summary, location } = resume.basics;

    // const getStringWidth = (str: string) => getDocStringWidth(doc, str);

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

    // Add work experience
    if (resume?.work?.length) {
      doc.setFont("times", "bold").setFontSize(documentFontSize);
      writeHeader(
        "Experience",
        defaultMargin.left,
        (defaultMargin.top += documentFontSize * 2)
      )
        .setFont("times", "normal")
        .setFontSize(documentFontSize);

      resume.work.forEach((work, index) => {
        doc
          .setFont("times", "bold")
          .text(
            work.name,
            defaultMargin.left,
            (defaultMargin.top += documentFontSize * 2)
          )
          .setFont("times", "normal")
          .text(work.position, defaultPaperSize.width / 2, defaultMargin.top, {
            align: "center",
          })
          .text(
            work.startDate,
            defaultMargin.left,
            (defaultMargin.top += documentFontSize * 1.2)
          )
          .text(
            work.endDate,
            defaultMargin.left,
            (defaultMargin.top += documentFontSize * 1.2)
          )
          .text(
            work.highlights.join(", "),
            defaultMargin.left,
            (defaultMargin.top += documentFontSize * 1.2)
          );
      });
    }

    return doc;
  };

  private writeHeader = (
    // doc: jsPDF,
    text: string,
    x: number,
    y: number
  ): jsPDF => {
    const { doc, documentFontSize } = this;
    const capitalizedFirstLetter = text.charAt(0).toUpperCase();
    const capitalizedRest = text.slice(1).toUpperCase();

    const firstLetterWidth = this.getDocStringWidth(
      `${capitalizedFirstLetter} `
    );

    const initialCharSpace = doc.getCharSpace();
    doc.setFontSize(documentFontSize);
    doc.setCharSpace(2);

    doc.text(capitalizedFirstLetter, x, y);
    doc.setFontSize(documentFontSize * 0.8);
    doc.text(capitalizedRest, x + firstLetterWidth, y);

    doc.setCharSpace(initialCharSpace);

    return this.doc;
  };
}
