
## Installation
```
npm install --save meta-whatsapp-api
```

## How to Use

### Sending Messages
```typescript
import WhatsappAPI from "meta-whatsapp-api";


const wp = new WhatsappAPI({
    accountPhoneNumberId: "<to-phone-number-id>", // required
    accessToken: "<access-token>", // required
})

await wp.sendTextMessage("<phone-number-to-send>", "<plain-message>");
```
