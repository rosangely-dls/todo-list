import React, { forwardRef } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
    padding: 5px;
`;

const StyledInput = styled.input`
    padding: 5px;
`;

const TextInputWithLabel = forwardRef(({ elementId, label, onChange, value }, ref) => {
    return (
        <>
        <StyledLabel htmlFor={elementId}>{label}</StyledLabel>
        <StyledInput
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
        />
        </>
    );
});


export default TextInputWithLabel;