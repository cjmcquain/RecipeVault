using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeVault.Models
{
    public class RecipeVaultContext : DbContext
    {
        public RecipeVaultContext(DbContextOptions<RecipeVaultContext> options) : base(options) {

        }

        public DbSet<User> Users { get; set; }
    }
}
