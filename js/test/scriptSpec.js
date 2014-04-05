describe('Website', function() {

    // The path to the mySQL.php file.
    var MYSQL_PHP_PATH = 'php/mySQL.php';

    describe('page switch by pressing button on', function() {

        describe('"Welcome" page', function() {

            // Create a new division for fixture before test.
            beforeEach(function() {
                $('<div id="fixture"></div>').appendTo('body');
            });

            // Remove fixture after test.
            afterEach(function() {
                $('#fixture').remove();
            });

            // Try to switch to login page by pressing sign in buttom.
            it('should link to "Login" page by pressing "sign in" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#index #sign_in_Btn').click();
                    expect(window.location.hash).toBe('#login');
                });
            });

            // Try to switch to register page by pressing sign up buttom.
            it('should link to "Register" page by pressing "sign up" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#index #sign_up_Btn').click();
                    expect(window.location.hash).toBe('#register');
                });
            });
        });

        describe('"Main" page', function() {

            // Create a new division for fixture before test.
            beforeEach(function() {
                $('<div id="fixture"></div>').appendTo('body');
            });

            // Remove fixture after test.
            afterEach(function() {
                $('#fixture').remove();
            });

            // Try to stay on main page by pressing main buttom.
            it('should stay on the current page by pressing "Home" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#main #main_tabbar_Btn').click();
                    expect(window.location.hash).toBe('#main');
                });
            });

            // Try to switch to add page by pressing add buttom.
            it('should link to "Add" page by pressing "Add" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#main #add_tabbar_Btn').click();
                    expect(window.location.hash).toBe('#add');
                });
            });

            // Try to switch to history page by pressing history buttom.
            it('should link to "History" page by pressing "History" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#main #history_tabbar_Btn').click();
                    expect(window.location.hash).toBe('#history');
                });
            });

            // Try to switch to advice page by pressing advice buttom.
            it('should link to "Advice" page by pressing "Advice" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#main #advice_tabbar_Btn').click();
                    expect(window.location.hash).toBe('#advice');
                });
            });

            // Try to switch to welcome page by pressing sign out buttom.
            it('should link to "Welcome" page by pressing "sign out" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#main #sign_out_Btn').click();
                    expect(window.location.hash).toBe('#index');
                });
            });
        });

        describe('"Add" page', function() {

            // Create a new division for fixture before test.
            beforeEach(function() {
                $('<div id="fixture"></div>').appendTo('body');
            });

            // Remove fixture after test.
            afterEach(function() {
                $('#fixture').remove();
            });

            // Try to switch to main page by pressing add buttom.
            it('should link to "Main" page by pressing "Home" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#add #main_tabbar_Btn').click();
                    expect(window.location.hash).toBe('#main');
                });
            });

            // Try to stay on the add page by pressing main buttom.
            it('should stay on the current page by pressing "Add" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#add #add_tabbar_Btn').click();
                    expect(window.location.hash).toBe('#add');
                });
            });

            // Try to switch to history page by pressing history buttom.
            it('should link to "History" page by pressing "History" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#add #history_tabbar_Btn').click();
                    expect(window.location.hash).toBe('#history');
                });
            });

            // Try to switch to advice page by pressing advice buttom.
            it('should link to "Advice" page by pressing "Advice" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#add #advice_tabbar_Btn').click();
                    expect(window.location.hash).toBe('#advice');
                });
            });

            // Try to switch to welcome page by pressing sign out buttom.
            it('should link to "Welcome" page by pressing "sign out" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#add #sign_out_Btn').click();
                    expect(window.location.hash).toBe('#index');
                });
            });
        });

        describe('"History" page', function() {

            // Create a new division for fixture before test.
            beforeEach(function() {
                $('<div id="fixture"></div>').appendTo('body');
            });

            // Remove fixture after test.
            afterEach(function() {
                $('#fixture').remove();
            });

            // Try to switch to main page by pressing add buttom.
            it('should link to "Main" page by pressing "Home" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#history #main_tabbar_Btn').click();
                    expect(window.location.hash).toBe('#main');
                });
            });

            // Try to switch to add page by pressing add buttom.
            it('should link to "Add" page by pressing "Add" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#history #add_tabbar_Btn').click();
                    expect(window.location.hash).toBe('#add');
                });
            });

            // Try to stay on history page by pressing main buttom.
            it('should stay on the current page by pressing "History" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#history #history_tabbar_Btn').click();
                    expect(window.location.hash).toBe('#history');
                });
            });

            // Try to switch to advice page by pressing advice buttom.
            it('should link to "Advice" page by pressing "Advice" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#history #advice_tabbar_Btn').click();
                    expect(window.location.hash).toBe('#advice');
                });
            });

            // Try to switch to welcome page by pressing sign out buttom.
            it('should link to "Welcome" page by pressing "sign out" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#history #sign_out_Btn').click();
                    expect(window.location.hash).toBe('#index');
                });
            });
        });

        describe('"Advice" page', function() {

            // Create a new division for fixture before test.
            beforeEach(function() {
                $('<div id="fixture"></div>').appendTo('body');
            });

            // Remove fixture after test.
            afterEach(function() {
                $('#fixture').remove();
            });

            // Try to switch to main page by pressing add buttom.
            it('should link to "Main" page by pressing "Home" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#advice #main_tabbar_Btn').click();
                    expect(window.location.hash).toBe('#main');
                });
            });

            // Try to switch to add page by pressing add buttom.
            it('should link to "Add" page by pressing "Add" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#advice #add_tabbar_Btn').click();
                    expect(window.location.hash).toBe('#add');
                });
            });

            // Try to switch to history page by pressing history buttom.
            it('should link to "History" page by pressing "History" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#advice #history_tabbar_Btn').click();
                    expect(window.location.hash).toBe('#history');
                });
            });

            // Try to stay on advice page by pressing advice buttom.
            it('should stay on the current page by pressing "Advice" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#advice #advice_tabbar_Btn').click();
                    expect(window.location.hash).toBe('#advice');
                });
            });

            // Try to switch to welcome page by pressing sign out buttom.
            it('should link to "Welcome" page by pressing "sign out" buttom', function() {
                $('#fixture').load('index.php #content', function() {
                    $('#advice #sign_out_Btn').click();
                    expect(window.location.hash).toBe('#index');
                });
            });
        });
    });
});
