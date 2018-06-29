import React, {Component} from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import Paper from '@material-ui/core/Paper';
import '../index.css'

import DeleteExpense from './DeleteExpense'
import UpdateExpense from './UpdateExpense'


export default class extends Component {
    expenseQuery = gql`
        {
            expenses {
                id
                exp_name
                exp_amt
                exp_created
                exp_category
            }
        }
    `

    render() {
        return (
            <Query query={this.expenseQuery}>
                {({loading, error, data}) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :( too bad.</p>;

                    return data.expenses.map(({id, exp_name, exp_amt, exp_created, exp_category}) => (
                        <Paper key={id}>
                            <p>{`Exp_Name: ${exp_name}`}</p>
                            <p>{`Exp_Amt: ${exp_amt}`}</p>
                            <p>{`Exp_Created: ${exp_created}`}</p>
                            <p>{`Exp_Category: ${exp_category}`}</p>
                            <UpdateExpense id={id}
                                           exp_name={exp_name}
                                           exp_amt={exp_amt}
                                           exp_created={exp_created}
                                           exp_category={exp_category}
                            />
                            <DeleteExpense id={id}/>
                        </Paper>

                    ));
                }}
            </Query>
        )
    }
}


///////////////////////////////////////////// code above works
