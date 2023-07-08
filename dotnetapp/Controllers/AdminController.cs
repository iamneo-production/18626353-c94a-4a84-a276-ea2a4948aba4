using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/")]
    public class AdminController : ControllerBase
    {
        private readonly TestDBContext dc;
        public AdminController( TestDBContext dc)
        {
            this.dc =dc;
        }
    
        [HttpGet("admin/viewStudents")]
        public async Task<IActionResult> viewStudents()
        {
            var students = await dc.StudentModels.ToListAsync();
            if (students == null || students.Count == 0)
            {
                return NotFound("No students found");
            }

            return Ok(students);
        }
        [HttpGet("admin/viewInstitutes")]
        public async Task<IActionResult> viewInstitutes()
        {
            var instcou = await Task.Run(() =>
            {
                var result = from i in dc.InstituteModels
                             join r in dc.RatingModels on i.InstituteId equals r.InstituteId into ratingGroup
                             from rg in ratingGroup.DefaultIfEmpty()
                             group rg by new { i.InstituteId, i.InstituteName, i.InstituteAddress, i.ImageUrl } into g
                             select new
                             {
                                 g.Key.InstituteId,
                                 g.Key.InstituteName,
                                 g.Key.ImageUrl,
                                 g.Key.InstituteAddress,
                                 AverageRating = g.Average(r => r != null ? r.Rating : 0)
                             };

                return result.ToList();
            });

            if (instcou == null || instcou.Count == 0)
            {
                return NotFound("NO institutes found with ratings");
            }

            return Ok(instcou);
        }

        [HttpGet("admin/viewCourse")]
        public async Task<IActionResult> ViewCourse()
        {
            var courses = await dc.CourseModels.ToListAsync();

            if (courses == null || courses.Count == 0)
            {
                return NotFound("No courses found");
            }

            return Ok(courses);
        }

        [HttpGet("admin/ViewStudent")]

        public async Task<IActionResult> ViewStudent()
        {
            var students = await Task.Run(() =>
            {
                return (from st in dc.StudentModels
                        from cs in dc.CourseModels
                        where st.CourseId == cs.CourseId
                        select new
                        {
                            StudentId = st.StudentId,
                            FirstName = st.FirstName,
                            LastName = st.LastName,
                            CourseName = cs.CourseName,
                            Mobile = st.Mobile

                        }).ToList();

            });

            if (students == null || students.Count == 0)
            {
                return NotFound("No students found");
            }

            return Ok(students);


        }

        [HttpPost("admin/addInstitute")]
        public async Task<IActionResult> addInstitute([FromBody] InstituteModel institute)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                await dc.InstituteModels.AddAsync(institute);
                await dc.SaveChangesAsync();

                return Ok("Institute added");
            }
            catch
            {
                return StatusCode(500, "An error accoured while adding the institute.");
            }
        }

        [HttpPut("admin/editInstitute/{id}")]
        public async Task<IActionResult> editInstitute(int id, InstituteModel institute)
        {
            try
            {
                if (id != institute.InstituteId)
                {
                    return BadRequest(" Update Not Allowed");
                }
                var std = await dc.InstituteModels.FindAsync(id);
                if (std == null)
                {
                    return NotFound("Institute Not Found");
                }


                std.InstituteName = institute.InstituteName;
                std.InstituteDescription = institute.InstituteDescription;
                std.InstituteAddress = institute.InstituteAddress;
                std.Email = institute.Email;
                std.Mobile = institute.Mobile;
                std.ImageUrl = institute.ImageUrl;



                dc.InstituteModels.Update(std);
                await dc.SaveChangesAsync();

                return Ok("Institute Edited");
            }
            catch
            {
                return StatusCode(500, "An error accoured while editing the institute.");
            }
        }

        [HttpDelete("admin/deleteInstitute/{instituteId}")]
        public async Task<IActionResult> deleteInstitute(int instituteId)
        {
            try
            {
                var institute = await dc.InstituteModels.FindAsync(instituteId);

                if (institute == null)
                {
                    return NotFound(); // Institute not found
                }

                var admissions = await dc.AdmissionModels.Where(a => a.InstituteId == instituteId).ToListAsync();
                dc.AdmissionModels.RemoveRange(admissions);

                var ratings = await dc.RatingModels.Where(r => r.InstituteId == instituteId).ToListAsync();
                dc.RatingModels.RemoveRange(ratings);

                var courses = await dc.CourseModels.Where(c => c.InstituteId == instituteId).ToListAsync();
                dc.CourseModels.RemoveRange(courses);


                dc.InstituteModels.Remove(institute);

                await dc.SaveChangesAsync();

                return Ok("Institute and associated records deleted");
            }
            catch (DbUpdateException ex)
            {
                // Handle the exception
                var errorMessage = "An error occurred while deleting the institute and associated records.";
                if (ex.InnerException != null)
                {
                    errorMessage += " Inner Exception: " + ex.InnerException.Message;
                }

                return StatusCode(500, errorMessage);
            }
        }

        [HttpGet("admin/viewcoursebyId/{InstId}")]
        public IActionResult viewcoursebyId(int InstId)
        {


            var instCourse = (from cour in dc.CourseModels
                              where cour.InstituteId == InstId
                              select new
                              {
                                  CourseId = cour.CourseId,
                                  CourseName = cour.CourseName,
                                  CourseDescription = cour.CourseDescription,
                                  CourseDuration = cour.CourseDuration,
                                  CourseTiming = cour.CourseTiming,
                                  NumberofStudents = cour.NumberofStudents,
                                  InstituteId = cour.InstituteId
                              }).ToList();
            if (instCourse == null || instCourse.Count == 0)
            {
                return NotFound("No courses found for institue");
            }

            return Ok(instCourse);
        }

        [HttpPost("admin/addCourse")]
        public async Task<IActionResult> addCourse([FromBody] CourseModel course)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {

                await dc.CourseModels.AddAsync(course);
                await dc.SaveChangesAsync();
                return Ok("Course added");

            }
            catch
            {
                return StatusCode(500, "An error accoured while adding the course.");
            }
        }

        [HttpPut("admin/editCourse/{id}")]
        public async Task<IActionResult> editCourse(int id, CourseModel course)
        {
            try
            {
                if (id != course.CourseId)
                {
                    return BadRequest(" Update not allowed");
                }

                var std = await dc.CourseModels.FindAsync(id);
                if (std == null)
                {
                    return NotFound("Course not Found");
                }
                std.CourseName = course.CourseName;
                std.CourseDescription = course.CourseDescription;
                std.CourseDuration = course.CourseDuration;
                std.CourseTiming = course.CourseTiming;
                std.NumberofStudents = course.NumberofStudents;
                std.InstituteId = course.InstituteId;



                dc.CourseModels.Update(std);
                await dc.SaveChangesAsync();
                return Ok("Course edited");
            }
            catch
            {
                return StatusCode(500, "An error accoured while updateing the course.");
            }

        }

        [HttpDelete("admin/deleteCourse/{courseId}")]
        public async Task<IActionResult> DeleteCourse(int courseId)
        {
            try
            {
                var course = await dc.CourseModels.FindAsync(courseId);

                if (course == null)
                {
                    return NotFound(); // Course not found
                }
                var progresses = await dc.ProgressModels.Where(p => p.CourseId == courseId).ToListAsync();
                dc.ProgressModels.RemoveRange(progresses);


                var admissions = await dc.AdmissionModels.Where(a => a.CourseId == courseId).ToListAsync();
                dc.AdmissionModels.RemoveRange(admissions);



                var students = await dc.StudentModels.Where(s => s.CourseId == courseId).ToListAsync();
                dc.StudentModels.RemoveRange(students);


                dc.CourseModels.Remove(course);

                await dc.SaveChangesAsync();

                return Ok("Course and associated records deleted");
            }
            catch (DbUpdateException ex)
            {
                // Handle specific database update exceptions
                var errorMessage = "An error occurred while deleting the course and associated records. ";
                if (ex.InnerException != null)
                {
                    errorMessage += "Inner Exception: " + ex.InnerException.Message;
                }
                return StatusCode(500, errorMessage);
            }
            catch (Exception ex)
            {
                // Handle other exceptions
                return StatusCode(500, "An error occurred while deleting the course and associated records. Error: " + ex.Message);
            }
        }

        [HttpPost("admin/addStudent")]
        public async Task<IActionResult> addStudent([FromBody] StudentModel student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                await dc.StudentModels.AddAsync(student);
                await dc.SaveChangesAsync();
                return Ok("Student added");
            }
            catch
            {
                return StatusCode(500, "An error accoured while adding the student.");
            }
        }

        [HttpPut("admin/editStudent/{id}")]
        public async Task<IActionResult> editStudent(int id, StudentModel student)
        {
            try
            {
                if (id != student.StudentId)
                {
                    return BadRequest(" Update Not Allowed");
                }

                var std = await dc.StudentModels.FindAsync(id);
                if (std == null)
                {
                    return NotFound("Student not found");
                }
                std.FirstName = student.FirstName;
                std.LastName = student.LastName;
                std.Nationality = student.Nationality;
                std.FatherName = student.FatherName;
                std.MotherName = student.MotherName;
                std.Gender = student.Gender;
                std.Age = student.Age;
                std.Mobile = student.Mobile;
                std.AlternateMobile = student.AlternateMobile;
                std.Email = student.Email;
                std.CourseId = student.CourseId;
                std.HouseNo = student.HouseNo;
                std.StreetName = student.StreetName;
                std.Pincode = student.Pincode;
                std.AreaName = student.AreaName;
                std.State = student.State;



                dc.StudentModels.Update(std);
                await dc.SaveChangesAsync();
                return Ok("Student details edited");
            }
            catch
            {
                return StatusCode(500, "An error accoured while editing the student.");
            }

        }

        [HttpDelete("admin/deleteStudent/{studentId}")]
        public async Task<IActionResult> DeleteStudent(int studentId)
        {
            try
            {
                var student = await dc.StudentModels.FindAsync(studentId);

                if (student == null)
                {
                    return NotFound();
                }


                var admissions = await dc.AdmissionModels.Where(a => a.StudentId == studentId).ToListAsync();
                dc.AdmissionModels.RemoveRange(admissions);


                dc.StudentModels.Remove(student);

                await dc.SaveChangesAsync();

                return Ok("Student and associated records deleted");
            }
            catch (DbUpdateException ex)
            {

                var errorMessage = "An error occurred while deleting the student and associated records.";

                if (ex.InnerException != null)
                {
                    errorMessage += " Inner Exception: " + ex.InnerException.Message;
                }

                return StatusCode(500, errorMessage);
            }
        }

        [HttpGet("admin/viewonlyInstitutes")]
        public async Task<IActionResult> viewonlyInstitutes()
        {
            var institutes = await dc.InstituteModels.ToListAsync();

            if (institutes == null || institutes.Count == 0)
            {
                return NotFound("No institutes found");
            }

            return Ok(institutes);
        }

        [HttpGet("admin/getinstituteCourses")]
        public async Task<IActionResult> getinstitutesCourses()
        {
            var instcou = await Task.Run(() =>
            {
                return (from i in dc.InstituteModels
                        from c in dc.CourseModels
                        where c.InstituteId == i.InstituteId
                        select new
                        {
                            InstituteName = i.InstituteName,
                            CourseName = c.CourseName,
                            CourseId = c.CourseId
                        }).ToList();
            });

            if (instcou == null || instcou.Count == 0)
            {
                return NotFound("No Institute with courses found");
            }

            return Ok(instcou);
        }
    }
}
    
