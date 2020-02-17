using System;
using System.Linq;
using System.Threading.Tasks;
using CadastroUsuario_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CadastroUsuario_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly ILogger<UsuariosController> _logger;
        private readonly ApiContext _context;

        public UsuariosController(ILogger<UsuariosController> logger, ApiContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var usuarios = await _context.Usuarios.ToListAsync();
                return new OkObjectResult(usuarios);    
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);   
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var usuario = await _context.Usuarios.FindAsync(id); 
                return new OkObjectResult(usuario);    
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);   
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Usuario usuario)
        {
            if(usuario == null) return BadRequest();

            try
            {
                await _context.Usuarios.AddAsync(usuario);
                await _context.SaveChangesAsync();
                return new OkObjectResult(usuario);    
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);   
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] Usuario usuario, int id)
        {
            try
            {
                var user = await _context.Usuarios.FindAsync(id);
                if(user == null) return BadRequest();

                _context.Entry(user).CurrentValues.SetValues(usuario);
                await _context.SaveChangesAsync();

                return new OkObjectResult(usuario);    
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);   
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var usuario = await _context.Usuarios.FindAsync(id);
                if(usuario == null) return BadRequest();

                _context.Usuarios.Remove(usuario);
                await _context.SaveChangesAsync();
                return NoContent();    
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);   
                return new BadRequestObjectResult(ex.Message);
            }
        }
    }
}
