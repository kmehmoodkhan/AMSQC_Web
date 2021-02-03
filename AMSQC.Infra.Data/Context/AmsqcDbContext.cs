using AMSQC.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AMSQC.Infra.Data.Context
{
    public class AmsqcDbContext : DbContext
    {
        public AmsqcDbContext(DbContextOptions<AmsqcDbContext> dbContextOptions) : base(dbContextOptions) { }
        public DbSet<Quote> Quote { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Quote>(eb =>
                {
                    eb.HasNoKey();
                    eb.ToView("vw_Jobs_In_and_Out_QualityCharter", "ama");
                    eb.Property(v => v.Company).HasColumnName("VehiclemakeGroup");
                    eb.Property(v => v.Model).HasColumnName("Vehicle_model");
                    eb.Property(v => v.Color).HasColumnName("vehicle_colour");
                    eb.Property(v => v.Registration).HasColumnName("Vehicle_registration");
                    eb.Property(v => v.QuoteId).HasColumnName("estimate_number");
                });
        }

    }
}
