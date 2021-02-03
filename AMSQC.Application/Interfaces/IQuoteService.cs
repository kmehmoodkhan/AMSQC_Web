using AMSQC.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace AMSQC.Application.Interfaces
{
    public interface IQuoteService
    {
        Quote GetQuote(int id);
    }
}
