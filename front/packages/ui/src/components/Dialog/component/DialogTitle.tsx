import { DialogTitleProps } from "../Dialog.type";
import { BsXLg } from "react-icons/bs";

const DialogTitle = ({ children, onClose, ...rest }: DialogTitleProps) => {
  return (
    <div className="flex justify-between w-full" {...rest}>
      <div className="text-center flex-1 text-p2p-16 font-semibold">
        {children}
      </div>
      <button onClick={onClose}>
        <BsXLg />
      </button>
    </div>
  );
};

export default DialogTitle;
