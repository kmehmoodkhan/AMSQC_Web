﻿using AMSQC.Application.Interfaces;
using AMSQC.Domain.Models;
using AMSQC.Domain.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.Services
{
    public class QuoteDetailService : IQuoteDetailService
    {
        IQuoteDetailRepository _quoteDetailRepository = null;
        public QuoteDetailService(IQuoteDetailRepository quoteDetailRepository)
        {
            _quoteDetailRepository = quoteDetailRepository;
        }

        public int AddQuoteDetail(QuoteDetail quoteDetail)
        {
            var result = _quoteDetailRepository.AddQuoteDetail(quoteDetail);
            return result;
        }

        public QuoteDetail GetQuoteDetail(int quoteId, int regionId)
        {
            return _quoteDetailRepository.GetQuoteDetail(quoteId, regionId);
        }
    }
}