using System;
using System.Threading.Tasks;
using dotnetapp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly TestDBContext dbContext;

        public AuthController(TestDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        [Route("user/loginby22")]
        public async Task<bool> IsUserPresent22([FromBody] LoginModel data)
        {
            var email = data.Email;
            var password = data.Password;

            var user = await dbContext.UserModels.SingleOrDefaultAsync(u => u.Email == email);

            if (user != null && user.Password == password)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        [HttpPost]
        [Route("user/login")]
        public async Task<IActionResult> IsUserPresent([FromBody] LoginModel data)
        {
            var email = data.Email;
            var password = data.Password;

            var user = await dbContext.UserModels.SingleOrDefaultAsync(u => u.Email == email);

            if (user != null && user.Password == password)
            {
                return Created("userlogin",true);
            }
            else
            {
                return Created("userlogin",false);
            }
        }

        [HttpPost("admin/login")]
        public async Task<bool> IsAdminPresent([FromBody] LoginModel data)
        {
            var email = data.Email;
            var password = data.Password;

            var admin = await dbContext.AdminModels.SingleOrDefaultAsync(u => u.Email == email);

            if (admin != null && admin.Password == password)
            {
                return true;
            }
            else
            {
                return false;
            }
        }


        [HttpPost("user/signup")]
        public async Task<IActionResult> UserSignup([FromBody] UserModel user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                dbContext.UserModels.Add(user);
                await dbContext.SaveChangesAsync();
                return Ok("User record created successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating user record");
            }
        }

        [HttpPost("admin/signup")]
        public async Task<IActionResult> AdminSignup([FromBody] AdminModel admin)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                dbContext.AdminModels.Add(admin);
                await dbContext.SaveChangesAsync();
                return Ok("Admin record created successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating admin record");
            }
        }

        [HttpGet("{email}/username")]
        public async Task<IActionResult> GetUsernameByEmail(string email)
        {
            try
            {
                var user = await dbContext.UserModels.FirstOrDefaultAsync(u => u.Email == email);
                var admin = await dbContext.AdminModels.FirstOrDefaultAsync(a => a.Email == email);

                if (user != null)
                {
                    return Ok(user.Username);
                }
                else if (admin != null)
                {
                    return Ok(admin.Username);
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to retrieve username. Please try again.");
            }
        }

        [HttpGet("user/{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            try
            {
                var user = await dbContext.UserModels.FirstOrDefaultAsync(u => u.Email == email);

                if (user != null)
                {
                    var userInfo = new
                    {
                        user.UserId,
                        user.Username,
                        user.Email
                    };

                    return Ok(userInfo);
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to retrieve user information. Please try again.");
            }
        }
    }
}