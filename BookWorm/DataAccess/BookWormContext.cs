using BookWorm.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace BookWorm.DataAccess
{
    public class BookWormContext : DbContext
    {
        public BookWormContext(DbContextOptions<BookWormContext> options) : base(options)
        {

        }
        public DbSet<Publication> Publications { get; set; }
        public DbSet<Creator> Creators { get; set; }
        public DbSet<Publisher> Publishers { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Record> Records { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Publication>().UseTpcMappingStrategy();
            modelBuilder.Entity<Book>().UseTpcMappingStrategy();
            modelBuilder.Entity<Record>().UseTpcMappingStrategy();

            modelBuilder.Entity<Publication>().HasMany(p => p.Creators).WithMany(c => c.Publications);
        }


    }
}
