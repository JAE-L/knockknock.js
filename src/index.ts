import './style.css';
import langBundle from './utils/langBundle';
import { knockInquiryServiceDataType, knockInquiryCategoryDataType } from './utils/types';
import { generateNodeElement, generateNodeWithTextElement, appendElements } from './utils/nodeElement';
import KnockHeader from './components/knockHeader';
import KnockButton from './components/knockButton';
import KnockCategoryButton from './components/knockCategoryButton';
import KnockInputWithButton from './components/knockInputWithButton';


interface knockModalDataType {
    serviceLanguage: string;
    serviceTitle: string;
    serviceSubTitle: string;
    inquiryCategoryList: knockInquiryCategoryDataType[];
};


export default class KnockKnock {
    private bodyElement: HTMLElement;
    private knockModalFragment: HTMLElement;
    private knockModalElement: HTMLElement;
    private knockModalHeaderSection: HTMLElement;
    private knockModalBodySection: HTMLElement;
    private knockModalFooterSection: HTMLElement;
    private serviceLanguage: string;
    private serviceTitle: string;
    private serviceSubTitle: string;
    private inquiryCategoryList: knockInquiryCategoryDataType[];
    private inquiryServiceData: knockInquiryServiceDataType;

    constructor(props: knockModalDataType){
        this.bodyElement = document.body;
        this.knockModalFragment = generateNodeElement('section', ['knockModalFragment', 'km-w-full', 'km-h-full', 'km-bg-neutral-900/20', 'km-backdrop-blur', 'km-fixed', 'km-p-4', 'km-flex', 'km-justify-center', 'km-items-end', 'km-z-10']);
        this.knockModalElement = generateNodeElement('div', ['km-w-full', 'km-max-w-360px', 'km-h-auto', 'km-bg-white', 'km-rounded-2xl', 'km-p-4', 'km-flex', 'km-flex-col', 'km-items-center', 'km-gap-4']);
        this.knockModalHeaderSection = generateNodeElement('div', ['km-w-full', 'km-h-auto', 'km-flex', 'km-justify-between', 'km-content-start', 'km-gap-2.5']);
        this.knockModalBodySection = generateNodeElement('div', ['km-w-full', 'km-h-auto', 'km-flex', 'km-flex-col', 'km-gap-2']);
        this.knockModalFooterSection = generateNodeWithTextElement('p', ['km-text-2xs', 'km-text-slate-300', 'km-font-semibold', 'km-select-none', 'knockModalCursorPointer', '[@media(pointer:fine){&:hover}]:km-text-slate-400', 'active:km-text-slate-400', 'km-transition-[color]'], 'powered by KnockKnock');
        this.serviceLanguage = props.serviceLanguage === 'KR' ? 'KR' : 'ENG';
        this.serviceTitle = `${props.serviceTitle}`;
        this.serviceSubTitle = `${props.serviceSubTitle}`;
        this.inquiryCategoryList = props.inquiryCategoryList;
        this.inquiryServiceData = {
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


    private checkKnockModalExist(): boolean{
        const knockModalFragment: null|HTMLElement = document.querySelector('.knockModalFragment');
        if(knockModalFragment === null){
            return false;
        } else{
            return true;
        };
    };
    private checkNodeHasChild(parentNode: HTMLElement): boolean{
        const doesNodeHasChild: boolean = parentNode.hasChildNodes();
        return doesNodeHasChild;
    };
    private knockModalNodeHandler(parentNode: HTMLElement, childNodes: HTMLElement[]): void{
        const doesNodeHasChild = this.checkNodeHasChild(parentNode);
        if(doesNodeHasChild){
            parentNode.replaceChildren(...childNodes);
        } else{
            appendElements(parentNode, childNodes);
        };
    };


    private renderInquiryCategoryPage(){
        const newKnockHeader = new KnockHeader({
            headerTitle: `${this.serviceTitle}`,
            headerSubTitle: `${this.serviceSubTitle}`,
            headerIconName: 'exitIcon',
            headerIconClickEvent: this.onClose.bind(this),
            headerIconClickEventArguments: null
        });
        const newKnockHeaderElement: HTMLElement[] = newKnockHeader.generateKnockHeader();
        this.knockModalNodeHandler(this.knockModalHeaderSection, newKnockHeaderElement);

        const newKnockCategoryButton = new KnockCategoryButton({
            categoryList: this.inquiryCategoryList.map((category) => {
                return {
                    categoryTitle: `${category.title}`,
                    categorySymbolTextEmoji: `${category.textEmoji}`,
                    categorySymbolColorName: `${category.colorName}`,
                    categoryClickEvent: this.renderInquiryInputPage.bind(this),
                    categoryClickEventArguments: {
                        ...this.inquiryServiceData,
                        inquiryCategoryTitle: `${category.title}`,
                        inquiryCategorySubTitle: `${category.subTitle}`,
                        inquiryInputType: `${category.inputType}`,
                        inquiryInputValue: `${category.inputDefaultValue}`,
                        inquiryInputPlaceHolder: `${category.placeHolder}`,
                        inquiryInputButtonText: `${category.buttonText}`,
                        inquiryNeedEmailAddress: category.needEmailAddress
                    }
                };
            })
        });
        const newKnockCategoryButtonGroup: HTMLElement[] = newKnockCategoryButton.generateKnockCategoryButtonGroup();
        this.knockModalNodeHandler(this.knockModalBodySection, newKnockCategoryButtonGroup);
    };
    private renderInquiryInputPage(props: knockInquiryServiceDataType){
        const newKnockHeader = new KnockHeader({
            headerTitle: `${props.inquiryCategoryTitle}`,
            headerSubTitle: `${props.inquiryCategorySubTitle}`,
            headerIconName: 'leftArrowIcon',
            headerIconClickEvent: this.renderInquiryCategoryPage.bind(this),
            headerIconClickEventArguments: props
        });
        const newKnockHeaderElement: HTMLElement[] = newKnockHeader.generateKnockHeader();
        this.knockModalNodeHandler(this.knockModalHeaderSection, newKnockHeaderElement);

        const newKnockInputWithButton = new KnockInputWithButton({
            inputData: 'inquiryInputValue',
            inputType: `${props.inquiryInputType}`,
            inputValue: `${props.inquiryInputValue}`,
            placeHolder: `${props.inquiryInputPlaceHolder}`,
            inputKeyEvent: this.renderEmailInputPage.bind(this),
            inputKeyEventArguments: props,
            inputValidationRegExp: '([^\\s])',
            buttonList: [
                {
                    buttonText: `${props.inquiryInputButtonText}`,
                    buttonColor: 'blue',
                    buttonClickEvent: this.renderEmailInputPage.bind(this),
                    buttonClickEventArguments: props,
                    buttonClickAble: false,
                    addClickEventDirectly: false,
                    connectedInputData: 'inquiryInputValue'
                }
            ]
        });
        const newKnockInputWithButtonElement: HTMLElement[] = newKnockInputWithButton.generateInputWithButton();
        this.knockModalNodeHandler(this.knockModalBodySection, newKnockInputWithButtonElement);
    };
    private renderEmailInputPage(props: knockInquiryServiceDataType){
        const emailInputPageLangBundle = langBundle[this.serviceLanguage]['emailInputPage'];

        const newKnockHeader = new KnockHeader({
            headerTitle: `${emailInputPageLangBundle.title}`,
            headerSubTitle: `${emailInputPageLangBundle.subTitle}`,
            headerIconName: 'leftArrowIcon',
            headerIconClickEvent: this.renderInquiryInputPage.bind(this),
            headerIconClickEventArguments: props
        });
        const newKnockHeaderElement: HTMLElement[] = newKnockHeader.generateKnockHeader();
        this.knockModalNodeHandler(this.knockModalHeaderSection, newKnockHeaderElement);

        const newKnockInputWithButton = new KnockInputWithButton({
            inputData: 'userEmailAddress',
            inputType: 'email',
            inputValue: `${props.userEmailAddress}`,
            placeHolder: `${emailInputPageLangBundle.placeHolder}`,
            inputKeyEvent: this.renderEmailPreviewPage.bind(this),
            inputKeyEventArguments: props,
            inputValidationRegExp: '^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$',
            buttonList: props.inquiryNeedEmailAddress ? [
                {
                    buttonText: `${emailInputPageLangBundle.firstButtonText}`,
                    buttonColor: 'blue',
                    buttonClickEvent: this.renderEmailPreviewPage.bind(this),
                    buttonClickEventArguments: props,
                    buttonClickAble: false,
                    addClickEventDirectly: false,
                    connectedInputData: 'userEmailAddress'
                }
                ] : [
                {
                    buttonText: `${emailInputPageLangBundle.firstButtonText}`,
                    buttonColor: 'blue',
                    buttonClickEvent: this.renderEmailPreviewPage.bind(this),
                    buttonClickEventArguments: props,
                    buttonClickAble: false,
                    addClickEventDirectly: false,
                    connectedInputData: 'userEmailAddress'
                },
                {
                    buttonText: `${emailInputPageLangBundle.secondButtonText}`,
                    buttonColor: 'gray',
                    buttonClickEvent: this.renderSendInquiryPage.bind(this),
                    buttonClickEventArguments: {
                        ...props,
                        userEmailAddress: '',
                    },
                    buttonClickAble: true,
                    addClickEventDirectly: true,
                    connectedInputData: null
                }
            ]
        });
        const newKnockInputWithButtonElement: HTMLElement[] = newKnockInputWithButton.generateInputWithButton();
        this.knockModalNodeHandler(this.knockModalBodySection, newKnockInputWithButtonElement);
    };
    private renderEmailPreviewPage(props: knockInquiryServiceDataType){
        const emailPreviewPageLangBundle = langBundle[this.serviceLanguage]['emailPreviewPage'];

        const newKnockHeader = new KnockHeader({
            headerTitle: `${emailPreviewPageLangBundle.title}`,
            headerSubTitle: `${emailPreviewPageLangBundle.subTitle}`,
            headerIconName: 'leftArrowIcon',
            headerIconClickEvent: this.renderEmailInputPage.bind(this),
            headerIconClickEventArguments: props
        });
        const newKnockHeaderElement: HTMLElement[] = newKnockHeader.generateKnockHeader();
        this.knockModalNodeHandler(this.knockModalHeaderSection, newKnockHeaderElement);

        const newKnockCategoryButton = new KnockCategoryButton({
            categoryList: [{
                categoryTitle: `${props.userEmailAddress}`,
                categorySymbolTextEmoji: `📩`,
                categorySymbolColorName: 'blueLight',
                categoryClickEvent: this.renderEmailInputPage.bind(this),
                categoryClickEventArguments: props
            }]
        });
        const newKnockButton = new KnockButton({
            buttonList: [{
                    buttonText: `${emailPreviewPageLangBundle.firstButtonText}`,
                    buttonColor: 'blue',
                    buttonClickEvent: this.renderSendInquiryPage.bind(this),
                    buttonClickEventArguments: props,
                    buttonClickAble: true,
                    addClickEventDirectly: true,
                    connectedInputData: null
            }]
        });
        const newKnockCategoryButtonGroup: HTMLElement[] = newKnockCategoryButton.generateKnockCategoryButtonGroup();
        const newKnockButtonGroup: HTMLElement[] = newKnockButton.generateButtonGroup();
        this.knockModalNodeHandler(this.knockModalBodySection, [...newKnockCategoryButtonGroup, ...newKnockButtonGroup]);
    };
    private renderSendInquiryPage(props: knockInquiryServiceDataType){
        const sendInquiryPageLangBundle = langBundle[this.serviceLanguage]['sendInquiryPage'];

        const newKnockHeader = new KnockHeader({
            headerTitle: `${sendInquiryPageLangBundle.title}`,
            headerSubTitle: `${sendInquiryPageLangBundle.subTitle}`,
            headerIconName: 'spinIcon',
            headerIconClickEvent: () => {},
            headerIconClickEventArguments: null
        });
        const newKnockHeaderElement: HTMLElement[] = newKnockHeader.generateKnockHeader();
        this.knockModalNodeHandler(this.knockModalHeaderSection, newKnockHeaderElement);

        const newKnockHand: HTMLElement = generateNodeWithTextElement('div', ['km-w-auto', 'km-h-auto', 'km-text-6xl', 'km-text-center', 'km-drop-shadow-xl', 'km-select-none', 'knocking'], '✊');
        this.knockModalNodeHandler(this.knockModalBodySection, [newKnockHand]);

        setTimeout(() => {
            this.renderEndInquiryPage();
        }, 4000);
    };
    private renderEndInquiryPage(){
        const endInquiryPageLangBundle = langBundle[this.serviceLanguage]['endInquiryPage'];
        
        const newKnockHeader = new KnockHeader({
            headerTitle: `${endInquiryPageLangBundle.title}`,
            headerSubTitle: `${endInquiryPageLangBundle.subTitle}`,
            headerIconName: 'exitIcon',
            headerIconClickEvent: this.onClose.bind(this),
            headerIconClickEventArguments: null
        });
        const newKnockHeaderElement: HTMLElement[] = newKnockHeader.generateKnockHeader();
        this.knockModalNodeHandler(this.knockModalHeaderSection, newKnockHeaderElement);

        const newKnockButton = new KnockButton({
            buttonList: [{
                    buttonText: `${endInquiryPageLangBundle.firstButtonText}`,
                    buttonColor: 'blue',
                    buttonClickEvent: this.renderInquiryCategoryPage.bind(this),
                    buttonClickEventArguments: null,
                    buttonClickAble: true,
                    addClickEventDirectly: true,
                    connectedInputData: null
            }]
        });
        const newKnockButtonGroup = newKnockButton.generateButtonGroup();
        this.knockModalNodeHandler(this.knockModalBodySection, newKnockButtonGroup);
    };


    onOpen(){
        const isKnockModalExist = this.checkKnockModalExist();
        if(isKnockModalExist){return;};
        this.renderInquiryCategoryPage();
        appendElements(this.knockModalElement, [this.knockModalHeaderSection, this.knockModalBodySection, this.knockModalFooterSection]);
        appendElements(this.knockModalFragment, [this.knockModalElement]);
        this.bodyElement.insertBefore(this.knockModalFragment, this.bodyElement.firstChild);
    };
    onClose(){
        this.knockModalFragment.remove();
    };
}


// const knockknockInquiryComponent = new KnockKnock({
//     serviceLanguage: 'KR',
//     serviceTitle: 'BeMoon',
//     serviceSubTitle: '문의, 오타, 버그 신고 등 어떤 연락도 괜찮아요☺️.',
//     inquiryCategoryList: [
//         {   
//             title: "간편 문의하기",
//             subTitle: "소중한 의견을 보내주세요.",
//             textEmoji: "📮",
//             colorName: "blueLight",
//             inputType: 'long',
//             inputDefaultValue: '',
//             placeHolder: '문의을 입력해 주세요.',
//             buttonText: '문의하기',
//             needEmailAddress: true
//         },
//         {   
//             title: "오타 신고하기",
//             subTitle: "오타가 있는 문제 번호를 입력해 주세요.",
//             textEmoji: "🛠",
//             colorName: "orangeLight",
//             inputType: 'short',
//             inputDefaultValue: '국어사 2018학년도 수능 12번',
//             placeHolder: '문제 번호를 입력해 주세요.',
//             buttonText: '신고하기',
//             needEmailAddress: false
//         },
//         {   
//             title: "버그 신고하기",
//             subTitle: "이용에 불편을 드려 죄송해요. 경험하신 버그를 말씀해 주시면 신속하게 수정할게요.",
//             textEmoji: "⚠️",
//             colorName: "redLight",
//             inputType: 'long',
//             inputDefaultValue: '',
//             placeHolder: '경험하신 버그에 대해 입력해 주세요.',
//             buttonText: '신고하기',
//             needEmailAddress: false
//         }
//     ]
// });
// knockknockInquiryComponent.onOpen();