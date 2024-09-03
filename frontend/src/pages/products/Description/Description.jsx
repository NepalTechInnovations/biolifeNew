

import React from 'react';
import '../Description/description.css'

const Description = ({ product }) => {
    return (
        <div className="description">
            <div className="container">
                <div className="descriptionContainer">
                    <h3>Introduction</h3>
                    <p>{product.name}</p>
                </div>
            </div>
        </div>
    );
};

export default Description;
