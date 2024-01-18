"use client";
import PDFViewer from "@/components/PDFViewer";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-row">
      <PDFViewer url={undefined} viewPdf={() => {}} savePdf={() => {}} />
      <div className={"flex w-full flex-col p-10 md:max-w-2xl"}>{children}</div>
    </div>
  );
}
