import React from "react"
import Modal from "react-bootstrap/Modal";
import "./NavBar.css"
import LoginForm from "../loginForm/LoginForm";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Navbar'    
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import classnames from "classnames";

class NavHeader extends React.Component {
    
    constructor() {
        super()
        this.state= {
            visible: false,
            scrollVisible: true,
            prevScrollpos: window.pageYOffset,
        }
        
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }


    openModal() {
        this.setState({
            visible : true
        });
    }
    
    closeModal() {
        this.setState({
            visible : false
        });
    }

    handleScroll = () => {
        const { prevScrollpos } = this.state;
      
        const currentScrollPos = window.pageYOffset;
        const scrollVisible = prevScrollpos < 500;
      
        this.setState({
          prevScrollpos: currentScrollPos,
          scrollVisible
        });
    };

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    render() {
        return (
            <Container>
                <nav className={classnames("navbar navbar-expand-lg fixed-top", {
                    "navbar--hidden navbar-expand-lg fixed-top": !this.state.scrollVisible
                })}>
                <a className="navbar-brand" href="#">ScreenCloud Bank</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle NavHeader">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">About</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Contact Us</a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input type="button" className="btn btn-success my-2 my-sm-0" value="Start Banking" onClick={() => this.openModal()} />
                    <Modal centered={true} show={this.state.visible} onHide={this.closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{textAlign: "center"}}>Enter Your PIN</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <LoginForm />
                        </Modal.Body>
                        <Modal.Footer />
                    </Modal>
                </form>
                </div>
            </nav>
            </Container>
        )
            //Redo this using Bootstrap React

        
    }
}

export default NavHeader