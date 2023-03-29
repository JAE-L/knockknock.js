import './style.css';
import { knockInquiryServiceDataType, knockInquiryCategoryDataType } from './utils/types';
import { generateNodeElement, generateNodeWithTextElement, appendElements } from './utils/nodeElement';
import KnockModalHeader from './components/knockModalHeader';
import KnockCategoryButton from './components/knockCategoryButton';
import KnockButton from './components/knockButton';
import KnockInputWithButton from './components/knockInputWithButton';


interface knockModalDataType {
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
        this.serviceTitle = props.serviceTitle;
        this.serviceSubTitle = props.serviceSubTitle;
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


    private checkKnockModalExist(){
        const knockModalFragment: null | HTMLElement = document.querySelector('.knockModalFragment');
        if(knockModalFragment === null){
            return false;
        } else{
            return true;
        };
    };
    private checkNodeHasChild(parentNode: HTMLElement){
        const doesNodeHasChild = parentNode.hasChildNodes();
        return doesNodeHasChild;
    };


    private knockModalHeaderSectionHandler(childNodes: HTMLElement[]){
        const doesNodeHasChild = this.checkNodeHasChild(this.knockModalHeaderSection);
        if(doesNodeHasChild){
            this.knockModalHeaderSection.replaceChildren(...childNodes);
        } else{
            appendElements(this.knockModalHeaderSection, childNodes)
        };
    };
    private knockModalBodySectionHandler(childNodes: HTMLElement[]){
        const doesNodeHasChild = this.checkNodeHasChild(this.knockModalBodySection);
        if(doesNodeHasChild){
            this.knockModalBodySection.replaceChildren(...childNodes);
        } else{
            appendElements(this.knockModalBodySection, childNodes)
        };
    };


    private renderInquiryCategoryPage(){
        const newKnockModalHeader = new KnockModalHeader({
            headerTitle: `${this.serviceTitle}`,
            headerSubTitle: `${this.serviceSubTitle}`,
            headerIconName: 'exitIcon',
            headerIconClickEvent: this.onClose.bind(this),
            headerIconClickEventArguments: null
        });
        this.knockModalHeaderSectionHandler(newKnockModalHeader.generateKnockModalHeader());

        const newKnockModalInquiryCategoryGroup = new KnockCategoryButton({
            categoryList: this.inquiryCategoryList.map((category) => {
                return {
                    categoryTitle: category.title,
                    categorySymbolTextEmoji: category.textEmoji,
                    categorySymbolColorName: category.colorName,
                    categoryClickEvent: this.renderInquiryInputPage.bind(this),
                    categoryClickEventArguments: {
                        ...this.inquiryServiceData,
                        inquiryCategoryTitle: category.title,
                        inquiryCategorySubTitle: category.subTitle,
                        inquiryInputType: category.inputType,
                        inquiryInputValue: category.inputDefaultValue,
                        inquiryInputPlaceHolder: category.placeHolder,
                        inquiryInputButtonText: category.buttonText,
                        inquiryNeedEmailAddress: category.needEmailAddress
                    }
                };
            })
        });
        this.knockModalBodySectionHandler(newKnockModalInquiryCategoryGroup.generateKnockCategoryButtonGroup());
    };
    private renderInquiryInputPage(props: knockInquiryServiceDataType){
        const newKnockModalHeader = new KnockModalHeader({
            headerTitle: `${props.inquiryCategoryTitle}`,
            headerSubTitle: `${props.inquiryCategorySubTitle}`,
            headerIconName: 'leftArrowIcon',
            headerIconClickEvent: this.renderInquiryCategoryPage.bind(this),
            headerIconClickEventArguments: props
        });
        this.knockModalHeaderSectionHandler(newKnockModalHeader.generateKnockModalHeader());

        const newKnockModalInputWithButton = new KnockInputWithButton({
            inputType: props.inquiryInputType,
            inputValue: props.inquiryInputValue,
            placeHolder: props.inquiryInputPlaceHolder,
            inputValidationRegExp: "([^\\s])",
            buttonList: [
                {
                    buttonText: props.inquiryInputButtonText,
                    buttonColor: 'blue',
                    buttonClickEvent: this.renderEmailInputPage.bind(this),
                    buttonClickEventArguments: props,
                    buttonClickAble: false,
                    addClickEventDirectly: false,
                    connectedInputData: 'inquiryInputValue'
                }
            ]
        });
        this.knockModalBodySectionHandler(newKnockModalInputWithButton.generateInputWithButton());
    };
    private renderEmailInputPage(props: knockInquiryServiceDataType){
        const newKnockModalHeader = new KnockModalHeader({
            headerTitle: '이메일 입력하기',
            headerSubTitle: '문의에 대한 정보와 답변을 받을 이메일을 입력해 주세요.',
            headerIconName: 'leftArrowIcon',
            headerIconClickEvent: this.renderInquiryInputPage.bind(this),
            headerIconClickEventArguments: props
        });
        this.knockModalHeaderSectionHandler(newKnockModalHeader.generateKnockModalHeader());

        const newKnockModalInputWithButton = new KnockInputWithButton({
            inputType: 'email',
            inputValue: props.userEmailAddress,
            placeHolder: '이메일을 입력해 주세요.',
            inputValidationRegExp: '^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$',
            buttonList: props.inquiryNeedEmailAddress ? [
                {
                    buttonText: '확인',
                    buttonColor: 'blue',
                    buttonClickEvent: this.renderEmailPreviewPage.bind(this),
                    buttonClickEventArguments: props,
                    buttonClickAble: false,
                    addClickEventDirectly: false,
                    connectedInputData: 'userEmailAddress'
                }
                ] : [
                {
                    buttonText: '확인',
                    buttonColor: 'blue',
                    buttonClickEvent: this.renderEmailPreviewPage.bind(this),
                    buttonClickEventArguments: props,
                    buttonClickAble: false,
                    addClickEventDirectly: false,
                    connectedInputData: 'userEmailAddress'
                },
                {
                    buttonText: '건너뛰기',
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
        this.knockModalBodySectionHandler(newKnockModalInputWithButton.generateInputWithButton());
    };
    private renderEmailPreviewPage(props: knockInquiryServiceDataType){
        const newKnockModalHeader = new KnockModalHeader({
            headerTitle: `이메일 확인하기`,
            headerSubTitle: `입력한 이메일이 맞는지 확인해 주세요.`,
            headerIconName: 'leftArrowIcon',
            headerIconClickEvent: this.renderEmailInputPage.bind(this),
            headerIconClickEventArguments: props
        });
        this.knockModalHeaderSectionHandler(newKnockModalHeader.generateKnockModalHeader());

        const newKnockModalInquiryCategoryGroup = new KnockCategoryButton({
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
                    buttonText: '확인',
                    buttonColor: 'blue',
                    buttonClickEvent: this.renderSendInquiryPage.bind(this),
                    buttonClickEventArguments: props,
                    buttonClickAble: true,
                    addClickEventDirectly: true,
                    connectedInputData: null
            }]
        });
        this.knockModalBodySectionHandler([...newKnockModalInquiryCategoryGroup.generateKnockCategoryButtonGroup(), ...newKnockButton.generateButtonGroup()]);
    };
    private renderSendInquiryPage(props: knockInquiryServiceDataType){
        const newKnockModalHeader = new KnockModalHeader({
            headerTitle: `문의 등록 중...`,
            headerSubTitle: `문의를 등록하고 있어요. 조금만 기다려 주세요.`,
            headerIconName: 'spinIcon',
            headerIconClickEvent: () => {},
            headerIconClickEventArguments: null
        });
        this.knockModalHeaderSectionHandler(newKnockModalHeader.generateKnockModalHeader());

        const newKncokHand = generateNodeWithTextElement('div', ['km-w-auto', 'km-h-auto', 'km-text-6xl', 'km-text-center', 'km-drop-shadow-xl', 'km-select-none', 'knocking'], '✊');
        this.knockModalBodySectionHandler([newKncokHand]);

        setTimeout(() => {
            this.renderInquiryEndPage();
        }, 4000);
    };
    private renderInquiryEndPage(){
        const newKnockModalHeader = new KnockModalHeader({
            headerTitle: `문의 등록 완료`,
            headerSubTitle: `문의를 등록했어요. 이메일을 입력하신 경우 알림을 보내드릴게요.`,
            headerIconName: 'exitIcon',
            headerIconClickEvent: this.onClose.bind(this),
            headerIconClickEventArguments: null
        });
        this.knockModalHeaderSectionHandler(newKnockModalHeader.generateKnockModalHeader());

        const newKnockButton = new KnockButton({
            buttonList: [{
                    buttonText: '확인',
                    buttonColor: 'blue',
                    buttonClickEvent: this.renderInquiryCategoryPage.bind(this),
                    buttonClickEventArguments: null,
                    buttonClickAble: true,
                    addClickEventDirectly: true,
                    connectedInputData: null
            }]
        });
        this.knockModalBodySectionHandler(newKnockButton.generateButtonGroup());
    };


    onOpen(){
        const isKnockModalExist = this.checkKnockModalExist();
        if(isKnockModalExist) return;
        this.renderInquiryCategoryPage();
        appendElements(this.knockModalElement, [this.knockModalHeaderSection, this.knockModalBodySection, this.knockModalFooterSection]);
        appendElements(this.knockModalFragment, [this.knockModalElement]);
        this.bodyElement.insertBefore(this.knockModalFragment, this.bodyElement.firstChild);
    };
    onClose(){
        this.knockModalFragment.remove();
    };
}


// const knockModalComponent = new KnockKnock({
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
// knockModalComponent.onOpen();