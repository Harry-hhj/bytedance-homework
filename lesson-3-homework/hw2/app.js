$(document).ready(function () {
    $('#submitBtn').click(function (e) {
        /*一系列根据自己的意图判断输入框是否已输入内容并决定是否往下执行*/

        //获取表单的系列化数据。这会生成一个A=valueA&B=valueB这种形式的字符串。
        let formData = $('form').serialize().substr(5)
        let li = $("<li><icon><icon/>"+formData+"</li>")
        li.css({cursor: "pointer"})
        $('.tasksBoard').css({"display": "block"})
        $('.tasksBoard ul').append(li)
        $('#myinput').val("")
        e.preventDefault()
    });

    $('#clear').click(function () {
        $('.tasksBoard').css({"display": "none"})
        $('.tasksBoard ul').find("li").remove()
    })

    $('.tasksBoard ul li').click(function () {
        console.log("click")
        this.remove()
    })
});
