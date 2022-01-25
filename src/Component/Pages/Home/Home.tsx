import { getMovies, IGetMoviesResult, IMovie } from '@api/Movie'
import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner';
import { useQuery } from 'react-query'
import styled from 'styled-components';
import makeImagePath from '@fn/makeImagePath'
import { AnimatePresence, motion, useViewportScroll } from 'framer-motion';
import makeSplice from '@fn/makeSplice';
import { useHistory, useRouteMatch } from 'react-router-dom';

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
    gap : 10px;
    margin-bottom: 10px;
    padding : 0 10px;
    box-sizing: border-box;
`;

const Movie = styled(motion.div) <{ bgPhoto: string }>`
    height: 134px;
    color: ${props => props.theme.black.lighter};
    background-color: ${props => props.theme.black.modal};
    background-image: url(${props => props.bgPhoto});
    cursor: pointer;
    &:first-child{
        transform-origin: left;
    }
    &:last-child{
        transform-origin: right;
    }
`;

// const MovieImage = styled(motion.img)`
//     width: 100%;
// `;

const MovieInfo = styled(motion.div)`
    position : absolute;
    bottom: 0;
    width: 100%;
    opacity: 0;
    padding: 10px;
    background-color: ${props => props.theme.black.modal};

    h4{
        font-size: 12px;
        text-align: center;
        color: ${props => props.theme.white.darker};
    }
`;

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    opacity: 0;
`;

const MoviePoster = styled(motion.div)`
    position: absolute;
    left: 0;
    right: 0;
    width: 40vw;
    min-height: 60vh;
    margin: 0 auto;
    border-radius: 15px;
    background-color: ${props => props.theme.black.darker};
`;

const MovieDetailOverview = styled.div<{ bgPhoto: string }>`
    position: relative;
    top: 0;
    width: 100%;
    min-height: 400px;
    font-size: 36px;
    padding: 15px;
    border-radius: 15px 15px 0 0;
    background-image: linear-gradient(to top, black, transparent), url(${props => props.bgPhoto});
    background-size: cover;
    background-repeat: no-repeat;
`;

const MovieDetailTitle = styled.h2`
    position: absolute;
    bottom: 15px;
    color: ${props => props.theme.white.darker};
`;
const MovieDetailDesc = styled.p`
    color: ${props => props.theme.white.desc};
`;

const MovieDetailDataTitle = styled.span`
    display : block;
    color: ${props => props.theme.white.title};
`;

const MovieDetailDataContent = styled.span`
    display : block;
    color : ${props => props.theme.white.content};
`;

const rowAnimateVars = {
    hidden: {
        x: window.outerWidth - 5,
        transition: {
            duration: .5
        }
    },
    visible: {
        x: 0,
        transition: {
            duration: .5
        }
    },
    exit: {
        x: -window.outerWidth + 5,
        transition: {
            duration: .5
        }
    },
}

const boxAnimateVars = {
    normal: {
        scale: 1
    },
    hover: {
        scale: 1.3,
        y: -50,
        transition: {
            type: "tween",
            duration: 0.3,
            delay: .5,
        }
    }
}

const infoAnimateVars = {
    hover: {
        opacity: 1,
        transition: {
            type: "tween",
            duration: 0.3,
            delay: .5,
        }
    }
}

const Home = (props: Props) => {
    const offset = 6;
    const history = useHistory();
    const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
    const { isLoading, data } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    const [currSlide, setCurrSlide] = useState<number>(0);
    const [slideLeaving, setSlideLeaving] = useState<boolean>(false);
    const { scrollY } = useViewportScroll();
    const clickedMovie = bigMovieMatch?.params.movieId && data?.results.find(movie => movie.id === +bigMovieMatch.params.movieId);
    console.log(clickedMovie);
    const IncreaseSlide = () => {
        if (data) {
            if (slideLeaving) return;
            const totalMovies = data.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            toggleLeaving();
            setCurrSlide(curr => curr === maxIndex ? 0 : curr + 1);
        }
    };

    const toggleLeaving = () => setSlideLeaving(prev => !prev);

    const handleClickOverlay = () => {
        history.push("/");
    }

    const handleClickMovieDetail = (id: number) => {
        history.push(`/movies/${id}`)
    }

    return (
        <Wrapper>
            {
                isLoading ? <Loader type="CradleLoader" /> :
                    <>
                        <Banner onClick={IncreaseSlide} backDropPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
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
                                            .slice(1)
                                            .slice(offset * currSlide, (offset * currSlide) + offset).map((movie: IMovie) => {
                                                return (
                                                    <Movie
                                                        key={movie.id}
                                                        layoutId={movie.id + ""}
                                                        variants={boxAnimateVars}
                                                        initial="normal"
                                                        whileHover="hover"
                                                        transition={{ type: "tween" }}
                                                        bgPhoto={makeImagePath(movie.backdrop_path, "w300")}
                                                        onClick={() => handleClickMovieDetail(movie.id)}
                                                    >
                                                        <MovieInfo variants={infoAnimateVars}>
                                                            <h4>{movie.title}</h4>
                                                        </MovieInfo>
                                                    </Movie>
                                                )
                                            })
                                    }
                                </Row>
                            </AnimatePresence>
                        </Slider>
                        <AnimatePresence>
                            {
                                bigMovieMatch &&
                                <>
                                    <Overlay onClick={handleClickOverlay} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                                    <MoviePoster layoutId={bigMovieMatch.params.movieId} style={{ top: scrollY.get() + 100 }}>
                                        {
                                            clickedMovie &&
                                            <>
                                                <MovieDetailOverview bgPhoto={makeImagePath(clickedMovie.backdrop_path, "w500")}>
                                                    <MovieDetailTitle>{clickedMovie.title}</MovieDetailTitle>
                                                </MovieDetailOverview>
                                                <div style={{ padding: "15px" }}>
                                                    <MovieDetailDesc>{clickedMovie.overview ?? "데이터가 없습니다."}</MovieDetailDesc>
                                                    <div style={{ display: 'grid', gridTemplateColumns: "repeat(2, 1fr)", gap: 30, marginTop: 30 }}>
                                                        <MovieDetailDataTitle>개봉일</MovieDetailDataTitle>
                                                        <MovieDetailDataContent>{clickedMovie.release_date}</MovieDetailDataContent>
                                                        <MovieDetailDataTitle>평점</MovieDetailDataTitle>
                                                        <MovieDetailDataContent>{clickedMovie.vote_average}</MovieDetailDataContent>
                                                        <MovieDetailDataTitle>관람수</MovieDetailDataTitle>
                                                        <MovieDetailDataContent>{Math.floor(clickedMovie.popularity)}</MovieDetailDataContent>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </MoviePoster>
                                </>
                            }
                        </AnimatePresence>
                    </>
            }
            <div style={{ height: "100vh" }}>

            </div>
        </Wrapper >
    )
}

export default Home
