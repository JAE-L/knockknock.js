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
        const textBoxElement = generateNodeElement('div', ['inline-flex', 'flex-col', 'gap-1']);
        const titleElement = generateNodeWithTextElement('h1', ['text-base', 'text-black', 'font-black', 'knockModalWordWrap'], `${this.headerTitle}`);
        const subTitleElement = generateNodeWithTextElement('p', ['text-xs', 'text-grayDark', 'font-medium', 'knockModalWordWrap'], `${this.headerSubTitle}`);
        const iconButtonElement = generateIconButtonElement(`${this.headerIconName}`, this.headerIconClickEvent, this.headerIconClickEventArguments);
        appendElements(textBoxElement, [titleElement, subTitleElement]);
        return [textBoxElement, iconButtonElement];
    };
}