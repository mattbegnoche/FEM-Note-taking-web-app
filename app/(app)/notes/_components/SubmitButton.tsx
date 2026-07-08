import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

function SubmitButton({
  children,
  ...props
}: { children: string } & React.ComponentProps<typeof Button>) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" {...props}>
      {pending ? "Submitting..." : children}
    </Button>
  );
}

export default SubmitButton;
