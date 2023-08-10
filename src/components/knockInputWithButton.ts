import { knockInputDataType, knockButtonDataType } from '../utils/types';
import { generateInputElement } from '../utils/nodeElement';
import KnockButton from './knockButton';


interface knockInputWithButtonType extends knockInputDataType {
    buttonList: knockButtonDataType[];
};


export default class KnockInputWithButton {
    private inputData: string;
    private inputType: string;
    private inputValue: string;
    private placeHolder: string;
    private inputChangeEvent: any;
    private inputKeyEvent: any;
    private inputValidationRegExp: RegExp;
    private inputValidationState: boolean;
    private buttonList: knockButtonDataType[];

    constructor(props: knockInputWithButtonType){
        this.inputData = props.inputData;
        this.inputType = props.inputType;
        this.inputValue = props.inputValue;
        this.placeHolder = props.placeHolder;
        this.inputChangeEvent = props.inputChangeEvent;
        this.inputKeyEvent = props.inputKeyEvent;
        this.inputValidationRegExp = new RegExp(props.inputValidationRegExp);
        this.inputValidationState = false;
        this.buttonList = props.buttonList;
    };


    private checkInputValidation(): void{
        if(this.inputValidationRegExp.test(this.inputValue)){
            this.inputValidationState = true;
        } else{
            this.inputValidationState = false;
        };
    };

    private changeButtonClass(buttonElement: HTMLElement, buttonState: boolean): void{
        let buttonColor: null|string = null;
        if(buttonElement.classList.contains('km-dc-blue')){
            buttonColor = 'blue';
        } else if(buttonElement.classList.contains('km-dc-red')){
            buttonColor = 'red';
        } else{
            buttonColor = 'white';
        };

        if(buttonColor === 'blue' && buttonState === true){
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove('km-bg-slate-50', 'km-text-slate-300');
            buttonElement.classList.add('km-bg-blue', 'km-text-white', '[@media(pointer:fine){&:hover}]:km-bg-blueDark', 'active:km-bg-blueDark');
        } else if(buttonColor === 'blue' && buttonState === false){
            buttonElement.setAttribute('disabled', '');
            buttonElement.classList.remove('km-bg-blue', 'km-text-white', '[@media(pointer:fine){&:hover}]:km-bg-blueDark', 'active:km-bg-blueDark');
            buttonElement.classList.add('km-bg-slate-50', 'km-text-slate-300');
        } else if(buttonColor === 'red' && buttonState === true){
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove('km-bg-slate-50', 'km-text-slate-300');
            buttonElement.classList.add('km-bg-red', 'km-text-white', '[@media(pointer:fine){&:hover}]:km-bg-redDark', 'active:km-bg-redDark');
        } else if(buttonColor === 'red' && buttonState === false){
            buttonElement.setAttribute('disabled', '');
            buttonElement.classList.remove('km-bg-red', 'km-text-white', '[@media(pointer:fine){&:hover}]:km-bg-redDark', 'active:km-bg-redDark');
            buttonElement.classList.add('km-bg-slate-50', 'km-text-slate-300');
        };
    };

    private checkButtonClickAble(buttonGroup: HTMLElement[]): void{
        buttonGroup.forEach((buttonElement: HTMLElement, index: number): void => {
            const connectedData: null|undefined|string = this.buttonList[index]?.connectedData;
            if(connectedData === this.inputData && this.inputValidationState){
                this.changeButtonClass(buttonElement, true);
            } else if(connectedData === this.inputData && !this.inputValidationState){
                this.changeButtonClass(buttonElement, false);
            };
        });
    };

    private generateButtonGroup(): HTMLElement[]{
        const newKnockButton = new KnockButton({buttonList: this.buttonList});
        const newKnockButtonGroup: HTMLElement[] = newKnockButton.generateButtonGroup();
        return newKnockButtonGroup;
    };


    generateInputWithButton(): HTMLElement[]{
        const inputElement: HTMLElement = generateInputElement(this.inputType, this.inputValue, this.placeHolder);
        const buttonGroup: HTMLElement[] = this.generateButtonGroup();

        this.checkInputValidation();
        this.checkButtonClickAble(buttonGroup);

        inputElement.addEventListener('input', (ev: Event) => {
            const newInputValue = (ev.target as HTMLInputElement).value;
            this.inputValue = newInputValue;
            this.inputChangeEvent(newInputValue);
            this.checkInputValidation();
            this.checkButtonClickAble(buttonGroup);
        });
        inputElement.addEventListener('keydown', (ev: KeyboardEvent) => {
            if((ev.key === 'Enter' && this.inputType !== 'long') && this.inputValidationState){
                this.inputKeyEvent();
            };
        });

        return [inputElement, ...buttonGroup];
    };
}