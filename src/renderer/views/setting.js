import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from '@/components/icon';
import { Link } from 'react-router-dom';

export default class SettingView extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Link to="/" title="返回">
                        <Icon type='arrow_back' />
                    </Link>
                    <Blank>设置</Blank>
                    <Icon type='clear' onClick={e => ipcRenderer.send('#window-hide')} />
                </Header>
            </Container>
        );
    }
}

const Container = styled.div`
    background-color: #fff;
    flex: 1;
`;

const Header = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 8px;

    a {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: #fff;
    }
`;

const Blank = styled.div`
    -webkit-app-region: drag;
    flex: 1;
    font-size: 15px;
    text-align: center;
`;
