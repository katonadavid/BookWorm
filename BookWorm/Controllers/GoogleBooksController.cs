using BookWorm.DataAccess;
using BookWorm.Enums;
using BookWorm.Models;
using BookWorm.Models.Google;
using Microsoft.AspNetCore.Mvc;

namespace BookWorm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleBooksController : Controller
    {
        private readonly BookWormContext _context;

        public GoogleBooksController(BookWormContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> SaveBooks([FromBody] IEnumerable<GoogleBookModel> books)
        {
            var mappedBooks = new List<Book>();

            foreach(var book in books)
            {
                if (book.VolumeInfo.IndustryIdentifiers != null && book.VolumeInfo.Publisher != null
                    && book.VolumeInfo.PublishedDate != null )
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
            }

            await this._context.Books.AddRangeAsync(mappedBooks);
            await this._context.SaveChangesAsync();
            return Ok();
        }
    }
}
