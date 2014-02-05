$(document).ready(function(){

    $('#login #login_Btn').click(function(){
        var usr = $('#usrname_TI').val();
        var pwd = $('#pwd_TI').val();
        $(this).attr('href', '#login');
        if (usr === '') {
            addAndDisplayText('#login #error_Text p', 'The user name cannot be empty.');
        } else if (pwd === '') {
            addAndDisplayText('#login #error_Text p', 'The password cannot be empty.');
        } else {
            $(this).attr('href', '#main');
            $('#login #usrname_TI').val('');
            $('#login #pwd_TI').val('');
        }
    });

    $('#register #reg_Btn').click(function(){
        var usr = $('#register #usrname_TI').val();
        var pwd1 = $('#register #pwd1_TI').val();
        var pwd2 = $('#register #pwd2_TI').val();
        $(this).attr('href', '#register');
        if (usr === '') {
            addAndDisplayText('#register #error_Text p', 'The user name cannot be empty.');
        } else if (pwd1 === '') {
            addAndDisplayText('#register #error_Text p', 'The password cannot be empty.');
        } else if (pwd2 === '') {
            addAndDisplayText('#register #error_Text p', 'The password comfirm cannot be empty.');
        } else if (pwd2 !== pwd1) {
            addAndDisplayText('#register #error_Text p', 'The passwords are not same.');
        } else {
            $(this).attr('href', '#main');
            $('#register #usrname_TI').val('');
            $('#register #pwd1_TI').val('');
            $('#register #pwd2_TI').val('');
        }
    });
});

function addAndDisplayText(tag, text) {
    $(tag).html(text).fadeOut(0).fadeIn(200);
}
