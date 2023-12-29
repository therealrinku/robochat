import { Fragment, useState } from "react";
import useAppContext from "../hooks/useAppContext";
import {
  AiOutlineCaretDown,
  AiOutlineCaretRight,
  AiOutlineCaretUp,
  AiOutlineDelete,
  AiOutlinePlus,
} from "react-icons/ai";
import InputModal from "./InputModal";

export default function MessageManager() {
  const { chatbotConfig, addMessage, deleteMessage, addResponse, deleteResponse, updateNextMessage } = useAppContext();

  const [message, setMessage] = useState<string>("");
  const [showAddReplyModal, setShowAddReplyModal] = useState(false);

  const [selectedMsgId, setSelectedMsgId] = useState<string | null>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedMessages, setExpandedMessages] = useState<Array<string>>([]);

  function expandUnexpandMessage(msgId: string) {
    if (expandedMessages.includes(msgId)) {
      setExpandedMessages((prev) => prev.filter((m) => m !== msgId));
    } else {
      setExpandedMessages((prev) => [...prev, msgId]);
    }
  }

  return (
    <Fragment>
      <button
        className={`${!isExpanded && "border-b"} border-t px-5 py-2 flex items-center justify-between w-full`}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <p className="font-bold">Manage Messages</p>
        {isExpanded ? <AiOutlineCaretUp size={18} /> : <AiOutlineCaretDown size={18} />}
      </button>

      {isExpanded && (
        <div className="border-b  pb-5 px-5 flex flex-col gap-5 mt-3">
          {Object.values(chatbotConfig.messages).map((msg) => {
            return (
              <Fragment key={msg.id}>
                <div className="flex cursor-pointer items-start gap-2">
                  <button onClick={() => expandUnexpandMessage(msg.id)}>
                    {expandedMessages.includes(msg.id) ? (
                      <AiOutlineCaretDown size={18} />
                    ) : (
                      <AiOutlineCaretRight size={18} />
                    )}
                  </button>
                  <p className="font-bold" onClick={() => expandUnexpandMessage(msg.id)}>{msg.message}</p>
                  <button
                    onClick={() => {
                      setSelectedMsgId(msg.id);
                      setShowAddReplyModal(true);
                    }}
                  >
                    <AiOutlinePlus color="black" size={18} />
                  </button>
                  <button onClick={() => deleteMessage(msg.id)}>
                    <AiOutlineDelete color="red" size={18} />
                  </button>
                </div>

                {expandedMessages.includes(msg.id) && (
                  <div className="ml-7">
                    {msg?.replyOptions?.map((ro: any, roIndex: number) => {
                      const replyOptionsArr = Object.values(chatbotConfig.messages);
                      return (
                        <div key={ro.id} className="flex flex-col border-b mb-2 pb-2 gap-5">
                          <p>
                            {roIndex + 1}. {ro.message}
                          </p>

                          <div className="flex items-end justify-between gap-2">
                            <div className="flex flex-col gap-2">
                              <p className="text-sm text-green-500">Select Reply</p>
                              {replyOptionsArr.length > 0 && (
                                <select
                                  //@ts-ignore
                                  value={chatbotConfig.messages[ro.nextMessageId].id}
                                  onChange={(e) => updateNextMessage(msg.id, roIndex, e.target.value)}
                                  className="bg-inherit outline-none border px-2 py-1 max-w-[70%] pr-5 truncate"
                                >
                                  {replyOptionsArr.map((omsg) => {
                                    return (
                                      <option key={omsg.id} value={omsg.id}>
                                        {omsg.message}
                                      </option>
                                    );
                                  })}{" "}
                                </select>
                              )}
                            </div>

                            <button onClick={() => deleteResponse(msg.id, ro.id)}>
                              <AiOutlineDelete color="red" size={18} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Fragment>
            );
          })}

          <div className="flex items-center justify-stretch gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              name="chatbotTitle"
              placeholder="Type your message here..."
              className="border outline-none pl-2 py-1 w-full"
              type="text"
            />

            <button
              disabled={!message.trim()}
              onClick={() => {
                addMessage(message);
                setMessage("");
              }}
            >
              <AiOutlinePlus size={18} />
            </button>
          </div>
        </div>
      )}

      {showAddReplyModal && (
        <InputModal
          onClose={() => setShowAddReplyModal(false)}
          initialValue=""
          onSubmit={(resp) => addResponse(selectedMsgId, resp)}
        />
      )}
    </Fragment>
  );
}
