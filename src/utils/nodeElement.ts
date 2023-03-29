import { svgStylesType, knockButtonDataType } from './types';


export const appendElements = function(parentNode: HTMLElement|SVGElement, childNodes: (HTMLElement|SVGElement)[]): void{
    childNodes.forEach((childNode) => {
        parentNode.appendChild(childNode);
    });
};


export const generateNodeElement = function(nodeType:string, classList:string[]): HTMLElement{
    const nodeElement = document.createElement(nodeType);
    nodeElement.classList.add(...classList);
    return nodeElement;
};


export const generateNodeWithTextElement = function(nodeType:string, classList:string[], text:string): HTMLElement{
    const textElement = generateNodeElement(nodeType, classList);
    textElement.textContent = text;
    return textElement;
};


export const generateSvgElement = function(svgClassList: string[]|null, svgStyles: svgStylesType[]): HTMLElement|SVGElement{
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute('width', '20');
    svgElement.setAttribute('height', '20');
    svgElement.setAttribute('viewbox', '0 0 20 20');
    svgElement.setAttribute('fill', 'none');

    if(svgClassList !== null){
        svgElement.classList.add(...svgClassList);
    };

    svgStyles.forEach((svgStyle) => {
        const styleElement = document.createElementNS("http://www.w3.org/2000/svg", `${svgStyle.elementType}`);
        for(const [key, value] of Object.entries(svgStyle)){
            if(key === 'elementType'){continue;};
            styleElement.setAttribute(`${key}`, `${value}`);
        };
        appendElements(svgElement, [styleElement]);
    });

    return svgElement;
};


export const generateInputElement = function(inputType: string, inputValue: string, placeHolder: string){
    let inputElement: HTMLElement;
    let inputClassList: string[];
    const inputDefaultClassList: string[] = ['km-w-full', 'km-border', 'km-border-solid', 'km-border-slate-200', 'km-rounded-2xl', 'km-text-sm', 'km-text-black', 'km-font-medium', 'knockModalWordWrap', 'focus:km-border-slate-400'];
    if(inputType === 'short'){
        inputClassList = ['knockModalInput', 'km-h-60px', 'km-px-4'];
        inputElement = generateNodeElement('input', [...inputClassList, ...inputDefaultClassList]);
        inputElement.setAttribute('type', `text`);
        inputElement.setAttribute('value', `${inputValue}`);
    } else if(inputType === 'email'){
        inputClassList = ['knockModalInput','km-h-60px', 'km-px-4'];
        inputElement = generateNodeElement('input', [...inputClassList, ...inputDefaultClassList]);
        inputElement.setAttribute('type', `email`);
        inputElement.setAttribute('autocomplete', 'off');
        inputElement.setAttribute('value', `${inputValue}`);
    } else{
        inputClassList = ['knockModalTextarea', 'km-h-140px', 'km-p-4'];
        inputElement = generateNodeElement('textarea', [...inputClassList, ...inputDefaultClassList]);
        inputElement.textContent = inputValue;
    };
    inputElement.setAttribute('placeholder', `${placeHolder}`);
    return inputElement;
};


export const generateButtonElement = function(buttonData: knockButtonDataType){
    let buttonElement: HTMLElement;
    let buttonClassList: string[];
    const buttonDefaultClassList: string[] = ['km-w-full', 'km-h-12', 'km-rounded-2xl', 'km-px-4', 'km-text-sm', 'km-font-semibold', 'km-flex', 'km-justify-center', 'km-items-center', 'km-select-none', 'knockModalCursorPointer', 'km-transition-colors'];
    if(buttonData.buttonColor === 'blue'&& !buttonData.buttonClickAble){
        buttonClassList = ['km-bg-slate-50', 'km-text-slate-300'];
    } else if(buttonData.buttonColor === 'blue' && buttonData.buttonClickAble){
        buttonClassList = ['km-bg-blue', 'km-text-white', '[@media(pointer:fine){&:hover}]:km-bg-blueDark', 'active:km-bg-blueDark'];
    } else{
        buttonClassList = ['km-bg-white', 'km-border', 'km-border-solid', 'km-border-slate-200', 'km-text-slate-400', '[@media(pointer:fine){&:hover}]:km-border-slate-300', '[@media(pointer:fine){&:hover}]:km-bg-slate-50', 'active:km-border-slate-300', 'active:km-bg-slate-50'];
    };
    buttonElement = generateNodeWithTextElement('button', [...buttonClassList, ...buttonDefaultClassList], `${buttonData.buttonText}`);
    if(buttonData.addClickEventDirectly === true){
        buttonElement.addEventListener('click', () => {
            buttonData.buttonClickEvent(buttonData.buttonClickEventArguments);
        });
    };
    if(buttonData.buttonClickAble === false){
        buttonElement.setAttribute('disabled', '');
    };
    return buttonElement;
};