namespace BookWorm.Models.DTOs
{
    [TypewriterEnabled]
    public class VolumeInfo
    {
        public string Title { get; set; }
        public string Authors { get; set; }
        public string Categories { get; set; }
        public string Description { get; set; }
        public ImageLinks ImageLinks { get; set; }
        public string Language { get; set; }
        public int PageCount { get; set; }
        public string PrintType { get; set; }
        public DateTime PublishedDate { get; set; }
    }
}
