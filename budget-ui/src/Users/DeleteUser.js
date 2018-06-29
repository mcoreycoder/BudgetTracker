import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";


export default class extends Component {
    deleteUserMutation = gql`
        mutation deleteUser($id: ID!) {
            deleteUser (where: {id: $id}) {
                id
                name
            }
        }
    `
    render () {
        const id = this.props.id
        return (
            <Mutation mutation={this.deleteUserMutation}>
                {(deleteUser, {data}) => (
                    <form onSubmit={event => {
                        event.preventDefault()
                        deleteUser({
                            variables: {
                                id: id,
                            }
                        })
                        window.location.reload(true)
                    }}>
                        <input className="deletebutton" type="submit" value="Delete"/>
                    </form>
                )}
            </Mutation>
        )
    }
}