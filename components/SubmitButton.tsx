import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button type='submit' disabled={isLoading} className={className ?? "shad-primary-btn w-full cursor-pointer"}>
      {isLoading ? (
        <>
          <Spinner data-icon='inline-start' />
          Loading ...
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
