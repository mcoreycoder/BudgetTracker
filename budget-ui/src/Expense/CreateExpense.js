import React, {Component} from 'react';
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import Button from '@material-ui/core/Button';
import '../index.css'


export default class extends Component {
    state = {
        exp_name: "",
        exp_amt: 0,
        exp_created: "",
        exp_category: ""
    }
    createExpenseMutation = gql`
        mutation createExpense($exp_name: String, $exp_amt: String, $exp_created: String, $exp_category: String) {
            createExpense(data: {exp_name: $exp_name, exp_amt: $exp_amt, exp_created: $exp_created, exp_category: $exp_category, }) {
                id
                exp_name
                exp_amt
                exp_created
                exp_category
            }
        }
    `;

    render() {
        return (
            <Mutation mutation={this.createExpenseMutation}>
                {(createExpense, {data}) => (
                    <div>
                        <form onSubmit={event => {
                            event.preventDefault();
                            createExpense({
                                variables: {
                                    exp_name: this.state.exp_name,
                                    exp_amt: this.state.exp_amt,
                                    exp_created: this.state.exp_created,
                                    exp_category: this.state.exp_category
                                }
                            });
                            window.location.reload(true)
                        }}>
                            <input type="text" placeholder="exp_name" required
                                   onChange={event => this.setState({exp_name: event.target.value})}/>
                            <input type="text" placeholder="exp_amt" required
                                   onChange={event => this.setState({exp_amt: event.target.value})}/>
                            <input type="text" placeholder="exp_created" required
                                   onChange={event => this.setState({exp_created: event.target.value})}/>
                            <input type="text" placeholder="exp_category" required
                                   onChange={event => this.setState({exp_category: event.target.value})}/>
                            <Button className="submitbutton" variant="raised" color="secondary" type="submit">
                                Submit
                            </Button>
                        </form>
                    </div>
                )}
            </Mutation>
        )
    }
}