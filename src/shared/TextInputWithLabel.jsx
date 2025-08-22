import React, { forwardRef } from 'react';

const TextInputWithLabel = forwardRef(({
    elementId,
    labelText,
    onChange,
    value,
    onBlur,
    autofocus
}, ref) => {
    return (
        <>
        <label htmlFor={elementId}>{labelText}</label>
        <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoFocus={autoFocus}
        />
        </>
    );
});



export default TextInputWithLabel;