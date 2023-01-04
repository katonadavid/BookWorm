using BookWorm.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookWorm.DataAccess
{
    public class BookRepository : IBookRepository
    {
        private readonly BookWormContext bookWormContext;

        public BookRepository(BookWormContext bookWormContext)
        {
            this.bookWormContext = bookWormContext;
        }

        public async Task<IEnumerable<Book>> GetBooks()
        {
            return await this.bookWormContext.Books.Include(b => b.Creators).ToListAsync();
        }

        public async Task<Book> GetBook()
        {
            return await this.bookWormContext.Books.Include(b => b.Creators).FirstOrDefaultAsync();
        }

        public async Task<Book> AddBook(Book book)
        {
            var newBook = await this.bookWormContext.Books.AddAsync(book);
            await this.bookWormContext.SaveChangesAsync();
            return newBook.Entity;
        }
        public async Task<Book> UpdateBook(Book book)
        {
            var oldBook = await bookWormContext.Books.FirstOrDefaultAsync(b => b.Id == book.Id);

            if (oldBook != null)
            {
                oldBook.Title = book.Title;
                oldBook.Creators = book.Creators;
                oldBook.ISBN = book.ISBN;
                oldBook.Publisher = book.Publisher;
                oldBook.PublicationYear = book.PublicationYear;
                oldBook.ImageLink = book.ImageLink;
                oldBook.PageCount = book.PageCount;
                oldBook.PublicationType = book.PublicationType;
                oldBook.Language= book.Language;

                var result = await this.bookWormContext.SaveChangesAsync();
                return result == 1 ? oldBook : null;
            }
            return null;
        }

        public async Task DeleteBooks(List<int> bookIds)
        {
            this.bookWormContext.Books.RemoveRange(this.bookWormContext.Books.Where(b => bookIds.Contains(b.Id)));
            await this.bookWormContext.SaveChangesAsync();
        }

    }
}
