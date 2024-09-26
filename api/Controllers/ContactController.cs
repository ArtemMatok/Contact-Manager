using System.Windows.Markup;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactRepository _contactRepository;

        public ContactController(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        [HttpPost("Upload")]
        public async Task<IActionResult> UploadCSV(IFormFile file)
        {
            if (file is null || file.Length == 0)
            {
                return BadRequest("No file upload");
            }

            var result = await _contactRepository.UploadCSV(file);

            if(result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("Something went wrong during uploading...");
            }
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllContacts()
        {
            var contacts = await _contactRepository.GetContacts();

            if(contacts is null)
            {
                return Ok(new List<Contact>());
            }

            return Ok(contacts);
        }


        [HttpPut("UpdateContact/{contactId}")]
        public async Task<IActionResult> UpdateContact(int contactId, Contact updateContact)
        {
            if(updateContact is null)
            {
                return BadRequest("Updating contact is null");
            }

            var contact = await _contactRepository.UpdateContact(contactId, updateContact);

            if(contact is null)
            {
                return NotFound();
            }

            var contacts = await _contactRepository.GetContacts();

            return Ok(contacts);
        }

        [HttpDelete("Delete/{contactId}")]
        public async Task<IActionResult> DeleteContact(int contactId)
        {
            var result = await _contactRepository.DeleteContact(contactId);
            if(!result)
            {
                return NotFound();
            }

            var contacts = await _contactRepository.GetContacts();

            return Ok(contacts);
        }
    }
}
