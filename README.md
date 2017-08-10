# @deveodk/vue-core-authenticator


<img style="width:100%" alt="deveo-core-authenticator" src="https://user-images.githubusercontent.com/7561792/29169018-15c42658-7dd2-11e7-9a06-a3831513a3f8.png">


[![npm](https://img.shields.io/npm/v/@deveodk/vue-core-authenticator.svg)](https://www.npmjs.com/package/@deveodk/vue-core-authenticator) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> Vue plugin for deveo core authentication

## WARNING

This is a very opinonated package. It`s made for use with ![laravel api authenticator](https://packagist.org/packages/deveodk/laravel-api-authenticator)
If you try to use your own backend it will require alot of work. This should only be used with Deveo Core authentication packages like the one specified

## Installation


```js
import vueCoreAuthenticator from '@deveodk/vue-core-authenticator'
import '@deveodk/vue-core-authenticator/dist/@deveodk/vue-core-authenticator.css'
Vue.use(vueCoreAuthenticator, {
    baseURL: {base url here},
    facebookClientId: {facebookClientId here},
    googleClientId: {googleClientId here}
})
```

### Browser

```html
<!-- Include after Vue -->
<!-- Local files -->
<link rel="stylesheet" href="@deveodk/vue-core-authenticator/@deveodk/dist/vue-core-authenticator.css"></link>
<script src="@deveodk/vue-core-authenticator/@deveodk/dist/vue-core-authenticator.js"></script>

<!-- From CDN -->
<link rel="stylesheet" href="https://unpkg.com/@deveodk/vue-core-authenticator/@deveodk/dist/vue-core-authenticator.css"></link>
<script src="https://unpkg.com/@deveodk/vue-core-authenticator"></script>
```

### USAGE

#### Login
``` 
# Every text can be changed through props.
# This example is in danish
# If you dont specify the props it will use english default

<core-login nextButton="Næste"
                passwordPlaceholder="Adgangskode"
                rememberMeLabel="Husk mig"
                forgotPasswordLabel="Glemt adgangskode"
                magicLinkButton="Send magisk link"
                magicLinkShowLabel="Prøv en ny måde at logge ind"
                magicLinkShowLink="Få link"
                loginFormShowLabel="Brug den gamle metode"
                loginFormShowLink="Gå til login"
                promptLabel="Vælg konto"
                magicLinkInstructions="Åben din inbox og følg instruktionerne i din email"
                accountPromptLabel="Vælg bruger">
    </core-login> 
```

#### Password reset

``` 
# Every text can be changed through props.
# This example is in danish
# If you dont specify the props it will use english default

<core-reset emailSent="En email er blevet sendt, tryk på linket for at nulstille"
            actionButton="Nulstil"
            resetButton="Nulstil"
            forbinddenText="Forbudt"
            passwordPlaceholder="Ny Adgangskode"
            passwordConfirmationPlaceholder="Gentag adgangskode">
</core-reset>
```


## License

[MIT](http://opensource.org/licenses/MIT)

<img style="width: 100%" alt="made with love and cofee" src="https://cloud.githubusercontent.com/assets/7561792/26640815/14beb45c-4629-11e7-89db-fbca538a6be5.png">
