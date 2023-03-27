import { knockButtonDataType } from '../utils/types';
import { generateInputElement } from '../utils/nodeElement';
import KnockButton from './knockButton';


interface knockInputDataType {
    inputType: string;
    inputValue: string;
    placeHolder: string;
    inputValidationRegExp: string;
};

interface knockInputWithButtonType extends knockInputDataType {
    buttonList: knockButtonDataType[];
};


export default class KnockInputWithButton {
    private inputType: string;
    private inputValue: string;
    private placeHolder: string;
    private inputValidationRegExp: string;
    private buttonList: knockButtonDataType[];

    constructor(props: knockInputWithButtonType){
        this.inputType = props.inputType;
        this.inputValue = props.inputValue;
        this.placeHolder = props.placeHolder;
        this.inputValidationRegExp = props.inputValidationRegExp;
        this.buttonList = props.buttonList;
    };

    changeButtonClass(buttonElement: HTMLElement, buttonState: boolean){
        if(buttonState === true){
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.replace('bg-slate-50', 'bg-blue');
            buttonElement.classList.replace('text-slate-300', 'text-white');
            buttonElement.classList.add('[@media(pointer:fine){&:hover}]:bg-blueDark', 'active:bg-blueDark')
        } else{
            buttonElement.setAttribute('disabled', '');
            buttonElement.classList.replace('bg-blue', 'bg-slate-50');
            buttonElement.classList.replace('text-white', 'text-slate-300');
            buttonElement.classList.remove('[@media(pointer:fine){&:hover}]:bg-blueDark', 'active:bg-blueDark');
        };
    };

    checkInputValidation(buttonGroup: HTMLElement[]){
        const regExp = new RegExp(this.inputValidationRegExp);
        buttonGroup.forEach((buttonElement: HTMLElement, index: number) => {
            const connectedInputData = this.buttonList[index]?.connectedInputData;
            if(connectedInputData && regExp.test(this.inputValue)){
                this.changeButtonClass(buttonElement, true)
            } else if(connectedInputData && !regExp.test(this.inputValue)){
                this.changeButtonClass(buttonElement, false);
            };
        });
    };

    generateButtonGroup(){
        const newKnockButton = new KnockButton({buttonList: this.buttonList});
        return newKnockButton.generateButtonGroup();
    };

    generateInputWithButton(){
        const inputElement = generateInputElement(this.inputType, this.inputValue, this.placeHolder);

        const buttonGroup = this.generateButtonGroup();
        buttonGroup.forEach((buttonElement: HTMLElement, index: number) => {
            const connectedInputData = this.buttonList[index]?.connectedInputData;
            const buttonClickEventArguments = this.buttonList[index].buttonClickEventArguments;
            const addClickEventDirectly = this.buttonList[index].addClickEventDirectly;

            if(connectedInputData && !addClickEventDirectly){
                buttonElement.addEventListener('click', () => {
                    buttonClickEventArguments[`${connectedInputData}`] = this.inputValue;
                    this.buttonList[index].buttonClickEvent(buttonClickEventArguments);
                });
            } else if(!addClickEventDirectly){
                buttonElement.addEventListener('click', () => {
                    this.buttonList[index].buttonClickEvent(buttonClickEventArguments);
                });
            };
        });

        this.checkInputValidation(buttonGroup);
        inputElement.addEventListener('input', (e: Event) => {
            this.inputValue = (e.target as HTMLInputElement).value;
            this.checkInputValidation(buttonGroup);
        });

        return [inputElement, ...buttonGroup];
    };
}