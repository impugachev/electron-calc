function addSymbol(event){
    let button = $(event.target)
    let result = $("#result")
    $("#last").children().first().replaceWith(button.clone(true))
    if (result.text() == 0){
        result.text(button.text()) 
    } else {
        result.text(result.text() + button.text())
    }
}

$(".number").each(function(){
    $(this).click(addSymbol)
})