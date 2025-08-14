import DialogContainer from "./DialogContainer";
import DialogTitle from "./component/DialogTitle";
import DialogContent from "./component/DialogContent";
import DialogAction from "./component/DialogAction";
import {
  DialogContainedButton,
  DialogOutlinedButton,
} from "./component/DialogButton";

export const Dialog = Object.assign(DialogContainer, {
  Title: DialogTitle,
  Content: DialogContent,
  Action: DialogAction,
  OutlinedButton: DialogOutlinedButton,
  ContainedButton: DialogContainedButton,
});
