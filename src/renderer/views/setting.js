import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from '@/components/icon';
import { Link } from 'react-router-dom';
import Field from '@/components/field';
import { ipcRenderer } from 'electron';
import Storage from '@/storage';

export default class SettingView extends Component {

    constructor(props) {
        super(props);
        const config = Storage.get('APP-CONFIG') || {};
        this.state = {
            path: config.path || '',
            port: config.port || 5000,
        };
    }

    save = e => {
        Storage.set('APP-CONFIG', {
            path: this.state.path,
            port: this.state.port,
        });
    }

    onChange = (e, field) => {
        this.setState({ [field]: e.target.value });
    }

    render() {
        const { path, port } = this.state;

        return (
            <Container>
                <Header>
                    <Link to="/"><Icon type='arrow_back' /></Link>
                    <Blank>设置</Blank>
                    <Icon type='clear' onClick={e => ipcRenderer.send('#window-hide')} />
                </Header>
                <Content>
                    <Field
                        text="位置"
                        placeholder="gogs 所在路径的位置"
                        value={path}
                        onChange={e => this.onChange(e, 'path')}
                        />
                    <Field
                        text="端口"
                        placeholder="gogs 启动监听的端口"
                        type="number"
                        value={port}
                        onChange={e => this.onChange(e, 'port')}
                        />
                    <Button onClick={this.save}>保存</Button>
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
    background-color: #f4f4f4;

    a {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: rgba(1, 1, 1, 0);
    }
`;

const Blank = styled.div`
    -webkit-app-region: drag;
    flex: 1;
    font-size: 15px;
    text-align: center;
`;

const Content = styled.div`
    padding: 25px 16px;
    flex: 1;
`;

const Button = styled.button.attrs({
    className: p => `button button-rounded button-small button-royal`
}) `
    margin: 40px auto 20px;
    display: block;
`;
