using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeVault.Models
{
    public class SharedRecipe
    {
        [Key]
        public int SharedRecipeId { get; set; }

        [Required]
        [ForeignKey("Recipe")]
        [Column(TypeName = "int")]
        public int RecipeId { get; set; }

        [Required]
        [ForeignKey("User")]
        [Column(TypeName = "int")]
        public int ToUserId { get; set; }

        [Required]
        [ForeignKey("User")]
        [Column(TypeName = "int")]
        public int FromUserId { get; set; }

        [Required]
        [Column(TypeName = "int")]
        public int Approved { get; set; }
    }
}
