//FYI — THE DATA IN THIS TABLE IS FAKE!!!
$("#text-search").on("input", function() {
    var n = $(this).val();
    $('tbody tr:ccontains("' + n + '")').show(),
        $('tbody tr:not(:ccontains("' + n + '"))').hide(),
        0 === $('tr:ccontains("' + n + '")').length ?
        $("#no_results").show() :
        $("#no_results").hide();
});

jQuery.expr[":"].ccontains = function(a, i, m) {
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

// Form 

$('.form-part input[type="radio"]').wrap('<div class="ns-radio-btn"><i></i></div>');
$(".ns-radio-btn").on('click', function() {
    var _this = $(this),
        block = _this.parent().parent();
    block.find('input:radio').attr('checked', false);
    block.find(".ns-radio-btn").removeClass('checkedRadio');
    _this.addClass('checkedRadio');
    _this.find('input:radio').attr('checked', true);
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}