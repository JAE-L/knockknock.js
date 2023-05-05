import { generateNodeElement, generateNodeWithTextElement, appendElements } from '../utils/nodeElement';
import generateKnockIconButtonElement from './knockIconButton';


interface knockHeaderType {
    headerTitle: string;
    headerSubTitle: string;
    headerIconName: string;
    headerIconClickEvent: any;
};


export default class KnockHeader {
    private headerTitle: string;
    private headerSubTitle: string;
    private headerIconName: string;
    private headerIconClickEvent: any;

    constructor(props: knockHeaderType){
        this.headerTitle = props.headerTitle;
        this.headerSubTitle = props.headerSubTitle;
        this.headerIconName = props.headerIconName;
        this.headerIconClickEvent = props.headerIconClickEvent;
    };

    generateKnockHeader(): HTMLElement[]{
        const titleBoxElement: HTMLElement = generateNodeElement('div', ['km-inline-flex', 'km-flex-col', 'km-gap-1']);
        const titleElement: HTMLElement = generateNodeWithTextElement('h1', ['km-text-base', 'km-text-black', 'km-font-black', 'knockModalWordWrap'], `${this.headerTitle}`);
        const subTitleElement: HTMLElement = generateNodeWithTextElement('p', ['km-text-xs', 'km-text-slate-400', 'km-font-medium', 'knockModalWordWrap'], `${this.headerSubTitle}`);
        const iconButtonElement: HTMLElement = generateKnockIconButtonElement(`${this.headerIconName}`, this.headerIconClickEvent);
        appendElements(titleBoxElement, [titleElement, subTitleElement]);
        return [titleBoxElement, iconButtonElement];
    };
}