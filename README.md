# KnockKnock

![KnockKnock Product Image](https://knockknock.support/knockknockProd.png)

KnockKnock is the Inquiry Service that clients can easily contact about their own concerns. You can import this library regardless of frontend frameworks or libraries.

👉[More Detailed Document](https://knockknock.support/document/)

Copyright 2023. KnockKnock. All rights reserved.


## Install

To install `knockknock.js` in your website :

```bash
npm i knockknock.js
```

```javascript
import KnockKnock from 'knockknock.js';
const knockknockInquiryComponent = new KnockKnock({
    knockknockAPITicket: 'KnockKnock API Ticket',
    serviceLanguage: 'KR', // KR or ENG [pick 1]
    serviceTitle: 'Service Name',
    serviceSubTitle: 'Service Explanation OR Contact Explanation',
    useBoxShadow: true, // If the value is true, the component would have a boxShadow.
    inquiryCategoryList: [
        {   
            title: "Inquiry Category Title",
            subTitle: "Inquiry Category Explanation",
            textEmoji: "Inquiry Category Text Symbol", // EX) 😁, 📮, 🛠, 📜
            colorName: "blueLight", // blueLight OR orangeLight OR redLight OR greenLight [pick 1]
            inputType: 'short', // short(input) OR long(textarea) [pick 1]
            inputDefaultValue: 'Input Default Value',
            placeHolder: 'Input Placeholder',
            buttonText: 'Text of Input Submit Button',
            needToRespondInquiry: true // If the value is true, the clients should enter their email address.
        }
    ]
});

knockknockInquiryComponent.onOpen(); // Open knockknockInquiryComponent on fullscreen.
knockknockInquiryComponent.onOpen('.class OR #id'); // Open knockknockInquiryComponent inside of the specific parentNode you set.
knockknockInquiryComponent.onClose(); // Close knockknockInquiryComponent.
```


## SSR or SSG

As `knockknock.js` needs `window` object, you have to import `knockknock.js` dynamically in SSR or SSG projects. 

```javascript
// Example of Next.js
const [knockknockInquiryComponent, setKnockknockInquiryComponent] = useState(null);
useEffect(() => {
    const loadKnockKnock = async() => {
        const { default: KnockKnock } = await import('knockknock.js');
        setKnockknockInquiryComponent(new KnockKnock(inquiryServiceData));
    };
    loadKnockKnock();
}, []);

return(
    <button onClick={() => {knockknockInquiryComponent?.onOpen()}}></button>
);
```
```javascript
// Example of SvelteKit
<script>
    let knockknockInquiryComponent = null;
    onMount(() => {
        const loadKnockKnock = async() => {
            const { default: KnockKnock } = await import('knockknock.js');
            knockknockInquiryComponent = new KnockKnock(inquiryServiceData);
        };
        loadKnockKnock();
    });
</script>

<button on:click={() => knockknockInquiryComponent?.onOpen()}></button>
```


## License

microsoft/fluentui-emoji is licensed under the MIT License. Copyright © Microsoft Corporation.