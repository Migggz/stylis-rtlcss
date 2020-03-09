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
const options = {
  autoRename: false,
  autoRenameStrict: false,
  blacklist: {},
  clean: true,
  greedy: false,
  processUrls: false,
  stringMap: [
    {
      name: "left-right",
      priority: 100,
      search: ["left", "Left", "LEFT"],
      replace: ["right", "Right", "RIGHT"],
      options: {
        scope: "*",
        ignoreCase: false
      }
    },
    {
      name: "ltr-rtl",
      priority: 100,
      search: ["ltr", "Ltr", "LTR"],
      replace: ["rtl", "Rtl", "RTL"],
      options: {
        scope: "*",
        ignoreCase: false
      }
    }
  ],
  useCalc: false
};
const plugins = [
  {
    name: "ignore plugin",
    priority: 100,
    directives: {
      control: {
        ignore: {
          // the expected node types
          expect: { atrule: true, comment: true, decl: true, rule: true },
          // local variable to store ending node
          endNode: null,
          // prevent processing all nodes except comments indicating the end of this directive
          begin: function(node, metadata, context) {
            // find the ending node in case of self closing directive
            if (!this.endNode && metadata.begin && metadata.end) {
              var n = node;
              while (n && n.nodes) {
                n = n.nodes[n.nodes.length - 1];
              }
              this.endNode = n;
            }
            var prevent = true;
            if (
              node.type === "comment" &&
              (node.text === "!rtl:end:ignore" ||
                node.text === "rtl:end:ignore")
            ) {
              prevent = false;
            }
            return prevent;
          },
          // deactivate the directive if:
          //  1. block directive and the node is comment
          //  2. self closing directive and node is endNode
          end: function(node, metadata, context) {
            if (
              (metadata.begin !== metadata.end && node.type === "comment") ||
              (metadata.begin && metadata.end && node === this.endNode)
            ) {
              // clear ending node
              this.endNode = null;
              // deactivate
              return true;
            }
            // keep ignoring
            return false;
          }
        }
      },
      value: []
    }
  }
];

function stylisRTLCSS(context: StylisContextType, content: string): ?string {
  if (context === STYLIS_PROPERTY_CONTEXT) {
    return rtlcss.process(content, [, options, plugins]);
  }
}

// stable identifier that will not be dropped by minification unless the whole module
// is unused
/*#__PURE__*/
Object.defineProperty(stylisRTLCSS, "name", { value: "stylisRTLCSS" });

export default stylisRTLCSS;
