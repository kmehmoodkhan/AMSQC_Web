using AMSQC.Application.Interfaces;
using AMSQC.Domain.Models;
using AMSQC.Domain.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.Services
{
    public class StateService : IStateService
    {
        IStateRepository _stateRepository = null;
        public StateService(IStateRepository stateRepository)
        {
            _stateRepository = stateRepository;
        }     
        public List<State> GetStates()
        {
            return _stateRepository.GetStates();
        }
    }
}
