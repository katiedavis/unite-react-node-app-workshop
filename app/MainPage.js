import React from 'react';
import {Mutation} from 'react-apollo';
import {gql} from 'apollo-boost';
import {Page, Layout, Heading} from '@shopify/polaris';

import GameList from './components/GameList';
import Fetch from 'react-fetch-component';
// this fetch component is fetch just in a tidy little package.
//we don't need to use it, but honestly it's nice if you do have to fetch things

const CREATE_PRODUCT = gql`
  mutation CreateProduct($product: ProductInput!) {
    productCreate(input: $product) {
      product {
        id
        title
      }
    }
  }
`;

export const MainPage = () => {
  return (
    <React.Fragment>
      <Page
        breadcrumbs={[{content: 'THISMEANSITWORKS'}]}
        title="It works"
        primaryAction={{
          content: 'Save',
          disabled: true,
        }}
      >
        <Heading>Board game loader</Heading>

        <Fetch url="https://boardgameslist.herokuapp.com" as="json">
          {(fetchResults) => {
            console.log(fetchResults.data);
            if (fetchResults.loading) {
              return <p>Loading</p>;
            }
            if (fetchResults.error) {
              return <p>failed to fetch games</p>;
            }

            return (
              <Mutation mutation={CREATE_PRODUCT}>
                {(createProduct, mutationResults) => {
                  const loading = mutationResults.loading && <p>loading... </p>;

                  const error = mutationResults.error && (
                    <p>error creating product</p>
                  );

                  const success = mutationResults.data && (
                    <p>
                      successfully created &nbsp;
                      {mutationResults.data.productCreate.product.title}
                    </p>
                  );

                  return (
                    <Layout>
                      <Layout.Section>
                        <GameList
                          games={fetchResults.data}
                          onAddGame={(title) => {
                            const productInput = {
                              title: title,
                              productType: 'board game',
                            };
                            console.log(title);
                            createProduct({
                              variables: {product: productInput},
                            });
                          }}
                        />
                        {loading}
                        {error}
                        {success}
                      </Layout.Section>
                    </Layout>
                  );
                }}
              </Mutation>
            );
          }}
        </Fetch>
      </Page>
    </React.Fragment>
  );
};
