import { svgStylesType } from '../utils/types';
import { generateNodeElement, generateSvgElement, appendElements } from '../utils/nodeElement';


const exitIconStyles: svgStylesType[] = [{elementType: 'path', 'd': 'M15 5L5 15', 'stroke': '#121212', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'}, {elementType: 'path', 'd': 'M5 5L15 15', 'stroke': '#121212', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'}];

const leftArrowIconStyles: svgStylesType[] = [{elementType: 'path', 'd': 'M15.8334 10H4.16669', 'stroke': '#121212', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'}, {elementType: 'path', 'd': 'M10 15.8334L4.16669 10.0001L10 4.16675', 'stroke': '#121212', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'}];

const spinIconStyles: svgStylesType[] = [{elementType: 'path', 'd': 'M10 17.5C8.77633 17.4989 7.57145 17.1985 6.49054 16.6248C5.40963 16.0512 4.48551 15.2217 3.79878 14.2089C3.11205 13.1961 2.68358 12.0307 2.55073 10.8142C2.41789 9.59767 2.58473 8.36725 3.03667 7.23003C3.48862 6.09285 4.21195 5.08353 5.14358 4.29011C6.0752 3.49669 7.18681 2.94328 8.38142 2.67815C9.57608 2.41302 10.8174 2.44423 11.9973 2.76905C13.177 3.09387 14.2594 3.70243 15.15 4.54167C15.2671 4.65885 15.3328 4.81771 15.3328 4.98333C15.3328 5.14896 15.2671 5.30781 15.15 5.425C15.0926 5.48396 15.0238 5.53082 14.948 5.56282C14.8722 5.59482 14.7907 5.61131 14.7083 5.61131C14.626 5.61131 14.5445 5.59482 14.4687 5.56282C14.3928 5.53082 14.3242 5.48396 14.2667 5.425C13.2159 4.44221 11.8586 3.85147 10.4233 3.75225C8.988 3.65302 7.56232 4.05136 6.38631 4.8802C5.21031 5.70904 4.35579 6.91777 3.96663 8.30288C3.57747 9.688 3.67743 11.1649 4.24968 12.4849C4.82194 13.8049 5.83154 14.8875 7.10851 15.5503C8.3855 16.2132 9.85183 16.4158 11.2607 16.124C12.6695 15.8323 13.9348 15.064 14.8436 13.9486C15.7523 12.8332 16.249 11.4387 16.25 10C16.25 9.83425 16.3158 9.67525 16.4331 9.55808C16.5502 9.44083 16.7092 9.375 16.875 9.375C17.0407 9.375 17.1997 9.44083 17.3169 9.55808C17.4342 9.67525 17.5 9.83425 17.5 10C17.5 11.9891 16.7098 13.8968 15.3033 15.3033C13.8968 16.7098 11.9892 17.5 10 17.5Z', 'fill': '#121212'}];


const getIconStyles = function(iconName: string): svgStylesType[]{
    switch(iconName){
        case 'exitIcon':
            return exitIconStyles;
            break;
        case 'leftArrowIcon':
            return leftArrowIconStyles;
            break;
        case 'spinIcon':
            return spinIconStyles;
            break;
        default:
            return exitIconStyles;
            break;
    };
};

const getIconClassList = function(iconName: string): null|string[]{
    if(iconName === 'spinIcon'){
        return ['km-animate-spin'];
    } else{
        return null;
    };
};


const generateKnockIconButtonElement = function(iconName: string, iconClickEvent: any, iconClickEventArguments: any): HTMLElement{
    const svgStlyes = getIconStyles(iconName);
    const svgClassList = getIconClassList(iconName);

    const iconButtonElement: HTMLElement = generateNodeElement('div', ['km-w-9', 'km-min-w-36px', 'km-h-9', 'km-min-h-36px', 'km-bg-slate-50', 'km-rounded-full', 'km-flex', 'km-justify-center', 'km-items-center', 'knockModalCursorPointer', '[@media(pointer:fine){&:hover}]:km-bg-slate-100', 'active:km-bg-slate-100', 'km-transition-[background-color]']);
    const svgElement: SVGElement = generateSvgElement(svgClassList, svgStlyes);
    appendElements(iconButtonElement, [svgElement]);
    iconButtonElement.addEventListener('click', () => {iconClickEventArguments ? iconClickEvent(iconClickEventArguments): iconClickEvent()});
    return iconButtonElement;
};

export default generateKnockIconButtonElement