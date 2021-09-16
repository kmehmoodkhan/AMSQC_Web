using AMSQC.Domain.Models;
using AMSQC.Domain.Repository;
using AMSQC.Infra.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Infra.Data.Repository
{
    public class StateRepository : IStateRepository
    {
        public AmsqcDbContext _context;

        public StateRepository(AmsqcDbContext context)
        {
            _context = context;
        }
        public List<State> GetStates()
        {
            var states= _context.States;
            return states.OrderBy(t=>t.Title).ToList();
        }
    }
}
