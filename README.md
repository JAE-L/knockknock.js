# KnockKnock (BETA)

KnockKnock is the Inquiry Service that clients easily inquire about their own concerns. You can import this library regardless of frontend frameworks or libraries.

Warning : This library is currently in progress.

Copyright 2023. KnockKnock. All rights reserved.

## Install

To install KnockKnock in your website :

```bash
npm i knockknock.js
```

```javascript
import KnockKnock from 'knockknock.js';
const KnockKnockInquiryComponent = new KnockKnock({
    serviceTitle: 'Your Service Name',
    serviceSubTitle: 'Your Service Explanation OR Contact Explanation',
    inquiryCategoryList: [ // Set cateory of Inquiry
        {   
            title: "Inquiry Category Title",
            subTitle: "Inquiry Category Explanation",
            textEmoji: "Inquiry Category Text Symbol",
            colorName: "blueLight", // blueLight OR orangeLight OR redLight OR greenLight [pick 1]
            inputType: 'short', // short(input text) OR long(textarea) [pick 1]
            inputDefaultValue: 'Input Default Value',
            placeHolder: 'Input Placeholder',
            buttonText: 'Text of Input Submit Button',
            needEmailAddress: true // If you want to get an Email from clients, set true, or not, false.
        }
    ]
});

KnockKnockInquiryComponent.onOpen(); // Open KnockKnockInquiryComponent
KnockKnockInquiryComponent.onClose(); // Close KnockKnockInquiryComponent
```

## SSR or SSG

As knockknock.js need `window` object, you have to import knockknock.js dynamically in SSR or SSG projects. 

```javascript
// React
useEffect(() => {
    const loadKnockKnock = async() => {
        const { default: KnockKnock } = await import('KnockKnock.js');
        const KnockKnockInquiryComponent = new KnockKnock(InquiryData);
        KnockKnockInquiryComponent.onOpen();
    };
    loadKnockKnock();
}, []);

// Svelte
onMount(() => {
    const loadKnockKnock = async() => {
        const { default: KnockKnock } = await import('KnockKnock.js');
        const KnockKnockInquiryComponent = new KnockKnock(InquiryData);
        KnockKnockInquiryComponent.onOpen();
    };
    loadKnockKnock();
});
```