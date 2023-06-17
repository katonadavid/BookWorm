using BookWorm.Enums;
using BookWorm.Models;

namespace BookWorm.DataAccess.DTOs
{
    [TypewriterEnabled]
    public class PublicationTableResponseDTO
    {
        public int TotalItems { get; set; }
        public IEnumerable<Publication> Results { get; set; }
    }
}
