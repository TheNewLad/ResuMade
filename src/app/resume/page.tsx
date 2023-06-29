"use client";

import { getResume } from "@/test-files/resume";
// import { Basics } from "@/components/resume/Basics";
import { jsPDF } from "jspdf";
import { Resume } from "@/types/resume";
import { createPdf } from "@/utils/createPdf";
import { BasePDFGenerator } from "@/pdf-generators/BasePDFGenerator";
import { SimpleGenerator } from "@/pdf-generators/SimpleGenerator";
export default function Page() {
  const resume = getResume();
  const pdf = new SimpleGenerator(resume);

  const downloadPdf = () => {
    // const { name, email, phone, url } = basics;
    // const doc = new jsPDF({ format: "letter", unit: "in" });
    // doc.html(document.getElementById("resume") as HTMLElement, {
    //   callback: function (pdf) {
    //     pdf.save("resume.pdf");
    //   },
    //   autoPaging: "text",
    //   width: 8.5,
    //   windowWidth: 290,
    // });
    // doc.text("Hello world!", 7, 1, { align: "right" });
    // doc.text("World hello!", 1000, 10, { align: "right" });
    // console.log("downloadPdf", doc);
    // const doc = createPdf(resume);
    // doc.save("a4.pdf");

    // const resume = getResume();
    // const pdf = createPdf(resume);
    //pdfData is the pdf output of jsPDF
    // const pdfData = pdf.output("dataurlnewwindow");

    pdf.viewPdf();
  };

  const doc = createPdf(resume);
  // doc.save("a4.pdf");

  return (
    <div className="mx-auto flex flex-col items-center">
      <h1>Resume</h1>
      {/*<div*/}
      {/*  id="resume"*/}
      {/*  className={"aspect-paper-letter bg-white p-12 text-black"}*/}
      {/*>*/}
      {/*  <Basics {...basics} />*/}
      {/*</div>*/}
      <iframe
        src="/api/generate-resume"
        className="aspect-paper-letter w-1/2"
      ></iframe>
      <button onClick={downloadPdf}>Download PDF</button>
    </div>
  );
}
