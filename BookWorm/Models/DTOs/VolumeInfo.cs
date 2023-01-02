namespace BookWorm.Models.DTOs
{
    [TypewriterEnabled]
    public class VolumeInfo
    {
        public string Title { get; set; }
        public ICollection<string> Authors { get; set; }
        public ICollection<string> Categories { get; set; }
        public string Description { get; set; }
        public ImageLinks ImageLinks { get; set; }
        public ICollection<IndustryIdentifier> IndustryIdentifiers { get; set; }
        public string Language { get; set; }
        public int PageCount { get; set; }
        public string PrintType { get; set; }
        public string PublishedDate { get; set; }
        public string Publisher { get; set; }
    }
}
