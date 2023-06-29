"use client";

import { getResume } from "@/test-files/resume";
import { SimpleGenerator } from "@/pdf-generators";

export default function Page() {
  const resume = getResume();
  const pdf = new SimpleGenerator(resume);

  return (
    <div className="mx-auto flex flex-col items-center">
      <h1>Resume</h1>
      <iframe
        src="/api/generate-resume"
        className="aspect-paper-letter w-1/2"
      ></iframe>
      <button onClick={() => pdf.viewPdf()}>View PDF</button>
      <button onClick={() => pdf.savePdf()}>Save PDF</button>
    </div>
  );
}
