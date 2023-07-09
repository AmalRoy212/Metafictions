import { createContext } from "react"

const chatContext = createContext();

const ChatProvider = ({ children }) => {
  return <chatContext.Provider>{ children }</chatContext.Provider>
}

export default ChatProvider;