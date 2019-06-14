import React from 'react';
import {CardContent} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import GroupParticipant from "../group-participant/GroupParticipant";
import './GroupItem.css';
import Button from "@material-ui/core/Button";

export default class GroupItem extends React.Component {

    group;

    constructor(props) {
        super(props);

        this.group = props.group;
    }

    componentDidMount() {
        console.log(this.group);
    }

    render() {
        return (
            <div>
                <Card>
                    <CardContent>
                        <Typography variant="subtitle1" color="inherit">
                           Group Name {this.group.groupName}
                        </Typography>

                        {
                            this.group.results.map((user, index) => {
                                return (
                                    <GroupParticipant user={user} key={index}/>
                                )
                            })
                        }

                        <Button color="primary" onClick={() => {
                            this.props.testsLinkDialogHandler('http://localhost:3000/questions/' + this.group.quizUrl)
                        }}
                        >
                            Share Link
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
}
