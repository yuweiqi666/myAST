# myAST
## 手写AST抽象语法树

* 思路

  > 1. 指针思想 index = 0   while循环模板字符串 index指向模板字符串的最后一个字符时停止循环
  > 2. 每次循环都要重新赋值rest剩余部分（通过substring）
  > 3. 然后正则匹配rest头部各种可能情况
  >    1. 头部为开始标签如<div> 就将标签名字压入stack1栈中，同时将对象{tag: 标签名字, children: []}压入stack2栈中
  >    2. 头部为标签中的文本时将文本push到stack2的最后一个对象元素的children数组属性中
  >    3. 头部为结束标签如</div> stack1弹栈  stack2也弹栈 同时stack2弹栈的那一项push进入它前一项的children数组属性
