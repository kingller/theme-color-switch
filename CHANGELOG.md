标签：
<font color=green>新增</font>
<font color=orange>修改</font>
<font color=blue>增强</font>
<font color=red>修复</font>
<font color=red><strong>删除</strong></font>


# Next


# 1.3.1
1. <font color=red>修复</font> 颜色变量的值直接引用另一个颜色变量时未成功替换


# 1.3.0
1. <font color=blue>增强</font> `color`转换函数支持传入包含颜色函数的值


# 1.2.3
1. <font color=red>修复</font> IE10及以下报错


# 1.2.2
1. <font color=red>修复</font> 变量传入的`rgb`, `rgba`只能为十六进制颜色码，不支持RGB三原色值


# 1.2.1
1. <font color=red>修复</font> `rgb`, `rgba`不能直接传入十六进制颜色码


# 1.2.0
1. <font color=green>新增</font> `TypeScript`定义文件
2. <font color=green>新增</font> `color`转换函数

# 1.1.2
1. <font color=red>修复</font> 含有!important的样式变量无法替换

# 1.1.1
1. <font color=green>新增</font> Online Demo
2. <font color=orange>修改</font> Change package name

# 1.1.0
1. <font color=green>新增</font> 暴露`less`颜色函数，可以用`js`调用转换颜色值

# 1.0.1
1. <font color=red>修复</font> 使用多个生成的color less文件通过`.join('\n')`方式合并到一起后，调用render方法出错