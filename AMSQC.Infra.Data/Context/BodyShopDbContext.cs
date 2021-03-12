using AMSQC.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace AMSQC.Infra.Data.Context
{
    public class BodyShopDbContext : DbContext
    {
        public BodyShopDbContext(DbContextOptions<BodyShopDbContext> dbContextOptions) : base(dbContextOptions) { }

        public DbSet<Quote> Quote { get; set; }

        public DbSet<Region> Region { get; set; }

        

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
                    eb.Property(v => v.InsurerName).HasColumnName("debtor_name");
                });

            modelBuilder.Entity<Region>(eb =>
            {
                eb.ToTable("Site", "dbo");
                eb.Property(v => v.RegionId).HasColumnName("Site_Id");
                eb.Property(v => v.Title).HasColumnName("name");
            });

            
        }
    }
}
