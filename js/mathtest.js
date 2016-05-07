/*
*
* Nick Maslov front-end developer
*
*
* javaScript and Jquery
* 
* setOperation function check the status checkboxes and customization
* 
* setQuestion output function of the equation
*
* setAttempts the result output function correctly or incorrectly
*
* modal function for a modal window to enter the name and date (jQuery)
*
* closeModal closing the modal window function (jQuery)
*
* remove function to delete a row in the table (jQuery)
*
* tryAnswer conclusion right or wrong answers
*
* nextQusetion generates new question and resets answer textbox
*
* init init called when body fully loaded
*
* dataTable.js
* creation passed testing table
*
*/

$(function () {
    $('#tabs').tabs();

    //math block
    document.mathTest = {

        // constants
        maxArgValue: 20,

        // fields
        correct: 0,
        wrong: 0,
        currentAnswer: 0,
        addEnabled: true,
        subEnabled: true,
        mulEnabled: true,
        divEnabled: true,

        // operation setter
        setOperation: function (checkBox) {

            switch (checkBox.id) {
            case 'addCheckbox':
                this.addEnabled = checkBox.checked;
                break;
            case 'subCheckbox':
                this.subEnabled = checkBox.checked;
                break;
            case 'mulCheckbox':
                this.mulEnabled = checkBox.checked;
                break;
            case 'divCheckbox':
                this.divEnabled = checkBox.checked;
            }

            // do we still has valid operations?
            var hasValidOperations = this.addEnabled || this.subEnabled || this.mulEnabled || this.divEnabled;

            if (!hasValidOperations) {
                // rollback!
                alert("Вы должны выбрать хоть одну операцию для тестирования!");
                checkBox.checked = true;
                this.setOperation(checkBox);
            }

            this.nextQusetion();

        },

        // renders question
        setQuestion: function (question) {
            document.getElementById('question').innerHTML = question;
        },

        // renders in/correct answers
        setAttempts: function () {
            document.getElementById('correctAnswers').innerHTML = this.correct;
            document.getElementById('wrongAnswers').innerHTML = this.wrong;
        },

        // function for a modal window to enter the name and date (jQuery)
        modal: function () {
            $('a.open_modal').click(function (event) {
                event.preventDefault();
                $('#overlay').fadeIn(400,
                    function () {
                        $('#modal_form')
                            .css('display', 'block')
                            .animate({
                                opacity: 1,
                                top: '50%'
                            }, 200);
                    });
            });

            delete this.correct;
            this.correct = 0;
            delete this.wrong;
            this.wrong = 0;
        },

        // closing the modal window function (jQuery) 
        closeModal: function () {
            $('#modal_close, #overlay').click(function () {
                $("#dateFill").datepicker($.datepicker.regional[""]);
                $('#modal_form')
                    .animate({
                            opacity: 0,
                            top: '45%'
                        }, 200,
                        function () {
                            $(this).css('display', 'none');
                            $('#overlay').fadeOut(400);
                        }
                    );
            });
        },

        // function to delete a row in the table (jQuery)
        remove: function () {
            $(".removeComment").live('click', function () {
                $(this).parents("tr").remove();
                if ($("#comments tr").length == 0) $("#adress3").hide();
                return false;
            });
        },

        // conclusion right or wrong answers
        tryAnswer: function () {
            var value = document.getElementById("answer").value;
            if (value == this.currentAnswer) {
                this.correct++;
                alert("Ответ верный!");
                this.nextQusetion();
            } else {
                this.wrong++;
                this.setAttempts();
                //this.zeroing();
                alert("Ответ не правильный!");
            }

        },

        // generates new question and resets answer textbox
        nextQusetion: function () {

            var firstArg;
            var secondArg;
            var operation;

            var validOperation = false;

            // roll dice until valid operation rolled out
            while (!validOperation) {

                var diceRoll = Math.floor(Math.random() * 4);

                switch (diceRoll) {
                case 0:
                    if (this.addEnabled) {
                        firstArg = Math.floor(Math.random() * 20);
                        secondArg = Math.floor(Math.random() * 20);
                        this.currentAnswer = firstArg + secondArg;
                        operation = "+";
                        validOperation = true;
                    }
                    break;

                case 1:
                    if (this.subEnabled) {
                        secondArg = Math.floor(Math.random() * 20);
                        firstArg = secondArg + Math.floor(Math.random() * 20);
                        this.currentAnswer = firstArg - secondArg;
                        operation = "-";
                        validOperation = true;
                    }
                    break;

                case 2:
                    if (this.mulEnabled) {
                        firstArg = Math.floor(Math.random() * 20);
                        secondArg = Math.floor(Math.random() * 20);
                        this.currentAnswer = firstArg * secondArg;
                        operation = "*";
                        validOperation = true;
                    }
                    break;
                case 3:
                    if (this.divEnabled) {
                        secondArg = Math.floor(Math.random() * 20);
                        this.currentAnswer = Math.floor(Math.random() * 20);
                        firstArg = this.currentAnswer * secondArg;
                        operation = ":";
                        validOperation = true;
                    }
                    break;

                }
            }
            this.setAttempts();
            this.setQuestion(questionElement = firstArg + operation + secondArg + "=?");
            document.getElementById("answer").value = "";

        },

        // init called when body fully loaded
        init: function () {

            // sets keypress filter on answer texbox's keypress
            document.getElementById("answer").onkeypress = function (e) {
                e = e || event;

                if (e.ctrlKey || e.altKey || e.metaKey) return;

                var chr = String.fromCharCode(e.keyCode || e.charCode);

                if (chr == null) return;

                if (e.keyCode == 13) {
                    // enter pressed - submit answer                    
                    $("tryAnswerBtn").click();
                }

                if (e.keyCode == 8 || e.keyCode == 46) return; // del & backspace
                if (e.keyCode >= 37 && e.keyCode <= 40) return; // arrows

                if (chr < '0' || chr > '9') {
                    return false;
                }
            }

            // sets checkboxes to default states
            document.getElementById("addCheckbox").checked = this.addEnabled;
            document.getElementById("subCheckbox").checked = this.subEnabled;
            document.getElementById("mulCheckbox").checked = this.mulEnabled;
            document.getElementById("divCheckbox").checked = this.divEnabled;

            // let's rock!
            this.nextQusetion();
        }
    };




}); //JQuery