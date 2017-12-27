import React from 'react';
import styled from 'styled-components';
import Color from 'color';

export default (props) => (
    <Icon {...props}>{props.type}</Icon>
);

const Icon = styled.i.attrs({
    className: 'material-icons'
}) `
    color: ${p => p.color || '#777'};
    font-size: ${p => p.size || 24}px;
    cursor: pointer;
    -webkit-app-region: none;
    margin: 0 3px;
    transition: all 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);

    &:hover {
        color: ${p => Color(p.color).darken(0.03).toString()}
    }
`;

