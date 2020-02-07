import moment from 'moment';
import {
    AMEX_CARD_TYPE,
    AMEX_REQUIRED_CARD_NUMBER,
    REQUIRED_CARD_NUMBER,
    REQUIRED_VALIDATION_MESSAGE,
    EMAIL_VALIDATION_MESSAGE,
    CARD_NUMBER_VALIDATION_MESSAGE,
    EXPIRY_VALIDATION_MESSAGE,
    CARD_TYPE_VALIDATION_MESSAGE,
    NAME_VALIDATION_MESSAGE,
    EXPIRY_FORMAT
} from '../constants/Constants';

export const validateEmail = value =>
    !value || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? null : EMAIL_VALIDATION_MESSAGE;

const isAcceptCardNumberForAmex = (cardType, numberLength) =>
    cardType === AMEX_CARD_TYPE && numberLength === AMEX_REQUIRED_CARD_NUMBER;

const isAcceptedCardNumber = (cardType, numberLength) =>
    cardType !== AMEX_CARD_TYPE && numberLength === REQUIRED_CARD_NUMBER;

export const validateCardNumber = (value, cardType) => {
    if (!value) {
        return REQUIRED_VALIDATION_MESSAGE;
    }
    return !isNaN(value) &&
        (isAcceptedCardNumber(cardType, value.length)
            || isAcceptCardNumberForAmex(cardType, value.length)) ? null : CARD_NUMBER_VALIDATION_MESSAGE;
};

export const validateExpiry = value => {
    if (!value) {
        return REQUIRED_VALIDATION_MESSAGE;
    }
    return moment(value, EXPIRY_FORMAT, true).isValid() ? null : EXPIRY_VALIDATION_MESSAGE;
};

export const validateSelectedCardType = (cardTypes, value) => {
    if (!value) {
        return REQUIRED_VALIDATION_MESSAGE;
    }
    return cardTypes.includes(value) ? null : CARD_TYPE_VALIDATION_MESSAGE;
};


export const validateUserName = (value) => {
    if (!value) {
        return REQUIRED_VALIDATION_MESSAGE;
    }
    return value.match(/^[a-zA-Z\s]*$/) && value.length <= 50 ? null : NAME_VALIDATION_MESSAGE;
}; 