using AMSQC.Application.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.Interfaces
{
    public interface IStorageService
    {
        Task<string> SaveBlobAsync(BlobEntity blob);

        Task<BlobEntity> GetBlobAsync(string title);
    }
}
