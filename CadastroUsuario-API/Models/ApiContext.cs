using Microsoft.EntityFrameworkCore;

namespace CadastroUsuario_API.Models
{
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options) : base(options)
        {
        }
        public DbSet<Usuario> Usuarios { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<Usuario>().HasKey(u => u.Id);
            base.OnModelCreating(modelBuilder);
        }
    }
}