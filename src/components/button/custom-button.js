import React from 'react';
import './custom-button.css';

export default function CustomButton({ title, handlePress }) {
    const buttonStyle = {
        backgroundColor: 'green',
        margin: '20px',
        padding: '10px 20px',
        border: 'none',
        borderRadius: 50,
        cursor: 'pointer',
        height: '50px',
        width: '280px',
    };

    const titleStyle = {
        color: 'white',
        fontSize: '16px',
    };
    return (
        <div className='button-decoration'>
            <button style={buttonStyle} onClick={handlePress}>
                <span style={titleStyle}>{title}</span>
            </button>
        </div>

    );
}
