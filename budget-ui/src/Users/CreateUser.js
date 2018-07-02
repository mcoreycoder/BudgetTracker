import React, {Component} from 'react';
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import Button from '@material-ui/core/Button';
import '../index.css'
import Paper from '@material-ui/core/Paper';


export default class extends Component {
    state = {
        name: "",
        email: "",
        password: ""
    }
    createUserMutation = gql`
        mutation createUser($name: String!, $email: String! $password: String!) {
            createUser(data: {name: $name, email: $email, password: $password }) {
                id
                name
                email
                password
            }
        }
    `;

    render() {
        return (
            <Mutation mutation={this.createUserMutation}>
                {(createUser, {data}) => (
                    <div>
                        <Paper elevation={20}>
                            <p>Create User</p>
                            <form onSubmit={event => {
                                event.preventDefault();
                                createUser({
                                    variables: {
                                        name: this.state.name,
                                        email: this.state.email,
                                        password: this.state.password
                                    }
                                });
                                window.location.reload(true)
                            }}>
                                <input type="text" placeholder="Name" required
                                       onChange={event => this.setState({name: event.target.value})}/>
                                <input type="text" placeholder="Email" required
                                       onChange={event => this.setState({email: event.target.value})}/>
                                <input type="text" placeholder="Password" required
                                       onChange={event => this.setState({password: event.target.value})}/>
                                <Button className="submitbutton" variant="raised" color="primary" type="submit">
                                    Submit
                                </Button>
                            </form>
                        </Paper>

                    </div>
                )}
            </Mutation>
        )
    }
}