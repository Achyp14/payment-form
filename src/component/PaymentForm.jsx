import React, { useState, useEffect } from 'react'
import { fetchCardTypes } from '../utils/ApiClient';
import { Formik, Form, Field } from 'formik';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import isEmpty from 'lodash.isempty';
import {
    validateEmail,
    validateCardNumber,
    validateExpiry,
    validateSelectedCardType,
    validateUserName
} from '../utils/validationUtils';
import { JCB_CARD_TYPE } from '../constants/Constants';

const PaymentForm = ({ handleSubmit }) => {
    const [cardTypes, setCardTypes] = useState([]);

    useEffect(() => {
        fetchCardTypes()
            .then(response => response.json())
            .then(({ cardTypes }) => setCardTypes(cardTypes.filter(({ value }) => value !== JCB_CARD_TYPE)));
    }, [])

    return (
        <div className="payment-container">
            <Formik
                initialValues={{ cardType: '', cardNumber: '', expiry: '', name: '', email: '' }}
                onSubmit={handleSubmit}
            >
                {(props) => {
                    const cardType = props.values.cardType;
                    return (
                        <Form className="form">
                            <div className="form-field">
                                <span className="field-title">Card Types:</span>
                                <div className="field">
                                    <Field as={NativeSelect} name="cardType" validate={(value) =>
                                        validateSelectedCardType(cardTypes.map(cardType => cardType.value), value)}>
                                        <option value="" label="-Select Card Types-" />
                                        {cardTypes.map(({ id, value }) => <option key={id} value={value}>{value}</option>)}
                                    </Field>
                                    {props.errors.cardType && props.touched.cardType && <span>{props.errors.cardType}</span>}
                                </div>
                            </div>

                            <div className="form-field">
                                <span className="field-title">Card Number</span>
                                <div className="field">
                                    <Field as={Input} name="cardNumber" validate={(value) => validateCardNumber(value, cardType)} />
                                    {props.errors.cardNumber && props.touched.cardNumber && <span>{props.errors.cardNumber}</span>}
                                </div>
                            </div>

                            <div className="form-field">
                                <span className="field-title">Expiry</span>
                                <div className="field">
                                    <Field as={Input} className="expiry" name="expiry" placeholder="MM/YY" validate={validateExpiry} />
                                    {props.errors.expiry && props.touched.expiry && <span>{props.errors.expiry}</span>}
                                </div>

                            </div>

                            <div className="form-field">
                                <span className="field-title">Name</span>
                                <div className="field">
                                    <Field as={Input} name="name" validate={validateUserName} />
                                    {props.errors.name && props.touched.name && <span>{props.errors.name}</span>}
                                </div>
                            </div>

                            <div className="form-field">
                                <span className="field-title">Email</span>
                                <div className="field">
                                    <Field as={Input} name="email" validate={validateEmail} />
                                    {props.errors.email && props.touched.email && <span>{props.errors.email}</span>}
                                </div>
                            </div>

                            <div className="form-field button-field">
                                <div className="field">
                                    <Button type="submit" className="submit-button"
                                        disabled={!isEmpty(props.errors) || isEmpty(props.touched)}>Confirm Payment</Button>
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

PaymentForm.defaultProps = {
    handleSubmit: () => { }
}

export default PaymentForm;