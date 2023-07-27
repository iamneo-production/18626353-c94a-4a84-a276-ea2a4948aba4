using System;
using System.Collections.Generic;

namespace dotnetapp.Models
{
    public partial class InstituteModel
    {
        public InstituteModel()
        {
            AdmissionModels = new HashSet<AdmissionModel>();
            CourseModels = new HashSet<CourseModel>();
            RatingModels = new HashSet<RatingModel>();
        }

        public int InstituteId { get; set; }
        public string InstituteName { get; set; }
        public string InstituteDescription { get; set; }
        public string InstituteAddress { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string ImageUrl { get; set; }

        public virtual ICollection<AdmissionModel> AdmissionModels { get; set; }
        public virtual ICollection<CourseModel> CourseModels { get; set; }
        public virtual ICollection<RatingModel> RatingModels { get; set; }
    }
}
