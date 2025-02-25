using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Blazor_CRUD.Models;

namespace Blazor_CRUD.Data
{
    public class Blazor_CRUDContext : DbContext
    {
        public Blazor_CRUDContext (DbContextOptions<Blazor_CRUDContext> options)
            : base(options)
        {
        }

        public DbSet<Blazor_CRUD.Models.Student> Student { get; set; } = default!;
    }
}
