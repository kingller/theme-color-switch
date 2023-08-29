/* eslint-disable no-console */
import React, { Component } from "react";
import colorSource from '!!raw-loader!./dest/color.less';

function addCSS(cssText) {
    function setCssText(styleEl) {
        if (styleEl.styleSheet) {
            //IE
            let func = function() {
                try {
                    //防止IE中stylesheet数量超过限制而发生错误
                    styleEl.styleSheet.cssText = cssText;
                } catch (e) {}
            };
            //如果当前styleSheet还不能用，则放到异步中则行
            if (styleEl.styleSheet.disabled) {
                setTimeout(func, 10);
            } else {
                func();
            }
        } else {
            //w3c
            //w3c浏览器中只要插入到style元素中就行了
            styleEl.innerHTML = cssText;
        }
    }
    const id = 'less:theme:color';
    let styleEl = document.getElementById(id);
    if (document.getElementById(id)) {
        setCssText(styleEl);
    } else {
        styleEl = document.createElement('style'); //创建一个style元素
        let head = document.head || document.getElementsByTagName('head')[0]; //获取head元素
        styleEl.type = 'text/css'; //这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
        styleEl.setAttribute('id', id);
        setCssText(styleEl);
        head.appendChild(styleEl); //把创建的style元素插入到head中
    }
}

class Theme extends Component {
    constructor(props) {
        super(props);
        this.changeColor(props.vars);
        this.state = {
            prevPropsVars: Object.assign({}, props.vars)
        }
    }

    componentDidUpdate() {
        let { vars } = this.props;
        if (
            JSON.stringify(vars) !== JSON.stringify(this.state.prevPropsVars)
        ) {
            this.changeColor(vars);
            this.setState({
                prevPropsVars: Object.assign({}, vars)
            });
        }
    }

    changeColor = (vars) => {
        const less = require('theme-color-switch');
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
    };

    render() {
        const { children } = this.props;
        return children || null;
    }
}

export default Theme;
