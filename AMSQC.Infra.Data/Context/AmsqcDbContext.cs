using AMSQC.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AMSQC.Infra.Data.Context
{
    public class AmsqcDbContext : DbContext
    {
        public AmsqcDbContext(DbContextOptions<AmsqcDbContext> dbContextOptions) : base(dbContextOptions) { }
        public DbSet<QuoteDetail> QuoteDetail { get; set; }
        public DbSet<UserInfo> UserInfo { get; set; }
        public DbSet<Question> Question { get; set; }
        public DbSet<QuestionOption> QuestionOption { get; set; }
        public DbSet<UserQuestionResponse> UserQuestionResponse { get; set; }

        public DbSet<Site> Site { get; set; }

        public DbSet<State> States { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<QuoteDetail>().ToTable("QuoteDetail");
            modelBuilder.Entity<UserInfo>().ToTable("UserInfo");
            modelBuilder.Entity<Question>().ToTable("Question");
            modelBuilder.Entity<QuestionOption>().ToTable("QuestionOption");
            modelBuilder.Entity<UserQuestionResponse>().ToTable("UserQuestionResponse");
            modelBuilder.Entity<State>().ToTable("States");
            modelBuilder.Entity<Site>().ToTable("Sites");
        }
    }
}
