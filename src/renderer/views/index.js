import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from '@/components/icon';
import _ from '@/data';
import { ipcRenderer } from 'electron';
import { Link } from 'react-router-dom';

let data;

export default class IndexView extends Component {

    constructor(props) {
        super(props);

        this.statusMaps = {
            active: {
                type: 'action',
                text: '运行中',
                color: '#a5de37',
            },
            error: {
                type: 'caution',
                text: '运行错误',
                color: '#ff4351',
            },
            wait: {
                type: 'highlight',
                text: '未运行',
                color: '#feae1b',
            },
            loading: false,
        }

        this.state = data || {
            status: 'wait'
        };
    }

    onClick = e => {
        if (this.state.loading) return;
        const keys = Object.keys(this.statusMaps);
        this.set({
            status: keys[Math.random() * keys.length - 1 | 0]
        });
    }

    set(d) {
        this.setState(d, () => {
            data = { ...this.state };
        });
    }

    render() {
        const { status } = this.state;

        return (
            <Container>
                <Header>
                    <div className="allow-drag flex-1" />
                    <Link to='/setting' title="设置">
                        <Icon type='settings' size={22} />
                    </Link>
                    <Icon type='clear' onClick={e => ipcRenderer.send('#window-hide')} />
                </Header>
                <Section>
                    <Title>{_.name}</Title>
                    <SubTitle>{_.version}</SubTitle>
                    <Content>
                        <Text>{this.statusMaps[status].text}</Text>
                        <StatusAnimated color={this.statusMaps[status].color} />
                    </Content>
                </Section>
                <Footer>
                    <Button
                        type={this.statusMaps[status].type}
                        onClick={this.onClick}
                        />
                </Footer>
            </Container>
        );
    }
}

const Container = styled.div`
    flex: 1;
    background-color: #fff;
    display: flex;
    flex-direction: column;
`;

const Section = styled.section`
    padding: 12px 20px;
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const Header = styled.header`
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

const Footer = styled.footer`
    text-align: center;
    padding-bottom: 15px;
`;

const Title = styled.div`
    text-align: center;
    font-size: 20px;
    margin: 12px 0;
`;

const SubTitle = styled.div`
    font-size: 13px;
    color: #919191;
`;

const Text = styled.span`
    font-size: 15px;
`;

const Button = styled.button.attrs({
    className: p => `button button-glow button-raised button-${p.type || 'highlight'} button-circle button-jumbo`
}) ` margin: 12px auto `;

const Panel = styled.div`
    padding: 20px;
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    position: relative;
`;

const StatusAnimated = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 100px;
    height: 100px;
    background-color: rgba(1, 1, 1, 0.01);
    border-radius: 50%;
    text-align: center;
    border: 0.5px solid #eee;
    transform: scale(1.2);

    &::after {
        position: absolute;
        content: ' ';
        top: -5px;
        left: 47%;
        width: 10px;
        height: 10px;
        background-color: ${p => p.color || '#fff'};
        border-radius: 50%;
    }

    animation: status-animated-run 4s linear infinite;
    @keyframes status-animated-run {
        0% { transform: rotate(0deg) }
        100% { transform: rotate(360deg) }
    }
`;
