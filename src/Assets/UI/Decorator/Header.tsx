import Logo from '@ui/Logo';
import { motion, useAnimation, useViewportScroll } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components'

interface Props {

}

const Nav = styled(motion.nav)`
    position: fixed;
    top: 0;
    display : flex;
    width: 100%;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    background: ${props => props.theme.black.darker};
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
    position: relative;
    display: flex;
    justify-content: center;
    min-width: 50px;
    margin-right: 20px;
    color : ${props => props.theme.white.darker};
    transition: color 0.3 ease-in-out;
    &:hover{
        color : ${props => props.theme.white.lighter};
    }
`;

const Circle = styled(motion.span)`
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    bottom: -15px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: ${props => props.theme.red};
`;

const Search = styled.span`
    position: relative;
    display: flex;
    align-items: center;
    color: white;
    margin-right: 30px;
    svg {
    height: 25px;
    }
`;

const Input = styled(motion.input)`
    position : absolute;
    left: -150px;
    transform-origin: right center;
`;

const navVars = {
    top: {
        backgroundColor: "rgba(0, 0, 0, 0)"
    },
    scroll: {
        backgroundColor: "rgba(0, 0, 0, 1)"
    }
}

const Header = (props: Props) => {
    const [searchOpen, setSearchOpen] = useState(false)
    const homeMatch = useRouteMatch("/");
    const tvMatch = useRouteMatch("/tv");
    const inputAnimation = useAnimation();
    const navAnimation = useAnimation();
    const { scrollY, scrollYProgress } = useViewportScroll();

    const toggleSearch = () => {
        if (searchOpen) {
            inputAnimation.start({
                scaleX: 0
            });
        } else {
            inputAnimation.start({
                scaleX: 1
            });
        }
        setSearchOpen(prev => !prev);
    }

    useEffect(() => {
        scrollY.onChange(() => {
            if (scrollY.get() > 80) {
                navAnimation.start("scroll");
            } else {
                navAnimation.start("top")
            }
        });
    });

    return (
        <Nav variants={navVars} initial={"top"} animate={navAnimation}>
            <Col>
                <Logo width={128} height={48} color={"#E51013"} />
                <Items>
                    <Item>
                        <Link to="/">
                            홈
                            {homeMatch?.isExact && <Circle layoutId="circle" />}
                        </Link>
                    </Item>
                    <Item>
                        <Link to="/tv">
                            TV 쇼
                            {tvMatch && <Circle layoutId="circle" />}
                        </Link>
                    </Item>
                </Items>
            </Col>
            <Col>
                <Items>
                    <Search>
                        <motion.svg
                            onClick={toggleSearch}
                            animate={{ x: searchOpen ? -180 : 0 }}
                            transition={{
                                type: "linear"
                            }}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            >
                            </path>
                        </motion.svg>
                        <Input
                            initial={{ scaleX: 0 }}
                            animate={inputAnimation}
                            transition={{
                                type: "linear"
                            }}
                            placeholder="키워드로 검색해보세요."
                        />
                    </Search>
                </Items>
            </Col>
        </Nav>
    )
}

export default Header
