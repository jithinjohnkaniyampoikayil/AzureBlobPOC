using BLL.Interface;
using CsvHelper;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Model.ViewModel;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace BLL
{
    public class PriceListService: IPriceListService
    {
        private readonly static string _blobConnection = ConfigurationManager.AppSettings["blobConnection"].ToString();
        private readonly static string _container = "test";
        private readonly static string _blobFile = "test.csv";
        // Retrieve storage account from connection string.
        CloudStorageAccount _storageAccount;
        // Create the blob client.
        CloudBlobClient _blobClient;
        // Retrieve reference to a previously created container.
        CloudBlobContainer _blobcontainer; 
        public PriceListService()
        {
            _storageAccount = CloudStorageAccount.Parse(_blobConnection);
            _blobClient =  _storageAccount.CreateCloudBlobClient();
            _blobcontainer = _blobClient.GetContainerReference(_container);
        }
        // I HAVE USED A CSV FILE WITH DATE ND PRICE AS EXAMPLE
        public IEnumerable<PriceViewModel> ReadAzureBlob()
        {
            List<PriceViewModel> priceList = new List<PriceViewModel>();
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(_blobConnection);

            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            // Retrieve reference to a previously created container.
            CloudBlobContainer container = blobClient.GetContainerReference(_container);

            // Retrieve reference to a blob named "test.csv"
            CloudBlockBlob blockBlob2 = container.GetBlockBlobReference(_blobFile);

            using (Stream s = blockBlob2.OpenRead())
            using (StreamReader reader = new StreamReader(s))
            {
                using (var csvReader = new CsvReader(reader))
                {
                    csvReader.Read();
                    csvReader.ReadHeader();
                    priceList = csvReader.GetRecords<PriceViewModel>().ToList();
                }
            }

            return priceList;
            //return the data sa csv viewmodel object if required
        }
        public void SaveAzureBlob(HttpPostedFileBase file)
        {
            
            _blobcontainer.CreateIfNotExists();
            var blockBlob = _blobcontainer.GetBlockBlobReference(file.FileName);
            blockBlob.UploadFromStream(file.InputStream);
        }

        public List<string> LoadAzureBlobList()
        {
            var list = _blobcontainer.ListBlobs(useFlatBlobListing: true);
            var listOfFileNames = new List<string>();

            foreach (var blob in list)
            {
                var blobFileName = blob.Uri.Segments.Last();
                listOfFileNames.Add(blobFileName);
            }
            return listOfFileNames;
        }
    }
}
