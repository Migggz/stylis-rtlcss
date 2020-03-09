// @flow
import rtlcss from "rtlcss";

// https://github.com/thysultan/stylis.js#plugins
const STYLIS_CONTEXTS = {
  POST_PROCESS: -2,
  PREPARATION: -1,
  NEWLINE: 0,
  PROPERTY: 1,
  SELECTOR_BLOCK: 2,
  AT_RULE: 3
};

export type StylisContextType = $Values<typeof STYLIS_CONTEXTS>;

export const STYLIS_PROPERTY_CONTEXT = STYLIS_CONTEXTS.PREPARATION;

function stylisRTLCSS(context: StylisContextType, content: string): ?string {
  if (context === STYLIS_PROPERTY_CONTEXT) {
    return rtlcss.process(content);
  }
}

// stable identifier that will not be dropped by minification unless the whole module
// is unused
/*#__PURE__*/
Object.defineProperty(stylisRTLCSS, "name", { value: "stylisRTLCSS" });

export default stylisRTLCSS;
