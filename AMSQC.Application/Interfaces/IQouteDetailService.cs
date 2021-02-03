﻿using AMSQC.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.Interfaces
{
    public interface IQouteDetailService
    {
        QouteDetail GetQouteDetail(int qouteId, int regionId);

        int AddQouteDetail(QouteDetail qouteDetail);
    }
}
