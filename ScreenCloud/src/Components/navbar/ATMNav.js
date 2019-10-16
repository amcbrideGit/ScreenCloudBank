import React from "react";
import Modal from "react-bootstrap/Modal";
import {Button, ButtonGroup, Avatar} from '@material-ui/core'
import Container from "react-bootstrap/Container"
import SignOutModal from "../atm/modals/SignOutModal";
import AvatarMenu from "./Menus/AvatarMenu";

function ATMNav(props) {

    let name = props.name.substring(0,1);
    return(
        <Container id="headNav">
            <ButtonGroup
                className="buttonGroup1"
                color="primary"
                size="small"
                aria-label="small outlined primary button group">
                <Button id="logout" classes={{root: "logoutButton", label: "logoutButton"}} onClick={props.onClickLogout}>Logout</Button>
                <SignOutModal show={props.show} onHide={props.onHide} onClickYes={props.onClickYes} onClickNo={props.onClickNo} />
            </ButtonGroup>
            <AvatarMenu name={name}/>
            <p id="a">ScreenCloud Banking</p>
        </Container>
    )
}

export default ATMNav