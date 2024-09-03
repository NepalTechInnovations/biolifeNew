import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../categoryList/categoryList.css';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [offset, setOffset] = useState(0);
    const containerRef = useRef(null);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/product/getAllProduct`);
                console.log(response);
                if (response.data.success) {
                    const uniqueCategories = response.data.getAllProducts.map(product => product.category)
                        .filter((value, index, self) =>
                            index === self.findIndex((c) => (
                                c.categoryName === value.categoryName
                            ))
                        );
                    setCategories(uniqueCategories);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handlePrevClick = () => {
        setOffset(prevOffset => Math.min(prevOffset + 300, 0));
    };

    const handleNextClick = () => {
        if (containerRef.current) {
            const maxOffset = -containerRef.current.scrollWidth + containerRef.current.clientWidth;
            setOffset(prevOffset => Math.max(prevOffset - 300, maxOffset));
        }
    };

    return (
        <div className="categoryListContainer">
            <button className="slideButton left" onClick={handlePrevClick}>{''}</button>
                <div className="container">
                    <h3 className='categoryHeading homeHeading'>Categories</h3>
            <div className="categoryListWrapper" ref={containerRef} style={{ transform: `translateX(${offset}px)` }}>
                    <div className="categoryList">
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <div key={category._id} className="categoryItem">
                                    <Link className='categoryListName' to={`/products?category=${category._id}`}>
                                        <img className='categoyListImg' src={category.images[0]} alt={category.categoryName} />
                                        <p>{category.categoryName}</p>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>No categories available</p>
                        )}
                    </div>
                </div>
            </div>
            <button className="slideButton right" onClick={handleNextClick}>{''}</button>
        </div>
    );
};

export default CategoryList;
