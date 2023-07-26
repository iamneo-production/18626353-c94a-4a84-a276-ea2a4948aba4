using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Text.Json;
using System.Text.Json.Serialization;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TestDBContext bc;

        public UserController(TestDBContext bc)
        {
            this.bc = bc;
        }

        [HttpGet("user/viewAdmission1")]
        public async Task<IActionResult> ViewAdmission1(int admissionId)
        {
            try
            {
                var ac = await Task.Run(() =>
                {
                    var admissionCourse = (from c in bc.CourseModels
                                           from a in bc.AdmissionModels
                                           from s in bc.StudentModels
                                           where a.AdmissionId == admissionId && s.StudentId == a.StudentId && c.CourseId == a.CourseId
                                           select new
                                           {
                                               AdmissionId = a.AdmissionId,
                                               FirstName = s.FirstName,
                                               LastName = s.LastName,
                                               Mobile = s.Mobile,
                                               Age = s.Age,
                                               Gender = s.Gender,
                                               HouseNo = s.HouseNo,
                                               StreetName = s.StreetName,
                                               AreaName = s.AreaName,
                                               State = s.State,
                                               Pincode = s.Pincode,
                                               Nationality = s.Nationality,
                                               CourseId = s.CourseId,
                                               FatherName = s.FatherName,
                                               MotherName = s.MotherName,
                                               Email = s.Email,
                                               AlternateMobile = s.AlternateMobile,
                                               CourseName = c.CourseName,
                                               CourseDescription = c.CourseDescription,
                                               CourseDuration = c.CourseDuration,
                                               NumberofStudents = c.NumberofStudents,
                                               CourseTiming = c.CourseTiming,
                                               Instituteid = c.InstituteId,
                                               DateofJoining = a.DateofJoining,
                                               EndDate = a.EndDate,
                                               UserId = a.UserId
                                           });

                    return admissionCourse.ToList();
                });

                if (ac == null || ac.Count == 0)
                {
                    return NotFound("No Admissions Found");
                }

                return Ok(ac);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error in viewadmission"+ex.Message);
            }
        }

        [HttpGet]
        [Route("user/ViewAdmissionby")]
        public async Task<IActionResult> viewAdmissionby(int userId)
        {
            try
            {
                var ac = await Task.Run(() =>
                {
                    var admissionCourse = from c in bc.CourseModels
                                          from a in bc.AdmissionModels
                                          from s in bc.StudentModels
                                          where a.UserId == userId && s.StudentId == a.StudentId && c.CourseId == a.CourseId
                                          select new
                                          {
                                              AdmissionId = a.AdmissionId,
                                              FirstName = s.FirstName,
                                              LastName = s.LastName,
                                              Mobile = s.Mobile,
                                              Age = s.Age,
                                              Gender = s.Gender,
                                              HouseNo = s.HouseNo,
                                              StreetName = s.StreetName,
                                              AreaName = s.AreaName,
                                              State = s.State,
                                              Pincode = s.Pincode,
                                              Nationality = s.Nationality,
                                              CourseId = s.CourseId,
                                              FatherName = s.FatherName,
                                              MotherName = s.MotherName,
                                              Email = s.Email,
                                              AlternateMobile = s.AlternateMobile,
                                              CourseName = c.CourseName,
                                              CourseDescription = c.CourseDescription,
                                              CourseDuration = c.CourseDuration,
                                              NumberofStudents = c.NumberofStudents,
                                              CourseTiming = c.CourseTiming,
                                              Instituteid = c.InstituteId,
                                              DateofJoining = a.DateofJoining,
                                              EndDate = a.EndDate,
                                              UserId = a.UserId
                                          };
                    return admissionCourse.ToList();
                });

                if (ac == null || ac.Count == 0)
                {
                    return NotFound("No Admissions Found");
                }

                return Ok(ac);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error in viewadmisssion"+ex.Message);
            }
        }

        [HttpPost("user/addAdmission/{courseid}/{instituteid}/{userid}")]
        public async Task<IActionResult> AddAdmission(StudentModel student, int courseid, int instituteid, int userid)
        {
            try
            {
                await bc.StudentModels.AddAsync(student);
                await bc.SaveChangesAsync();

                var course = bc.CourseModels.Find(courseid);
                if (course == null)
                {
                    return BadRequest("Invalid course ID");
                }

                var admission = new AdmissionModel
                {
                    StudentId = student.StudentId,
                    CourseId = courseid,
                    InstituteId = instituteid,
                    UserId = userid,
                    DateofJoining = DateTime.Today,
                    EndDate = bc.CalculateEndDate(course.CourseDuration, DateTime.Today)
                };

                bc.AdmissionModels.Add(admission);
                bc.SaveChanges();

                var options = new JsonSerializerOptions
                {
                    ReferenceHandler = ReferenceHandler.Preserve
                };
                var serializedAdmission = JsonSerializer.Serialize(admission, options);

                return Ok("AdmissionAdded");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error in adding admission"+ ex.Message);
            }
        }

        [HttpPut("user/editAdmission/{admissionId}")]
        public async Task<IActionResult> UpdateAdmission(int admissionId, StudentModel s)
        {
            try
            {
                var admission = bc.AdmissionModels.FirstOrDefault(a => a.AdmissionId == admissionId);
                if (admission == null)
                {
                    return BadRequest("Update Not Allowed");
                }

                var st = bc.StudentModels.Find(admission.StudentId);
                if (st == null)
                {
                    return BadRequest("Update Not Allowed");
                }

                st.FirstName = s.FirstName;
                st.LastName = s.LastName;
                st.Mobile = s.Mobile;
                st.Age = s.Age;
                st.Gender = s.Gender;
                st.HouseNo = s.HouseNo;
                st.StreetName = s.StreetName;
                st.AreaName = s.AreaName;
                st.State = s.State;
                st.Pincode = s.Pincode;
                st.Nationality = s.Nationality;
                st.CourseId = s.CourseId;
                st.FatherName = s.FatherName;
                st.MotherName = s.MotherName;
                st.Email = s.Email;
                st.AlternateMobile = s.AlternateMobile;

                await bc.SaveChangesAsync();

                var options = new JsonSerializerOptions
                {
                    ReferenceHandler = ReferenceHandler.Preserve
                };

                var serializedAdmission = JsonSerializer.Serialize(st, options);
                return Ok(serializedAdmission);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error in editing admission"+ ex.Message);
            }
        }

        [HttpDelete("user/deleteAdmission/{admissionId}")]
        public async Task<IActionResult> deleteAdmission(int admissionId)
        {
            try
            {
                var admission = bc.AdmissionModels.FirstOrDefault(a => a.AdmissionId == admissionId);

                if(admission == null)
                {
                    return NotFound("Admission not Found");

                }

                bc.AdmissionModels.Remove(admission);
                await bc.SaveChangesAsync();
                return Ok(admissionId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error in deleting admission"+ ex.Message);
            }
        }

        [HttpGet]
        [Route("user/viewStatus11")]
        public async Task<IActionResult> viewStatus11(Decimal progresspercentage, int userid, int courseid)
        {
            try
            {
                var admission = bc.AdmissionModels.FirstOrDefault(a => a.UserId == userid && a.CourseId == courseid);
                if (admission == null)
                {
                    return NotFound("No Admission Found");
                }

                var progress = new ProgressModel
                {
                    UserId = userid,
                    CourseId = admission.CourseId,
                    ProgressPercentage = progresspercentage,
                    Status = bc.CalculateStatus(progresspercentage, admission.EndDate),
                    Timestamp = DateTime.Now
                };

                await bc.ProgressModels.AddAsync(progress);
                await bc.SaveChangesAsync();

                if (progress == null)
                {
                    return NotFound("No Status Found");
                }
                return Ok(progress);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error in viewStatus" + ex.Message);
            }
        }

        [HttpPost("user/viewstatusby")]
        public async Task<IActionResult> ViewStatusby(Decimal progresspercentage, int userid, int courseid)
        {
            try
            {
                var admission = bc.AdmissionModels.FirstOrDefault(a => a.UserId == userid && a.CourseId == courseid);
                if (admission != null)
                {
                    var progress = new ProgressModel
                    {
                        UserId = userid,
                        CourseId = admission.CourseId,
                        ProgressPercentage = progresspercentage,
                        Status = bc.CalculateStatus(progresspercentage, admission.EndDate),
                        Timestamp = DateTime.Now
                    };
                    await bc.ProgressModels.AddAsync(progress);
                    await Task.Run(() => bc.SaveChanges());
                    return Ok(progress);
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error in creating the Status" + ex.Message);
            }
        }

        [HttpPut("user/updatestatus/{progressId}")]
        public async Task<IActionResult> UpdateStatus(decimal progressPercentage, int progressId)
        {
            try
            {
                var progress = bc.ProgressModels.FirstOrDefault(p => p.ProgressId == progressId);
                if (progress == null)
                {
                    return NotFound("No progress found");
                }
                var admission = bc.AdmissionModels.FirstOrDefault(a => a.UserId == progress.UserId && a.CourseId == progress.CourseId);
                if (admission == null)
                {
                    return NotFound("No admission found");
                }
                progress.ProgressPercentage = progressPercentage;
                progress.Status = bc.CalculateStatus(progressPercentage, admission.EndDate);
                progress.Timestamp = DateTime.Now;
                await bc.SaveChangesAsync();
                return Ok(progress);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error in UpdateStatus" + ex.Message);
            }
        }

        [HttpGet("institute with rating")]
        public async Task<IActionResult> instituterating()
        {
            try
            {
                var instrat = await Task.Run(() =>
                {
                    return (from i in bc.InstituteModels
                            join r in bc.RatingModels on i.InstituteId equals r.InstituteId
                            group r by new { i.InstituteName, i.InstituteAddress, i.ImageUrl, i.InstituteId } into g
                            select new
                            {
                                InstituteId = g.Key.InstituteId,
                                InstituteName = g.Key.InstituteName,
                                InstituteAddress = g.Key.InstituteAddress,
                                AverageRating = g.Average(r => r.Rating),
                                ImageUrl = g.Key.ImageUrl
                            }).ToList();
                });
                return Ok(instrat);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error creating rating for Institute" + ex.Message);
            }
        }

        [HttpPost("RateInstitute")]
        public async Task<IActionResult> RateInstitute(RatingModel R)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                await bc.RatingModels.AddAsync(R);
                await bc.SaveChangesAsync();
                return Ok("Rating added");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error RateInstitute"+ex.Message);
            }
        }

        [HttpGet("GetRatingsForInstitute/{instituteId}")]
        public IActionResult GetRatingsForInstitute(int instituteId)
        {
            try
            {
                var ratings = (from r in bc.RatingModels
                               join u in bc.UserModels on r.UserId equals u.UserId
                               where r.InstituteId == instituteId
                               select new
                               {
                                   UserId = u.UserId,
                                   Username = u.Username,
                                   RatingId = r.RatingId,
                                   Rating = r.Rating,
                                   Comment = r.Comments,
                                   Date = r.Date,
                               }).ToList();

                return Ok(ratings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error creating ratings"+ ex.Message);
            }
        }

        [HttpGet("Getinstrat")]
        public async Task<IActionResult> Getinstrat()
        {
            try
            {
                var instcou = await Task.Run(() =>
                {
                    var result = from i in bc.InstituteModels
                                 join r in bc.RatingModels on i.InstituteId equals r.InstituteId into ratingGroup
                                 from rg in ratingGroup.DefaultIfEmpty()
                                 group rg by new { i.InstituteId, i.InstituteName, i.ImageUrl, i.InstituteAddress } into g
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

                return Ok(instcou);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error in get Average rating" + ex.Message);
            }
        }

        [HttpGet]
        [Route("user/ViewAdmission")]
        public async Task<IActionResult> ViewAdmission()
        {
            var admissions = await bc.AdmissionModels.ToListAsync();
            return Ok(admissions);
        }

        [HttpGet]
        [Route("user/viewStatus")]
        public async Task<IActionResult> viewStatus()
        {
            var admissions = await bc.AdmissionModels.ToListAsync();
            return Ok(admissions);
        }



    }
}