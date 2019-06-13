import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { Route } from 'react-router-dom';

export default class LinkAlreadyUsedDialog extends Component {

    render() {
        return (<div>
                <Dialog open={this.props.open}>
                    <DialogTitle id="form-dialog-title">This test is already passed.You can not pass it again.</DialogTitle>
                    <DialogContent>
                    </DialogContent>
                    <DialogActions>
                        {/*<Route render={({history}) => (*/}
                        {/*    <Button color="secondary" onClick={() => {*/}
                        {/*        history.push('/detailed-result',*/}
                        {/*            this.props.sessionId*/}
                        {/*        )*/}
                        {/*    }}>*/}
                        {/*    </Button>*/}
                        {/*)}/>*/}
                        <Button href='/'>OK</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}