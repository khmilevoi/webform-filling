import {fillGeneralInfo} from "./fill-general-info";
import {addWorkers} from "./add-workers";

window.onload = () => {
    const btn: HTMLButtonElement | null = document.querySelector("button.MuiFab-root");
    if (!btn) {
        return;
    }

    let counter = 0;

    const handleFill = () => {
        if (counter++) {
            return;
        }
        fillGeneralInfo();
        addWorkers();
    }

    btn.addEventListener("click", handleFill);
};
