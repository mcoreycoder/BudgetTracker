import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";

import CreateUser from "./Users/CreateUser";
import UpdateUser from "./Users/UpdateUser";
import DeleteUser from "./Users/DeleteUser";
import UserView from "./Users/UserView";

// import CreateExpense from "./Expense/CreateExpense";
// import UpdateExpense from "./Expense/UpdateExpense";
// import DeleteExpense from "./Expense/DeleteExpense";
// import ExpenseView from "./Expense/ExpenseView";

const client = new ApolloClient({
    uri: "https://us1.prisma.sh/fishincorey/budget-back-end/dev"
});

const App = () => (
    <ApolloProvider client={client}>
        <div>
            <h1>User stuff</h1>

            {/*<Nav />*/}

            <CreateUser/>
            {/*<UpdateUser/>*/}
            {/*<DeleteUser/>*/}
            <UserView/>
            {/*<br/>*/}
            {/*<br/>*/}
            {/*<br/>*/}
            {/*<p>Expense stuff</p>*/}

            {/*<CreateExpense/>*/}
            {/*<UpdateExpense/>*/}
            {/*<DeleteExpense/>*/}
            {/*<ExpenseView/>*/}

        </div>
    </ApolloProvider>
);

ReactDOM.render(<App/>, document.getElementById('root'));
