using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
// using System.dotnetapp.Controllers
// {

//     using Microsoft.AspNetCore.Mvc;

//     [Route("api/[controller]")]
//     [ApiController]
//     public class NameController : ControllerBase
//     {
//         [HttpGet]
//         public async Task<IActionResult> Get()
//         {
            
//             return Ok();
//         }
//     }
// }
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
                return NotFound("No institutes found");
            }

            return Ok(students);
        }
    }
}