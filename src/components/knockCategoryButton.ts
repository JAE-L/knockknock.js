import { generateNodeElement, generateNodeWithTextElement, appendElements } from '../utils/nodeElement';


interface knockCategoryDataType {
    categoryTitle: string;
    categorySymbolTextEmoji: string;
    categorySymbolColorName: string;
    categoryClickEvent: any;
    categoryClickEventArguments: any;
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
        const categoryButtonElement = generateNodeElement('div', ['km-w-full', 'km-h-60px', 'km-border', 'km-border-solid', 'km-border-slate-200', 'km-rounded-2xl', 'km-px-4', 'km-text-sm', 'km-inline-flex', 'km-items-center', 'km-gap-3', '[@media(pointer:fine){&:hover}]:km-border-slate-300', 'knockModalCursorPointer', '[@media(pointer:fine){&:hover}]:km-bg-slate-50', 'active:km-border-slate-300', 'active:km-bg-slate-50', 'km-transition-colors']);
        const categorySymbolBox = generateNodeWithTextElement('div', ['km-w-8', 'km-min-w-32px', 'km-h-8', 'km-min-h-32px', 'km-rounded-lg', `km-bg-${categoryData.categorySymbolColorName}`, 'km-flex', 'km-justify-center', 'km-items-center', 'km-select-none'], `${categoryData.categorySymbolTextEmoji}`);
        const categoryTitleElement = generateNodeWithTextElement('h2', ['km-max-w-full-44px', 'km-text-sm', 'km-text-black', 'km-font-semibold', 'knockModalWordWrap', 'km-select-none'], `${categoryData.categoryTitle}`);
        appendElements(categoryButtonElement, [categorySymbolBox, categoryTitleElement]);
        categoryButtonElement.addEventListener('click', () => {categoryData.categoryClickEvent(categoryData.categoryClickEventArguments)});
        return categoryButtonElement;
    };

    generateKnockCategoryButtonGroup(): HTMLElement[]{
        this.categoryButtonGroup = this.categoryList.map((categoryData: knockCategoryDataType) => {
            return this.generateKnockCategoryButton(categoryData);
        });
        return this.categoryButtonGroup;
    };
}