import { useState, useCallback, SetStateAction, Dispatch } from "react";

type ReturnType = [string | null, InputHandler, React.Dispatch<React.SetStateAction<string | null>>];
type InputHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

const useInput = (initialValue: string | null = null):ReturnType  => {
  const [value, setValue] = useState(initialValue);  
  const handler:InputHandler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
 
  return [value, handler, setValue];
}

export default useInput;