import { Fragment, useState } from "react";
import { LuChevronsUpDown } from "react-icons/lu";

export default function TitlebarStyling() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Fragment>
      <button className={`${!isExpanded && "border-b"} border-t px-5 py-2 flex items-center justify-between w-full`} onClick={() => setIsExpanded((prev) => !prev)}>
        <p className="font-bold">Titlebar Styling</p>
        <LuChevronsUpDown size={16}/>
      </button>

      {isExpanded && (
        <div className="border-b  pb-5 px-5 flex flex-col gap-5">
          <section className="flex gap-2 items-center">
            <label htmlFor="chatbotTitle">Title</label>
            <input value="Chatbot title" name="chatbotTitle" className="border outline-none pl-2 py-1" type="text" />
          </section>

          <section className="flex gap-2 items-center">
            <label htmlFor="chatbotTextColor">Icon</label>
            <input name="chatbotTextColor" className=" border outline-none p-1  bg-white" type="file" />
          </section>

          <section className="flex gap-2 items-center">
            <label htmlFor="chatbotBg">Background color</label>
            <input name="chatbotBg" className="border outline-none p-1  bg-white" type="color" />
          </section>

          <section className="flex gap-2 items-center">
            <label htmlFor="chatbotTextColor">Text color</label>
            <input name="chatbotTextColor" className="border outline-none p-1  bg-white" type="color" />
          </section>
        </div>
      )}
    </Fragment>
  );
}
