import { generateNodeElement, generateNodeElementWithText, appendElements } from '../utils/nodeElement';
import { generateCircleIconButton } from './knockIconButton';


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
        const titleElement: HTMLElement = generateNodeElementWithText('h1', ['km-text-base', 'km-text-black', 'km-font-black', 'knockWordWrap'], `${this.headerTitle}`);
        const subTitleElement: HTMLElement = generateNodeElementWithText('p', ['km-text-xs', 'km-text-slate-400', 'km-font-medium', 'knockWordWrap'], `${this.headerSubTitle}`);
        const iconButtonElement: HTMLElement = generateCircleIconButton(`${this.headerIconName}`, this.headerIconClickEvent);
        appendElements(titleBoxElement, [titleElement, subTitleElement]);
        return [titleBoxElement, iconButtonElement];
    };
}