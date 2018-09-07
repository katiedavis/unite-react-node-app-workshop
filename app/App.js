import React from 'react';
import ApolloClient, {gql} from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {AppProvider} from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import {getSerialized} from '@shopify/react-serialize';
//https://github.com/Shopify/quilt/tree/master/packages/react-serialize
import {MainPage} from './MainPage';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include',
  },
});

export default class App extends React.Component {
  state = {workaround: false};

  componentDidMount() {
    this.setState({workaround: true});
  }

  render() {
    if (!this.state.workaround) {
      return <div />;
    }
    return (
      <ApolloProvider client={client}>
        <AppProvider
          apiKey={getSerialized('apiKey').data}
          shopOrigin={`https://${getSerialized('shopOrigin').data}`}
          forceRedirect
        >
          <MainPage />
        </AppProvider>
      </ApolloProvider>
    );
  }
}
