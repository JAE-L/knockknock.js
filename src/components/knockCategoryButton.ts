import { generateNodeElement, generateNodeElementWithText, appendElements } from '../utils/nodeElement';


interface knockCategoryDataType {
    categoryTitle: string;
    categorySymbolTextEmoji: string;
    categorySymbolColorName: string;
    categoryClickEvent: Function;
};

interface knockCategoryButtonType {
    categoryList: knockCategoryDataType[];
};


export default class KnockCategoryButton {
    private categoryList: knockCategoryDataType[];
    private categoryButtonGroup: HTMLElement[];

    constructor(props: knockCategoryButtonType){
        this.categoryList = props.categoryList;
        this.categoryButtonGroup = [];
    };

    private generateKnockCategoryButton(categoryData: knockCategoryDataType): HTMLElement{
        const categoryButtonElement: HTMLElement = generateNodeElement('div', ['km-w-full', 'km-h-auto', 'km-min-h-56px', 'km-border', 'km-border-solid', 'km-border-slate-200', 'km-rounded-2xl', 'km-p-3', 'km-text-sm', 'km-inline-flex', 'km-items-center', 'km-gap-3', 'knockCursorPointer', '[@media(pointer:fine){&:hover}]:km-border-slate-300', '[@media(pointer:fine){&:hover}]:km-bg-slate-50', 'active:km-border-slate-300', 'active:km-bg-slate-50', 'km-transition-colors', 'km-select-none']);
        const categorySymbolBox: HTMLElement = generateNodeElementWithText('div', ['km-w-8', 'km-h-8', 'km-rounded-lg', `km-bg-${categoryData.categorySymbolColorName}`, 'km-flex', 'km-justify-center', 'km-items-center', 'km-flex-none'], `${categoryData.categorySymbolTextEmoji}`);
        const categoryTitleElement: HTMLElement = generateNodeElementWithText('h2', ['km-w-full', 'km-text-sm', 'km-text-black', 'km-font-semibold', 'knockWordWrap'], `${categoryData.categoryTitle}`);
        appendElements(categoryButtonElement, [categorySymbolBox, categoryTitleElement]);
        categoryButtonElement.addEventListener('click', () => {categoryData.categoryClickEvent()});
        return categoryButtonElement;
    };

    generateKnockCategoryButtonGroup(): HTMLElement[]{
        this.categoryButtonGroup = this.categoryList.map((categoryData: knockCategoryDataType): HTMLElement => {
            return this.generateKnockCategoryButton(categoryData);
        });
        return this.categoryButtonGroup;
    };
}