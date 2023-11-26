using BookWorm.DataAccess.DTOs;
using BookWorm.Enums;
using BookWorm.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookWorm.DataAccess
{
    public class PublicationRepository : IPublicationRepository
    {
        private readonly BookWormContext bookWormContext;

        public PublicationRepository(BookWormContext bookWormContext)
        {
            this.bookWormContext = bookWormContext;
        }

        public async Task<PublicationTableResponseDTO> GetPublications(PublicationTableRequestDTO request)
        {
            int count = this.bookWormContext.Publications.Count();

            IQueryable<Publication> query = this.bookWormContext.Publications.Include(p => p.Creators);

            if (!String.IsNullOrEmpty(request.TextFilter))
            {
                query = query.Where(p => p.Title.Contains(request.TextFilter));
            }

            switch (request.SortColumn)
            {
                case PublicationTableSortColumn.Title:
                    query = request.SortOrder == SortOrder.Ascending ? query.OrderBy(p => p.Title) : query.OrderByDescending(p => p.Title);
                    break;
                case PublicationTableSortColumn.PublicationYear:
                    query = request.SortOrder == SortOrder.Ascending ? query.OrderBy(p => p.PublicationYear) : query.OrderByDescending(p => p.PublicationYear);
                    break;
                default:
                    query = query.OrderBy(p => p.Title);
                    break;
            }

            var items = await query.Skip(request.PageSize * request.PageIndex).Take(request.PageSize).ToListAsync();

            return new PublicationTableResponseDTO
            {
                TotalItems = count,
                Results = items
            };
        }

        public async Task<Publication> GetPublication(int publicationId)
        {
            return await this.bookWormContext.Publications.Include(b => b.Creators).FirstOrDefaultAsync();
        }

        public async Task<Publication> AddPublication(Publication publication)
        {
            var newPublication = await this.bookWormContext.Publications.AddAsync(publication);
            await this.bookWormContext.SaveChangesAsync();
            return newPublication.Entity;
        }
        public async Task<Publication> UpdatePublication(Publication publication)
        {
            Publication oldPublication = null;

            if (publication.PublicationType == PublicationType.Book)
            {
                oldPublication = await bookWormContext.Books.FirstOrDefaultAsync(b => b.Id == publication.Id);
                Book oldBook = oldPublication as Book;
                Book book = publication as Book;
                oldBook.ISBN = book.ISBN;
                oldBook.PageCount = book.PageCount;
            }

            if (oldPublication != null)
            {
                oldPublication.Title = publication.Title;
                oldPublication.Creators = publication.Creators;
                oldPublication.Publisher = publication.Publisher;
                oldPublication.PublicationYear = publication.PublicationYear;
                oldPublication.ImageLink = publication.ImageLink;
                oldPublication.PublicationType = publication.PublicationType;
                oldPublication.Language= publication.Language;

                var result = await this.bookWormContext.SaveChangesAsync();
                return result == 1 ? oldPublication : null;
            }
            return null;
        }

        public async Task DeletePublications(List<Guid> publicationIds)
        {
            this.bookWormContext.Publications.RemoveRange(this.bookWormContext.Books.Where(b => publicationIds.Contains(b.Id)));
            await this.bookWormContext.SaveChangesAsync();
        }
    }
}
