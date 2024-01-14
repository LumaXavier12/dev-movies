import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Background, Container, Info, Poster, ContainerButtons } from './styles'
import { getImages } from '../../utils/getImages'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import Slider from '../../components/Slider'
import { getAiringTodaySeries, getOnTheAirSeries, getMultiSeries } from '../../services/getData'



function Series() {
    const [showModal, setShowModal] = useState(false)
    const [airingTodaySeries, setAiringTodaySeries] = useState()
    const [onTheAirSeries, setOnTheAirSeries] = useState()
    const [multiSeries, setMultiSeries] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        async function getAllData() {

            Promise.all([
                getAiringTodaySeries(),
                getOnTheAirSeries(),
                getMultiSeries()
            ])
                .then(([airingTodaySeries, onTheAirSeries, multiSeries]) => {
                    setAiringTodaySeries(airingTodaySeries)
                    setOnTheAirSeries(onTheAirSeries)
                    setMultiSeries(multiSeries)

                })
                .catch((error) => console.error(error))

        }

        getAllData()

    }, [])



    return (
        <>
            {airingTodaySeries && (
                <Background image={getImages(airingTodaySeries.backdrop_path)}>
                    {showModal && (
                        <Modal movieId={airingTodaySeries.id} setShowModal={setShowModal} />
                    )}
                    <Container>
                        <Poster>
                            <img alt='film-cover' src={getImages(airingTodaySeries.poster_path)} />
                        </Poster>
                        <Info>
                            <h1>{airingTodaySeries.title}</h1>
                            <p>{airingTodaySeries.overview}</p>
                            <ContainerButtons>
                                <Button watchmovie onClick={() => navigate(`/detalhe/${airingTodaySeries.id}`)}>Assista Agora</Button>
                                <Button onClick={() => setShowModal(true)}>Assista ao Trailer</Button>
                            </ContainerButtons>
                        </Info>
                    </Container>
                </Background>
            )}
            {onTheAirSeries && <Slider info={onTheAirSeries} title={'On The Air Series'} />}
            {multiSeries && <Slider info={multiSeries} title={'Multi Series'} />}
        </>
    )
}

export default Series