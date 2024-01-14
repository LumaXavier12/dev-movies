import { Route, Routes } from 'react-router-dom'

import Home from '../containers/Home'
import Movies from '../containers/Movies'
import Series from '../containers/Series'
import DefaultLayout from '../layout/DefaultLayout'
import Details from '../containers/Details'

function Router() {

    return (
        <Routes>
            <Route element={<DefaultLayout/>}>
                <Route path="/" element={<Home />} />
                <Route path="/filmes" element={<Movies />} />
                <Route path="/series" element={<Series />} />
                <Route path="/detalhe/:id" element={<Details />} />
            </Route>
        </Routes>
    )
}

export default Router