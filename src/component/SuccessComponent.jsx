import React from 'react';

const SuccessComponent = ({ invoice }) => {
    const { responseMessage, approvalCode, responseCode } = invoice;

    return (
        <div className="success-payment-container">
            <span className={`${responseCode === '00' ? 'success' : 'failed'}`}>{responseMessage}</span>
            <span>Invoice: {approvalCode ? approvalCode : ''}</span>
        </div>
    );
};

SuccessComponent.defaultProps = {
    invoice: {},
};

export default SuccessComponent;