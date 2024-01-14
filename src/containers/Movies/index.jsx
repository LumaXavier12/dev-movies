import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Background, Container, Info, Poster, ContainerButtons } from './styles'
import { getImages } from '../../utils/getImages'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import Slider from '../../components/Slider'
import { getDiscoverMovies, getUpcomingMovies, getPopularMovies } from '../../services/getData'

function Movies() {
    const [showModal, setShowModal] = useState(false)
    const [discoverMovies, setDiscoverMovies] = useState()
    const [upcomingMovies, setUpcomingMovies] = useState()
    const [popularMovies, setPopularMovies] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        async function getAllData() {

            Promise.all([
                getDiscoverMovies(),
                getUpcomingMovies(),
                getPopularMovies()
            ])
                .then(([discoverMovies, upcomingMovies, popularMovies]) => {
                    setDiscoverMovies(discoverMovies)
                    setUpcomingMovies(upcomingMovies)
                    setPopularMovies(popularMovies)
                })
                .catch((error) => console.error(error))

        }

        getAllData()

    }, [])



    return (
        <>
            {discoverMovies && (
                <Background image={getImages(discoverMovies.backdrop_path)}>
                    {showModal && (
                        <Modal movieId={discoverMovies.id} setShowModal={setShowModal} />
                    )}
                    <Container>
                        <Poster>
                            <img alt='film-cover' src={getImages(discoverMovies.poster_path)} />
                        </Poster>
                        <Info>
                            <h1>{discoverMovies.title}</h1>
                            <p>{discoverMovies.overview}</p>
                            <ContainerButtons>
                                <Button watchmovie onClick={() => navigate(`/detalhe/${discoverMovies.id}`)}>Assista Agora</Button>
                                <Button onClick={() => setShowModal(true)}>Assista ao Trailer</Button>
                            </ContainerButtons>
                        </Info>
                    </Container>
                </Background>
            )}
            {upcomingMovies && <Slider info={upcomingMovies} title={'Upcoming Films'} />}
            {popularMovies && <Slider info={popularMovies} title={'Popular Films'} />}
        </>
    )
}

export default Movies