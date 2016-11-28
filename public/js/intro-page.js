//Hides the skip button if the name text box has a name in it.
$( document ).ready(function() {
    $('#continue-button').prop('disabled', true);
    $('#name-input').keyup(function(){
      if($(this).val() == ''){ //IF THE FIELD IS EMPTY
        $('#skip-button').show();
        $('#continue-button').removeClass('full-width').prop('disabled', true);
      } else { // IF THE FIELD IS NOT EMPTY
        $('#skip-button').hide();
        $('#continue-button').addClass('full-width').prop('disabled', false);
      };
    });
});
