import { generateNodeElement, generateNodeWithTextElement, appendElements } from '../utils/nodeElement';
import generateKnockIconButtonElement from './knockIconButton';


interface knockHeaderType {
    headerTitle: string;
    headerSubTitle: string;
    headerIconName: string;
    headerIconClickEvent: any;
    headerIconClickEventArguments: any;
};


export default class KnockHeader {
    private headerTitle: string;
    private headerSubTitle: string;
    private headerIconName: string;
    private headerIconClickEvent: any;
    private headerIconClickEventArguments: any;

    constructor(props: knockHeaderType){
        this.headerTitle = props.headerTitle;
        this.headerSubTitle = props.headerSubTitle;
        this.headerIconName = props.headerIconName;
        this.headerIconClickEvent = props.headerIconClickEvent;
        this.headerIconClickEventArguments = props.headerIconClickEventArguments;
    };

    generateKnockHeader(): HTMLElement[]{
        const titleBoxElement: HTMLElement = generateNodeElement('div', ['km-inline-flex', 'km-flex-col', 'km-gap-1']);
        const titleElement: HTMLElement = generateNodeWithTextElement('h1', ['km-text-base', 'km-text-black', 'km-font-black', 'knockModalWordWrap'], `${this.headerTitle}`);
        const subTitleElement: HTMLElement = generateNodeWithTextElement('p', ['km-text-xs', 'km-text-grayDark', 'km-font-medium', 'knockModalWordWrap'], `${this.headerSubTitle}`);
        const iconButtonElement: HTMLElement = generateKnockIconButtonElement(`${this.headerIconName}`, this.headerIconClickEvent, this.headerIconClickEventArguments);
        appendElements(titleBoxElement, [titleElement, subTitleElement]);
        return [titleBoxElement, iconButtonElement];
    };
}