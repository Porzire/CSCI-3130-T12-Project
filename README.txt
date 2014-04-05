Geofit
======

Project for CSCI 3130 Team 12

members
-------

* Matt Cassidy
* Adam Heim
* Jie Mei
* Elrico Moss

installation instructions
-------------------------

- Copy the contents of source_files into your active directory.

- Run the geofit_database.sql script to install the database table structure.

- (Optional) To install with MySQL Workbench, go to File -> Open SQL Script.
  Navigate to geofit_database.sql and execute on your server space.
  The instructions should be similar for any SQL database editor.

- Depending on what your personal settings are for password and database host location,
  these will need to be edited in the file /php/MySQL.php. The parameters that you may need to change are $dbusername, $dbpass, $dbhost.

known issues
------------

- Certain mobile browsers have problems with the "Add" page. In our experience, Chrome
  may not recognize that Food/Sport has been selected and Firefox sometimes requires multiple clicks of the desired button in order to register.