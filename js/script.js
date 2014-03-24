/**
 * Maintain the user name.
 * @property user
 * @type String
 */
var user = NaN;

/**
 * Store the item type.
 * @property itemType
 * @type String
 */
var itemType = '';

/**
 * Add the content to the given tag.
 * @method setAndDisplayText
 */
function setAndDisplayText(tag, text) {
    $(tag).html(text).fadeOut(0).fadeIn(200);
}

/**
 * Update history onto HTML page.
 * @method getHistory
 */

// getAdvice function, currently based on getHistory for testing purposes
function getAdvice() {
    $.ajax({
        type: 'POST',
        url: 'php/mySQL.php',
        data: {
            func: 'returnFoodHistory',
            username: user
        },
        dataType: 'text',

        success: function(responce) {
            $('#food-history-content').html(responce);
        }
    });
}

function getHistory() {
    $.ajax({
        type: 'POST',
        url: 'php/mySQL.php',
        data: {
            func: 'returnFoodHistory',
            username: user
        },
        dataType: 'text',
        /**
         * Update the HTML content if successfully get ajax response.
         * @event success
         */
        success: function(responce) {
            $('#food-history-content').html(responce);
        }
    });
    $.ajax({
        type: 'POST',
        url: 'php/mySQL.php',
        data: {
            func: 'returnSportHistory',
            username: user
        },
        dataType: 'text',
        /**
         * Update the HTML content if successfully get ajax response.
         * @event success
         */
        success: function(responce) {
            $('#sport-history-content').html(responce);
        }
    });

}

$(document).ready(function(){

/*  
 *  Framework for returnFoodHistory and returnSportHistory
 *  returnFoodHistory is linked to food-history-content
 *  returnSportHistory is linked to sport-history-content
 */ 

    /*
     * Bind the item type radios on the add page.
     */
    $('#food_sport_R').find('label').each(function(){

        $(this).bind('click', function(){
            // Since the code generated by the framework in the runtime, we can
            // not directly bind the click function with a static id.
            itemType = $(this).children().children().html().replace(/\s+/g, '');
        });
    });

    $('#login #login_Btn').click(function(){
        var usr = $('#usrname_TI').val();
        var pwd = $('#pwd_TI').val();
        $(this).attr('href', '#login');
        if (usr === '') {
            setAndDisplayText('#login #error_Text p',
                    'The user name cannot be empty.');
        } else if (pwd === '') {
            setAndDisplayText('#login #error_Text p',
                    'The password cannot be empty.');
        } else {
            $.ajax({
                type: 'POST',
                url: 'php/mySQL.php',
                data: {
                    func: 'login',
                    username: usr,
                    password: pwd
                },
                dataType: 'text',
                async: false,
                /**
                 * Switch to main page and clean the textfields if response is
                 * success. Otherwise display the error information.
                 * @event success
                 */
                success: function(responce) {
                    if (responce === 'success') {
                        document.location.hash = 'main';
                        $('#login #usrname_TI').val('');
                        $('#login #pwd_TI').val('');
                        setAndDisplayText('#login #error_Text p', '');
                        user = usr;
                    } else {
                        setAndDisplayText('#login #error_Text p',
                                'Username or password incorrect.');
                    }
                }
            });
            getHistory();
        }
    });

    $('#register #reg_Btn').click(function(){
        var usr = $('#register #usrname_TI').val();
        var pwd1 = $('#register #pwd1_TI').val();
        var pwd2 = $('#register #pwd2_TI').val();
        $(this).attr('href', '#register');
        if (usr === '') {
            setAndDisplayText('#register #error_Text p',
                    'The user name cannot be empty.');
        } else if (pwd1 === '') {
            setAndDisplayText('#register #error_Text p',
                    'The password cannot be empty.');
        } else if (pwd2 === '') {
            setAndDisplayText('#register #error_Text p',
                    'The password comfirm cannot be empty.');
        } else if (pwd2 !== pwd1) {
            setAndDisplayText('#register #error_Text p',
                    'The passwords are not same.');
        } else {
            $.ajax({
                type: 'POST',
                url: 'php/mySQL.php',
                async: false,
                data: {
                    func: 'register',
                    username: usr,
                    password: pwd1
                },
                dataType: 'text',
                /**
                 * Switch to main page and clean the textfields if response is
                 * success. Otherwise display the error information.
                 * @event success
                 */
                success: function(responce) {
                    if (responce === 'success') {
                        document.location.hash = 'main';
                        $('#register #usrname_TI').val('');
                        $('#register #pwd1_TI').val('');
                        $('#register #pwd2_TI').val('');
                        setAndDisplayText('#register #error_Text p', '');
                    } else {
                        setAndDisplayText('#register #error_Text p',
                                'Can not register with given username.');
                    }
                }
            });
            getHistory();
        }
    });

    $('#add #item_sub_Btn').click(function(){
        var item = $('#add #itemname_TI').val();
        var cal = $('#add #itemCal_TI').val();
        var time = $('#add #time_DI').val();
        if (itemType === '') {
            alert('The item type was not selected.' + itemType);
        } else if (item === '') {
            alert('The itemname should not be empty.');
        } else if (cal === '') {
            alert('The calorie should not be empty.');
        } else if (time === '') {
            alert('The time should be selected.');
        } else {
            $.ajax({
                type: 'POST',
                url: 'php/mySQL.php',
                async: false,
                data: {
                    func: 'add' + itemType,
                    username: user,
                    foodname: item,
                    calories: cal,
                    date:     time
                },
                dataType: 'text',
                /**
                 * Prompt success information if successfully get ajax response.
                 * @event success
                 */
                success: function(responce) {
                    alert('Item added!');
                }
            });
            getHistory();
        }
    });
});
