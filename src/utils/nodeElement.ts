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
    const inputDefaultClassList: string[] = ['w-[100%]', 'border', 'border-solid', 'border-slate-200', 'rounded-2xl', 'text-sm', 'text-black', 'font-medium', 'knockModalWordWrap', 'focus:border-slate-400'];
    if(inputType === 'short'){
        inputClassList = ['knockModalInput', 'h-[60px]', 'px-4'];
        inputElement = generateNodeElement('input', [...inputClassList, ...inputDefaultClassList]);
        inputElement.setAttribute('type', `text`);
        inputElement.setAttribute('value', `${inputValue}`);
    } else if(inputType === 'email'){
        inputClassList = ['knockModalInput','h-[60px]', 'px-4'];
        inputElement = generateNodeElement('input', [...inputClassList, ...inputDefaultClassList]);
        inputElement.setAttribute('type', `email`);
        inputElement.setAttribute('autocomplete', 'off');
        inputElement.setAttribute('value', `${inputValue}`);
    } else{
        inputClassList = ['knockModalTextarea', 'h-[140px]', 'p-4'];
        inputElement = generateNodeElement('textarea', [...inputClassList, ...inputDefaultClassList]);
        inputElement.textContent = inputValue;
    };
    inputElement.setAttribute('placeholder', `${placeHolder}`);
    return inputElement;
};


export const generateButtonElement = function(buttonData: knockButtonDataType){
    let buttonElement: HTMLElement;
    let buttonClassList: string[];
    const buttonDefaultClassList: string[] = ['w-[100%]', 'h-12', 'rounded-2xl', 'px-4', 'text-sm', 'font-semibold', 'flex', 'justify-center', 'items-center', 'select-none', 'knockModalCursorPointer', 'transition-colors'];
    if(buttonData.buttonColor === 'blue'&& !buttonData.buttonClickAble){
        buttonClassList = ['bg-slate-50', 'text-slate-300'];
    } else if(buttonData.buttonColor === 'blue' && buttonData.buttonClickAble){
        buttonClassList = ['bg-blue', 'text-white', '[@media(pointer:fine){&:hover}]:bg-blueDark', 'active:bg-blueDark'];
    } else{
        buttonClassList = ['bg-white', 'border', 'border-solid', 'border-slate-200', 'text-slate-400', '[@media(pointer:fine){&:hover}]:border-slate-300', '[@media(pointer:fine){&:hover}]:bg-slate-50', 'active:border-slate-300', 'active:bg-slate-50'];
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