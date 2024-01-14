import { Link, useLocation } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { Container, Menu, Li } from './styles'
import { useState, useEffect } from 'react'


function Header() {
    const [changeBackground, setChangeBackground] = useState(false)
    const { pathname } = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            if (!changeBackground && window.pageYOffset > 150) {
                setChangeBackground(true)
            }
            if (changeBackground && window.pageYOffset <= 150) {
                setChangeBackground(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [changeBackground])


    return (
        <Container changeBackground={changeBackground}>
            <img src={Logo} alt="logo-dev-movies" />
            <Menu>
                <Li isActive={pathname === '/'}>
                    <Link to="/">Home</Link>
                </Li>
                <Li isActive={pathname.includes('filmes')}>
                    <Link to="/filmes">Films</Link>
                </Li>
                <Li isActive={pathname.includes('series')}>
                    <Link to="/series">Series</Link>
                </Li>
            </Menu>
        </Container>
    )
}

export default Header