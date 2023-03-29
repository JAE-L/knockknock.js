import { generateNodeElement, generateNodeWithTextElement, appendElements } from '../utils/nodeElement';
import generateIconButtonElement from './knockIconButton';


interface knockModalHeaderType {
    headerTitle: string;
    headerSubTitle: string;
    headerIconName: string;
    headerIconClickEvent: any;
    headerIconClickEventArguments: any;
};


export default class KnockModalHeader {
    private headerTitle: string;
    private headerSubTitle: string;
    private headerIconName: string;
    private headerIconClickEvent: any;
    private headerIconClickEventArguments: any;

    constructor(props: knockModalHeaderType){
        this.headerTitle = props.headerTitle;
        this.headerSubTitle = props.headerSubTitle;
        this.headerIconName = props.headerIconName;
        this.headerIconClickEvent = props.headerIconClickEvent;
        this.headerIconClickEventArguments = props.headerIconClickEventArguments;
    };

    generateKnockModalHeader(): HTMLElement[]{
        const textBoxElement = generateNodeElement('div', ['km-inline-flex', 'km-flex-col', 'km-gap-1']);
        const titleElement = generateNodeWithTextElement('h1', ['km-text-base', 'km-text-black', 'km-font-black', 'knockModalWordWrap'], `${this.headerTitle}`);
        const subTitleElement = generateNodeWithTextElement('p', ['km-text-xs', 'km-text-grayDark', 'km-font-medium', 'knockModalWordWrap'], `${this.headerSubTitle}`);
        const iconButtonElement = generateIconButtonElement(`${this.headerIconName}`, this.headerIconClickEvent, this.headerIconClickEventArguments);
        appendElements(textBoxElement, [titleElement, subTitleElement]);
        return [textBoxElement, iconButtonElement];
    };
}