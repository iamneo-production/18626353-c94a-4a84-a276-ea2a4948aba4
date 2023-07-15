using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dotnetapp.Migrations
{
    public partial class satwika : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdminModel",
                columns: table => new
                {
                    adminId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    email = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    password = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    username = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    mobileNumber = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    userRole = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__AdminMod__AD0500A641BE4EE2", x => x.adminId);
                });

            migrationBuilder.CreateTable(
                name: "InstituteModel",
                columns: table => new
                {
                    instituteId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    instituteName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    instituteDescription = table.Column<string>(type: "varchar(200)", unicode: false, maxLength: 200, nullable: true),
                    instituteAddress = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    mobile = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    email = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    imageUrl = table.Column<string>(type: "varchar(300)", unicode: false, maxLength: 300, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Institut__AF018B2C2C390C5D", x => x.instituteId);
                });

            migrationBuilder.CreateTable(
                name: "LoginModel",
                columns: table => new
                {
                    loginId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    email = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    password = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__LoginMod__1F5EF4CF4AB45A19", x => x.loginId);
                });

            migrationBuilder.CreateTable(
                name: "UserModel",
                columns: table => new
                {
                    userId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    email = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    password = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    username = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    mobileNumber = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    userRole = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__UserMode__CB9A1CFFB81ADADF", x => x.userId);
                });

            migrationBuilder.CreateTable(
                name: "CourseModel",
                columns: table => new
                {
                    courseId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    courseName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    courseDescription = table.Column<string>(type: "varchar(200)", unicode: false, maxLength: 200, nullable: true),
                    courseDuration = table.Column<int>(type: "int", nullable: false),
                    numberofStudents = table.Column<int>(type: "int", nullable: true),
                    courseTiming = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    instituteId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CourseMo__2AA84FD10767D45B", x => x.courseId);
                    table.ForeignKey(
                        name: "FK__CourseMod__insti__2C3393D0",
                        column: x => x.instituteId,
                        principalTable: "InstituteModel",
                        principalColumn: "instituteId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RatingModel",
                columns: table => new
                {
                    ratingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Rating = table.Column<int>(type: "int", nullable: true),
                    Comments = table.Column<string>(type: "varchar(200)", unicode: false, maxLength: 200, nullable: true),
                    Date = table.Column<DateTime>(type: "datetime", nullable: true),
                    instituteId = table.Column<int>(type: "int", nullable: true),
                    userId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__RatingMo__2D290CA9A8440541", x => x.ratingId);
                    table.ForeignKey(
                        name: "FK__RatingMod__insti__6FE99F9F",
                        column: x => x.instituteId,
                        principalTable: "InstituteModel",
                        principalColumn: "instituteId");
                    table.ForeignKey(
                        name: "FK__RatingMod__userI__70DDC3D8",
                        column: x => x.userId,
                        principalTable: "UserModel",
                        principalColumn: "userId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProgressModel",
                columns: table => new
                {
                    progressId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    progressPercentage = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Timestamp = table.Column<DateTime>(type: "datetime", nullable: true),
                    status = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    userId = table.Column<int>(type: "int", nullable: true),
                    courseId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Progress__0F2BDC7D48F8D384", x => x.progressId);
                    table.ForeignKey(
                        name: "FK__ProgressM__cours__4AB81AF0",
                        column: x => x.courseId,
                        principalTable: "CourseModel",
                        principalColumn: "courseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__ProgressM__userI__49C3F6B7",
                        column: x => x.userId,
                        principalTable: "UserModel",
                        principalColumn: "userId");
                });

            migrationBuilder.CreateTable(
                name: "StudentModel",
                columns: table => new
                {
                    studentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    firstName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    lastName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    mobile = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    Age = table.Column<int>(type: "int", nullable: true),
                    Gender = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true),
                    HouseNo = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    streetName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    areaName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    state = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    pincode = table.Column<int>(type: "int", nullable: true),
                    Nationality = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    fatherName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    motherName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    email = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    alternateMobile = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    courseId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__StudentM__4D11D63CD1C31FA0", x => x.studentId);
                    table.ForeignKey(
                        name: "FK__StudentMo__cours__37A5467C",
                        column: x => x.courseId,
                        principalTable: "CourseModel",
                        principalColumn: "courseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AdmissionModel",
                columns: table => new
                {
                    admissionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    instituteId = table.Column<int>(type: "int", nullable: true),
                    courseId = table.Column<int>(type: "int", nullable: true),
                    userId = table.Column<int>(type: "int", nullable: true),
                    studentId = table.Column<int>(type: "int", nullable: true),
                    DateofJoining = table.Column<DateTime>(type: "date", nullable: false, defaultValueSql: "(getdate())"),
                    EndDate = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Admissio__705A8259EA167B94", x => x.admissionId);
                    table.ForeignKey(
                        name: "FK__Admission__cours__440B1D61",
                        column: x => x.courseId,
                        principalTable: "CourseModel",
                        principalColumn: "courseId");
                    table.ForeignKey(
                        name: "FK__Admission__insti__4316F928",
                        column: x => x.instituteId,
                        principalTable: "InstituteModel",
                        principalColumn: "instituteId");
                    table.ForeignKey(
                        name: "FK__Admission__stude__45F365D3",
                        column: x => x.studentId,
                        principalTable: "StudentModel",
                        principalColumn: "studentId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__Admission__userI__44FF419A",
                        column: x => x.userId,
                        principalTable: "UserModel",
                        principalColumn: "userId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionModel_courseId",
                table: "AdmissionModel",
                column: "courseId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionModel_instituteId",
                table: "AdmissionModel",
                column: "instituteId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionModel_studentId",
                table: "AdmissionModel",
                column: "studentId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionModel_userId",
                table: "AdmissionModel",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseModel_instituteId",
                table: "CourseModel",
                column: "instituteId");

            migrationBuilder.CreateIndex(
                name: "IX_ProgressModel_courseId",
                table: "ProgressModel",
                column: "courseId");

            migrationBuilder.CreateIndex(
                name: "IX_ProgressModel_userId",
                table: "ProgressModel",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_RatingModel_instituteId",
                table: "RatingModel",
                column: "instituteId");

            migrationBuilder.CreateIndex(
                name: "IX_RatingModel_userId",
                table: "RatingModel",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentModel_courseId",
                table: "StudentModel",
                column: "courseId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdminModel");

            migrationBuilder.DropTable(
                name: "AdmissionModel");

            migrationBuilder.DropTable(
                name: "LoginModel");

            migrationBuilder.DropTable(
                name: "ProgressModel");

            migrationBuilder.DropTable(
                name: "RatingModel");

            migrationBuilder.DropTable(
                name: "StudentModel");

            migrationBuilder.DropTable(
                name: "UserModel");

            migrationBuilder.DropTable(
                name: "CourseModel");

            migrationBuilder.DropTable(
                name: "InstituteModel");
        }
    }
}
