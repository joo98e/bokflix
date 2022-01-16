import Logo from '@ui/Logo';
import React from 'react'
import styled from 'styled-components'

interface Props {

}

const Nav = styled.nav`
    position: fixed;
    top: 0;
    display : flex;
    width: 100%;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color : ${props => props.theme.white.lighter};
    background: ${props => props.theme.black.darker};
`;

const Logo2 = styled.svg`
    margin-right: 50px;
`;

const Col = styled.div`
    display: flex;
    align-items: center;
`;

const Items = styled.ul`
    display: flex;
    align-items: center;
`;

const Item = styled.li`
    margin-right: 20px;
`;

const Header = (props: Props) => {
    return (
        <Nav>
            <Col>
                <Logo width={128} height={48} color={"#E51013"} />
                <Items>
                    <Item>홈</Item>
                    <Item>TV 쇼</Item>
                </Items>
            </Col>
            <Col>
                <Items>
                    <button>
                        button
                    </button>
                </Items>
            </Col>
        </Nav>
    )
}

export default Header
