import { ContactData } from "../popup/Popup";

export const submitMessages = async (contactsJSON: string, messageTemplate: string) => {
    const data = JSON.parse(contactsJSON) as ContactData[]

    const submitMessage = (message: string, phoneNumber: string): Promise<boolean> => {
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
            }, 10000)
        })
    }
}

export const submitMessagesInVonage = async (contactsJSON: string, messageTemplate: string) => {
    const data = JSON.parse(contactsJSON) as ContactData[]

    const submitMessage = (message: string, phoneNumber: string): Promise<boolean> => {
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

            const inputEvent = new Event('input', { bubbles: true });

            let newChatButtons = document.getElementsByClassName("Vlt-btn Vlt-btn--no-focus Vlt-btn--secondary") as HTMLCollectionOf<HTMLButtonElement>;
            let newChatButton = newChatButtons[0]
            newChatButton.click();

            let iframesContainer = document.getElementById('my-apps-renderer') as HTMLDivElement;
            let iframe = iframesContainer.childNodes[1] as HTMLIFrameElement;
            let iframeDocument = iframe.contentWindow ?? iframe.contentDocument


            let phoneInput = document.getElementById('filterElement') as HTMLInputElement;            
            phoneInput.value = phoneNumber;
            phoneInput.dispatchEvent(inputEvent);
            setTimeout(() => {
                const buttons = document.getElementsByClassName('Vlt-btn button-append') as HTMLCollectionOf<HTMLButtonElement>;
                const appendMessageButton = buttons[0]
                appendMessageButton.click()

                setTimeout(() => {
                    const contentDivs = document.getElementsByClassName('ProseMirror') as HTMLCollectionOf<HTMLDivElement>;
                    let contentDiv = contentDivs[0]
                    contentDiv.classList.add('ProseMirror-focused')
                    const p = contentDiv.childNodes[0] as HTMLParagraphElement;
                    p.innerText = message;

                    setTimeout(() => {
                        let iconDivs = document.getElementsByClassName('icon-template-purple') as HTMLCollectionOf<HTMLButtonElement>
                        let sendIcon = iconDivs[0]
                        sendIcon.click()
                    }, 1000)
                }, 1000)
            }, 10000)
        })
    }

    const createMessageFromTemplate = (name: string, messageTemplate: string) => {
        const defaultMessage = '';
        if (!messageTemplate) return defaultMessage
        return messageTemplate.replaceAll("$name", name)
    }

    for (let i = 0; i < data.length; i++) {
        await submitMessage(createMessageFromTemplate(data[i].name, messageTemplate), data[i].phoneNumber)
    }
}


export function transferMessage(data: ContactData[], messageTemplate: string): void {
    console.log(data)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.id) {
            chrome.scripting.executeScript({
                target: { tabId: currentTab.id },
                func: submitMessagesInVonage,
                args: [JSON.stringify(data), messageTemplate]
            })
        }
    });
}