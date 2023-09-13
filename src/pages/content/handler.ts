import { ContactData } from "../popup/Popup";

const submitMessage = (message: string, phoneNumber: string) => {
    const tabKeyEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        code: 'Tab',
        keyCode: 9,
        which: 9,
        bubbles: true,
    });

    let enterKeyEvent = new KeyboardEvent("keydown", {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        which: 13,
        bubbles: true
    });

    let newChatButton = document.getElementById("newText");
    newChatButton.click();
    let newConversationForm = document.getElementById("newConversationForm ");
    let input = newConversationForm.getElementsByTagName("input")[0];
    input.focus()
    input.value = phoneNumber;
    setTimeout(() => {
        input.dispatchEvent(tabKeyEvent);
        input.dispatchEvent(tabKeyEvent);

        let messageInput = document.getElementById("text-input") as HTMLTextAreaElement;
        messageInput.value = message;

        setTimeout(() => {
            messageInput.focus();
            messageInput.dispatchEvent(enterKeyEvent);

            const sendButton = document.getElementById('send_button') as HTMLButtonElement;
            sendButton.click();

            setTimeout(() => {
                const pxCaptcha = document.getElementById('px-captcha') as HTMLButtonElement;
                if (pxCaptcha) {
                    const mouseEnterEvent = new MouseEvent('mouseenter', {
                        bubbles: true,
                      });
                    pxCaptcha.dispatchEvent(mouseEnterEvent)
                    setTimeout(() => {
                        const mouseUpEvent = new MouseEvent('mouseup', {
                            bubbles: true,
                          });
                        pxCaptcha.dispatchEvent(mouseUpEvent)
                    }, 10000)
                }
                
            }, 1000)
        }, 1000)
    }, 1000)
}

export function transferMessage(data: ContactData, messageTemplate: string): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.id) {
            alert(currentTab)
            chrome.tabs.executeScript(currentTab.id, { code: `(${submitMessage.toString()})(${createMessageFromTemplate(data.name, messageTemplate)}, ${data.phoneNumber})` });
        }
    });
}

const createMessageFromTemplate = (name: string, messageTemplate: string) => {
    const defaultMessage = '';
    if (!messageTemplate) return defaultMessage
    return messageTemplate.replace("$name", name)
}