import { appendElements } from './nodeElement';


const checkTicketValidation = function(ticketValue: string): boolean{
    if(ticketValue.trim() === '' || ticketValue.trim() === 'null' || ticketValue.trim() === 'undefined'){
        console.error('[ERROR in knockknock.js] - Please enter your API Ticket.');
        return false;
    } else{
        return true;
    };
};


const checkElementExist = function(elementClass: string): boolean{
    const nodeElement : null|HTMLElement = document.querySelector(`${elementClass}`);
    if(nodeElement === null){
        return false;
    } else{
        return true;
    };
};


const checkNodeHasChild = function(parentNode: HTMLElement): boolean{
    const doesNodeHasChild: boolean = parentNode.hasChildNodes();
    return doesNodeHasChild;
};


const handleNodeElement = function(parentNode: HTMLElement, childNodes: HTMLElement[]): void{
    const doesNodeHasChild = checkNodeHasChild(parentNode);
    if(doesNodeHasChild){
        parentNode.replaceChildren(...childNodes);
    } else{
        appendElements(parentNode, childNodes);
    };
};


const controlHeightTransition = function(subscribedElement: HTMLElement|SVGElement, animatedElement: HTMLElement|SVGElement, currentHeight: number, handleCurrentHeight: Function, animationState: boolean){
    const space = Array.from(subscribedElement.children).map(el => el.clientHeight).reduce((a, b) => a + b, 64);
    if(currentHeight < space && animationState){
        animatedElement.classList.add('km-animate-fadeInTop');
        setTimeout(() => {
            animatedElement.classList.remove('km-animate-fadeInTop')
        }, 280);
    } else if(currentHeight > space && animationState){
        animatedElement.classList.add('km-animate-fadeInDown');
        setTimeout(() => {
            animatedElement.classList.remove('km-animate-fadeInDown')
        }, 280);
    };
    if(currentHeight !== space){
        handleCurrentHeight(space);
        subscribedElement.style.height = space + "px";
    };
};


export { checkTicketValidation, checkElementExist, checkNodeHasChild, handleNodeElement, controlHeightTransition }