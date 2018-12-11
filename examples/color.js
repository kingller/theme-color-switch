const path = require('path');
const { generateTheme } = require('theme-color-generator');

const options = {
    stylesDir: path.join(__dirname, './src/styles'),
    varFile: path.join(__dirname, './src/styles/vars.less'),
    outputFilePath: path.join(__dirname, './src/dest/color.less'),
}

generateTheme(options).then(less => {
    console.log('Theme generated successfully');
}).catch(error => {
    console.log('Error', error);
});