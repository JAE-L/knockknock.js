import './style.css';
import fistPng from './fist.png';
import langBundle from './utils/langBundle';
import handleFetchAPI from './utils/api';
import { knockInquiryServiceDataType, knockInquiryCategoryDataType } from './utils/types';
import { addClassList, generateNodeElement, generateNodeElementWithText, appendElements } from './utils/nodeElement';
import { checkTicketValidation, checkElementExist, handleNodeElement, controlHeightTransition } from './utils/handleKnockInstance';
import KnockHeader from './components/knockHeader';
import KnockButton from './components/knockButton';
import KnockCategoryButton from './components/knockCategoryButton';
import KnockInputWithButton from './components/knockInputWithButton';



interface knockComponentDataType {
    knockknockAPITicket: string;
    serviceLanguage: string;
    useBoxShadow: boolean;
};

interface knockInquiryComponentDataType extends knockComponentDataType {
    serviceTitle: string;
    serviceSubTitle: string;
    inquiryCategoryList: knockInquiryCategoryDataType[];
};


export default class KnockKnock {
    #bodyElement: HTMLElement;
    #knockFragment: HTMLElement;
    #knockComponent: HTMLElement;
    #knockHeaderSection: HTMLElement;
    #knockBodySection: HTMLElement;
    #knockFooterSection: HTMLElement;
    #knockComponentCurrentHeight: number;
    #subscribeWindowResizeEvent: EventListenerOrEventListenerObject;
    #knockknockAPITicket: string;
    #serviceLanguage: string;
    #serviceTitle: string;
    #serviceSubTitle: string;
    #inquiryCategoryList: knockInquiryCategoryDataType[];
    #inquiryServiceData: knockInquiryServiceDataType;

    constructor(props: knockInquiryComponentDataType){
        this.#bodyElement = document.body;
        this.#knockFragment = generateNodeElement('section', ['knockInquiryFragment', 'km-w-full', 'km-h-full', 'km-fixed', 'km-p-4', 'km-flex', 'km-justify-center', 'km-items-end', 'km-z-9999']);
        this.#knockComponent = generateNodeElement('div', ['knockInquiryComponent', 'km-w-full', 'km-max-w-360px', 'km-bg-white', 'km-rounded-3xl', 'km-p-4', 'km-flex', 'km-flex-col', 'km-items-center', 'km-justify-end', 'km-gap-4', 'km-font-nanumFont', 'km-transition-[height]', 'km-duration-300', 'km-ease-out', 'km-will-change-[height]', 'km-animate-fadeInTop', 'km-overflow-hidden', `${!!props.useBoxShadow && 'km-shadow-knockShadow'}`]);
        this.#knockHeaderSection = generateNodeElement('div', ['km-w-full', 'km-h-auto', 'km-flex', 'km-justify-between', 'km-items-start', 'km-gap-2']);
        this.#knockBodySection = generateNodeElement('div', ['km-w-full', 'km-h-auto', 'km-flex', 'km-flex-col', 'km-gap-2']);
        this.#knockFooterSection = generateNodeElementWithText('p', ['km-text-2xs', 'km-text-slate-300', 'km-font-semibold', 'km-text-center', 'km-select-none', 'knockCursorPointer', '[@media(pointer:fine){&:hover}]:km-text-slate-400', 'active:km-text-slate-400', 'km-transition-[color]'], 'powered by KnockKnock');
        this.#knockComponentCurrentHeight = 0;
        this.#subscribeWindowResizeEvent = () => {};
        this.#knockknockAPITicket = `${props.knockknockAPITicket ?? 'null'}`;
        this.#serviceLanguage = props.serviceLanguage === 'KR' ? 'KR' : 'ENG';
        this.#serviceTitle = `${props.serviceTitle ?? 'Service Title'}`;
        this.#serviceSubTitle = `${props.serviceSubTitle ?? 'Service SubTitle'}`;
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


    #requestNewInquiry(){
        handleFetchAPI(
            'https://api.knockknock.support/api/v1/inquiry/create',
            'POST',
            {'Content-Type': 'application/json', 'Authorization': 'null'},
            {
                apiTicket: this.#knockknockAPITicket,
                email: this.#inquiryServiceData.userEmailAddress.trim() === '' ? null : this.#inquiryServiceData.userEmailAddress.trim(),
                serviceName: this.#serviceTitle,
                inquiryCategory: this.#inquiryServiceData.inquiryCategoryTitle,
                inquiryMsg: this.#inquiryServiceData.inquiryInputValue
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
        handleNodeElement(this.#knockHeaderSection, newKnockHeaderElement);

        const newKnockCategoryButton = new KnockCategoryButton({
            categoryList: this.#inquiryCategoryList.map((category) => {
                return {
                    categoryTitle: `${category?.title ?? 'undefined'}`,
                    categorySymbolTextEmoji: `${category?.textEmoji ?? 'undefined'}`,
                    categorySymbolColorName: `${category?.colorName ?? 'blueLight'}`,
                    categoryClickEvent: () => {
                        this.#inquiryServiceData = {
                            inquiryCategoryTitle: `${category?.title ?? 'undefined'}`,
                            inquiryCategorySubTitle: `${category?.subTitle ?? 'undefined'}`,
                            inquiryInputType: `${category?.inputType ?? 'short'}`,
                            inquiryInputValue: `${category?.inputDefaultValue ?? 'undefined'}`,
                            inquiryInputPlaceHolder: `${category?.placeHolder ?? 'undefined'}`,
                            inquiryInputButtonText: `${category?.buttonText ?? 'undefined'}`,
                            inquiryNeedEmailAddress: !!category?.needToRespondInquiry,
                            userEmailAddress: `${this.#inquiryServiceData.userEmailAddress}`
                        };
                        this.#renderInquiryInputPage();
                    }
                };
            })
        });
        const newKnockCategoryButtonGroup: HTMLElement[] = newKnockCategoryButton.generateKnockCategoryButtonGroup();
        handleNodeElement(this.#knockBodySection, newKnockCategoryButtonGroup);

        controlHeightTransition(this.#knockComponent, this.#knockHeaderSection, this.#knockComponentCurrentHeight, (newHeight: number) => {this.#knockComponentCurrentHeight = newHeight}, true);
    };
    #renderInquiryInputPage(){
        const newKnockHeader = new KnockHeader({
            headerTitle: `${this.#inquiryServiceData.inquiryCategoryTitle}`,
            headerSubTitle: `${this.#inquiryServiceData.inquiryCategorySubTitle}`,
            headerIconName: 'leftArrowIcon',
            headerIconClickEvent: () => {
                this.#renderInquiryCategoryPage();
            }
        });
        const newKnockHeaderElement: HTMLElement[] = newKnockHeader.generateKnockHeader();
        handleNodeElement(this.#knockHeaderSection, newKnockHeaderElement);

        const newKnockInputWithButton = new KnockInputWithButton({
            inputData: 'inquiryInputValue',
            inputType: `${this.#inquiryServiceData.inquiryInputType}`,
            inputValue: `${this.#inquiryServiceData.inquiryInputValue}`,
            placeHolder: `${this.#inquiryServiceData.inquiryInputPlaceHolder}`,
            inputChangeEvent: (newInquiryInputValue: string) => {
                this.#inquiryServiceData.inquiryInputValue = newInquiryInputValue;
            },
            inputKeyEvent: () => {
                this.#renderEmailInputPage();
            },
            inputValidationRegExp: '([^\\s])',
            buttonList: [
                {
                    buttonText: `${this.#inquiryServiceData.inquiryInputButtonText}`,
                    buttonColor: 'blue',
                    buttonClickEvent: () => {
                        this.#renderEmailInputPage();
                    },
                    buttonClickAble: false,
                    connectedData: 'inquiryInputValue'
                }
            ]
        });
        const newKnockInputWithButtonElement: HTMLElement[] = newKnockInputWithButton.generateInputWithButton();
        handleNodeElement(this.#knockBodySection, newKnockInputWithButtonElement);

        controlHeightTransition(this.#knockComponent, this.#knockHeaderSection, this.#knockComponentCurrentHeight, (newHeight: number) => {this.#knockComponentCurrentHeight = newHeight}, true);
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
        handleNodeElement(this.#knockHeaderSection, newKnockHeaderElement);

        const newKnockInputWithButton = new KnockInputWithButton({
            inputData: 'userEmailAddress',
            inputType: 'email',
            inputValue: `${this.#inquiryServiceData.userEmailAddress}`,
            placeHolder: `${emailInputPageLangBundle.placeHolder}`,
            inputChangeEvent: (newUserEmailAddress: string) => {
                this.#inquiryServiceData.userEmailAddress = newUserEmailAddress;
            },
            inputKeyEvent: () => {
                this.#renderEmailPreviewPage();
            },
            inputValidationRegExp: '^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$',
            buttonList: this.#inquiryServiceData.inquiryNeedEmailAddress ? [
                {
                    buttonText: `${emailInputPageLangBundle.firstButtonText}`,
                    buttonColor: 'blue',
                    buttonClickEvent: () => {
                        this.#renderEmailPreviewPage();
                    },
                    buttonClickAble: false,
                    connectedData: 'userEmailAddress'
                }
                ] : [
                {
                    buttonText: `${emailInputPageLangBundle.firstButtonText}`,
                    buttonColor: 'blue',
                    buttonClickEvent: () => {
                        this.#renderEmailPreviewPage();
                    },
                    buttonClickAble: false,
                    connectedData: 'userEmailAddress'
                },
                {
                    buttonText: `${emailInputPageLangBundle.secondButtonText}`,
                    buttonColor: 'transparent',
                    buttonClickEvent: () => {
                        this.#inquiryServiceData.userEmailAddress = '';
                        this.#renderRequestNewInquiryPage();
                    },
                    buttonClickAble: true,
                    connectedData: null
                }
            ]
        });
        const newKnockInputWithButtonElement: HTMLElement[] = newKnockInputWithButton.generateInputWithButton();
        handleNodeElement(this.#knockBodySection, newKnockInputWithButtonElement);

        controlHeightTransition(this.#knockComponent, this.#knockHeaderSection, this.#knockComponentCurrentHeight, (newHeight: number) => {this.#knockComponentCurrentHeight = newHeight}, true);
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
        handleNodeElement(this.#knockHeaderSection, newKnockHeaderElement);

        const newKnockCategoryButton = new KnockCategoryButton({
            categoryList: [{
                categoryTitle: `${this.#inquiryServiceData.userEmailAddress}`,
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
                    connectedData: null
            }]
        });
        const newKnockCategoryButtonGroup: HTMLElement[] = newKnockCategoryButton.generateKnockCategoryButtonGroup();
        const newKnockButtonGroup: HTMLElement[] = newKnockButton.generateButtonGroup();
        handleNodeElement(this.#knockBodySection, [...newKnockCategoryButtonGroup, ...newKnockButtonGroup]);

        controlHeightTransition(this.#knockComponent, this.#knockHeaderSection, this.#knockComponentCurrentHeight, (newHeight: number) => {this.#knockComponentCurrentHeight = newHeight}, true);
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
        handleNodeElement(this.#knockHeaderSection, newKnockHeaderElement);

        const newKnockHand: HTMLElement = generateNodeElement('div', ['km-w-full', 'km-h-auto', 'km-flex', 'km-justify-center', 'km-items-center', 'km-select-none']);
        const newKnockHandPngElement: HTMLElement = generateNodeElement('img', ['km-w-18', 'km-h-18', 'km-drop-shadow-knockingShadow', 'knockBackFaceVisible']);
        newKnockHandPngElement.setAttribute('src', fistPng);
        appendElements(newKnockHand, [newKnockHandPngElement]);
        handleNodeElement(this.#knockBodySection, [newKnockHand]);

        this.#requestNewInquiry();
        controlHeightTransition(this.#knockComponent, this.#knockHeaderSection, this.#knockComponentCurrentHeight, (newHeight: number) => {this.#knockComponentCurrentHeight = newHeight}, true);
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
        handleNodeElement(this.#knockHeaderSection, newKnockHeaderElement);

        const newKnockButton = new KnockButton({
            buttonList: [{
                    buttonText: `${endInquiryPageLangBundle.firstButtonText}`,
                    buttonColor: 'blue',
                    buttonClickEvent: () => {
                        this.onClose();
                    },
                    buttonClickAble: true,
                    connectedData: null
            }]
        });
        const newKnockButtonGroup = newKnockButton.generateButtonGroup();
        handleNodeElement(this.#knockBodySection, newKnockButtonGroup);

        controlHeightTransition(this.#knockComponent, this.#knockHeaderSection, this.#knockComponentCurrentHeight, (newHeight: number) => {this.#knockComponentCurrentHeight = newHeight}, true);
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
        handleNodeElement(this.#knockHeaderSection, newKnockHeaderElement);

        const newKnockButton = new KnockButton({
            buttonList: [{
                buttonText: `${endInquiryPageLangBundle.firstButtonText}`,
                buttonColor: 'red',
                buttonClickEvent: () => {
                    this.#renderInquiryCategoryPage();
                },
                buttonClickAble: true,
                connectedData: null
            }]
        });
        const newKnockButtonGroup = newKnockButton.generateButtonGroup();
        handleNodeElement(this.#knockBodySection, newKnockButtonGroup);

        controlHeightTransition(this.#knockComponent, this.#knockHeaderSection, this.#knockComponentCurrentHeight, (newHeight: number) => {this.#knockComponentCurrentHeight = newHeight}, true);
    };


    onOpen(elementSymbol?: null|undefined|string){
        const isKnockComponentExist = checkElementExist('.knockInquiryComponent');
        const ticketValidation = checkTicketValidation(this.#knockknockAPITicket);
        if(isKnockComponentExist || !ticketValidation){return;};

        this.#knockFooterSection.addEventListener('click', () => {window.open('https://knockknock.support')});

        this.#renderInquiryCategoryPage();
        appendElements(this.#knockComponent, [this.#knockHeaderSection, this.#knockBodySection, this.#knockFooterSection]);

        const knockInquiryComponent: null|Element|HTMLElement = elementSymbol ? document.querySelector(`${elementSymbol}`) : null;
        if(knockInquiryComponent){
            addClassList(this.#knockComponent, ['km-border', 'km-border-solid', 'km-border-slate-200']);
            appendElements(knockInquiryComponent, [this.#knockComponent]);
        } else{
            addClassList(this.#knockFragment, ['km-animate-blurOpacity']);
            appendElements(this.#knockFragment, [this.#knockComponent]);
            document.documentElement.insertBefore(this.#knockFragment, this.#bodyElement);
            // this.#bodyElement.insertBefore(this.#knockFragment, this.#bodyElement.firstChild);
        };
        
        controlHeightTransition(this.#knockComponent, this.#knockHeaderSection, this.#knockComponentCurrentHeight, (newHeight: number) => {this.#knockComponentCurrentHeight = newHeight}, true);
        this.#subscribeWindowResizeEvent = (): void => {
            controlHeightTransition(this.#knockComponent, this.#knockHeaderSection, this.#knockComponentCurrentHeight, (newHeight: number) => {this.#knockComponentCurrentHeight = newHeight}, false);
        };
        window.addEventListener('resize', this.#subscribeWindowResizeEvent);
    };
    onClose(){
        this.#knockFragment?.remove();
        this.#knockComponent?.remove();
        window.removeEventListener('resize', this.#subscribeWindowResizeEvent);
    };
}