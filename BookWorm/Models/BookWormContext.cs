using BookWorm.Models;
using Microsoft.EntityFrameworkCore;

namespace BookWorm
{
    public class BookWormContext : DbContext
    {
        public BookWormContext(DbContextOptions<BookWormContext> options) : base(options)
        {

        }
        public DbSet<Publication> Publications { get; set; }
        public DbSet<Creator> Creators { get; set; }
        public DbSet<Publisher> Publishers { get; set; }
        public DbSet<BookWorm.Models.Book> Book { get; set; }
    }
}
