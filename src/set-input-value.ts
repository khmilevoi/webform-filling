const nativeInputValueSetter
    = (Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value") as any).set;

export const setInputValue = (input: HTMLInputElement, value: string) => {
    nativeInputValueSetter.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true}));
}