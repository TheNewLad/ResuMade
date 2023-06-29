"use client";

import { getResume } from "@/test-files/resume";
// import { Basics } from "@/components/resume/Basics";
import { jsPDF } from "jspdf";
import { Resume } from "@/types/resume";
import { createPdf } from "@/utils/createPdf";
import { BasePDFGenerator } from "@/pdf-generators/BasePDFGenerator";
import { SimpleGenerator } from "@/pdf-generators";

export default function Page() {
  const resume = getResume();
  const pdf = new SimpleGenerator(resume);

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
      <button onClick={() => pdf.viewPdf()}>View PDF</button>
      <button onClick={() => pdf.savePdf()}>Save PDF</button>
    </div>
  );
}
