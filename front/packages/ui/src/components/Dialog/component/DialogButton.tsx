import { ButtonProps, ContainedButton, OutlinedButton } from "../../Button";

export const DialogContainedButton = ({
  children,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <ContainedButton className="min-w-[70px]" onClick={onClick} {...rest}>
      {children}
    </ContainedButton>
  );
};

export const DialogOutlinedButton = ({
  children,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <OutlinedButton className="min-w-[70px]" onClick={onClick} {...rest}>
      {children}
    </OutlinedButton>
  );
};
