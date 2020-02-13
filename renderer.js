function curry(f) {
    return function (a) {
        return function (b) {
            return f(a, b);
        };
    };
}

function appendText(node, text){
    node.text(node.text() + text)
}

function evaluateExpression(expression, result){
    return eval(expression.text() + result.text()).toString()
}

let clearOnNext = false

function clear(){
    $("#result").text("0")
    $("#expression").text("")
}

function handler(postFunc, event) {
    let button = $(event.target)
    let result = $("#result")
    $("#last").children().first().replaceWith(button.clone(true))
    postFunc(button, result)
}

function numberHandler(button, result) {
    if (result.text() == 0) {
        result.text(button.text())
    } else {
        appendText(result, button.text())
    }
}

function dotHandler(button, result) {
    if (!result.text().includes(".") && result.text().slice(-1) != ".") {
        appendText(result, ".")
    }
}

function actionHandler(button, result){
    let expr = $("#expression")
    if (expr.text() == ""){
        expr.text(result.text() + button.text())
    } else {
        expr.text(evaluateExpression(expr, result) + button.text())
    }
    result.text("0")
}

function equalHandler(button, result){
    let expr = $("#expression")
    result.text(evaluateExpression(expr, result))
    expr.text("")
}

function clearHandle(button, result){
    clear()
}

function signHandler(button, result){
    if (result.text().charAt(0) == "0")
        return
    if (result.text().charAt(0) == "-"){
        result.text(result.text().substr(1))
    } else {
        result.text("-" + result.text())
    }
}

let curriedHandler = curry(handler)

$(".number").each(function () {
    $(this).click(curriedHandler(numberHandler))
})
$(".action").each(function () {
    $(this).click(curriedHandler(actionHandler))
})
$("#dot").click(curriedHandler(dotHandler))
$("#equal").click(curriedHandler(equalHandler))
$("#clear").click(curriedHandler(clearHandle))
$("#sign").click(curriedHandler(signHandler))