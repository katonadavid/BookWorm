using BookWorm.Enums;

namespace BookWorm.Models
{
    [TypewriterEnabled]
    public abstract class Publication
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public PublicationType PublicationType { get; set; }
        public Language Language { get; set; }
        public Publisher Publisher { get; set; }
        public int PublicationYear { get; set; }
        public string ImageLink { get; set; }
        public ICollection<Creator> Creators { get; set; }
    }
}
