using System.ComponentModel.DataAnnotations;

namespace BookWorm.Models
{
    [TypewriterEnabled]
    public class Book : Publication
    {
        [Required]
        [MinLength(8)]
        [MaxLength(13)]
        public string ISBN { get; set; }

        [Required]
        public int PageCount { get; set; }
    }
}
