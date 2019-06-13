import React from 'react';
import './StartPage.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class StartPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDrawerOpen: false,
            isLoginDialogOpen: false,
            isSignUpDialogOpen: false,
            isStartTestsDialogOpen: false
        };

    }

    render() {
        return (
            <div>
                {/* Main content */}
                <div className="mainContent">
                    <Typography className="mainContentText" variant="h3">
                        You don't know programming!
                    </Typography>
                    <Typography className="mainContentText" variant="h4">
                        Prove your skills with our tests
                    </Typography>
                    <Button variant="contained" color="primary" onClick={this.props.startTestsDialogHandler}
                            className="startTestsButton">
                        Start Tests
                    </Button>
                    <div className="shadow"></div>

                </div>
            </div>
        )
    }
}

export default StartPage;
