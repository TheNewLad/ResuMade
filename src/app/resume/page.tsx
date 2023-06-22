import { getResume } from "@/test-files/resume";
import { Basics } from "@/components/resume/Basics";

export default function Page() {
  const { basics } = getResume();
  return (
    <div className="mx-auto flex flex-col items-center">
      <h1>Resume</h1>
      <div className={"aspect-paper-letter bg-white p-12 text-black"}>
        <Basics {...basics} />
      </div>
    </div>
  );
}
