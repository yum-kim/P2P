import { DialogTitleProps } from "../Dialog.type";

const DialogTitle = ({ children, ...rest }: DialogTitleProps) => {
  return (
    <div className="w-full text-center text-p2p-16 font-semibold" {...rest}>
      {children}
    </div>
  );
};

export default DialogTitle;
