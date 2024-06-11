import React from 'react';
import './text_input.css';
export default function CustomTextInput({ hint, setInputValue, input }) {
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }
    return (
        <div>
            <input placeholder={hint} className='box-decoration' type="text" value={input} onChange={handleInputChange} />
        </div>
    );
}