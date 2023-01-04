using BookWorm.DataAccess;
using BookWorm.Enums;
using BookWorm.Models;
using BookWorm.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookWorm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : Controller
    {
        private readonly BookWormContext _context;
        private readonly IBookRepository _bookRepository;

        public BooksController(BookWormContext context, IBookRepository bookRepository)
        {
            _context = context;
            _bookRepository = bookRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Book>> GetAllBooks()
        {
            return await this._bookRepository.GetBooks();
            
        }

        [HttpPost]
        public async Task<IActionResult> SaveBooks([FromBody] IEnumerable<GoogleBookModel> books)
        {
            var mappedBooks = new List<Book>();

            foreach(var book in books)
            {
                mappedBooks.Add(new Book
                {
                    Title = book.VolumeInfo.Title,
                    Creators = book.VolumeInfo.Authors.Select(authorName =>
                    {
                        var creator = new Creator();
                        var names = authorName.Split(' ');

                        creator.FirstName = names[0];
                        creator.MiddleName = names.Length == 3 ? names[1] : null;
                        creator.LastName = names[^1];

                        return creator;
                    }).ToList(),
                    ISBN = book.VolumeInfo.IndustryIdentifiers
                    .Where(i => i.Type == "ISBN_13")
                    .Select(i => i.Identifier)
                    .FirstOrDefault(),
                    Language = (Language)Enum.Parse(typeof(Language), book.VolumeInfo.Language.ToUpper()),
                    PageCount = book.VolumeInfo.PageCount,
                    PublicationYear = int.Parse(book.VolumeInfo.PublishedDate.Split('-')[0]),
                    PublicationType = PublicationType.Book,
                    Publisher = new Publisher(book.VolumeInfo.Publisher),
                    ImageLink = book.VolumeInfo.ImageLinks.Thumbnail
                });
            }

            await this._context.Books.AddRangeAsync(mappedBooks);
            await this._context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteBooks([FromBody] List<int> bookIds)
        {
            await this._bookRepository.DeleteBooks(bookIds);
            return NoContent();
        }
    }
}
