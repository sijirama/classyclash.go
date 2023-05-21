import {Card , Container , Button} from "react-bootstrap"

function Hero() {
  return (
    <div className="py-5">
        <Container className="d-flex justify-content-center">
            <Card className="p-5 d-flex flex-column alignt-items-center hero-card bg-light w-75">
                <h1 className="text-center mb-4 fw-bold"> Sorry, I used Bootstrap.</h1>
                <p className="text-center mb-4">
                    This is just a prototype of a full stack mern application.
                    currently just focused on the authentication side, as that is where i find myself having alot of issues.
                    This uses Redux-toolkit and React-bootstrap (I swear i use tailwind normally)
                </p>
                <p className="text-center mb-4 ">This also serves as a dev center for practicing web development full stack stuff.</p>
                <div className="d-flex">
                    <Button variant="primary" href="/login" className="me-3">Sign In</Button>
                    <Button variant="secondary" href="/register" className="me-3">Sign Up</Button>
                </div>
            </Card>
        </Container>
    </div>
  )
}

export default Hero
