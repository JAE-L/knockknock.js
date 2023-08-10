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
    needToRespondInquiry: boolean;
};


export interface knockInputDataType {
    inputData: string;
    inputType: string;
    inputValue: string;
    placeHolder: string;
    inputChangeEvent: Function;
    inputKeyEvent: Function;
    inputValidationRegExp: string;
};


export interface knockButtonDataType {
    buttonText: string;
    buttonColor: string;
    buttonClickEvent: Function;
    buttonClickAble: boolean;
    connectedData: null|undefined|string;
};


export interface knockFaceButtonDataType{
    faceCode: string;
    buttonText: string;
    buttonClickEvent: Function;
};

export interface svgStylesType {
    elementType: string;
    [props: string]: string;
};