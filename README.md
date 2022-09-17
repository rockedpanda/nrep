# nrep
text grep tool write by Node.js, 使用Node.js编写的类似grep的文本过滤工具


## 使用说明

* cat catlina.out |node nrep.js -p "x.length"
* cat catlina.out |node nrep.js -p -c count.js
* cat catlina.out |node nrep.js -p -c count.js -e "log(a,b,a/b)"


## 外挂脚本
-c sourceFile.js
sourceFile.js中可以实现1-3个函数(匿名函数或者箭头函数均可)
第一个表示行处理方法, 签名为: (x, lineIndex)=>{}
第二个表示启动时预处理方法, 签名为: ()=>{}
第三个表示结束时后处理方法, 签名为: ()=>{}
如果是只有一个函数, 可以省略[]
如果是多个函数, 文件内容格式应该是[func1, func2, func3]格式

## 外挂函数格式

```javascript
/** sourceFile内容格式
 * function(x, rowIndex){
 *    //一般使用x代替行内容
 *    //可以使用的全局变量包括: a=0,b=0,c=0,d=0,e=0,f=0,g={}
 *    //临时内容可以存放到g对象的自定义属性下
 *    //函数不一定有返回值
 *    //可以在函数中使用log或者console.log输出日志
 * }
 */
```