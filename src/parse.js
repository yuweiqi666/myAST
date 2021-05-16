// parse函数  主函数
export default function parse(templateString) {
  // 指针
  var index = 0
  // 剩余部分
  var rest = ""
  // 标签存储的栈
  var stack1 = []
  // 文本春初的栈
  var stack2 = []

  // 正则表达式 开始标记
  var startReg = /^\<([a-z0-9]+)\>/
  // 正则表达式 结束标签
  var endReg = /^\<\/([a-z0-9]+)\>/
  // 正则表达式 获取结束标签之前的文字
  var wordReg = /^([^\<]+)\<\/[a-z0-9]+\>/
  while(index < templateString.length - 1) {
    rest = templateString.substring(index)
    // 识别指针遍历的是不是开始标签
    if(startReg.test(rest)) {
      // 捕获开始标签
      let tag = rest.match(startReg)[1]
      
      // console.log("检测到的开始标签", tag); 

      // tag推入栈1中
      stack1.push(tag)

      // console.log(stack1);


      // 空数组推入栈2中
      stack2.push({"tag": tag, "children": []})



      // 指针移动开始标签长度加2
      index += tag.length + 2
    } else if(endReg.test(rest)){
      // 指针识别是不是结束标签
      let tag = rest.match(endReg)[1]

      // console.log("检测到的结束标签", tag);

      if(tag === stack1[stack1.length - 1]) {
        // stack1弹栈
        stack1.pop()
        if(stack2.length > 1) {
          // 判断stack2中是不是只有一项了
          let stack2_pop = stack2.pop()
          // console.log("stack22222", stack2_pop);
          stack2[stack2.length - 1].children.push(stack2_pop)
          // console.log(stack1);
        } else {

        }
      } else {
        throw new Error(stack1[stack1.length - 1] + "标签没有封闭！")
      }


      // 指针移动结束标签长度加3
      index += tag.length + 3

    } else if(wordReg.test(rest)) {
      // 指针识别标签中的文字
      // console.log("rest", rest);
      let world = rest.match(wordReg)[1]
      // 看world是不是全是空
      if(!/^\s+$/.test(world)) {
          // console.log("标签中的文字", world);

          stack2[stack2.length - 1].children.push({text: world, "type": 3})
          // console.log("stack12", stack2);
      }
      index += world.length
    } else {
      // 文本部分
      index++
    }
  } 
  return stack2[0]

}