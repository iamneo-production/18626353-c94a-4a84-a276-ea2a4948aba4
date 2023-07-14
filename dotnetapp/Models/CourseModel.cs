using System;
using System.Collections.Generic;

namespace dotnetapp.Models
{
    public partial class CourseModel
    {
        public CourseModel()
        {
            AdmissionModels = new HashSet<AdmissionModel>();
            ProgressModels = new HashSet<ProgressModel>();
            StudentModels = new HashSet<StudentModel>();
        }

        public int CourseId { get; set; }
        public string CourseName { get; set; }
        public string CourseDescription { get; set; }
        public int CourseDuration { get; set; }
        public int? NumberofStudents { get; set; }
        public string CourseTiming { get; set; }
        public int? InstituteId { get; set; }

        public virtual InstituteModel Institute { get; set; }
        public virtual ICollection<AdmissionModel> AdmissionModels { get; set; }
        public virtual ICollection<ProgressModel> ProgressModels { get; set; }
        public virtual ICollection<StudentModel> StudentModels { get; set; }
    }
}
