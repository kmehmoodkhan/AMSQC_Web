﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace AMSQC.Application.ViewModels
{
    public class QuoteViewModel
    {
        public int QuoteId { get; set; }

        public IFormFile MappingSheet
        {
            get;
            set;
        }
    }
}