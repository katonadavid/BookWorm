using BookWorm.DataAccess;
using BookWorm.DataAccess.DTOs;
using BookWorm.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookWorm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublicationsController : ControllerBase
    {
        IPublicationRepository _publicationRepository;

        public PublicationsController(IPublicationRepository publicationRepository)
        {
            _publicationRepository= publicationRepository;
        }

        [HttpGet]
        public async Task<PublicationTableResponseDTO> GetPublications([FromQuery] PublicationTableRequestDTO request)
        {
            return await this._publicationRepository.GetPublications(request);
        }

        [HttpGet("{id}")]
        public async Task<Publication> GetPublication([FromQuery] int publicationId)
        {
            return await this._publicationRepository.GetPublication(publicationId);
        }

        [HttpPost]
        public async Task<Publication> AddPublication(Publication publication)
        {
            return await this._publicationRepository.AddPublication(publication);
        }

        [HttpPut]
        public async Task<Publication> UpdatePublication(Publication publication)
        {
            return await this._publicationRepository.UpdatePublication(publication);
        }

        [HttpDelete]
        public async Task<IActionResult> DeletePublications([FromBody] List<Guid> bookIds)
        {
            await this._publicationRepository.DeletePublications(bookIds);
            return NoContent();
        }
    }
}
