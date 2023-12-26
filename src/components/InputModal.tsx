import { Fragment, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";

interface Props {
  initialValue: string;
  onSubmit: (value: string) => void;
  onClose: () => void;
}

export default function InputModal({ initialValue, onSubmit, onClose }: Props) {
  const [value, setValue] = useState(initialValue);

  return (
    <Fragment>
      <div style={{zIndex:50}} onClick={onClose} className="fixed h-screen w-screen top-0 bg-black opacity-90 left-0 z-100" />

      <div className="fixed flex items-center gap-5 border top-20 bg-white inset-x-0 mx-auto w-[300px] z-50 p-5">
        <input
          className="border outline-none pl-2 py-1 w-full"
          type="text"
          placeholder="Reply"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          disabled={!value.trim()}
          onClick={() => {
            onSubmit(value);
            onClose();
          }}
        >
          <AiOutlineCheck color="black" size={20} />
        </button>
      </div>
    </Fragment>
  );
}
