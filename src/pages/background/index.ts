import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import { ContactData } from "../popup/Popup";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

console.log("background loaded");

chrome.runtime.onMessage.addListener((request: { message: string, data?: ContactData }, sender, sendResponse) => {
    if (request.message === 'sendMessage') {
        const { data } = request;
        console.log(JSON.stringify(data))
        sendResponse({success: true})
    }
})
