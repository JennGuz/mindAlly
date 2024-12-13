import { useRef } from "react";
import { Tmessage } from "../utils/types";
import { SVGS } from "../assets/svgs";

export const ChatInput = ({
  addMessage,
}: {
  addMessage: (message: Tmessage) => void;
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handelSubmit = () => {
    if (textAreaRef.current) {
      const text = textAreaRef.current.value;
      if (text.trim()) {
        addMessage({ type: "user", text, prediction: null });
        textAreaRef.current.value = "";
      }
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handelSubmit();
    }
  };

  return (
    <div className="ChatInputContainer flex-x gap-medium align-center">
      <textarea
        name="input"
        placeholder="Escribe tu mensaje"
        ref={textAreaRef}
        onKeyUp={handleKeyUp}
      />
      <button className="padding-small rounded" onClick={handelSubmit}>
        {SVGS.send}
      </button>
    </div>
  );
};
