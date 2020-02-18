using Model.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace BLL.Interface
{
    public interface IPriceListService
    {
        void SaveAzureBlob(HttpPostedFileBase file);
        IEnumerable<PriceViewModel> ReadAzureBlob();
        List<string> LoadAzureBlobList();
    }
}
