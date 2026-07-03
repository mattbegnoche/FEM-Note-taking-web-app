import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
function SubmitButton({ children }: { children: string }) {
  const { pending } = useFormStatus();

  return (
    <>
      <Button type="submit">{pending ? "Submitting..." : children}</Button>
    </>
  );
}

export default SubmitButton;
