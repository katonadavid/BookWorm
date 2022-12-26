namespace BookWorm.Models
{
    public class Record : Publication
    {
        public int TrackCount { get; set; }
        public int LengthInSeconds { get; set; }
    }
}
