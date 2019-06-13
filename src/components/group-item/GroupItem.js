import React from 'react';
import {CardContent} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import GroupParticipant from "../group-participant/GroupParticipant";

export default class GroupItem extends React.Component {

    group;

    constructor(props) {
        super(props);

        this.group = props.group;
    }

    render() {
        return (
            <div>
                <Card>
                    <CardContent>
                        <Typography variant="subtitle1" color="inherit">
                            {this.group.groupName}
                        </Typography>

                        {
                            this.group.results.map((user, index) => {
                                return (
                                    <GroupParticipant user={user} key={index}/>
                                )
                            })
                        }
                    </CardContent>
                </Card>
            </div>
        );
    }
}
