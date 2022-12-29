namespace BookWorm.Models.DTOs
{
    [TypewriterEnabled]
    public class GoogleBookModel
    {
        public string Id { get; set; }
        public VolumeInfo VolumeInfo { get; set; }
    }
}