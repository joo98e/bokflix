import { getMovies, IGetMoviesResult, IMovie } from '@api/Movie'
import React, { useState } from 'react'
import Loader from 'react-loader-spinner';
import { useQuery } from 'react-query'
import styled from 'styled-components';
import makeImagePath from '@fn/makeImagePath'
import { AnimatePresence, motion } from 'framer-motion';
import makeSplice from '@fn/makeSplice';

interface Props {

}

const Wrapper = styled.div`

`;

const Banner = styled.div<{ backDropPhoto: string | undefined }>`
    display: flex;
    height: 100vh;
    justify-content: center;
    flex-direction: column;
    padding : 60px;
    background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,1)), url(${props => props.backDropPhoto});
`;

const Title = styled.h2`
    font-size: 72px;
    margin-bottom: 20px;
    color: ${props => props.theme.white.lighter};
`;

const Overview = styled.p`
    width : 70%;
    font-size: 18px;
    line-height: 24px;
    color: ${props => props.theme.white.desc};
`;

const Slider = styled.div`
    position: relative;
    top: -200px;
`;

const Row = styled(motion.div)`
    position : absolute;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(6, 1fr);
    gap : 5px;
    margin-bottom: 10px;
    padding : 0 50px;
    box-sizing: border-box;
`;

const Movie = styled(motion.div)`
    width: 260px;
    height: 150px;
    color: ${props => props.theme.black.lighter};
    background-color: ${props => props.theme.white.lighter};
`;

const rowAnimateVars = {
    hidden: {
        x: window.outerWidth
    },
    visible: {
        x: 0,
    },
    exit: {
        x: -window.outerWidth
    }
}

const Home = (props: Props) => {
    const { isLoading, data } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    const [currSlide, setCurrSlide] = useState<number>(0);
    const [slideLeaving, setSlideLeaving] = useState<boolean>(false);
    const IncreaseSlide = () => {
        if (slideLeaving) return;
        toggleLeaving();
        setCurrSlide(curr => curr + 1);
    };

    console.log(data?.results);

    const toggleLeaving = () => setSlideLeaving(prev => !prev);

    return (
        <Wrapper>
            {
                isLoading ? <Loader type="CradleLoader" /> :
                    <>
                        <Banner onClick={IncreaseSlide} backDropPhoto={makeImagePath({ id: data?.results[0].backdrop_path ?? "" })}>
                            <Title>{data?.results[0].title}</Title>
                            <Overview>{data?.results[0].overview}</Overview>
                        </Banner>
                        <Slider>
                            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                                {

                                }
                                <Row
                                    key={currSlide}
                                    variants={rowAnimateVars}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    transition={{
                                        type: "tween",
                                        duration: 1
                                    }}
                                >
                                    {
                                        data?.results
                                            .slice(2)
                                            .slice(6 * currSlide, 6 * currSlide + currSlide).map((item: IMovie) => {
                                                return (
                                                    <div key={item.id}>{item.title}{item.id}</div>
                                                )
                                            })
                                    }
                                </Row>
                            </AnimatePresence>
                        </Slider>
                    </>
            }
        </Wrapper>
    )
}

export default Home
