using AMSQC.Application.Interfaces;
using AMSQC.Domain.Models;
using AMSQC.Domain.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace AMSQC.Application.Services
{
    public class QuoteService : IQuoteService
    {
        IQuoteRepository _quoteRepository = null;
        public QuoteService(IQuoteRepository quoteRepository)
        {
            _quoteRepository = quoteRepository;
        }
        public Quote GetQuote(int id)
        {
            return _quoteRepository.GetQuote(id);
        }
    }
}
