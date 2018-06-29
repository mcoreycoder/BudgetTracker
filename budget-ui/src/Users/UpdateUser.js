import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import '../index.css'



export default class extends Component {
    state = {
        id: this.props.id,
        name: this.props.name,
        email: this.props.email,
        password: this.props.password,
        isUpdating: false,
        buttonText: "Update",
        buttonColor: "updatebutton"
    }
    updateUserMutation = gql`
        mutation updateUser($id: ID!, $name: String!, $email: String!, $password: String!) {
            updateUser (
                where: {id: $id},
                data: {name: $name, email: $email, password: $password}
            ) {
                id
                name
                email
                password
            }
        }
    `
    updateComp = () => {
        return (
            <Fragment>
                <input type="text" value={this.state.name} onChange={event => this.setState({name : event.target.value})}/>
                <input type="text" value={this.state.email} onChange={event => this.setState({email : event.target.value})}/>
                <input type="text" value={this.state.password} onChange={event => this.setState({password : event.target.value})}/>
            </Fragment>
        )
    }

    render() {
        const update = this.updateComp()
        return (
            <Mutation mutation={this.updateUserMutation}>
                {(updateUser, {data}) => (
                    <form onSubmit={event => {
                        event.preventDefault()
                        if(this.state.isUpdating) {
                            updateUser({
                                variables: {
                                    id: this.state.id,
                                    name: this.state.name,
                                    email: this.state.email,
                                    password: this.state.password,
                                }
                            })
                            this.setState({buttonText: "Update" , buttonColor: "updatebutton"})
                            window.location.reload(true)
                        } else {
                            this.setState({buttonText: "Submit" , buttonColor: "submitbutton"})
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


