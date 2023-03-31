export interface knockInquiryServiceDataType {
    inquiryCategoryTitle: string;
    inquiryCategorySubTitle: string;
    inquiryInputType: string;
    inquiryInputValue: string;
    inquiryInputPlaceHolder: string;
    inquiryInputButtonText: string;
    inquiryNeedEmailAddress: boolean;
    userEmailAddress: string;
};


export interface knockInquiryCategoryDataType {
    title: string;
    subTitle: string;
    textEmoji: string;
    colorName: string;
    inputType: string;
    inputDefaultValue: string;
    placeHolder: string;
    buttonText: string;
    needEmailAddress: boolean;
};


export interface knockButtonDataType {
    buttonText: string;
    buttonColor: string;
    buttonClickEvent: any;
    buttonClickEventArguments: any;
    buttonClickAble: boolean;
    addClickEventDirectly: boolean;
    connectedInputData?: null|undefined|string;
};


export interface svgStylesType {
    elementType: string;
    [props: string]: string;
};