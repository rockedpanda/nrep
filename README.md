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