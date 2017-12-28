import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from '@/components/icon';
import { Link } from 'react-router-dom';
import Field from '@/components/field';

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
                <Content>
                    <Field text="位置" placeholder="gogs 所在路径的位置" type="text" />
                    <Field text="端口" placeholder="gogs 启动监听的端口" type="number" />

                    <Button>保存</Button>
                </Content>
            </Container>
        );
    }
}

const Container = styled.div`
    background-color: #fff;
    flex: 1;
    display: flex;
    flex-direction: column;
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

const Content = styled.div`
    padding: 20px;
    flex: 1;
`;

const Button = styled.button.attrs({
    className: p => `button button-rounded button-small button-royal`
}) `
    margin: 40px auto 20px;
    display: block;
`;
