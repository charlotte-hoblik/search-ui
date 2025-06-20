---
mapped_pages:
  - https://www.elastic.co/guide/en/search-ui/current/guides-creating-your-own-components.html
applies_to:
  stack:
  serverless:
---

# Creating Components [guides-creating-your-own-components]

We provide a variety of Components out of the box. However, there might be cases where we do not have the Component you need.

In these cases, we recommend you use the low-level Search UI API to create these components yourself.

## Example: Creating a component for clearing all filters [guides-creating-your-own-components-example-creating-a-component-for-clearing-all-filters]

For a live example of this, [check out this project on CodeSandbox](https://codesandbox.io/s/search-ui-customize-html-and-styles-demo-30v93e).

To create your own component:

1. Create a component.
2. Import the `withSearch` higher order component in order to access Search UI’s actions and state.
3. Choose the actions and state you’ll need for this component in the first parameter to `withSearch`. In the example below, they are using the `filters` state and the `clearFilters` action. The full list of state and actions is avialable in the API documentation.
4. Pass your component as the second parameter with `withSearch`, which will in turn pass the selected actions and state as props to your component.
5. Use the state and actions from props in your component.

```jsx
import { withSearch } from "@elastic/react-search-ui";

function ClearFilters({ filters, clearFilters }) {
  return (
    <div>
      <button onClick={() => clearFilters()}>
        Clear {filters.length} Filters
      </button>
    </div>
  );
}

export default withSearch(({ filters, clearFilters }) => ({
  filters,
  clearFilters
}))(ClearFilters);
```
