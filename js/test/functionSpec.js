// Test the function defined by the script.
// REFACTER: Use a seperate js file to manage all the functional test.
describe('function', function() {

    // The path to the mySQL.php file.
    var MYSQL_PHP_PATH = 'php/mySQL.php';

    // Test the authorization module.
    describe('authorization', function() {

        // Test the login function.
        describe('login', function() {

            var username = "TestUser";
            var password = "TestPwd";

            // Create a valid testing account before test.
            // And create a new division for fixture before test.
            beforeEach(function() {
                $('<div id="fixture"></div>').appendTo('body');
                $.ajax({
                    type: 'POST',
                    url: MYSQL_PHP_PATH,
                    data: {
                        func: 'register',
                        username: username,
                        password: password 
                    },
                    dataType: 'text'
                });
            });

            // Remove the testing account after test.
            // And remove fixture after test.
            afterEach(function() {
                $('#fixture').remove();
                $.ajax({
                    type: 'POST',
                    url: MYSQL_PHP_PATH,
                    data: {
                        func: 'remove',
                        username: username,
                    },
                    dataType: 'text'
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
                $('<div id="fixture"></div>').appendTo('body');
                $.ajax({
                    type: 'POST',
                    url: MYSQL_PHP_PATH,
                    data: {
                        func: 'remove',
                        username: username,
                    },
                    dataType: 'text'
                });
            });

            // Clean up the login table after test.
            afterEach(function() {
                $('#fixture').remove();
                $.ajax({
                    type: 'POST',
                    url: MYSQL_PHP_PATH,
                    data: {
                        func: 'remove',
                        username: username,
                    },
                    dataType: 'text'
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

    // Test the functional module.
    describe('functional', function() {
    
        // Test the add function.
        describe('add', function() {

            var username = 'TestUser';
            var calories = '100';
            var date = '2014-03-12';

            // Retrieve last id before test.
            beforeEach(function() {
                $.ajax({
                    type: 'POST',
                    url: MYSQL_PHP_PATH,
                    data: {
                        test: 'getLastRecord',
                        table: 'item'
                    },
                    dataType: 'text',
                    async: false,
                    success: function(responce) {
                    }
                });
            });

            it('should accept the add food request', function() {
                var foodname = 'TestFood';
                $.ajax({
                    type: 'POST',
                    url: MYSQL_PHP_PATH,
                    data: {
                        func: 'addFood',
                        username: username,
                        foodname: foodname,
                        calories: calories,
                        date: date
                    },
                    dataType: 'text',
                    async: false,
                    success: function(responce) {
                    }
                });
                $.ajax({
                    type: 'POST',
                    url: MYSQL_PHP_PATH,
                    data: {
                        test: 'getLastRecord',
                        table: 'item'
                    },
                    dataType: 'text',
                    async: false,
                    success: function(responce) {
                        record = (responce.split(' '));
                        // Expect the retrieved record information is the same as given.
                        expect(record[1]).toEqual(username);
                        expect(record[2]).toEqual(foodname);
                        expect(record[3]).toEqual(calories);
                        expect(record[4]).toEqual(date);
                    }
                });
                // Remove the record created during test.
                $.ajax({
                    type: 'POST',
                    url: MYSQL_PHP_PATH,
                    data: {
                        test: 'removeLastRecord',
                        table: 'item'
                    },
                    dataType: 'text',
                    async: false,
                    success: function(responce) {
                    }
                });
            });


            it('should accept the add sport request', function() {
                var sportname = 'TestSport';
                $.ajax({
                    type: 'POST',
                    url: MYSQL_PHP_PATH,
                    data: {
                        func: 'addSport',
                        username: username,
                        foodname: sportname,
                        calories: calories,
                        date: date
                    },
                    dataType: 'text',
                    async: false,
                    success: function(responce) {
                    }
                });
                $.ajax({
                    type: 'POST',
                    url: MYSQL_PHP_PATH,
                    data: {
                        test: 'getLastRecord',
                        table: 'activity'
                    },
                    dataType: 'text',
                    async: false,
                    success: function(responce) {
                        record = (responce.split(' '));
                        // Expect the retrieved record information is the same as given.
                        expect(record[1]).toEqual(username);
                        expect(record[2]).toEqual(sportname);
                        expect(record[3]).toEqual(calories);
                        expect(record[4]).toEqual(date);
                    }
                });
                // Remove the record created during test.
                $.ajax({
                    type: 'POST',
                    url: MYSQL_PHP_PATH,
                    data: {
                        test: 'removeLastRecord',
                        table: 'activity'
                    },
                    dataType: 'text',
                    async: false,
                    success: function(responce) {
                    }
                });
            });
        });

        // Test the history function.
        describe('food history', function() {

            var username = 'TestUser';
            var calories = '100';
            var date = '2014-03-12';

            it('should return food records', function() {
                var foodname = 'TestFood';
                // Add one record with given information.
                $.ajax({
                    type: 'POST',
                    url: MYSQL_PHP_PATH,
                    data: {
                        func: 'addFood',
                        username: username,
                        foodname: foodname,
                        calories: calories,
                        date: date
                    },
                    dataType: 'text',
                    async: false,
                    success: function(responce) {
                    }
                });
                $.ajax({
                    type: 'POST',
                    url: MYSQL_PHP_PATH,
                    data: {
                        test: 'returnRecords',
                        username: 'TestUser',
                        table: 'item'
                    },
                    dataType: 'text',
                    async: false,
                    success: function(responce) {
                        record = responce.split(' ');
                        // Expect the retrieved record information is the same as given.
                        expect(record[1]).toEqual(username);
                        expect(record[2]).toEqual(foodname);
                        expect(record[3]).toEqual(calories);
                        expect(record[4]).toEqual(date);
                    }
                });
                // Remove the record created during test.
                $.ajax({
                    type: 'POST',
                    url: MYSQL_PHP_PATH,
                    data: {
                        test: 'removeLastRecord',
                        table: 'item'
                    },
                    dataType: 'text',
                    async: false,
                    success: function(responce) {
                    }
                });
            });
        });

        // Test the history function.
        describe('sport history', function() {

            var username = 'TestUser';
            var calories = '100';
            var date = '2014-03-12';


            it('should return sport records', function() {
                var sportname = 'TestSport';
                // Add one record with given information.
                $.ajax({
                    type: 'POST',
                    url: MYSQL_PHP_PATH,
                    data: {
                        func: 'addSport',
                        username: username,
                        foodname: sportname,
                        calories: calories,
                        date: date
                    },
                    dataType: 'text',
                    async: false,
                    success: function(responce) {
                    }
                });
                $.ajax({
                    type: 'POST',
                    url: MYSQL_PHP_PATH,
                    data: {
                        test: 'returnRecords',
                        username: 'TestUser',
                        table: 'activity'
                    },
                    dataType: 'text',
                    async: false,
                    success: function(responce) {
                        record = (responce.split(' '));
                        // Expect the retrieved record information is the same as given.
                        expect(record[1]).toEqual(username);
                        expect(record[2]).toEqual(sportname);
                        expect(record[3]).toEqual(calories);
                        expect(record[4]).toEqual(date);
                    }
                });
                // Remove the record created during test.
                $.ajax({
                    type: 'POST',
                    url: MYSQL_PHP_PATH,
                    data: {
                        test: 'removeLastRecord',
                        table: 'activity'
                    },
                    dataType: 'text',
                    async: false,
                    success: function(responce) {
                    }
                });
            });
        });

        // Test the advice function.
        describe('advice', function() {

            var username = 'TestUser';

            it('should return advice', function() {
                $.ajax({
                    type: 'POST',
                    url: MYSQL_PHP_PATH,
                    data: {
                        func: 'returnAdvice',
                        username: user
                    },
                    dataType: 'text',
                    async: false,
                    success: function(responce) {
                        expect(responce).not.toBe('');
                    }
                });
            });
        });

        // Test the graph function.
        describe('graph', function() {

            beforeEach(function() {
                var fixture = document.createElement('div')
                fixture.id = 'fix'
                $("body").append(fixture);
            });

            afterEach(function() {
                $('#fix').remove();
            });

            it('should return graph', function() {
                draw('fix', 'Jie', 3)
                expect($('fix').html()).not.toBe('');
            });
        });
    });
});

