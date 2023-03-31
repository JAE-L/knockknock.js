import { knockButtonDataType } from '../utils/types';
import { generateInputElement } from '../utils/nodeElement';
import KnockButton from './knockButton';


interface knockInputDataType {
    inputData: string;
    inputType: string;
    inputValue: string;
    placeHolder: string;
    inputKeyEvent: any;
    inputKeyEventArguments: any;
    inputValidationRegExp: string;
};

interface knockInputWithButtonType extends knockInputDataType {
    buttonList: knockButtonDataType[];
};


export default class KnockInputWithButton {
    private inputData: string;
    private inputType: string;
    private inputValue: string;
    private placeHolder: string;
    private inputKeyEvent: any;
    private inputKeyEventArguments: any;
    private inputValidationRegExp: RegExp;
    private inputValidationState: boolean;
    private buttonList: knockButtonDataType[];

    constructor(props: knockInputWithButtonType){
        this.inputData = props.inputData;
        this.inputType = props.inputType;
        this.inputValue = props.inputValue;
        this.placeHolder = props.placeHolder;
        this.inputKeyEvent = props.inputKeyEvent;
        this.inputKeyEventArguments = props.inputKeyEventArguments;
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
        if(buttonState === true){
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove('km-bg-slate-50', 'km-text-slate-300');
            buttonElement.classList.add('km-bg-blue', 'km-text-white', '[@media(pointer:fine){&:hover}]:km-bg-blueDark', 'active:km-bg-blueDark');
        } else{
            buttonElement.setAttribute('disabled', '');
            buttonElement.classList.remove('km-bg-blue', 'km-text-white', '[@media(pointer:fine){&:hover}]:km-bg-blueDark', 'active:km-bg-blueDark');
            buttonElement.classList.add('km-bg-slate-50', 'km-text-slate-300');
        };
    };

    private checkButtonClickAble(buttonGroup: HTMLElement[]): void{
        buttonGroup.forEach((buttonElement: HTMLElement, index: number): void => {
            const connectedInputData: null|undefined|string = this.buttonList[index]?.connectedInputData;
            if(connectedInputData && this.inputValidationState){
                this.changeButtonClass(buttonElement, true);
            } else if(connectedInputData && !this.inputValidationState){
                this.changeButtonClass(buttonElement, false);
            };
        });
    };

    private generateButtonGroup(): HTMLElement[]{
        const newKnockButton = new KnockButton({buttonList: this.buttonList});
        const newKnockButtonGroup: HTMLElement[] = newKnockButton.generateButtonGroup();
        return newKnockButtonGroup
    };


    generateInputWithButton(): HTMLElement[]{
        const inputElement: HTMLElement = generateInputElement(this.inputType, this.inputValue, this.placeHolder);

        const buttonGroup: HTMLElement[] = this.generateButtonGroup();
        buttonGroup.forEach((buttonElement: HTMLElement, index: number): void => {
            const connectedInputData: null|undefined|string = this.buttonList[index]?.connectedInputData;
            const buttonClickEventArguments: any = this.buttonList[index].buttonClickEventArguments;
            const addClickEventDirectly: boolean = this.buttonList[index].addClickEventDirectly;

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

        this.checkInputValidation();
        this.checkButtonClickAble(buttonGroup);

        inputElement.addEventListener('input', (e: Event) => {
            this.inputValue = (e.target as HTMLInputElement).value;
            this.checkInputValidation();
            this.checkButtonClickAble(buttonGroup);
        });
        inputElement.addEventListener('keydown', (e: KeyboardEvent) => {
            if((e.key === 'Enter' && this.inputType !== 'long') && this.inputValidationState){
                this.inputKeyEventArguments[this.inputData] = this.inputValue;
                this.inputKeyEvent(this.inputKeyEventArguments);
            };
        });

        return [inputElement, ...buttonGroup];
    };
}