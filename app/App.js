import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {AppProvider} from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import {getSerialized} from '@shopify/react-serialize';
import {MainPage} from './MainPage';
import createApp, {getShopOrigin} from '@shopify/app-bridge';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include',
  },
});

const app = createApp({
  apiKey: getSerialized('apiKey').data,
  shopOrigin: getShopOrigin(),
  forceRedirect: true,
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
          shopOrigin={`https://${getShopOrigin()}`}
        >
          <MainPage />
        </AppProvider>
      </ApolloProvider>
    );
  }
}
