import { ContactData } from "../popup/Popup";
import { transferMessage } from "./handler";

console.log("content loaded");

/**
 * @description
 * Chrome extensions don't support modules in content scripts.
 */
import("./components/Demo");
chrome.runtime.onConnect.addListener(port => {
    
})
chrome.runtime.onMessage.addListener((message: {
    message: string
    contacts: ContactData[]
    messageTemplate: string
}, sender, sendResponse) => {
    if (message.message === 'message') {
        // transferMessage(message.contacts[0], message.messageTemplate)
        // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        //     const currentTab = tabs[0];
        //     if (currentTab && currentTab.id) {
        //         chrome.tabs.executeScript(currentTab.id, { code: `document.getElementById("newText").click();` });
        //     }
        // });
        chrome.scripting.executeScript({
            target: {tabId: sender.tab.id},
            func: () => document.getElementById("newText").click()
        })
        sendResponse(message.contacts[0])
    }
  });