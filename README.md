# KnockKnock

KnockKnock is ...

## Install

To install KnockKnock in your website:

```bash
npm i knockknock
```

```javascript
import KnockModal from 'knockknock';
const knockModalComponent = new KnockModal({
    serviceTitle: 'Your Service Name',
    serviceSubTitle: 'Your Service Explanation OR Contact Explanation',
    // Set cateory of Inquiry
    inquiryCategoryList: [
        {   
            title: "Inquiry Category Title",
            subTitle: "Inquiry Category Explanation",
            textEmoji: "Inquiry Category Text Symbol",
            colorName: "blueLight", // blueLight OR orangeLight OR redLight [pick 1]
            inputType: 'short', // short(input text) OR long(textarea) [pick 1]
            inputDefaultValue: 'Input Default Value',
            placeHolder: 'Input Placeholder',
            buttonText: 'Text of Input Submit Button',
            needEmailAddress: true // If you need Email of Client, set true, or not, false.
        }
    ] // You can add many categories in inquiryCategoryList Array.
});

knockModalComponent.onOpen(); // Open KnockModalComponent
knockModalComponent.onClose(); // Close KnockModalComponent
```