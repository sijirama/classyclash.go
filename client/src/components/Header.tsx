import {Navbar , Nav , Container , NavDropdown , } from "react-bootstrap"
import {FaSignInAlt , FaSignOutAlt} from "react-icons/fa"
import {LinkContainer} from "react-router-bootstrap"
import { useNavigate } from "react-router-dom"
import { useAppSelector , useAppDispatch } from "../app/hooks"
import { useLogoutMutation } from "../app/slices/userApiSlice"
import { logout } from "../app/slices/authSlice"
import { toast } from "react-toastify"
import "../styles/components/Header.scss"
import { Badge,  Avatar } from 'rsuite';

export default function Header() {

    const {userInfo}:any = useAppSelector((state) => state.auth)
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
                    <Navbar.Brand>SandBox</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {userInfo ? (
                            <div className="custom-dropdown">
                            <Nav.Link>
                            {userInfo?.profilepicture && (
                                <Badge content="30">
                                    <Avatar size="md" circle src={userInfo?.profilepicture} alt={userInfo.name} />
                                </Badge>
                            )}
                            </Nav.Link>
                            <NavDropdown className="custom-dropdown" title={(userInfo as any).name}  id="username">
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>
                                </LinkContainer>
                                    <NavDropdown.Item onClick={logOutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                            </NavDropdown>
                            </div>
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
