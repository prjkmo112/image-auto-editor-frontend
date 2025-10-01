import { MessageInstance } from "antd/es/message/interface"
import { create } from "zustand"

interface MessageState {
  messageApi: MessageInstance | null;
  setMessageApi: (api: MessageInstance) => void;
  successMsg: (message: string) => void;
  errorMsg: (message: string) => void;
  warningMsg: (message: string) => void;
  infoMsg: (message: string) => void;
  loadingMsg: (message: string) => void;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  messageApi: null,
  setMessageApi: (api: MessageInstance) => set({ messageApi: api }),
  successMsg: (message: string) => {
    get().messageApi?.success(message)
  },
  errorMsg: (message: string) => {
    get().messageApi?.error(message)
  },
  warningMsg: (message: string) => {
    get().messageApi?.warning(message)
  },
  infoMsg: (message: string) => {
    get().messageApi?.info(message)
  },
  loadingMsg: (message: string) => {
    get().messageApi?.loading(message)
  }
}))