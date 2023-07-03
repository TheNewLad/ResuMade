"use client";
import { getResume } from "@/test-files/resume";
import { SimpleGenerator } from "@/pdf-generators";
import { useEffect, useState } from "react";
import PDFViewer from "@/components/PDFViewer";

export default function Page() {
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const resume = getResume();
  const [pdf, setPdf] = useState<SimpleGenerator>(new SimpleGenerator(resume));

  useEffect(() => {
    pdf.getPreviewUrl().then((url) => setPdfUrl(url));
  }, [pdf]);

  return (
    <div className="mx-auto flex flex-col items-center">
      <h1>Resume</h1>
      <PDFViewer url={pdfUrl} />
      <button onClick={() => pdf.viewPdf()}>View PDF</button>
      <button onClick={() => pdf.savePdf()}>Save PDF</button>
    </div>
  );
}
