import React, {Component} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { Route} from 'react-router-dom';

export default class DifficultyDialog extends Component{
    render() {
        return (
            <div>
                <Dialog open={true} className="startTestsDialog">
                    <DialogTitle id="form-dialog-title">The questions with this difficulty do not exist</DialogTitle>

                    <DialogActions>
                        <Route render={({history}) => (
                            <Button color="primary" onClick={() => {
                                history.push('/', {

                                })
                            }}>
                               OK
                            </Button>
                        )}/>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}