using AMSQC.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AMSQC.Infra.Data.Context
{
    public class AmsqcDbContext : DbContext
    {
        public AmsqcDbContext(DbContextOptions<AmsqcDbContext> dbContextOptions) : base(dbContextOptions) { }
        public DbSet<QuoteDetail> QuoteDetail { get; set; }


    }
}
