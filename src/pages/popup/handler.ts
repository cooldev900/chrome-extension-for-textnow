import { ContactData } from "../popup/Popup";

export const submitMessage = (message: string, phoneNumber: string): Promise<boolean> => {
    return new Promise(function (resolve) {
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
                const pxCaptcha = document.getElementById('px-captcha') as HTMLButtonElement;
                if (!pxCaptcha) resolve(true)

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
                            resolve(true)
                        }, 10000)
                    }

                }, 1000)
            }, 1000)
        }, 1000)
    })
}

export const submitMessages = async (data: ContactData[], messageTemplate: string) => {
    for (let i=0; i++; i < data.length) {
        await submitMessage(createMessageFromTemplate(data[i].name, messageTemplate), data[i].phoneNumber)
    }
 }

export function transferMessage(data: ContactData[], messageTemplate: string): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.id) {
            console.log(currentTab)
            chrome.scripting.executeScript({
                target: { tabId: currentTab.id },
                func: submitMessages,
                args: [data, messageTemplate]
            })
        }
    });
}

const createMessageFromTemplate = (name: string, messageTemplate: string) => {
    const defaultMessage = '';
    if (!messageTemplate) return defaultMessage
    return messageTemplate.replace("$name", name)
}