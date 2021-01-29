using AMSQC.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace AMSQC.Domain.Repository
{
    public interface IQuoteRepository
    {
        Quote GetQuote(int id);
    }
}
