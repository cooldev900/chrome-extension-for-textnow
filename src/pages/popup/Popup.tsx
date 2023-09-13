import React, { useEffect, useState } from "react";
import "@pages/popup/Popup.css";
import useStorage from "@src/shared/hooks/useStorage";
import exampleThemeStorage from "@src/shared/storages/exampleThemeStorage";
import withSuspense from "@src/shared/hoc/withSuspense";
import SelectFileButton from "./SelectFileButton";
import Message from "./Message";

export interface ContactData {
  name: string
  phoneNumber: string
}

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);
  const [contacts, setContacts] = useState<Array<ContactData>>([])
  const [messageTemplate, setMessageTemplate] = useState<string>('')

  const sendMessages = () => {
    console.log('started')
    chrome.runtime.sendMessage({ message: 'sendMessage', data: {
      name: 'test',
      phoneNumber: '+1 205 626 9972'
    } }, (response) => {
      if (response.success) {
        console.log('clicked')
      } else {
        console.log('unclicked')
      }
    })
  }

  return (
    <div className="App bg-white">
      <header className="App-header">
        <SelectFileButton setContacts={setContacts} />
        <Message setMessageTemplate={setMessageTemplate} />
        <button className="border-[1px] rounded-[4px] text-blue-500 p-4 mb-[15px]" onClick={() => sendMessages()}> Send Messages </button>
      </header>
    </div>
  );
};

export default withSuspense(Popup);
