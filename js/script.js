/**
 * Add the content to the given tag.
 *
 * @method setAndDisplayText
 */
function setAndDisplayText(tag, text) {
    $(tag).html(text).fadeOut(0).fadeIn(200);
}

$(document).ready(function(){

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
                url: 'mySQL.php',
                data: {
                    func: 'login',
                    username: usr,
                    password: pwd
                },
                dataType: 'text',
                success: function(responce) {
                    if (responce === 'success') {
                        document.location.hash = 'main';
                        $('#login #usrname_TI').val('');
                        $('#login #pwd_TI').val('');
                        setAndDisplayText('#login #error_Text p', '');
                    } else {
                        setAndDisplayText('#login #error_Text p',
                                'Username or password incorrect.');
                    }
                }
            });
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
                url: 'mySQL.php',
                data: {
                    func: 'register',
                    username: usr,
                    password: pwd1
                },
                dataType: 'text',
                success: function(responce) {
                    if (responce === 'success') {
                        document.location.hash = 'main';
                        $('#register #usrname_TI').val('');
                        $('#register #pwd1_TI').val('');
                        $('#register #pwd2_TI').val('');
                        setAndDisplayText('#login #error_Text p', '');
                    } else {
                        setAndDisplayText('#login #error_Text p',
                                'Can not register with given username.');
                    }
                }
            });
        }
    });
});
