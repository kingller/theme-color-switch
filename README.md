# theme-color-toggle

This a script to toggle color specific styles less file and which you can use to change theme dynamically in browser

## Example:

```
const less = require('theme-color-toggle');
less.render(
   colorSource,
   {
       modifyVars: vars,
   },
   function(e, output) {
      if (e) {
          console.error(`Failed to update theme`);
      }
      if (output && output.css) {
          addCSS(output.css);
      }
   }
);
```
## Note: You need to generate color.less file with [theme-color-generator](https://github.com/kingller/theme-color-generator) ( like `color.js` in example ) first, then toggle color with this package like `Theme.js` in example 


Now you can update colors by updating less avriables like the example
