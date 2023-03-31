import { knockButtonDataType } from '../utils/types';
import { generateButtonElement } from '../utils/nodeElement';


interface knockButtonType {
    buttonList: knockButtonDataType[];
};


export default class KnockButton {
    private buttonList: knockButtonDataType[];
    private buttonGroup: HTMLElement[];

    constructor(props: knockButtonType){
        this.buttonList = props.buttonList;
        this.buttonGroup = [];
    };

    generateButtonGroup(): HTMLElement[]{
        this.buttonGroup = this.buttonList.map((buttonData: knockButtonDataType): HTMLElement => {
            return generateButtonElement(buttonData);
        });
        return this.buttonGroup;
    };
}