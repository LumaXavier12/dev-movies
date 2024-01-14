import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/Button'
import Modal from '../../components/Modal'
import Slider from '../../components/Slider'
import { getImages } from '../../utils/getImages'
import { Background, Container, Info, Poster, ContainerButtons } from './styles'
import {
    getMovies,
    getTopMovies,
    getTopSeries,
    getPopularSeries,
    getTopPeople
} from '../../services/getData'


function Home() {
    const [showModal, setShowModal] = useState(false)
    const [movie, setMovie] = useState()
    const [topMovies, setTopMovies] = useState()
    const [topSeries, setTopSeries] = useState()
    const [popularSeries, setPopularSeries] = useState()
    const [topPeople, setTopPeople] = useState()
    const navigate = useNavigate()


    useEffect(() => {
        async function getAllData() {
            
            Promise.all([
                getMovies(),
                getTopMovies(),
                getTopSeries(),
                getPopularSeries(),
                getTopPeople()
            ])
                .then(([movie, topMovies, topSeries, popularSeries, topPeople]) => {
                    setMovie(movie)
                    setTopMovies(topMovies)
                    setTopSeries(topSeries)
                    setPopularSeries(popularSeries)
                    setTopPeople(topPeople)
                })
                .catch((error) => console.error(error))

        }

        getAllData()

    }, [])

    return (
        <>
            {movie && (
                <Background image={getImages(movie.backdrop_path)}>
                    {showModal && (
                        <Modal movieId={movie.id} setShowModal={setShowModal} />
                    )}
                    <Container>
                        <Info>
                            <h1>{movie.title}</h1>
                            <p>{movie.overview}</p>
                            <ContainerButtons>
                                <Button  watchmovie onClick={() => navigate(`/detalhe/${movie.id}`)}>Assista Agora</Button>
                                <Button onClick={() => setShowModal(true)}>Assista ao Trailer</Button>
                            </ContainerButtons>
                        </Info >
                        <Poster>
                            <img alt='film-cover' src={getImages(movie.poster_path)} />
                        </Poster>
                    </Container>
                </Background>
            )}
            {topMovies && <Slider info={topMovies} title={'Top Films'} />}
            {topSeries && <Slider info={topSeries} title={'Top Series'} />}
            {popularSeries && <Slider info={popularSeries} title={'Popular Series'} />}
            {topPeople && <Slider info={topPeople} title={'Top Peoples'} />}
        </>
    )
}

export default Home