using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace UniEatsBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Image : ControllerBase
    {
        private readonly string _imageFolder = Path.Combine(Directory.GetCurrentDirectory(), "UploadedImages");

        public Image()
        {
            // Ensure the folder exists
            if (!Directory.Exists(_imageFolder))
            {
                Directory.CreateDirectory(_imageFolder);
            }
        }

        /// <summary>
        /// Handles image upload from the client.
        /// </summary>
        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile image)
        {
            if (image == null || image.Length == 0)
            {
                return BadRequest("No image selected or file is empty.");
            }

            var filePath = Path.Combine(_imageFolder, image.FileName);

            try
            {
                // Save the file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                return Ok(new
                {
                    Message = "Image uploaded successfully.",
                    FilePath = $"/UploadedImages/{image.FileName}"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}