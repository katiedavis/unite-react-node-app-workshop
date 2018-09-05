import React from 'react';
import GameList from './components/GameList';
import Fetch from 'react-fetch-component';
// this fetch component is fetch just in a tidy little package.
//we don't need to use it, but honestly it's nice if you do have to fetch things
import ApolloClient, {gql} from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {Mutation} from 'react-apollo';
import {Button, AppProvider} from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import {getSerialized} from '@shopify/react-serialize';

export default class App extends React.Component {
  state = {workaround: false};

  componentDidMount() {
    // This happens in browser - therefore we are ready to use `window`
    this.setState({workaround: true});
  }

  render() {
    if (!this.state.workaround) {
      return <div />;
    }
    console.log(getSerialized('apiKey').data);
    return (
      <ApolloProvider client={client}>
        {/* <AppProvider
          apiKey={getSerialized('apiKey').data}
          shopOrigin={`https://${getSerialized('shopOrigin').data}`}
          forceRedirect
        >
          <div>hi</div>
        </AppProvider> */}
      </ApolloProvider>
    );
  }
}

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include',
  },
});

// const CREATE_PRODUCT = gql`
//   mutation CreateProduct($product: ProductInput!) {
//     productCreate(input: $product) {
//       product {
//         id
//         title
//       }
//     }
//   }
// `;

// export default function(props) {
//   return (
//     <ApolloProvider client={client}>
//       <React.Fragment>
//         <Page
//           breadcrumbs={[{content: 'Products'}]}
//           title="Product reviews"
//           primaryAction={{
//             content: 'Save',
//             disabled: true,
//           }}
//         >
//           <h1>Board game loader</h1>

//           <Fetch url="https://boardgameslist.herokuapp.com" as="json">
//             {(fetchResults) => {
//               if (fetchResults.loading) {
//                 return <p>Loading</p>;
//               }
//               if (fetchResults.error) {
//                 return <p>failed to fetch games</p>;
//               }

//               return (
//                 <Mutation mutation={CREATE_PRODUCT}>
//                   {(createProduct, mutationResults) => {
//                     const loading = mutationResults.loading && (
//                       <p>loading... </p>
//                     );

//                     const error = mutationResults.error && (
//                       <p>error creating product</p>
//                     );

//                     const success = mutationResults.data && (
//                       <p>
//                         successfully created &nbsp;
//                         {mutationResults.data.productCreate.product.title}
//                       </p>
//                     );

//                     return (
//                       <React.Fragment>
//                         <Button>hi</Button>
//                         <GameList
//                           games={fetchResults.data}
//                           onAddGame={(title) => {
//                             const productInput = {
//                               title: title,
//                               productType: 'board game',
//                             };
//                             console.log(title);
//                             createProduct({
//                               variables: {product: productInput},
//                             });
//                           }}
//                         />
//                         {loading}
//                         {error}
//                         {success}
//                       </React.Fragment>
//                     );
//                   }}
//                 </Mutation>
//               );
//             }}
//           </Fetch>
//         </Page>
//       </React.Fragment>
//     </ApolloProvider>
//   );
// }
