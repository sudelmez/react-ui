import React from 'react';
import './text_input.css';
export default function CustomTextInput({ hint, setInputValue, input, isVisible = false }) {
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }
    return (
        <div>
            <input placeholder={hint} className='box-decoration' type={isVisible ? "password" : "text"} value={input} onChange={handleInputChange} />
        </div>
    );
}