import { svgStylesType, knockButtonDataType } from './types';


export const appendElements = function(parentNode: Element|HTMLElement|SVGElement, childNodes: (HTMLElement|SVGElement)[]): void{
    childNodes.forEach((childNode) => {
        parentNode.appendChild(childNode);
    });
};


export const addClassList = function(nodeElement: Element|HTMLElement|SVGElement, classList: string[]): void{
    nodeElement.classList.add(...classList);
};


export const removeClassList = function(nodeElement: Element|HTMLElement|SVGElement, classList: string[]): void{
    nodeElement.classList.remove(...classList);
};


export const generateNodeElement = function(nodeType:string, classList:string[]): HTMLElement{
    const nodeElement: HTMLElement = document.createElement(nodeType);
    nodeElement.classList.add(...classList);
    return nodeElement;
};


export const generateNodeElementWithText = function(nodeType:string, classList:string[], text:string): HTMLElement{
    const textElement: HTMLElement = generateNodeElement(nodeType, classList);
    textElement.textContent = text;
    return textElement;
};


export const generateSvgElement = function(svgClassList: null|string[], svgStyles: svgStylesType[]): SVGElement{
    const svgElement: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute('width', '20');
    svgElement.setAttribute('height', '20');
    svgElement.setAttribute('viewbox', '0 0 20 20');
    svgElement.setAttribute('fill', 'none');

    if(svgClassList !== null){
        svgElement.classList.add(...svgClassList);
    };

    svgStyles.forEach((svgStyle) => {
        const styleElement: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", `${svgStyle.elementType}`);
        for(const [key, value] of Object.entries(svgStyle)){
            if(key === 'elementType'){continue;};
            styleElement.setAttribute(`${key}`, `${value}`);
        };
        appendElements(svgElement, [styleElement]);
    });

    return svgElement;
};


export const generateInputElement = function(inputType: string, inputValue: string, placeHolder: string): HTMLElement{
    let inputElement: HTMLElement;
    let inputClassList: string[];
    const inputDefaultClassList: string[] = ['km-w-full', 'km-border', 'km-border-solid', 'km-border-slate-200', 'km-rounded-2xl', 'km-text-sm', 'km-text-black', 'km-font-medium', 'placeholder:km-text-slate-400', 'knockWordWrap', 'focus:km-border-slate-400', 'km-transition-[border-color]'];

    if(inputType === 'short'){
        inputClassList = ['knockInput', 'km-h-14', 'km-px-4'];
        inputElement = generateNodeElement('input', [...inputClassList, ...inputDefaultClassList]);
        inputElement.setAttribute('type', `text`);
        inputElement.setAttribute('value', `${inputValue}`);
    } else if(inputType === 'email'){
        inputClassList = ['knockInput','km-h-14', 'km-px-4'];
        inputElement = generateNodeElement('input', [...inputClassList, ...inputDefaultClassList]);
        inputElement.setAttribute('type', `email`);
        inputElement.setAttribute('autocomplete', 'off');
        inputElement.setAttribute('value', `${inputValue}`);
    } else{
        inputClassList = ['knockTextarea', 'km-h-120px', 'km-p-4', 'km-resize-none'];
        inputElement = generateNodeElement('textarea', [...inputClassList, ...inputDefaultClassList]);
        inputElement.textContent = inputValue;
    };
    inputElement.setAttribute('placeholder', `${placeHolder}`);

    return inputElement;
};


export const generateButtonElement = function(buttonData: knockButtonDataType): HTMLElement{
    let buttonElement: HTMLElement;
    let buttonClassList: string[];
    const buttonDefaultClassList: string[] = ['km-w-full', 'km-h-auto', 'km-min-h-48px', 'km-rounded-2xl', 'km-px-4', 'km-py-3', 'km-text-sm', 'km-font-semibold', 'km-flex', 'km-justify-center', 'km-items-center', 'km-select-none', 'knockCursorPointer', 'km-transition-colors'];

    if(buttonData.buttonColor === 'blue' && !buttonData.buttonClickAble){
        buttonClassList = ['km-dc-blue', 'km-bg-slate-50', 'km-text-slate-300'];
    } else if(buttonData.buttonColor === 'blue' && buttonData.buttonClickAble){
        buttonClassList = ['km-dc-blue', 'km-bg-blue', 'km-text-white', '[@media(pointer:fine){&:hover}]:km-bg-blueDark', 'active:km-bg-blueDark'];
    } else if(buttonData.buttonColor === 'red' && !buttonData.buttonClickAble){
        buttonClassList = ['km-dc-red', 'km-bg-slate-50', 'km-text-slate-300'];
    } else if(buttonData.buttonColor === 'red' && buttonData.buttonClickAble){
        buttonClassList = ['km-dc-red', 'km-bg-red', 'km-text-white', '[@media(pointer:fine){&:hover}]:km-bg-redDark', 'active:km-bg-redDark'];
    }else{
        buttonClassList = ['km-dc-white', 'km-bg-white', 'km-border', 'km-border-solid', 'km-border-slate-200', 'km-text-slate-400', '[@media(pointer:fine){&:hover}]:km-border-slate-300', '[@media(pointer:fine){&:hover}]:km-bg-slate-50', 'active:km-border-slate-300', 'active:km-bg-slate-50'];
    };

    buttonElement = generateNodeElementWithText('button', [...buttonClassList, ...buttonDefaultClassList], `${buttonData.buttonText}`);

    buttonElement.addEventListener('click', () => {
        buttonData.buttonClickEvent();
    });

    if(buttonData.buttonClickAble === false){
        buttonElement.setAttribute('disabled', '');
    };

    return buttonElement;
};