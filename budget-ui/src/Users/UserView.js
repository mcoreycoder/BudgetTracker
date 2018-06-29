import React, {Component} from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import Paper from '@material-ui/core/Paper';
import '../index.css'

import DeleteUser from './DeleteUser'
import UpdateUser from './UpdateUser'

export default class extends Component {
    userQuery = gql`
        {
            users {
                id
                name
                email
                password
            }
        }
    `

    render() {
        return (
            <Query query={this.userQuery}>
                {({loading, error, data}) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;

                    return data.users.map(({id, name, email, password}) => (
                        <Paper key={id}>
                            <p>{`Name: ${name}`}</p>
                            <p>{`EMAIL: ${email}`}</p>
                            <p>{`PASSWORD: ${password}`}</p>
                            <UpdateUser id={id}
                                        name={name}
                                        email={email}
                                        password={password}
                            />
                            <DeleteUser id={id}/>
                        </Paper>

                    ));
                }}
            </Query>
        )
    }
}


///////////////////////////////////////////// code above works
