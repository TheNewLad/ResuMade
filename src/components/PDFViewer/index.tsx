import dynamic from "next/dynamic";

const DynamicPDFViewer = dynamic(
  () => import("@/components/PDFViewer/Viewer"),
  {
    ssr: false,
  }
);

export default DynamicPDFViewer;
