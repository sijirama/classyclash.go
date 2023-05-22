import {Navbar , Nav , Container , NavDropdown , Badge} from "react-bootstrap"
import {FaSignInAlt , FaSignOutAlt} from "react-icons/fa"
import {LinkContainer} from "react-router-bootstrap"
import { useNavigate } from "react-router-dom"
import { useAppSelector , useAppDispatch } from "../app/hooks"
import { useLogoutMutation } from "../app/slices/userApiSlice"
import { logout } from "../app/slices/authSlice"
import { toast } from "react-toastify"

export default function Header() {

    const {userInfo} = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
    const [logoutApiCall] = useLogoutMutation()

    const logOutHandler = async () => {
        try {
            await logoutApiCall(null).unwrap()
            dispatch(logout(null))
            navigate("login")
        } catch (err:any) {
            toast.error(err?.data?.message || err.error)
        }
    }

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Dont Hate, I used bootstrap</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {userInfo ? (
                            <NavDropdown title={(userInfo as any).name}  id="username">
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>
                                </LinkContainer>
                                    <NavDropdown.Item onClick={logOutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                    <LinkContainer to="/login">
                                        <Nav.Link >
                                            <FaSignInAlt />
                                            Sign In
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <Nav.Link>
                                            <FaSignOutAlt />
                                            Sign Up
                                        </Nav.Link>
                                    </LinkContainer>

                            </>
                        ) }
                   </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}
