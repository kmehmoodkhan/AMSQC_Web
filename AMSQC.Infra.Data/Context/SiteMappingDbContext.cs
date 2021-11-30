using AMSQC.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AMSQC.Infra.Data.Context
{
    public class SiteMappingDbContext: DbContext
    {
        public SiteMappingDbContext(DbContextOptions<SiteMappingDbContext> dbContextOptions) : base(dbContextOptions) { }

        public DbSet<SiteMapping> SiteMapping { get; set; }

        public DbSet<UserInfo> UserInfo { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserInfo>().Ignore(t => t.CreatedOn);
            modelBuilder.Entity<UserInfo>().Ignore(t => t.ActiveDirectorySiteName);
            modelBuilder.Entity<UserInfo>().Ignore(t => t.FullName);
            modelBuilder.Entity<UserInfo>().Ignore(t => t.Region);
            modelBuilder.Entity<UserInfo>().Ignore(t => t.RegionId);
            modelBuilder.Entity<UserInfo>().Ignore(t => t.UserGuid);
            modelBuilder.Entity<UserInfo>().Ignore(t => t.UserId);



            modelBuilder.Entity<SiteMapping>(eb =>
            {
                eb.HasNoKey();
                eb.ToTable("dimMasterSite", "curated");
                eb.Property(v => v.OfficeLocation).HasColumnName("ActiveDirectorySiteName");
                eb.Property(v => v.SiteName).HasColumnName("iBodyShopSiteName");
                eb.Property(v => v.SiteId).HasColumnName("SiteId");
                eb.Property(v => v.State).HasColumnName("State");
            });

            modelBuilder.Entity<UserInfo>(eb =>
            {
                eb.HasNoKey();
                eb.ToView("vw_PersonDetail_QCApp", "dbo");
                eb.Property(v => v.FirstName).HasColumnName("FirstName");
                eb.Property(v => v.LastName).HasColumnName("LastName");
                eb.Property(v => v.Role).HasColumnName("Role");
                eb.Property(v => v.UserName).HasColumnName("UserName");
                eb.Property(v => v.SiteId).HasColumnName("SiteId");
                eb.Property(v => v.ActiveDirectorySiteName).HasColumnName("ActiveDirectorySiteName");

              

            });

        }
    }
}
