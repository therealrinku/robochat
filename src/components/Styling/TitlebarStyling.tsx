import { Fragment, useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

export default function TitlebarStyling() {
  const { chatbotConfig, setChatbotConfig } = useAppContext();

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Fragment>
      <button
        className={`border-t px-5 py-2 flex items-center justify-between w-full`}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <p className="font-bold">Titlebar Styling</p>
        {isExpanded ? <AiOutlineCaretUp size={18} /> : <AiOutlineCaretDown size={18} />}
      </button>

      {isExpanded && (
        <div className="pb-5 px-5 flex flex-col gap-5 mt-2">
          <section className="flex gap-2 items-center">
            <label htmlFor="chatbotTitle">Title</label>
            <input
              value={chatbotConfig.configurations?.title}
              onChange={(e) =>
                setChatbotConfig({
                  ...chatbotConfig,
                  configurations: { ...chatbotConfig.configurations, title: e.target.value },
                })
              }
              name="chatbotTitle"
              className="border outline-none pl-2 py-1"
              type="text"
            />
          </section>

          <section className="flex gap-2 items-center">
            <label htmlFor="chatbotTextColor">Icon Url</label>
            <input
              value={chatbotConfig.configurations?.icon}
              onChange={(e) =>
                setChatbotConfig({
                  ...chatbotConfig,
                  configurations: {
                    ...chatbotConfig.configurations,
                    icon: e.target.value,
                  },
                })
              }
              name="chatbotTextColor"
              className=" border outline-none p-1  bg-white"
              type="text"
            />
          </section>

          <section className="flex gap-2 items-center">
            <label htmlFor="chatbotBg">Background color</label>
            <input
              value={chatbotConfig.configurations?.titleBgColor}
              onChange={(e) =>
                setChatbotConfig({
                  ...chatbotConfig,
                  configurations: { ...chatbotConfig.configurations, titleBgColor: e.target.value },
                })
              }
              name="chatbotBg"
              className="border outline-none p-1  bg-white"
              type="color"
            />
          </section>

          <section className="flex gap-2 items-center">
            <label htmlFor="chatbotTextColor">Text color</label>
            <input
              value={chatbotConfig.configurations?.titleTextColor}
              onChange={(e) =>
                setChatbotConfig({
                  ...chatbotConfig,
                  configurations: { ...chatbotConfig.configurations, titleTextColor: e.target.value },
                })
              }
              name="chatbotTextColor"
              className="border outline-none p-1  bg-white"
              type="color"
            />
          </section>
        </div>
      )}
    </Fragment>
  );
}
