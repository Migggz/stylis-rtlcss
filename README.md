# stylis-rtlcss

Stylis RTL plugin based on [RTLCSS](https://rtlcss.com/)

## Install

###### Yarn

```cmd
yarn add stylis-rtlcss
```

###### NPM

```cmd
npm i stylis-rtlcss
```

---

## Usage with Styled-Components v5+

```javascript
import styled, { StyleSheetManager } from "styled-components";
import rtlPlugin from "stylis-plugin-rtl";

const StyledDiv = styled.div`
  margin-left: 10px;
`;

class App extends Component {
  return (
    <StyleSheetManager stylisPlugins={[rtlPlugin]}>
      <StyledDiv>Margin will be on RIGHT!</StyledDiv>
    </StyleSheetManager>
  )
}
```

---

<!--
## Options
#### - Supports Control Directives -->
