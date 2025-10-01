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

export const useMessageStore = create<MessageState>((set) => ({
  messageApi: null,
  setMessageApi: (api: MessageInstance) => set({ messageApi: api }),
  successMsg: (message: string) => {
    set((state) => {
      state.messageApi?.success(message)
      return state
    })
  },
  errorMsg: (message: string) => {
    set((state) => {
      state.messageApi?.error(message)
      return state
    })
  },
  warningMsg: (message: string) => {
    set((state) => {
      state.messageApi?.warning(message)
      return state
    })
  },
  infoMsg: (message: string) => {
    set((state) => {
      state.messageApi?.info(message)
      return state
    })
  },
  loadingMsg: (message: string) => {
    set((state) => {
      state.messageApi?.loading(message)
      return state
    })
  }
}))