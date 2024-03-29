﻿using AMSQC.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.Interfaces
{
    public interface ISiteService
    {
        Task<int> AddSite(Site site);
        List<Site> GetSites();
    }
}
