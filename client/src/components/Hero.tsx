import {Card , Container , Button} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import { useAppSelector , useAppDispatch } from "../app/hooks"

function Hero() {
    const {userInfo} = useAppSelector((state) => state.auth)
  return (
    <div className="py-5">
        <Container className="d-flex justify-content-center">
            <Card className="p-5 d-flex flex-column alignt-items-center hero-card bg-light w-75">
                <h1 className="text-center mb-4 fw-bold">siji's sandbox</h1>
                <p className="text-center mb-4">
                    Full stack MERN application i use to practice web development stuff.
                </p>
                <p className="text-center mb-4 ">
                {userInfo ? (
                   <p>Welocome {(userInfo as any).name}</p> 
                ):(
                   <p>You have to be signed in to fully enjoy the short experience!</p> 
                )}
                </p>
                { userInfo ? (
                    null
                ):(
                <div className="d-flex justify-content-center">
                    <LinkContainer to="/login">
                        <Button variant="primary" className="me-3">Sign In</Button>
                    </LinkContainer>
                    <LinkContainer to="/register">
                        <Button variant="secondary" href="/register" className="me-3">Sign Up</Button>
                    </LinkContainer>
                </div>
                )}
            </Card>
        </Container>
    </div>
  )
}

export default Hero
