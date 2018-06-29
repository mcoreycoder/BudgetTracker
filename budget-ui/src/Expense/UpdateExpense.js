import React, {Component, Fragment} from 'react'
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import '../index.css'


export default class extends Component {
    state = {
        id: this.props.id,
        exp_name: this.props.exp_name,
        exp_amt: this.props.exp_amt,
        exp_created: this.props.exp_created,
        exp_category: this.props.exp_category,
        isUpdating: false,
        buttonText: "Update",
        buttonColor: "updatebutton"
    }
    updateExpenseMutation = gql`
        mutation updateExpense($id: ID!, $exp_name: String, $exp_amt: String!, $exp_created: String, $exp_category: String) {
            updateExpense (
                where: {id: $id},
                data: {exp_name: $exp_name, exp_amt: $exp_amt, exp_created: $exp_created, exp_category: $exp_category, }
            ) {
                id
                exp_name
                exp_amt
                exp_created
                exp_category
            }
        }
    `
    updateComp = () => {
        return (
            <Fragment>
                <input type="text" value={this.state.exp_name}
                       onChange={event => this.setState({exp_name: event.target.value})}/>
                <input type="text" value={this.state.exp_amt}
                       onChange={event => this.setState({exp_amt: event.target.value})}/>
                <input type="text" value={this.state.exp_created}
                       onChange={event => this.setState({exp_created: event.target.value})}/>
                <input type="text" value={this.state.exp_category}
                       onChange={event => this.setState({exp_category: event.target.value})}/>
            </Fragment>
        )
    }

    render() {
        const update = this.updateComp()
        return (
            <Mutation mutation={this.updateExpenseMutation}>
                {(updateExpense, {data}) => (
                    <form onSubmit={event => {
                        event.preventDefault()
                        if (this.state.isUpdating) {
                            updateExpense({
                                variables: {
                                    id: this.state.id,
                                    exp_name: this.state.exp_name,
                                    exp_amt: this.state.exp_amt,
                                    exp_created: this.state.exp_created,
                                    exp_category: this.state.exp_category,
                                }
                            })
                            this.setState({buttonText: "Update", buttonColor: "updatebutton"})
                            window.location.reload(true)
                        } else {
                            this.setState({buttonText: "Submit", buttonColor: "submitbutton"})
                        }
                        this.setState({isUpdating: !this.state.isUpdating})
                    }}>
                        {this.state.isUpdating ? update : null}
                        <input className={this.state.buttonColor} type="submit" value={this.state.buttonText}/>

                    </form>
                )}
            </Mutation>
        )
    }
}


