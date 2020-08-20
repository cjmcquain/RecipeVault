using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeVault.Models;

namespace RecipeVault.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SharedRecipesController : ControllerBase
    {
        private readonly RecipeVaultContext _context;

        public SharedRecipesController(RecipeVaultContext context)
        {
            _context = context;
        }

        // GET: api/SharedRecipes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SharedRecipe>>> GetSharedRecipes()
        {
            return await _context.SharedRecipes.ToListAsync();
        }

        // GET: api/SharedRecipes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SharedRecipe>> GetSharedRecipe(int id)
        {
            var sharedRecipe = await _context.SharedRecipes.FindAsync(id);

            if (sharedRecipe == null)
            {
                return NotFound();
            }

            return sharedRecipe;
        }

        // GET: api/SharedRecipes/Pending
        [HttpGet("Pending/{id}")]
        public async Task<ActionResult<IEnumerable<SharedRecipe>>> GetPendingRecipes(int id)
        {
            var recipes = await _context.SharedRecipes.Where(row => row.ToUserId == id && row.Approved == 0).ToListAsync();
            if (recipes == null)
            {
                return NotFound();
            }
            return recipes;
        }

        // GET: api/SharedRecipes/Approved
        [HttpGet("Approved/{id}")]
        public async Task<ActionResult<IEnumerable<SharedRecipe>>> GetApprovedRecipes(int id)
        {
            var recipes = await _context.SharedRecipes.Where(row => row.ToUserId == id && row.Approved == 1).ToListAsync();
            if (recipes == null)
            {
                return NotFound();
            }
            return recipes;
        }

        // PUT: api/SharedRecipes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSharedRecipe(int id, SharedRecipe sharedRecipe)
        {
            if (id != sharedRecipe.SharedRecipeId)
            {
                return BadRequest();
            }

            _context.Entry(sharedRecipe).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SharedRecipeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/SharedRecipes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SharedRecipe>> PostSharedRecipe(SharedRecipe sharedRecipe)
        {
            _context.SharedRecipes.Add(sharedRecipe);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSharedRecipe", new { id = sharedRecipe.SharedRecipeId }, sharedRecipe);
        }

        // DELETE: api/SharedRecipes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SharedRecipe>> DeleteSharedRecipe(int id)
        {
            var sharedRecipe = await _context.SharedRecipes.FindAsync(id);
            if (sharedRecipe == null)
            {
                return NotFound();
            }

            _context.SharedRecipes.Remove(sharedRecipe);
            await _context.SaveChangesAsync();

            return sharedRecipe;
        }

        private bool SharedRecipeExists(int id)
        {
            return _context.SharedRecipes.Any(e => e.SharedRecipeId == id);
        }
    }
}
