---
mapped_pages:
  - https://www.elastic.co/guide/en/search-ui/current/api-react-with-search.html
applies_to:
  stack:
  serverless:
---

# WithSearch & withSearch [api-react-with-search]

If you wish to use Search UI and build your own custom component, you will need to use our HOCs to use Search UI’s core state and actions.

There are two HOCs for accessing Search UI’s state & actions, `withSearch` and `WithSearch`. They use the [HOC](https://reactjs.org/docs/higher-order-components.html) and [Render Props](https://reactjs.org/docs/render-props.html) patterns, respectively. The two methods are similar, and choosing between the two is mostly personal preference.

Both methods expose a `mapContextToProps` function which allows you to pick which state and actions from context you need to work with.

## mapContextToProps [api-react-with-search-mapcontexttoprops]

`mapContextToProps` allows you to pick which state and actions from Context you need to work with. `withSearch` and `WithSearch` both use [React.PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent), and will only re-render when the picked state has changed.

| name    | type   | description         |
| ------- | ------ | ------------------- |
| context | Object | The current Context |
| props   | Object | The current props   |

ex.:

```jsx
import { withSearch } from "@elastic/react-search-ui";

const Component = ({ searchTerm, setSearchTerm }) => {
  return (
    <form onSubmit={(e) => {

    }}
    <input type="text" value={searchTerm}>
  )
}

// Selects `searchTerm` and `setSearchTerm` for use in Component
withSearch(({ searchTerm, setSearchTerm }) => ({
  searchTerm,
  setSearchTerm
}))(Component);

// Uses current `props` to conditionally modify context
withSearch(({ searchTerm }, { someProp }) => ({
  searchTerm: someProp ? "" : searchTerm
}))(Component);
```

## withSearch [api-react-with-search-withsearch]

This is the [HOC](https://reactjs.org/docs/higher-order-components.html) approach to working with the core.

This is typically used for creating your own Components.

See [Build Your Own Component](/reference/guides-creating-own-components.md).

## WithSearch [api-react-with-search-withsearch-1]

This is the [Render Props](https://reactjs.org/docs/render-props.html) approach to working with the core.

One use case for that would be to render a "loading" indicator any time the application is fetching data.

For example:

```jsx
import { WithSearch } from "@elastic/react-search-ui";

<SearchProvider config={config}>
  <WithSearch mapContextToProps={({ isLoading }) => ({ isLoading })}>
    {({ isLoading }) => (
      <div className="App">
        {isLoading && <div>I'm loading now</div>}
        {!isLoading && (
          <Layout
            header={<SearchBox />}
            bodyContent={<Results titleField="title" urlField="nps_link" />}
          />
        )}
      </div>
    )}
  </WithSearch>
</SearchProvider>;
```
