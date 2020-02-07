import React from 'react';
import moment from 'moment';
import { PRODUCT_FORMAT } from '../constants/Constants';

const ProductInfo = () => (
    <div className="product-container">
        <span>Product: Abcd</span>
        <span>Date: {moment().format(PRODUCT_FORMAT)}</span>
        <span>Amount: 1123.03 USD</span>
    </div>
)

export default ProductInfo;