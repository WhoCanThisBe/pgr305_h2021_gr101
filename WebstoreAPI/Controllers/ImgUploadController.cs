using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace WebstoreAPI.Controllers
{
    [ApiController]
    [Route("ImageUpload")]
    public class ImgUploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _hosting;
        
        public ImgUploadController(IWebHostEnvironment hosting)
        {
            _hosting = hosting;
        }
        [HttpPost]
        [Route("[action]")]
        public ActionResult SaveImage(IFormFile file)
        {
            string webRootPath = _hosting.WebRootPath;
            string absolutePath = Path.Combine($"{webRootPath}/images/{file.FileName}");

            if (System.IO.File.Exists(absolutePath))
            {
                return StatusCode(201);
            }

            try
            {
                using ( var fileStream = new FileStream( absolutePath, FileMode.Create ))
                {
                    file.CopyTo( fileStream );
                }
                return StatusCode(201);
            }
            catch
            {
                return StatusCode(500);
            }

        }
        
    }
}