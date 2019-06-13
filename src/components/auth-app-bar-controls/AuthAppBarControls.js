import React from 'react';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import AccountCircle from '@material-ui/icons/AccountCircle';

class AuthAppBarControls extends React.Component {

  render() {
    return (
      <div className="appBarAuthControls">
        <Button variant="contained" color="primary" onClick={this.props.firstButtonClickHandler}>
            {this.props.firstButtonLabel}
          <AccountCircle />
        </Button>

        <Button color="primary" onClick={this.props.secondButtonClickHandler}>
            {this.props.secondButtonLabel}
          <SvgIcon>
            <path fill="#000000" d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
          </SvgIcon>
        </Button>
      </div>
    )
  }
}

export default AuthAppBarControls;
