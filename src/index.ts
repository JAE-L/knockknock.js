import './style.css';
import langBundle from './utils/langBundle';
import handleFetchAPI from './utils/api';
import { knockInquiryServiceDataType, knockInquiryCategoryDataType } from './utils/types';
import { generateNodeElement, generateNodeWithTextElement, appendElements } from './utils/nodeElement';
import fistPng from './fist.png';
import KnockHeader from './components/knockHeader';
import KnockButton from './components/knockButton';
import KnockCategoryButton from './components/knockCategoryButton';
import KnockInputWithButton from './components/knockInputWithButton';


interface knockModalDataType {
    knockknockAPIKey: string;
    serviceLanguage: string;
    serviceTitle: string;
    serviceSubTitle: string;
    inquiryCategoryList: knockInquiryCategoryDataType[];
};


export default class KnockKnock {
    #bodyElement: HTMLElement;
    #knockModalFragment: HTMLElement;
    #knockModalElement: HTMLElement;
    #knockModalHeaderSection: HTMLElement;
    #knockModalBodySection: HTMLElement;
    #knockModalFooterSection: HTMLElement;
    #knockknockAPIKey: string;
    #serviceLanguage: string;
    #serviceTitle: string;
    #serviceSubTitle: string;
    #inquiryCategoryList: knockInquiryCategoryDataType[];
    #inquiryServiceData: knockInquiryServiceDataType;

    constructor(props: knockModalDataType){
        this.#bodyElement = document.body;
        this.#knockModalFragment = generateNodeElement('section', ['knockModalFragment', 'km-w-full', 'km-h-full', 'km-fixed', 'km-p-4', 'km-flex', 'km-justify-center', 'km-items-end', 'km-z-50', 'km-animate-blurOpacity']);
        this.#knockModalElement = generateNodeElement('div', ['km-w-full', 'km-max-w-360px', 'km-h-auto', 'km-bg-white', 'km-rounded-3xl', 'km-p-4', 'km-flex', 'km-flex-col', 'km-items-center', 'km-gap-4', 'km-animate-fadeInTop']);
        this.#knockModalHeaderSection = generateNodeElement('div', ['km-w-full', 'km-h-auto', 'km-flex', 'km-justify-between', 'km-content-start', 'km-gap-2.5']);
        this.#knockModalBodySection = generateNodeElement('div', ['km-w-full', 'km-h-auto', 'km-flex', 'km-flex-col', 'km-gap-2']);
        this.#knockModalFooterSection = generateNodeWithTextElement('p', ['km-text-2xs', 'km-text-slate-300', 'km-font-semibold', 'km-select-none', 'knockModalCursorPointer', '[@media(pointer:fine){&:hover}]:km-text-slate-400', 'active:km-text-slate-400', 'km-transition-[color]'], 'powered by KnockKnock');
        this.#knockknockAPIKey = `${props.knockknockAPIKey ?? 'undefined'}`;
        this.#serviceLanguage = props.serviceLanguage === 'KR' ? 'KR' : 'ENG';
        this.#serviceTitle = `${props.serviceTitle ?? 'undefined'}`;
        this.#serviceSubTitle = `${props.serviceSubTitle ?? 'undefined'}`;
        this.#inquiryCategoryList = Array.isArray(props.inquiryCategoryList) ? props.inquiryCategoryList : [];
        this.#inquiryServiceData = {
            inquiryCategoryTitle: '',
            inquiryCategorySubTitle: '',
            inquiryInputType: '',
            inquiryInputValue: '',
            inquiryInputPlaceHolder: '',
            inquiryInputButtonText: '',
            inquiryNeedEmailAddress: true,
            userEmailAddress: ''
        };
    };

    #checkKnockModalDataValidation(): boolean{
        if(this.#knockknockAPIKey.trim() === '' || this.#knockknockAPIKey.trim() === 'null' || this.#knockknockAPIKey.trim() === 'undefined'){
            console.error('[ERROR in KnockKnock] - Please enter your API Key.');
            return false;
        } else{
            return true;
        };
    };
    #checkKnockModalExist(): boolean{
        const knockModalFragment: null|HTMLElement = document.querySelector('.knockModalFragment');
        if(knockModalFragment === null){
            return false;
        } else{
            return true;
        };
    };
    #checkNodeHasChild(parentNode: HTMLElement): boolean{
        const doesNodeHasChild: boolean = parentNode.hasChildNodes();
        return doesNodeHasChild;
    };
    #knockModalNodeHandler(parentNode: HTMLElement, childNodes: HTMLElement[]): void{
        const doesNodeHasChild = this.#checkNodeHasChild(parentNode);
        if(doesNodeHasChild){
            parentNode.replaceChildren(...childNodes);
        } else{
            appendElements(parentNode, childNodes);
        };
    };


    get #_inquiryServiceData(){
        return this.#inquiryServiceData;
    };
    set #_inquiryServiceData(newInquiryServiceData: knockInquiryServiceDataType){
        this.#inquiryServiceData = newInquiryServiceData;
    };


    #requestNewInquiry(){
        handleFetchAPI(
            'https://api.knockknock.support/api/v1/inquiry/create',
            'POST',
            {'Content-Type': 'application/json', 'Authorization': 'null'},
            {
                apiKey: this.#knockknockAPIKey,
                email: this.#_inquiryServiceData.userEmailAddress.trim() === '' ? null : this.#_inquiryServiceData.userEmailAddress.trim(),
                serviceName: this.#serviceTitle,
                inquiryCategory: this.#_inquiryServiceData.inquiryCategoryTitle,
                inquiryMsg: this.#_inquiryServiceData.inquiryInputValue
            },
            () => {
                this.#renderRequestSuccessPage();
            },
            (errorData: {generalStatus: number; message: string;}) => {
                this.#renderRequestErrorPage(errorData.generalStatus);
            }
        );
    };


    #renderInquiryCategoryPage(){
        const newKnockHeader = new KnockHeader({
            headerTitle: `${this.#serviceTitle}`,
            headerSubTitle: `${this.#serviceSubTitle}`,
            headerIconName: 'exitIcon',
            headerIconClickEvent: () => {
                this.onClose();
            }
        });
        const newKnockHeaderElement: HTMLElement[] = newKnockHeader.generateKnockHeader();
        this.#knockModalNodeHandler(this.#knockModalHeaderSection, newKnockHeaderElement);

        const newKnockCategoryButton = new KnockCategoryButton({
            categoryList: this.#inquiryCategoryList.map((category) => {
                return {
                    categoryTitle: `${category.title ?? 'undefined'}`,
                    categorySymbolTextEmoji: `${category.textEmoji ?? 'undefined'}`,
                    categorySymbolColorName: `${category.colorName ?? 'blueLight'}`,
                    categoryClickEvent: () => {
                        this.#_inquiryServiceData = {
                            inquiryCategoryTitle: `${category.title ?? 'undefined'}`,
                            inquiryCategorySubTitle: `${category.subTitle ?? 'undefined'}`,
                            inquiryInputType: `${category.inputType ?? 'short'}`,
                            inquiryInputValue: `${category.inputDefaultValue ?? 'undefined'}`,
                            inquiryInputPlaceHolder: `${category.placeHolder ?? 'undefined'}`,
                            inquiryInputButtonText: `${category.buttonText ?? 'undefined'}`,
                            inquiryNeedEmailAddress: !!category.needToRespondInquiry,
                            userEmailAddress: `${this.#_inquiryServiceData.userEmailAddress}`
                        };
                        this.#renderInquiryInputPage();
                    }
                };
            })
        });
        const newKnockCategoryButtonGroup: HTMLElement[] = newKnockCategoryButton.generateKnockCategoryButtonGroup();
        this.#knockModalNodeHandler(this.#knockModalBodySection, newKnockCategoryButtonGroup);
    };
    #renderInquiryInputPage(){
        const newKnockHeader = new KnockHeader({
            headerTitle: `${this.#_inquiryServiceData.inquiryCategoryTitle}`,
            headerSubTitle: `${this.#_inquiryServiceData.inquiryCategorySubTitle}`,
            headerIconName: 'leftArrowIcon',
            headerIconClickEvent: () => {
                this.#renderInquiryCategoryPage();
            }
        });
        const newKnockHeaderElement: HTMLElement[] = newKnockHeader.generateKnockHeader();
        this.#knockModalNodeHandler(this.#knockModalHeaderSection, newKnockHeaderElement);

        const newKnockInputWithButton = new KnockInputWithButton({
            inputData: 'inquiryInputValue',
            inputType: `${this.#_inquiryServiceData.inquiryInputType}`,
            inputValue: `${this.#_inquiryServiceData.inquiryInputValue}`,
            placeHolder: `${this.#_inquiryServiceData.inquiryInputPlaceHolder}`,
            inputChangeEvent: (newInquiryInputValue: string) => {
                this.#_inquiryServiceData = {
                    ...this.#_inquiryServiceData,
                    inquiryInputValue: newInquiryInputValue
                }
            },
            inputKeyEvent: () => {
                this.#renderEmailInputPage();
            },
            inputValidationRegExp: '([^\\s])',
            buttonList: [
                {
                    buttonText: `${this.#_inquiryServiceData.inquiryInputButtonText}`,
                    buttonColor: 'blue',
                    buttonClickEvent: () => {
                        this.#renderEmailInputPage();
                    },
                    buttonClickAble: false,
                    connectedInputData: 'inquiryInputValue'
                }
            ]
        });
        const newKnockInputWithButtonElement: HTMLElement[] = newKnockInputWithButton.generateInputWithButton();
        this.#knockModalNodeHandler(this.#knockModalBodySection, newKnockInputWithButtonElement);
    };
    #renderEmailInputPage(){
        const emailInputPageLangBundle = langBundle[this.#serviceLanguage]['emailInputPage'];

        const newKnockHeader = new KnockHeader({
            headerTitle: `${emailInputPageLangBundle.title}`,
            headerSubTitle: `${emailInputPageLangBundle.subTitle}`,
            headerIconName: 'leftArrowIcon',
            headerIconClickEvent: () => {
                this.#renderInquiryInputPage();
            }
        });
        const newKnockHeaderElement: HTMLElement[] = newKnockHeader.generateKnockHeader();
        this.#knockModalNodeHandler(this.#knockModalHeaderSection, newKnockHeaderElement);

        const newKnockInputWithButton = new KnockInputWithButton({
            inputData: 'userEmailAddress',
            inputType: 'email',
            inputValue: `${this.#_inquiryServiceData.userEmailAddress}`,
            placeHolder: `${emailInputPageLangBundle.placeHolder}`,
            inputChangeEvent: (newUserEmailAddress: string) => {
                this.#_inquiryServiceData = {
                    ...this.#_inquiryServiceData,
                    userEmailAddress: newUserEmailAddress
                }
            },
            inputKeyEvent: () => {
                this.#renderEmailPreviewPage();
            },
            inputValidationRegExp: '^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$',
            buttonList: this.#_inquiryServiceData.inquiryNeedEmailAddress ? [
                {
                    buttonText: `${emailInputPageLangBundle.firstButtonText}`,
                    buttonColor: 'blue',
                    buttonClickEvent: () => {
                        this.#renderEmailPreviewPage();
                    },
                    buttonClickAble: false,
                    connectedInputData: 'userEmailAddress'
                }
                ] : [
                {
                    buttonText: `${emailInputPageLangBundle.firstButtonText}`,
                    buttonColor: 'blue',
                    buttonClickEvent: () => {
                        this.#renderEmailPreviewPage();
                    },
                    buttonClickAble: false,
                    connectedInputData: 'userEmailAddress'
                },
                {
                    buttonText: `${emailInputPageLangBundle.secondButtonText}`,
                    buttonColor: 'transparent',
                    buttonClickEvent: () => {
                        this.#_inquiryServiceData = {
                            ...this.#_inquiryServiceData,
                            userEmailAddress: ''
                        };
                        this.#renderRequestNewInquiryPage();
                    },
                    buttonClickAble: true,
                    connectedInputData: null
                }
            ]
        });
        const newKnockInputWithButtonElement: HTMLElement[] = newKnockInputWithButton.generateInputWithButton();
        this.#knockModalNodeHandler(this.#knockModalBodySection, newKnockInputWithButtonElement);
    };
    #renderEmailPreviewPage(){
        const emailPreviewPageLangBundle = langBundle[this.#serviceLanguage]['emailPreviewPage'];

        const newKnockHeader = new KnockHeader({
            headerTitle: `${emailPreviewPageLangBundle.title}`,
            headerSubTitle: `${emailPreviewPageLangBundle.subTitle}`,
            headerIconName: 'leftArrowIcon',
            headerIconClickEvent: () => {
                this.#renderEmailInputPage();
            }
        });
        const newKnockHeaderElement: HTMLElement[] = newKnockHeader.generateKnockHeader();
        this.#knockModalNodeHandler(this.#knockModalHeaderSection, newKnockHeaderElement);

        const newKnockCategoryButton = new KnockCategoryButton({
            categoryList: [{
                categoryTitle: `${this.#_inquiryServiceData.userEmailAddress}`,
                categorySymbolTextEmoji: `📩`,
                categorySymbolColorName: 'blueLight',
                categoryClickEvent: () => {
                    this.#renderEmailInputPage();
                }
            }]
        });
        const newKnockButton = new KnockButton({
            buttonList: [{
                    buttonText: `${emailPreviewPageLangBundle.firstButtonText}`,
                    buttonColor: 'blue',
                    buttonClickEvent: () => {
                        this.#renderRequestNewInquiryPage();
                    },
                    buttonClickAble: true,
                    connectedInputData: null
            }]
        });
        const newKnockCategoryButtonGroup: HTMLElement[] = newKnockCategoryButton.generateKnockCategoryButtonGroup();
        const newKnockButtonGroup: HTMLElement[] = newKnockButton.generateButtonGroup();
        this.#knockModalNodeHandler(this.#knockModalBodySection, [...newKnockCategoryButtonGroup, ...newKnockButtonGroup]);
    };
    #renderRequestNewInquiryPage(){
        const sendInquiryPageLangBundle = langBundle[this.#serviceLanguage]['requestNewInquiryPage'];

        const newKnockHeader = new KnockHeader({
            headerTitle: `${sendInquiryPageLangBundle.title}`,
            headerSubTitle: `${sendInquiryPageLangBundle.subTitle}`,
            headerIconName: 'spinIcon',
            headerIconClickEvent: () => {},
        });
        const newKnockHeaderElement: HTMLElement[] = newKnockHeader.generateKnockHeader();
        this.#knockModalNodeHandler(this.#knockModalHeaderSection, newKnockHeaderElement);


        const newKnockHand: HTMLElement = generateNodeElement('div', ['km-w-full', 'km-h-auto', 'km-flex', 'km-justify-center', 'km-items-center']);
        const newKnockHandPngElement: HTMLElement = generateNodeElement('img', ['km-w-16', 'km-h-16', 'km-drop-shadow-xl', 'km-select-none', 'km-animate-knocking', 'knockModalBackFaceVisible']);
        newKnockHandPngElement.setAttribute('src', fistPng);
        appendElements(newKnockHand, [newKnockHandPngElement]);
        this.#knockModalNodeHandler(this.#knockModalBodySection, [newKnockHand]);
        this.#requestNewInquiry();
    };
    #renderRequestSuccessPage(){
        const endInquiryPageLangBundle = langBundle[this.#serviceLanguage]['requestSuccessInquiryPage'];
        
        const newKnockHeader = new KnockHeader({
            headerTitle: `${endInquiryPageLangBundle.title}`,
            headerSubTitle: `${endInquiryPageLangBundle.subTitle}`,
            headerIconName: 'exitIcon',
            headerIconClickEvent: () => {
                this.onClose();
            }
        });
        const newKnockHeaderElement: HTMLElement[] = newKnockHeader.generateKnockHeader();
        this.#knockModalNodeHandler(this.#knockModalHeaderSection, newKnockHeaderElement);

        const newKnockButton = new KnockButton({
            buttonList: [{
                    buttonText: `${endInquiryPageLangBundle.firstButtonText}`,
                    buttonColor: 'blue',
                    buttonClickEvent: () => {
                        this.onClose();
                    },
                    buttonClickAble: true,
                    connectedInputData: null
            }]
        });
        const newKnockButtonGroup = newKnockButton.generateButtonGroup();
        this.#knockModalNodeHandler(this.#knockModalBodySection, newKnockButtonGroup);
    };
    #renderRequestErrorPage(errorStatus: number){
        const endInquiryPageLangBundle = langBundle[this.#serviceLanguage]['requestErrorInquiryPage'];
        
        const newKnockHeader = new KnockHeader({
            headerTitle: `${endInquiryPageLangBundle.title}`,
            headerSubTitle: `${endInquiryPageLangBundle[`${errorStatus}`]}`,
            headerIconName: 'exitIcon',
            headerIconClickEvent: () => {
                this.onClose();
            }
        });
        const newKnockHeaderElement: HTMLElement[] = newKnockHeader.generateKnockHeader();
        this.#knockModalNodeHandler(this.#knockModalHeaderSection, newKnockHeaderElement);

        const newKnockButton = new KnockButton({
            buttonList: [{
                buttonText: `${endInquiryPageLangBundle.firstButtonText}`,
                buttonColor: 'red',
                buttonClickEvent: () => {
                    this.onClose();
                },
                buttonClickAble: true,
                connectedInputData: null
            }]
        });
        const newKnockButtonGroup = newKnockButton.generateButtonGroup();
        this.#knockModalNodeHandler(this.#knockModalBodySection, newKnockButtonGroup);
    };


    onOpen(){
        const isKnockModalExist = this.#checkKnockModalExist();
        const knockModalDataValidation = this.#checkKnockModalDataValidation();
        if(isKnockModalExist || !knockModalDataValidation){return;};

        this.#renderInquiryCategoryPage();
        this.#knockModalFooterSection.addEventListener('click', () => {window.open('https://knockknock.support')});

        appendElements(this.#knockModalElement, [this.#knockModalHeaderSection, this.#knockModalBodySection, this.#knockModalFooterSection]);
        appendElements(this.#knockModalFragment, [this.#knockModalElement]);
        this.#bodyElement.insertBefore(this.#knockModalFragment, this.#bodyElement.firstChild);
    };
    onClose(){
        this.#knockModalFragment?.remove();
    };
}