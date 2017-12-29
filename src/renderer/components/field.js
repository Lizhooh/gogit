import React from 'react';
import styled from 'styled-components';

export default (props) => (
    <Container>
        <Text>{props.text || ''}：</Text>
        <Input {...props} />
    </Container>
);

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 2px;
`;

const Text = styled.span`
    margin-right: 10px;
    color: #565656;
`;

const Input = styled.input`
    border: none;
    padding: 3px 8px;
    border-bottom: 1px dashed #aaa;
    border-radius: 2px;
    outline: none;
    color: #565656;
`;
