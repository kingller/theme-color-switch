# theme-color-switch

This a script to switch color specific styles less file and which you can use to change theme dynamically in browser.  

Also you can use these less syntax functions for color conversion.


## Install
```
$ npm install theme-color-switch
```

## Demo
Try out the [demo](https://kingller.github.io/theme-color-switch/)

## Example:

```
const less = require('theme-color-switch');
const colorSource = require('!raw-loader!./public/color.less'); // theme file content which generate by theme-color-generator
less.render(
   colorSource,
   {
       modifyVars: {
           '@theme-color': '#0035ff' // the variables in theme file which you want to change
       },
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
## Note: You need to generate `color.less` file with [theme-color-generator](https://github.com/kingller/theme-color-generator) ( as `color.js` in example ) first, then toggle color with this package as `Theme.js` in example 


Now you can change colors by modify less avriables as the example


如只想使用主题切换的，上面的内容就已完成。


## 颜色函数：想要用js执行less颜色函数实时转化颜色的，请往下看（详细说明请访问[less官网](http://lesscss.cn/functions/#color-definition)）。

1. 返回`Color`对象的可以使用`toCSS()`属性来获取输出值。也可以作为下一个函数的颜色参数。
2. 返回`Dimension`对象的可以作为`number`类型传给下一个函数。

### 使用示例
```javascript
import { shade, tint, fade } from 'theme-color-switch';

let shadeColor = shade('#007fff', '50%').toCSS();
let fadeAndTintColor = fade(tint('#007fff', '30%'), '10%').toCSS();
```

#### 如何支持 `rgb`、`rgba` 的颜色值转换

使用 `color`（或 `rgb`、`rgba`）函数先将其转换成 `Color` 对象，再将其传给颜色函数

```javascript
import { color, tint } from 'theme-color-switch';

let tintColor1 = tint(color('rgb(90, 129, 32)'), '30%').toCSS();
let tintColor2 = tint(color('rgba(90, 129, 32, 0.5)'), '30%').toCSS();
```

### 颜色定义函数

#### rgb
Returns: `Color`  
Example: `rgb(90, 129, 32)`  
Output: `#5a8120`  

#### rgba
Returns: `Color`  
Example: `rgba(90, 129, 32, 0.5)`  
Output: `rgba(90, 129, 32, 0.5)`  

#### argb
Returns: `Color`  
Example: `argb(rgba(90, 23, 148, 0.5))`  
Output: `#805a1794`  

#### hsl
Returns: `Color`  
Example: `hsl(90, 100%, 50%)`  
Output: `#80ff00`  

#### hsla
Returns: `Color`  
Example: `hsla(90, 100%, 50%, 0.5)`  
Output: `rgba(128, 255, 0, 0.5)`  

#### hsv
Returns: `Color`  
Example: `hsv(90, 100%, 50%)`  
Output: `#408000`  

#### hsva
Returns: `Color`  
Example: `hsva(90, 100%, 50%, 0.5)`  
Output: `rgba(64, 128, 0, 0.5)`  


### 颜色通道函数

#### hue
Returns: `Dimension`  
Example: `hue(hsl(90, 100%, 50%))`  
Output: `90`  

#### saturation
Returns: `Dimension`  
Example: `saturation(hsl(90, 100%, 50%))`  
Output: `100%`  

#### lightness
Returns: `Dimension`  
Example: `lightness(hsl(90, 100%, 50%))`  
Output: `50%`  

#### hsvhue
Returns: `Dimension`  
Example: `hsvhue(hsv(90, 100%, 50%))`  
Output: `90`  

#### hsvsaturation
Returns: `Dimension`  
Example: `hsvsaturation(hsv(90, 100%, 50%))`  
Output: `100%`  

#### hsvvalue
Returns: `Dimension`  
Example: `hsvhue(hsv(90, 100%, 50%))`  
Output: `90`  

#### red
Returns: `Dimension`  
Example: `red(rgb(10, 20, 30))`  
Output: `10`  

#### green
Returns: `Dimension`  
Example: `green(rgb(10, 20, 30))`  
Output: `20`  

#### blue
Returns: `Dimension`  
Example: `blue(rgb(10, 20, 30))`  
Output: `30`  

#### alpha
Returns: `Dimension`  
Example: `alpha(rgba(10, 20, 30, 0.5))`  
Output: `0.5`  

#### luma
Returns: `Dimension`  
Example: `luma(rgb(100, 200, 30))`  
Output: `44%`  

#### luminance
Returns: `Dimension`  
Example: `luminance(rgb(100, 200, 30))`  
Output: `65%`  


### 颜色操作函数

#### saturate
Returns: `Color`  
Example: `saturate(#80e619, 20%)`  
Output: `#80ff00`  

#### desaturate
Returns: `Color`  
Example: `desaturate(#80e619, 20%)`  
Output: `#80cd32`  

#### lighten
Returns: `Color`  
Example: `lighten(#80e619, 20%)`  
Output: `#b3f075`  

#### darken
Returns: `Color`  
Example: `darken(#80e619, 20%)`  
Output: `#4d8a0f`  

#### fadein
Returns: `Color`  
Example: `fadein(rgba(128, 242, 13, 0.5), 10%)`  
Output: `rgba(128, 242, 13, 0.6)`  

#### fadeout
Returns: `Color`  
Example: `fadeout(rgba(128, 242, 13, 0.5), 10%)`  
Output: `rgba(128, 242, 13, 0.4)`  

#### fade
Returns: `Color`  
Example: `fade(#80f20d, 10%)`  
Output: `rgba(128, 242, 13, 0.1)`  

#### spin
Returns: `Color`  
Example: `spin(#f2330d, 30)`  
Output: `#f2a60d`  

#### mix
Returns: `Color`  
Example: `mix(#ff0000, #0000ff, 50%)`  
Output: `#800080`  

#### tint
Returns: `Color`  
Example: `tint(#007fff, 50%)`  
Output: `#80bfff`  

#### shade
Returns: `Color`  
Example: `shade(#007fff, 50%)`  
Output: `#004080`  

#### greyscale
Returns: `Color`  
Example: `greyscale(#80f20d)`  
Output: `#808080`  

#### contrast
Returns: `Color`  
Example:  
```less
p {
    a: contrast(#bbbbbb);
    b: contrast(#222222, #101010);
    c: contrast(#222222, #101010, #dddddd);
    d: contrast(hsl(90, 100%, 50%), #000000, #ffffff, 30%);
    e: contrast(hsl(90, 100%, 50%), #000000, #ffffff, 80%);
}
```
Output:  
```less
p {
    a: #000000 // black
    b: #ffffff // white
    c: #dddddd
    d: #000000 // black
    e: #ffffff // white
}
```

### 颜色转换函数

#### color
Returns: `Color`  
Example | Output  
:--|:--  
color('#5a8120') | #5a8120  
color('rgb(90, 129, 32)') | #5a8120  
color('rgba(90, 129, 32, 0.5)') | rgba(90, 129, 32, 0.5)  
  