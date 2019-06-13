import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default class TestsLinkDialog extends React.Component {

    constructor(props) {
        super(props);
        this.linkInput = React.createRef();
    }

    copyToClipBoard = () => {
        this.linkInput.current.children[1].children[0].select();
        document.execCommand("copy");
        this.props.testsLinkDialogHandler();
    };

    render() {
        return (
            <div>
                <Dialog open={this.props.open}>
                    <DialogTitle id="form-dialog-title">Link to your tests set</DialogTitle>
                    <DialogContent>
                        <TextField
                            ref={this.linkInput}
                            autoFocus
                            margin="dense"
                            id="link"
                            label="Tests link"
                            type="text"
                            value={this.props.link}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.props.testsLinkDialogHandler}>
                            Close
                        </Button>
                        <Button color="primary" onClick={this.copyToClipBoard}>
                            Copy
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
