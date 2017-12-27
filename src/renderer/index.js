import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from './components/icon';

export default class App extends Component {

    render() {
        return (
            <Container>
                <Header>
                    <div className="allow-drag flex-1" />
                    <Icon type='settings' />
                    <Icon type='clear' />
                </Header>
                <Section>
                    <Title>GoGit 服务管理工具</Title>
                </Section>
                <Footer>
                </Footer>
            </Container>
        );
    }
}

const Container = styled.div`
    flex: 1;
    background-color: #fff;
`;

const Section = styled.section`
    padding: 20px;
`;

const Header = styled.header`
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 12px;
`;

const Footer = styled.footer`
`;

const Title = styled.div`
    text-align: center;
    font-size: 20px;
`;

