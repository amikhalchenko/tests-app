import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class UpdateResultAlertDialog extends Component{

    state = {
        restartTest: false,
        showResultBySubjects: false,
    }
    restartTest = () =>{
        console.log(this.props);
        this.setState((state) =>{
            state.restartTest = true;
        },()=>this.props.restartTest(this.state.restartTest));
    }

    showResultBySubjects = () => {
        this.setState((state) => {
            state.showResultBySubjects = true;
        },() => this.props.showResultBySubjects(this.state.showResultBySubjects));
    }
    continueTest = () => {
        this.props.continueTest();
    }


    render() {
        console.log(this.props.continueTestButton)
        return(<div>
            <Dialog open={this.props.open}>
                <DialogTitle id="form-dialog-title">This test is already passed. Restart test?</DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={this.restartTest}>
                        Restart Test
                    </Button>
                    <Button color="primary" onClick={this.showResultBySubjects}>
                        RESULT
                    </Button>

                    {
                        (this.props.continueTestButton) ?
                    <Button color="primary" onClick={this.continueTest}>
                        Continue Test
                    </Button>:
                            null
                    }
                </DialogActions>
            </Dialog>
        </div>)
    }

}