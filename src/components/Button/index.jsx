import { ButtonWatchMovie, ButtonWatchTrailer } from "./styles"

function Button({ children, watchmovie, ...rest }) {

    return (
        <>

            {watchmovie ? (
                <ButtonWatchMovie {...rest}>{children}</ButtonWatchMovie>
            ) : (
                <ButtonWatchTrailer {...rest}>{children}</ButtonWatchTrailer>
            )}
        </>
    )
}


export default Button