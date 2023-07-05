using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace dotnetapp.Models
{
    public partial class TestDBContext : DbContext
    {
        public TestDBContext()
        {
        }

        public TestDBContext(DbContextOptions<TestDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AdminModel> AdminModels { get; set; }
        public virtual DbSet<AdmissionModel> AdmissionModels { get; set; }
        public virtual DbSet<CourseModel> CourseModels { get; set; }
        public virtual DbSet<InstituteModel> InstituteModels { get; set; }
        public virtual DbSet<LoginModel> LoginModels { get; set; }
        public virtual DbSet<ProgressModel> ProgressModels { get; set; }
        public virtual DbSet<RatingModel> RatingModels { get; set; }
        public virtual DbSet<StudentModel> StudentModels { get; set; }
        public virtual DbSet<UserModel> UserModels { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
// #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//                 optionsBuilder.UseSqlServer("User Id =sa; password=examlyMssql@123;server=localhost;Database = TestDB;trusted_connection =false;persist Security Info =False;Encrypt=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AdminModel>(entity =>
            {
                entity.HasKey(e => e.AdminId)
                    .HasName("PK__AdminMod__AD0500A641BE4EE2");

                entity.ToTable("AdminModel");

                entity.Property(e => e.AdminId).HasColumnName("adminId");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.MobileNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("mobileNumber");

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("password");

                entity.Property(e => e.UserRole)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("userRole");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("username");
            });

            modelBuilder.Entity<AdmissionModel>(entity =>
            {
                entity.HasKey(e => e.AdmissionId)
                    .HasName("PK__Admissio__705A8259EA167B94");

                entity.ToTable("AdmissionModel");

                entity.Property(e => e.AdmissionId).HasColumnName("admissionId");

                entity.Property(e => e.CourseId).HasColumnName("courseId");

                entity.Property(e => e.DateofJoining)
                    .HasColumnType("date")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.InstituteId).HasColumnName("instituteId");

                entity.Property(e => e.StudentId).HasColumnName("studentId");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.AdmissionModels)
                    .HasForeignKey(d => d.CourseId)
                    .HasConstraintName("FK__Admission__cours__440B1D61");

                entity.HasOne(d => d.Institute)
                    .WithMany(p => p.AdmissionModels)
                    .HasForeignKey(d => d.InstituteId)
                    .HasConstraintName("FK__Admission__insti__4316F928");

                entity.HasOne(d => d.Student)
                    .WithMany(p => p.AdmissionModels)
                    .HasForeignKey(d => d.StudentId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Admission__stude__45F365D3");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AdmissionModels)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Admission__userI__44FF419A");
            });

            modelBuilder.Entity<CourseModel>(entity =>
            {
                entity.HasKey(e => e.CourseId)
                    .HasName("PK__CourseMo__2AA84FD10767D45B");

                entity.ToTable("CourseModel");

                entity.Property(e => e.CourseId).HasColumnName("courseId");

                entity.Property(e => e.CourseDescription)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("courseDescription");

                entity.Property(e => e.CourseDuration).HasColumnName("courseDuration");

                entity.Property(e => e.CourseName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("courseName");

                entity.Property(e => e.CourseTiming)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("courseTiming");

                entity.Property(e => e.InstituteId).HasColumnName("instituteId");

                entity.Property(e => e.NumberofStudents).HasColumnName("numberofStudents");

                entity.HasOne(d => d.Institute)
                    .WithMany(p => p.CourseModels)
                    .HasForeignKey(d => d.InstituteId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__CourseMod__insti__2C3393D0");
            });

            modelBuilder.Entity<InstituteModel>(entity =>
            {
                entity.HasKey(e => e.InstituteId)
                    .HasName("PK__Institut__AF018B2C2C390C5D");

                entity.ToTable("InstituteModel");

                entity.Property(e => e.InstituteId).HasColumnName("instituteId");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.ImageUrl)
                    .HasMaxLength(300)
                    .IsUnicode(false)
                    .HasColumnName("imageUrl");

                entity.Property(e => e.InstituteAddress)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("instituteAddress");

                entity.Property(e => e.InstituteDescription)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("instituteDescription");

                entity.Property(e => e.InstituteName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("instituteName");

                entity.Property(e => e.Mobile)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("mobile");
            });

            modelBuilder.Entity<LoginModel>(entity =>
            {
                entity.HasKey(e => e.LoginId)
                    .HasName("PK__LoginMod__1F5EF4CF4AB45A19");

                entity.ToTable("LoginModel");

                entity.Property(e => e.LoginId).HasColumnName("loginId");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("password");
            });

            modelBuilder.Entity<ProgressModel>(entity =>
            {
                entity.HasKey(e => e.ProgressId)
                    .HasName("PK__Progress__0F2BDC7D48F8D384");

                entity.ToTable("ProgressModel");

                entity.Property(e => e.ProgressId).HasColumnName("progressId");

                entity.Property(e => e.CourseId).HasColumnName("courseId");

                entity.Property(e => e.ProgressPercentage)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("progressPercentage");

                entity.Property(e => e.Status)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("status");

                entity.Property(e => e.Timestamp).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.ProgressModels)
                    .HasForeignKey(d => d.CourseId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__ProgressM__cours__4AB81AF0");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ProgressModels)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__ProgressM__userI__49C3F6B7");
            });

            modelBuilder.Entity<RatingModel>(entity =>
            {
                entity.HasKey(e => e.RatingId)
                    .HasName("PK__RatingMo__2D290CA956972AD5");

                entity.ToTable("RatingModel");

                entity.Property(e => e.RatingId).HasColumnName("ratingId");

                entity.Property(e => e.Comments)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.InstituteId).HasColumnName("instituteId");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.Institute)
                    .WithMany(p => p.RatingModels)
                    .HasForeignKey(d => d.InstituteId)
                    .HasConstraintName("FK__RatingMod__insti__3E52440B");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.RatingModels)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__RatingMod__userI__3F466844");
            });

            modelBuilder.Entity<StudentModel>(entity =>
            {
                entity.HasKey(e => e.StudentId)
                    .HasName("PK__StudentM__4D11D63CD1C31FA0");

                entity.ToTable("StudentModel");

                entity.Property(e => e.StudentId).HasColumnName("studentId");

                entity.Property(e => e.AlternateMobile)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("alternateMobile");

                entity.Property(e => e.AreaName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("areaName");

                entity.Property(e => e.CourseId).HasColumnName("courseId");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.FatherName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("fatherName");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("firstName");

                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.HouseNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("lastName");

                entity.Property(e => e.Mobile)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("mobile");

                entity.Property(e => e.MotherName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("motherName");

                entity.Property(e => e.Nationality)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Pincode).HasColumnName("pincode");

                entity.Property(e => e.State)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("state");

                entity.Property(e => e.StreetName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("streetName");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.StudentModels)
                    .HasForeignKey(d => d.CourseId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__StudentMo__cours__37A5467C");
            });

            modelBuilder.Entity<UserModel>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK__UserMode__CB9A1CFFB81ADADF");

                entity.ToTable("UserModel");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.MobileNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("mobileNumber");

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("password");

                entity.Property(e => e.UserRole)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("userRole");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("username");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
