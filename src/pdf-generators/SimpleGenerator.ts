import { BasePDFGenerator } from "@/pdf-generators/BasePDFGenerator";
import { jsPDF } from "jspdf";
import { ResumeType } from "@/types/resume";

export class SimpleGenerator extends BasePDFGenerator {
  private documentFontSize = 12;
  private nameFontSize = 18;
  private lineHeight = 1.2;

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
      lineHeight,
    } = this;

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
      this.writeHeader("Summary");

      this.splitLines(summary).forEach((line, index) => {
        doc.text(
          line,
          defaultMargin.left,
          (defaultMargin.top +=
            index === 0
              ? documentFontSize * 1.5
              : documentFontSize * lineHeight)
        );
      });
    }

    // Add work experience
    if (!!resume?.work?.length) {
      const bulletPointWithSpace = "   •   ";
      const bulletPointWidth = this.getStringWidth(bulletPointWithSpace);

      this.writeHeader("Experience");

      resume.work.forEach((work, index) => {
        doc
          .setFont("times", "bold")
          .text(
            work.name,
            defaultMargin.left,
            (defaultMargin.top +=
              index === 0 ? documentFontSize * 1.5 : documentFontSize * 2)
          )
          .setFont("times", "normal")
          .text(
            `${work.startDate} — ${work.endDate}`,
            defaultPaperSize.width - defaultMargin.right,
            defaultMargin.top,
            { align: "right" }
          )
          .text(
            work.position,
            defaultMargin.left,
            (defaultMargin.top += documentFontSize * lineHeight)
          );

        work.highlights.forEach((highlight) => {
          doc.text(
            bulletPointWithSpace,
            defaultMargin.left,
            (defaultMargin.top += documentFontSize * lineHeight)
          );

          this.splitLines(highlight).forEach((line, index) => {
            doc.text(
              line,
              defaultMargin.left + bulletPointWidth,
              (defaultMargin.top +=
                index === 0 ? 0 : documentFontSize * lineHeight)
            );
          });
        });
      });
    }

    return doc;
  };

  private writeHeader = (text: string): jsPDF => {
    const { doc, defaultMargin, defaultPaperSize, documentFontSize } = this;
    doc
      .setFont("times", "bold")
      .setFontSize(documentFontSize)
      .text(
        text,
        defaultMargin.left,
        (defaultMargin.top += documentFontSize * 2)
      )
      .line(
        defaultMargin.left,
        (defaultMargin.top += documentFontSize * 0.25),
        defaultPaperSize.width - defaultMargin.right,
        defaultMargin.top
      )
      .setFont("times", "normal")
      .setFontSize(documentFontSize);

    return doc;
  };

  private splitLines = (text: string): any[] =>
    this.doc.splitTextToSize(
      text,
      this.defaultPaperSize.width -
        this.defaultMargin.left -
        this.defaultMargin.right
    );
}
