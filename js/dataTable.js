$(function() {
    
    /*data table*/
    $('.saveOutcome').click(
        function() {
            var correct = $('#correctAnswers').text();
            var wrong = $('#wrongAnswers').text();
            var correctNumber = +correct;
            var wrongNumber = +wrong;

            //calculation of interest
            var percentCorrectNumber = correctNumber * 100 / (correctNumber + wrongNumber);
            var percentCorrect = Math.round(percentCorrectNumber);

            var name = $('#nameUser').val();
            var date = $('#dateFill').datepicker($.datepicker.regional[""]).val();

            if (($('#addCheckbox').is(':checked')) == true) {
                var add = " + ";
            } else {
                var add = "";
            };
            if (($('#subCheckbox').is(':checked')) == true) {
                var sub = " - ";
            } else {
                var sub = "";
            };
            if (($('#mulCheckbox').is(':checked')) == true) {
                var mul = " * ";
            } else {
                var mul = "";
            };
            if (($('#divCheckbox').is(':checked')) == true) {
                var div = " : ";
            } else {
                var div = "";
            };
            
            if (wrong > 0){
                questionText = $('#question').text(); 
            } else {
                questionText = '0';
            };
            
            if(wrong > 0){
                var question = $('#question').text();
            } else {
                var question = 0;
            };
                

            $('#user__test').append('<tr><td><p>' + name + '</p></td><td><p>' + date + '</p></td><td>' + add + sub + mul + div + '</td><td>' + correct + '</td><td><p>' + percentCorrect + '%</p></td><td>' + wrong + '</td><td colspan="2">' + question + '</td><td><div class="removeComment" onclick="document.mathTest.remove()"><img src="image/remove.png" alt="Удалить" title="Удалить ученика" /></div></td></tr>');

            $('#correctAnswers').text('0');
            $('#wrongAnswers').text('0');

            //close the modal window a click '.saveOutcome'
            $('#modal_form')
                .animate({
                        opacity: 0,
                        top: '45%'
                    }, 200,
                    function() {
                        $(this).css('display', 'none');
                        $('#overlay').fadeOut(400);
                    }
                );
           });
}); //JQuery