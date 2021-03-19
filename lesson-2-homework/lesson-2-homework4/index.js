const nav = document.querySelector('nav')

document.querySelector('#burger').addEventListener('click',(e) => {
  e.currentTarget.classList.toggle("active")
  nav.classList.toggle('show')
})

// querySelector（）的行为类似于 jQuery。（document）.ready（）方法。当DOM准备就绪时，选择器返回对象。
// 我建议你调用页面底部的所有JS脚本。