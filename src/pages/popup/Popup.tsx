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

  return (
    <div className="App bg-white">
      <header className="App-header">
        <SelectFileButton setContacts={setContacts}/>
        <Message setMessageTemplate={setMessageTemplate}/>
        <button className="border-[1px] rounded-[4px] text-blue-500 p-4 mb-[15px]" onClick={() => alert(JSON.stringify({contacts, messageTemplate}))}> Send Messages </button>
      </header>
    </div>
  );
};

export default withSuspense(Popup);
