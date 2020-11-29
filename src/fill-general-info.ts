import {setInputValue} from "./set-input-value";

export const fillGeneralInfo = () => {
    const [name, email, firstPhone, secondaryPhone, desc]: NodeListOf<HTMLInputElement>
        = document.querySelectorAll(".MuiInputBase-input");

    const inputs = {name, email, firstPhone, secondaryPhone, desc};

    Object.entries(inputs).forEach(([key, input]) => {
        if (!input) {
            return;
        }

        let value = (window as any).data[key];

        if (value && key === "desc") {
            value = value.slice(0, 20);
        }

        setInputValue(input, value);
    });
}