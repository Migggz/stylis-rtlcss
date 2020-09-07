<div align="center">
  <img src="https://migggz.me/stylis-rtlcss.png" style="display: block">
</div>
<div align="center">
  <strong>Stylis RTL plugin based on <a href="https://rtlcss.com/" target="_blank">RTLCSS</a></strong>
  <strong>and much more, without tears <b style="font-size: 1.6em"></b>
  </strong>
  <div style="font-size: 2em">😎</div>
  <br/>
  <a href="https://www.npmjs.com/package/stylis-rtlcss" title="npm version"><img src="https://badgen.net/npm/license/stylis-rtlcss" alt="license"></a>
  <a href="https://bundlephobia.com/result?p=stylis-rtlcss@1.0.6" title="styled-components latest minified+gzip size"><img src="https://badgen.net/bundlephobia/minzip/stylis-rtlcss@1.0.6" alt="gzip size"></a>
</div>

## Install

###### Yarn

```cmd
yarn add stylis-rtlcss
```

###### NPM

```cmd
npm i stylis-rtlcss
```

## Usage with Styled-Components v5+

```jsx
import styled, { StyleSheetManager } from "styled-components";
import rtlcss from "stylis-rtlcss";

const StyledDiv = styled.div`
  margin-left: 10px;
`;

class App extends Component {
  render() {
    return (
      <StyleSheetManager stylisPlugins={[rtlcss]}>
        <StyledDiv>Margin will be on RIGHT!</StyledDiv>
      </StyleSheetManager>
    );
  }
}
```

#### :globe_with_meridians: For conditionally usage based on language

to avoid typing issues in `StyleSheetManager` while using **Typescript**, you should conditionally render props

```jsx
import styled, { StyleSheetManager } from "styled-components";
import rtlcss from "stylis-rtlcss";

const StyledDiv = styled.div`
  margin-left: 10px;
`;

class App extends Component {
  render() {
    const { language } = this.props;
    return (
      <StyleSheetManager {...(language === 'ar' ? { stylisPlugins: [rtlcss] } : {})}
        <StyledDiv>Margin will be on RIGHT!</StyledDiv>
      </StyleSheetManager>
    )
  }
}
```

## Options 🔥

### Supports Directives

- you need to **disable** minification in babel plugin [Reference](https://styled-components.com/docs/tooling#minification), that is because of minification removes all comments from your CSS before it passes to **`<StyleSheetManager>`**. So,
  in `.babelrc` file, set `minify` to `false`

```json
{
  "plugins": [
    [
      "babel-plugin-styled-components",
      {
        "minify": false
      }
    ]
  ]
}
```

Then you can use control Directives as you want

#### - Control Directives

Control directives are placed between declarations or statements (rules and at-rules). They can target a single node (self-closing) or a set of nodes (block-syntax).

```jsx
import styled, { StyleSheetManager } from "styled-components";
import rtlcss from "stylis-rtlcss";

const StyledDiv = styled.div`
  /*rtl:ignore*/
  margin-left: 10px;
`;

class App extends Component {
  render() {
    return (
      <StyleSheetManager stylisPlugins={[rtlcss]}>
        <StyledDiv>Margin stills on LEFT!</StyledDiv>
      </StyleSheetManager>
    );
  }
}
```

| Directive Syntax | Description                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------- |
| `/*rtl:ignore*/` | Ignores processing of the following node (self-closing) or nodes within scope (block-syntax). |
| `/*rtl:remove*/` | Removes the following node (self-closing) or nodes within scope (block-syntax).               |

[All Control Directives Docs](https://rtlcss.com/learn/usage-guide/control-directives/)

#### - Value Directives

Value directives are placed any where inside the declaration value. They target the containing declaration node.

```jsx
import styled, { StyleSheetManager } from "styled-components";
import rtlcss from "stylis-rtlcss";

const StyledDiv = styled.div`
  margin-left: 10px /*rtl:ignore*/;
`;

class App extends Component {
  render() {
    return (
      <StyleSheetManager stylisPlugins={[rtlcss]}>
        <StyledDiv>Margin stills on LEFT!</StyledDiv>
      </StyleSheetManager>
    );
  }
}
```

| Directive Syntax          | Description                                  | Example                                              |
| ------------------------- | -------------------------------------------- | ---------------------------------------------------- |
| `/*rtl:prepend:{value}*/` | Ignores processing of this declaration.      | `transform:rotate(45deg) /*rtl:append:scaleX(-1)*/;` |
| `/*rtl:{value}*/`         | Replaces the declaration value with {value}. | `font-size:16px/*rtl:14px*/;`                        |

[All Value Directive Docs](https://rtlcss.com/learn/usage-guide/value-directives/)

<br />
<br />
<br />

## License

Licensed under the MIT License
