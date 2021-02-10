import i18n from 'i18next'
import { initReactI18next} from "react-i18next"
import translationEN from './locales/en/translations.json'
import translationFIN from './locales/fi/translations.json'

const resources = {
    FI: {
        translation: translationFIN
    },
    EN: {
        translation: translationEN
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "FI",
        fallbackLng: 'EN', 

        interpolation: {
        escapeValue: false //REACT XSS PROTECTED
        } 
    })

export default i18n