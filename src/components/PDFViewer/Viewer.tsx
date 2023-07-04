import { useRef, useState } from "react";
import { usePdf } from "@/utils/hooks/usePdf";
import {
  ArrowPathIcon,
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  DocumentArrowDownIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";

interface PDFViewerProps {
  url: string;
  viewPdf: () => void;
  savePdf: () => void;
}

export default function Viewer({ url, viewPdf, savePdf }: PDFViewerProps) {
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);

  const { pdfDocument, pdfPage } = usePdf({
    file: url,
    page,
    canvasRef,
  });

  return (
    <div className="flex w-full flex-col items-center">
      {!pdfDocument ? (
        <ArrowPathIcon className={"h-20 w-20 animate-spin text-gray-200"} />
      ) : (
        <div className="p-10">
          <canvas className="w-full" ref={canvasRef} />
          <div className="flex justify-between">
            <div>
              <ActionButton onClick={() => viewPdf()} aria-label={"View PDF"}>
                <EyeIcon className={"h-6 w-6"} />
              </ActionButton>
              <ActionButton onClick={() => savePdf()} aria-label={"Save PDF"}>
                <DocumentArrowDownIcon className={"h-6 w-6"} />
              </ActionButton>
            </div>
            <div>
              <ActionButton
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                aria-label={"Previous Page"}
              >
                <ArrowSmallLeftIcon className={"h-6 w-6"} />
              </ActionButton>
              <ActionButton
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page === pdfDocument?.numPages}
                aria-label={"Next Page"}
              >
                <ArrowSmallRightIcon className={"h-6 w-6"} />
              </ActionButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface NavButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const ActionButton = ({
  children,
  onClick,
  disabled,
  ...props
}: NavButtonProps) => (
  <button
    {...props}
    className={`${
      disabled ? "cursor-not-allowed text-gray-400 " : ""
    }rounded-lg p-3`}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);
