# Metasite frontend task

Hosted app [here](https://vytautascepulis.netlify.app/)

Tech used:
- React, typescript
- sass
- eslint, prettier
- vite

Features:
- Table state is held in url hash; sort, filter values are initialized from url on refresh
- Generic <Table comp to render any data and columns
- Columns hide/show functionality
- Fetch selected contact data
- Custom <Input, <Select, <Checkbox, <Button components
- Simple response caching via useFetch hook

Things to improve:
- Add testing
- Add responsiveness
- Move table state from hash to url params with React Router
- Add stylelint
- Debounced filtering instead of btn click
- <Input and <Select comps labels are done in a hacky way - with background
