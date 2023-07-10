using System;
using System.Collections.Generic;

namespace dotnetapp.Models
{
    public partial class UserModel
    {
        public UserModel()
        {
            AdmissionModels = new HashSet<AdmissionModel>();
            ProgressModels = new HashSet<ProgressModel>();
            RatingModels = new HashSet<RatingModel>();
        }

        public int UserId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
        public string MobileNumber { get; set; }
        public string UserRole { get; set; }

        public virtual ICollection<AdmissionModel> AdmissionModels { get; set; }
        public virtual ICollection<ProgressModel> ProgressModels { get; set; }
        public virtual ICollection<RatingModel> RatingModels { get; set; }
    }
}
