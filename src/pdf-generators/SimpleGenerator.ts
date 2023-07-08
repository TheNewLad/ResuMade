import { BasePDFGenerator } from "@/pdf-generators/BasePDFGenerator";
import { jsPDF } from "jspdf";
import { ResumeType, WorkType } from "@/types/resume";

export class SimpleGenerator extends BasePDFGenerator {
  private documentFontSize = 12;
  private nameFontSize = 18;
  private lineHeight = 1.2;
  private fontName = "times";

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
      fontName,
    } = this;

    const { name, email, phone, url, summary, location } = resume.basics;

    // const getStringWidth = (str: string) => getDocStringWidth(doc, str);

    doc.setFont(fontName);

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

    this.writeSummary(summary);

    this.writeWorkExperience(resume.work);

    return doc;
  };

  private writeHeader = (text: string): void => {
    const { doc, defaultMargin, defaultPaperSize, documentFontSize, fontName } =
      this;
    doc
      .setFont(fontName, "bold")
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
      .setFont(fontName, "normal")
      .setFontSize(documentFontSize);
  };

  private writeSummary = (summary?: string): void => {
    if (!summary) return;

    const {
      doc,
      defaultMargin,
      documentFontSize,
      lineHeight,
      writeHeader,
      splitLines,
    } = this;

    writeHeader("Summary");

    splitLines(summary).forEach((line, index) => {
      doc.text(
        line,
        defaultMargin.left,
        (defaultMargin.top +=
          index === 0 ? documentFontSize * 1.5 : documentFontSize * lineHeight)
      );
    });
  };

  private writeWorkExperience = (work?: WorkType[]): void => {
    if (!work?.length) return;

    const {
      doc,
      defaultMargin,
      defaultPaperSize,
      documentFontSize,
      lineHeight,
      fontName,
      writeHeader,
      splitLines,
      getStringWidth,
    } = this;

    const bulletPointWithSpace = "   •   ";
    const bulletPointWidth = getStringWidth(bulletPointWithSpace);

    writeHeader("Experience");

    work.forEach((work, index) => {
      doc
        .setFont(fontName, "bold")
        .text(
          work.name,
          defaultMargin.left,
          (defaultMargin.top +=
            index === 0 ? documentFontSize * 1.5 : documentFontSize * 2)
        )
        .setFont(fontName, "normal")
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

        splitLines(highlight).forEach((line, index) => {
          doc.text(
            line,
            defaultMargin.left + bulletPointWidth,
            (defaultMargin.top +=
              index === 0 ? 0 : documentFontSize * lineHeight)
          );
        });
      });
    });
  };

  private splitLines = (text: string): any[] =>
    this.doc.splitTextToSize(
      text,
      this.defaultPaperSize.width -
        this.defaultMargin.left -
        this.defaultMargin.right
    );
}
