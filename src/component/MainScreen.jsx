import React, { useState } from 'react';
import ProductInfo from './ProductInfo';
import PaymentForm from './PaymentForm';
import { Switch, Route } from 'react-router-dom';
import { fetchSuccessPayment, fetchFailedPayment } from '../utils/ApiClient';
import SuccessComponent from '../component/SuccessComponent';
import { withRouter } from 'react-router';

const MainScreen = ({ history }) => {
    const [invoice, setInvoice] = useState({});
    const [error, setError] = useState('');

    const handleSubmit = () => {
        fetchSuccessPayment()
            .then(response => response.body)
            .then(body => body.getReader().read())
            .then(({ value }) => JSON.parse(new TextDecoder("utf-8").decode(value)))
            .then((invoice) => {
                setInvoice(invoice);
                history.push('success_payment');
            }, (error) => {
                setError('Error while parsing response ' + error);
                history.push('failed_payment');
            });
    }

    return (
        <div className="main-container">
            <ProductInfo />
            <Switch>
                <Route exact path="/" render={() => <PaymentForm handleSubmit={handleSubmit} />} />
                <Route path="/success_payment" render={() => <SuccessComponent invoice={invoice} />} />
                <Route path="/failed_Payment" render={() => <div>{error}</div>} />
            </Switch>
        </div>
    )
}

MainScreen.defaultProps = {
    history: {},
}

export default withRouter(MainScreen);