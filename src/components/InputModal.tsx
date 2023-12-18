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
      <div onClick={onClose} className="fixed h-full w-full bg-black opacity-60 left-0" />

      <div className="fixed flex items-center gap-5  top-20 bg-green-500 inset-x-0 mx-auto w-[300px] z-50 p-5">
        <input
          className="border outline-none pl-2 py-1 w-full"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={() => {
            onSubmit(value);
            onClose();
          }}
        >
          <AiOutlineCheck color="white" size={20} />
        </button>
      </div>
    </Fragment>
  );
}
