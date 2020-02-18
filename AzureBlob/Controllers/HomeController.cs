using BLL;
using BLL.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GridBeyond.Controllers
{
    public class HomeController : Controller
    {
        private readonly string _successMessage= "File uploaded successfully";
        private readonly string _errorMessage = "ERROR: File uploaded is not of correct format or invalid file";
        private readonly string _fileemptyMessage = "You have not specified a file.";
        private readonly IPriceListService _IPriceListService;
        public HomeController(IPriceListService iPriceListService)
        {
            _IPriceListService = iPriceListService;
        }
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(HttpPostedFileBase file)
        {
            if (file != null && file.ContentLength > 0)
                try
                {
                    _IPriceListService.SaveAzureBlob(file);
                    ViewBag.Message = _successMessage;
                }
                catch (Exception ex)
                {
                    ViewBag.Message = _errorMessage;
                }
            else
            {
                ViewBag.Message = _fileemptyMessage;
            }
            return View();
        }

        public ActionResult PriceList()
        {
            return View(_IPriceListService.ReadAzureBlob());
        }
        
        public ActionResult AzureBlob()
        {
            return View(_IPriceListService.LoadAzureBlobList());
        }


    }
}