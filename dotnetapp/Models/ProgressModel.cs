using System;
using System.Collections.Generic;

namespace dotnetapp.Models
{
    public partial class ProgressModel
    {
        public int ProgressId { get; set; }
        public decimal? ProgressPercentage { get; set; }
        public DateTime? Timestamp { get; set; }
        public string Status { get; set; }
        public int? UserId { get; set; }
        public int? CourseId { get; set; }

        public virtual CourseModel Course { get; set; }
        public virtual UserModel User { get; set; }
    }
}
