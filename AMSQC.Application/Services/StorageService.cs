using AMSQC.Application.Interfaces;
using AMSQC.Application.ViewModels;
using Azure.Identity;
using Azure.Storage.Blobs;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AMSQC.Application.Services
{
    public class StorageService : IStorageService
    {
        private IOptions<StorageSetting> _config;

        public StorageService(IOptions<StorageSetting> config)
        {
            _config = config;
        }


        public async Task<string> SaveBlobAsync(BlobEntity blob)
        {
            string imageFullPath = null;

            if (CloudStorageAccount.TryParse(_config.Value.StorageConnection, out CloudStorageAccount storageAccount))
            {
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

                CloudBlobContainer container = blobClient.GetContainerReference(_config.Value.Container.ToLower());

                OperationContext context = new OperationContext();
                bool result = await container.CreateIfNotExistsAsync();

                BlobContainerPermissions containerPermissions = new BlobContainerPermissions();
                containerPermissions.PublicAccess = BlobContainerPublicAccessType.Blob;
                await container.SetPermissionsAsync(containerPermissions);

                string imageName = Guid.NewGuid().ToString() + "_" + blob.Title;

                CloudBlockBlob blockBlob = container.GetBlockBlobReference(imageName);

                blockBlob.Properties.ContentType = MimeMapping.MimeUtility.GetMimeMapping(blob.Title);

                await blockBlob.UploadFromStreamAsync(blob.File.OpenReadStream());


                imageFullPath = blockBlob.Uri.ToString();
            }
            return imageFullPath;
        }

        public Task<BlobEntity> GetBlobAsync(string title)
        {
            throw new NotImplementedException();
        }

        
    }
}
