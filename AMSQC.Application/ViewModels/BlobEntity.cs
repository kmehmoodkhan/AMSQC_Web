using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.ViewModels
{
    public class BlobEntity
    {

        public IFormFile File
        {
            get;
            set;
        }

        public string Title
        {
            get;
            set;
        }

    }
}
