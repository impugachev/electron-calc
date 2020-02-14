function makeHandler(specificHandler){
    return _.partial(handler, specificHandler, _)
}

function appendText(node, text){
    node.text(node.text() + text)
}

function evaluateExpression(expression, result){
    return eval(expression.text() + result.text()).toString()
}

function clear(){
    $('#result').text('0')
    $('#expression').text('')
}

function handler(postFunc, event) {
    let button = $(event.target)
    let result = $('#result')
    $('#last').children().first().replaceWith(button.clone(true).css({'width': '25%'}))
    postFunc(button, result)
}

function numberHandler(button, result) {
    if (result.text() == '0') {
        result.text(button.text())
    } else {
        appendText(result, button.text())
    }
}

function dotHandler(button, result) {
    if (!result.text().includes('.') && result.text().slice(-1) != '.') {
        appendText(result, '.')
    }
}

function actionHandler(button, result){
    let expr = $('#expression')
    if (expr.text() == ''){
        let resultText = result.text().slice(-1) == '.' ? result.text().slice(0, -1) : result.text()
        expr.text(resultText + ' ' + button.text())
    } else {
        expr.text(evaluateExpression(expr, result) + button.text())
    }
    result.text('0')
    clearOnNext = false
}

function equalHandler(button, result){
    let expr = $('#expression')
    result.text(evaluateExpression(expr, result))
    expr.text('')
    clearOnNext = true
}

function clearHandle(button, result){
    clear()
    clearOnNext = false
}

function signHandler(button, result){
    if (result.text().charAt(0) == '0')
        return
    if (result.text().charAt(0) == '-'){
        result.text(result.text().substr(1))
    } else {
        result.text('-' + result.text())
    }
}

function afterEqual(){
    if (clearOnNext){
        clearHandle(null, null)
    }
}

let clearOnNext = false

$('.number').each(function () {
    $(this).on('click', afterEqual)
    $(this).on('click', makeHandler(numberHandler))
})
$('.action').each(function () {
    $(this).on('click', makeHandler(actionHandler))
})
$('#dot').on('click', afterEqual)
$('#dot').on('click', makeHandler(dotHandler))
$('#equal').on('click', makeHandler(equalHandler))
$('#clear').on('click', makeHandler(clearHandle))
$('#sign').on('click', makeHandler(signHandler))