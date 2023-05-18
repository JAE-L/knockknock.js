interface knockInquiryCategoryDataType {
    title: string;
    subTitle: string;
    textEmoji: string;
    colorName: string;
    inputType: string;
    inputDefaultValue: string;
    placeHolder: string;
    buttonText: string;
    needToRespondInquiry: boolean;
}
interface knockModalDataType {
    knockknockAPIKey: string;
    serviceLanguage: string;
    serviceTitle: string;
    serviceSubTitle: string;
    inquiryCategoryList: knockInquiryCategoryDataType[];
}
export default class KnockKnock {
    #private;
    constructor(props: knockModalDataType);
    onOpen(): void;
    onClose(): void;
}
export {};