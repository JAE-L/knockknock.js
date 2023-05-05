# KnockKnock (BETA)

KnockKnock is the Inquiry Service that clients easily inquire about their own concerns. You can import this library regardless of frontend frameworks or libraries.

Copyright 2023. KnockKnock. All rights reserved.


## Install

To install `knockknock.js` in your website :

```bash
npm i knockknock.js
```

```javascript
import KnockKnock from 'knockknock.js';
const knockknockInquiryComponent = new KnockKnock({
    knockknockAPIKey: 'KnockKnock API Key',
    serviceLanguage: 'KR', // KR or ENG [pick 1]
    serviceTitle: 'Service Name',
    serviceSubTitle: 'Service Explanation OR Contact Explanation',
    inquiryCategoryList: [
        {   
            title: "Inquiry Category Title",
            subTitle: "Inquiry Category Explanation",
            textEmoji: "Inquiry Category Text Symbol",
            colorName: "blueLight", // blueLight OR orangeLight OR redLight OR greenLight [pick 1]
            inputType: 'short', // short(input) OR long(textarea) [pick 1]
            inputDefaultValue: 'Input Default Value',
            placeHolder: 'Input Placeholder',
            buttonText: 'Text of Input Submit Button',
            needToRespondInquiry: true // If the value is true, the clients should enter their email address.
        }
    ]
});

knockknockInquiryComponent.onOpen(); // Open knockknockInquiryComponent
knockknockInquiryComponent.onClose(); // Close knockknockInquiryComponent
```


## SSR or SSG

As `knockknock.js` needs `window` object, you have to import `knockknock.js` dynamically in SSR or SSG projects. 

```javascript
// Example of React
const [knockknockInquiryComponent, setKnockknockInquiryComponent] = useState(null);
useEffect(() => {
    const loadKnockKnock = async() => {
        const { default: KnockKnock } = await import('KnockKnock.js');
        setKnockknockInquiryComponent(new KnockKnock(inquiryServiceData));
    };
    loadKnockKnock();
}, []);

return(
    <button onClick={() => {knockknockInquiryComponent?.onOpen()}}></button>
);
```
```javascript
// Example of Svelte
<script>
    let knockknockInquiryComponent = null;
    onMount(() => {
        const loadKnockKnock = async() => {
            const { default: KnockKnock } = await import('KnockKnock.js');
            knockknockInquiryComponent = new KnockKnock(inquiryServiceData);
        };
        loadKnockKnock();
    });
</script>

<button on:click={() => knockknockInquiryComponent?.onOpen()}></button>
```