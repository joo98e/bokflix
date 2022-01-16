import { getMovies } from '@api/Movie'
import React from 'react'
import { useQuery } from 'react-query'

interface Props {

}

const Home = (props: Props) => {
    const { isLoading, data } = useQuery(["movies", "nowPlaying"], getMovies);
    console.log(data);

    return (
        <div style={{ height: "200vh", backgroundColor: "" }}>

        </div>
    )
}

export default Home
