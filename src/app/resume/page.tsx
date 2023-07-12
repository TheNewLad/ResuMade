"use client";
import { getResume } from "@/test-files/resume";
import { SimpleThemeGenerator } from "@/pdf-generators";
import { useEffect, useState } from "react";
import PDFViewer from "@/components/PDFViewer";

export default function Page() {
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const resume = getResume();
  const [pdf, setPdf] = useState<SimpleThemeGenerator>(
    new SimpleThemeGenerator(resume)
  );

  useEffect(() => {
    pdf.getPreviewUrl().then((url) => setPdfUrl(url));
  }, [pdf]);

  return (
    <div className="mx-auto flex flex-col items-center">
      <div className="flex w-full justify-evenly"></div>
      <PDFViewer
        url={pdfUrl}
        viewPdf={() => window.open(pdfUrl, "_blank")?.focus()}
        savePdf={() => pdf.savePdf()}
      />
    </div>
  );
}
