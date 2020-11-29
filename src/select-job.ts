import {Worker} from "./add-workers";

export const selectJob = (job: Worker["job"]) => {
    const select: HTMLDivElement | null = document.querySelector(".MuiSelect-select");
    if (!select) {
        return;
    }

    const clickEvent = document.createEvent ('MouseEvents');
    clickEvent.initEvent("mousedown", true, true);
    select.dispatchEvent(clickEvent);

    const option: HTMLDivElement | null
        = document.querySelector(`.MuiMenuItem-gutters[data-value='${job}']`);

    if (option) {
        option.click();
        return;
    }

    const defaultOption: HTMLDivElement | null
        = document.querySelector(`.MuiMenuItem-gutters[data-value='Director']`);

    if (defaultOption) {
        defaultOption.click();
    }
}