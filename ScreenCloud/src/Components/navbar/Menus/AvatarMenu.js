import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { Avatar } from '@material-ui/core';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #0066fe',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: "#0066fe",
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function AvatarMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <Avatar 
            alt="Michael"
            className={"purpleAvatar"}
        >
            {props.name}
        </Avatar>
        <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <StyledMenuItem>
            <ListItemIcon>
                <SendIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Sent mail" />
            </StyledMenuItem>
            <StyledMenuItem>
            <ListItemIcon>
                <DraftsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
            </StyledMenuItem>
            <StyledMenuItem>
            <ListItemIcon>
                <InboxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            </StyledMenuItem>
        </StyledMenu>
    </div>
  );
}