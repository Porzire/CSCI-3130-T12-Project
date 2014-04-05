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
  ```
  git clone git@github.com:Porzire/CSCI-3130-T12-Project.git
  ```

- Run the ```geofit_database.sql``` script to install the database table structure.

- (Optional) To install with MySQL Workbench, go to ```File -> Open SQL Script```.
  Navigate to ```geofit_database.sql``` and execute on your server space.
  The instructions should be similar for any SQL database editor.

- Depending on what your personal settings are for password and database host location,
  these will need to be edited in the file ```/php/MySQL.php```. The parameters that you may need to change are ```$dbusername```, ```$dbpass```, ```$dbhost```.

usage instructions
------------------

- For detailed instructions on how to use Geofit, please refer to included 
  usage_instructions.pdf file.

known issues
------------

- Certain mobile browsers have problems with the "Add" page. In our experience, Chrome
  may not recognize that Food/Sport has been selected and Firefox sometimes requires multiple clicks of the desired button in order to register.
  [Works as expected when accessing from a computer]

- On certain phones with different resolutions, the chart on the "History" page will not
  line up with your mobile browser. 
  [Works as expected when accessing from a computer]

- On mobile devices, logging out and logging in without refreshing the browser will     
  display the previous user's information. 
  [Works as expected when accessing from a computer]
