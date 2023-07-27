# 18626353-c94a-4a84-a276-ea2a4948aba4

https://sonarcloud.io/project/overview?id=iamneo-production_18626353-c94a-4a84-a276-ea2a4948aba4

# Project Name : DotNet_React_AE_Boxing_Academy_Admission_Team 6

# DESIGN DOCUMENT

https://drive.google.com/file/d/18SC_ttUsUTBaJxYiJGVmd3Ke3U7Y_LJv/view?usp=sharing

## Project Completion Status Report

#### Virtusa Batch 01 Team 06

#### Team Members

1. Mudigonda Venkata Gopi Jayaram - AdminController-Backend.
2. Sai Digvijay Abruk - Authentication-Login,AuthController,Project-UI.
3. Nagavaralakshmi Veeraparaju - UserAcademy.
4. Siva Krishna Maskapalli - CoursePages - My Learning,Signup.
5. Anusha Balla - AdminCourse.
6. Vineela Nagamani Pinisetty - UserController API-Backend. 
7. Satwika Korukonda - AdminStudent.
8. Lakshmiharika Pindi - EnrolledCourse.
9. Prasada Rao Laveti - AdminAcademy.
10. Valavala Maha Lakshmi - Rating,CoursePages.
11. Maniveeraphani Gurram - CoursePages.

## Instructions and Commands to run the project

### Login Credentials for Admin

Create & Use Login Credentials for admin.
user id: admin@gmail.com
password: Admin@123

### React Project

#### cd reactapp

To select the react project folder

#### npm install

To install the packages

#### npm start

To start the frontend in 8081 port

### DotNet Project

#### cd dotnetapp

To select the dotnet project folder

#### dotnet tool restore

To install the dependencies

#### dotnet run

To run the application in 8080 port

#### dotnet clean

If found any errors then run the clean command and start install and run the project again.

#### dotnet dotnet-ef add package package_name --version 6.0

Any package if required you can install by the above command. The package that you are installing should support .Net 6.0 version.

In case dependencies are not installed, install EntityFrameworkCore in the project.

#### dotnet new tool-manifest

#### dotnet tool install --local dotnet-ef --version 6.0

To install the Dotnet EntityFramework version 6.0

### dotnet dotnet-ef

To check the EF is installed or not.

### dotnet dotnet-ef migrations add "InitialSetup"

command to setup initial creation of tables mentioned in DBContext.

### dotnet dotnet-ef database update

command to update the database

### connectionString = "User ID=sa;password=examlyMssql@123; server=localhost;Database=***;trusted_connection=false;Persist Security Info=False;Encrypt=False";

Make sure the connection string in appsettings.json matches the above connection string. Database name should be the name that you create.

### Database connection

#### To Work with SQLServer:

sqlcmd -U sa
password: examlyMssql@123

1> create database DBName

2> go

1> use DBName

2> go

### Challenges

Make sure the Dotnet application should run in the 8080 port

React application should run in 8081 port

Only then the run test case button should be clicked

If there are any challenges in running the react part,

Delete the node modules and reinstall them by using the command "npm install / npm i"

If there are any challenges in running the test case in the dotnet part

use these commands:

dotnet clean

dotnet restore

dotnet run