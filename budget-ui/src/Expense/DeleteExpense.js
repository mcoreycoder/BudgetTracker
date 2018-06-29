import React, {Component} from 'react';
import {Mutation} from "react-apollo";
import gql from "graphql-tag";


export default class extends Component {
    deleteExpenseMutation = gql`
        mutation deleteExpense($id: ID!) {
            deleteExpense (where: {id: $id}) {
                id
                exp_name
            }
        }
    `

    render() {
        const id = this.props.id
        return (
            <Mutation mutation={this.deleteExpenseMutation}>
                {(deleteExpense, {data}) => (
                    <form onSubmit={event => {
                        event.preventDefault()
                        deleteExpense({
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