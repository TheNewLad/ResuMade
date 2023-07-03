interface PDFViewerProps {
  url: string;
}

export const PDFViewer = ({ url }: PDFViewerProps) => {
  return <iframe src={url} className="aspect-paper-letter w-1/2"></iframe>;
};
