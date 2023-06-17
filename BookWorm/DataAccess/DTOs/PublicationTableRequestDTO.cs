using BookWorm.Enums;
using BookWorm.Models;

namespace BookWorm.DataAccess.DTOs
{
    [TypewriterEnabled]
    public class PublicationTableRequestDTO
    {
        public string TextFilter { get; set; }
        public Creator CreatorFilter { get; set; }
        public int? YearFilter { get; set; }
        public Language? LanguageFilter { get; set; }
        public PublicationType? PublicationTypeFilter { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public PublicationTableSortColumn SortColumn { get; set; }
        public SortOrder SortOrder { get; set; }
    }
}
