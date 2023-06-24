import { NextResponse } from "next/server";
import { createPdf } from "@/utils/createPdf";
import { getResume } from "@/test-files/resume";

export const GET = async () => {
  const resume = getResume();
  const pdf = createPdf(resume);
  //pdfData is the pdf output of jsPDF
  const pdfData = pdf.output("arraybuffer");
  return new Response(pdfData, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="resume.pdf"',
    },
  });
};
