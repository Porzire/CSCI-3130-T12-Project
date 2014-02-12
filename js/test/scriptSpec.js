describe('Website', function() {

    // Create a new division for fixture before test.
    beforeEach(function() {
        $('<div id="fixture"></div>').appendTo('body');
    });

    // Remove fixture after test.
    afterEach(function() {
        $('#fixture').remove();
    });

    // Test the login function.
    describe('login', function() {

        var username = "TestUser";
        var password = "TestPwd";

        // Create a valid testing account before test.
        beforeEach(function() {
            $.ajax({
                type: 'POST',
                url: 'mySQL.php',
                data: {
                    func: 'register',
                    username: username,
                    password: password 
                },
                dataType: 'text',
                error: function(responce) {
                    this.fail();
                }
            });
        });

        // Remove the testing account after test.
        afterEach(function() {
            $.ajax({
                type: 'POST',
                url: 'mySQL.php',
                data: {
                    func: 'remove',
                    username: username,
                },
                dataType: 'text',
                error: function(responce) {
                    this.fail();
                }
            });
        });

        // Try to login with testing username and password.
        // It expects website will change to the main page.
        it('should accept with correct username and password', function() {
            $('#fixture').load('index.php #content', function() {
                $('#login #usrname_TI').val(username);
                $('#login #pwd_TI').val(password);
                $('#login #login_Btn').click();
                expect(window.location.hash).toBe('#main');
            });
        });

        // Try to login with testing username and incorrect password.
        // It expects website will not change to the main page.
        it('should reject with incorrect username', function() {
            $('#fixture').load('index.php #content', function() {
                $('#login #usrname_TI').val(username);
                $('#login #pwd_TI').val('123');
                $('#login #login_Btn').click();
                expect(window.location.hash).not.toBe('#main');
            });
        });

        // Try to login with incorrect username and testing password.
        // It expects website will not change to the main page.
        it('should reject with incorrect password', function() {
            $('#fixture').load('index.php #content', function() {
                $('#login #usrname_TI').val('Mei');
                $('#login #pwd_TI').val(password);
                $('#login #login_Btn').click();
                expect(window.location.hash).not.toBe('#main');
            });
        });
    });

    // Test the register function.
    describe('register', function() {

        var username = "TestUser";
        var password = "TestPwd";

        // Remove the testing account before test to ensure it can be
        // successfully registered.
        beforeEach(function() {
            $.ajax({
                type: 'POST',
                url: 'mySQL.php',
                data: {
                    func: 'remove',
                    username: username,
                },
                dataType: 'text',
                error: function(responce) {
                    this.fail();
                }
            });
        });

        // Clean up the login table after test.
        afterEach(function() {
            $.ajax({
                type: 'POST',
                url: 'mySQL.php',
                data: {
                    func: 'remove',
                    username: username,
                },
                dataType: 'text',
                error: function(responce) {
                    this.fail();
                }
            });
        });

        // Try to register with testing username and password.
        // It expects website will change to the main page.
        it('should accept with unused username', function() {
            $('#fixture').load('index.php #content', function() {
                $('#register #usrname_TI').val(username);
                $('#register #pwd1_TI').val(password);
                $('#register #pwd2_TI').val(password);
                $('#register #reg_Btn').click();
                expect(window.location.hash).toBe('#main');
            });
        });

        // Try to register with testing username twice.
        // It expects website will reject the second registration and not
        // change to the main page.
        it('should reject with exist username', function() {
            $('#fixture').load('index.php #content', function() {
                for (var i = 0; i > 1; i++) {
                    $('#register #usrname_TI').val(username);
                    $('#register #pwd1_TI').val(password);
                    $('#register #pwd2_TI').val(password);
                    $('#register #reg_Btn').click();
                }
                expect(window.location.hash).not.toBe('#main');
            });
        });
    });
});
