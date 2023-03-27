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
        const categoryButtonElement = generateNodeElement('div', ['w-[100%]', 'h-[60px]', 'border', 'border-solid', 'border-slate-200', 'rounded-2xl', 'px-4', 'text-sm', 'inline-flex', 'items-center', 'gap-3', '[@media(pointer:fine){&:hover}]:border-slate-300', 'knockModalCursorPointer', '[@media(pointer:fine){&:hover}]:bg-slate-50', 'active:border-slate-300', 'active:bg-slate-50', 'transition-colors']);
        const categorySymbolBox = generateNodeWithTextElement('div', ['w-8', 'min-w-[32px]', 'h-8', 'min-h-[32px]', 'rounded-lg', `bg-${categoryData.categorySymbolColorName}`, 'flex', 'justify-center', 'items-center', 'select-none'], `${categoryData.categorySymbolTextEmoji}`);
        const categoryTitleElement = generateNodeWithTextElement('h2', ['max-w-[calc(100%-44px)]', 'text-sm', 'text-black', 'font-semibold', 'knockModalWordWrap', 'select-none'], `${categoryData.categoryTitle}`);
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