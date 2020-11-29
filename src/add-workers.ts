import {selectJob} from "./select-job";
import {setInputValue} from "./set-input-value";

export interface Worker {
    dob: string | null;
    experience: string | null;
    firstName: string | null;
    gender: "female" | "male" | "other" | null;
    job: "Director" | "Accountant" | "Engineer" | null;
    lastName: string | null;
}

export const addWorkers = () => {
    const workers: Array<Worker> = (window as any).data.workers;

    if (!workers.length) {
        return;
    }

    let i = 0;

    const addWorker = () => {
        const btnAdd: HTMLButtonElement | null = document.querySelector(".MuiButton-root");
        if (!btnAdd) {
            return
        }
        btnAdd.click();

        const handleAdd = () => {
            selectJob(workers[i].job);

            const fields: NodeListOf<HTMLInputElement> | null
                = document.querySelectorAll(".MuiFormControl-root");

            fields.forEach(field => {
                if (!field) {
                    return;
                }
                const label = field.firstChild;
                const input: any = field.children[1].firstChild;

                if (!label || !input) {
                    return;
                }

                const {dob, firstName, lastName} = workers[i];

                if (label.textContent === "First Name") {
                    setInputValue(input, firstName ?? " ");
                } else if (label.textContent === "Last Name") {
                    setInputValue(input, lastName ?? " ");
                } else if (label.textContent === "Birthday") {
                    if (dob) {
                        const [year, month, day] = dob.split("-")
                        setInputValue(input, `${month}/${day}/${year}`);
                        return;
                    }
                    setInputValue(input, "01/01/1990");
                }
            });

            const {experience, gender} = workers[i];

            const radioButton: HTMLInputElement | null
                = document.querySelector(`input[value='${gender ?? "other"}']`);
            if (radioButton) {
                radioButton.click();
            }

            const isExperienceAvailable = () => {
                setTimeout(() => {
                    const expInput: HTMLInputElement | null
                        = document.querySelector("input[type='number']");

                    if (!expInput) {
                        isExperienceAvailable();
                        return;
                    }

                    setInputValue(expInput, experience ?? "0");

                    const buttons = document.querySelectorAll(".MuiButtonBase-root.MuiButton-root");
                    const addBtn: any = buttons[buttons.length - 1];
                    if (addBtn) {
                        addBtn.click();
                    }

                    isPopupClose();
                }, 300);
            }

            const isPopupClose = () => {
                setTimeout(() => {
                    if (document.querySelector(".MuiDialog-root")) {
                        isPopupClose();
                        return;
                    }

                    if (++i < workers.length) {
                        addWorker();
                        return;
                    }
                    alert("Completed filling");
                }, 300);
            }

            isExperienceAvailable();
        }

        const isPopupOpen = () => {
            setTimeout(() => {
                if (!document.querySelector(".MuiDialogActions-spacing")) {
                    isPopupOpen();
                    return;
                }

                handleAdd();
            }, 300);
        }

        isPopupOpen();
    }

    addWorker();
};