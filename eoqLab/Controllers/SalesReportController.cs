using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using Eoq.Mappings.FluentNh.Repository;
using eoqLab.Models;

namespace eoqLab.Controllers
{
    public class SalesReportController : Controller
    {
        public ICashierRepository CashierRepository { get; set; }
        public ICashierHeaderRepository CashierHeaderRepository { get; set; }
        public IMaterialRepository MaterialRepository { get; set; }
        public IStockRepository StockRepository { get; set; }
        private string UserName {get; set;}
        private int BranchID { get; set; }
        //
        // GET: /SalesReport/
        public SalesReportController(  ICashierRepository cashierRepository,
                                    ICashierHeaderRepository cashierHeaderRepository,
                                    IMaterialRepository materialRepository,
                                    IStockRepository stockRepository)
        {
            CashierRepository = cashierRepository;
            CashierHeaderRepository = cashierHeaderRepository;
            MaterialRepository = materialRepository;
            StockRepository = stockRepository;
        }
        public ActionResult Index()
        {
            if (HttpContext.Session != null)
            {
                UserName = HttpContext.Session["UserName"].ToString();
                if (!String.IsNullOrEmpty(this.HttpContext.Session["BranchId"].ToString()))
                {
                    BranchID = int.Parse(this.HttpContext.Session["BranchId"].ToString());
                }

            }
            return View();
        }

        public void SetId()
        {
            var httpSessionStateBase = this.HttpContext.Session;
            if (httpSessionStateBase != null)
            {
                httpSessionStateBase["rptSource"] = this.GetSaleItems(int.Parse(httpSessionStateBase["CashierId"].ToString()));
            }
        }

        //Used for showing simple report
        public void ShowSimple()
        {
            try
            {
                var session = this.HttpContext.Session;
                if (session != null)
                {
                    var rptSource =  session["rptSource"];
                    using (var rd = new ReportDocument())
                    {

                        var strRptPath = System.Web.HttpContext.Current.Server.MapPath("~/") +"//Report//SalesReport.rpt";
                        rd.Load(strRptPath);
                        if (rptSource != null && rptSource.GetType().ToString() != "System.String")
                            rd.SetDataSource(rptSource);
                        rd.ExportToHttpResponse(ExportFormatType.PortableDocFormat, System.Web.HttpContext.Current.Response, false, "crReport");

                        Session["CashierId"] = null;
                        Session["rptSource"] = null;
                    }
                }
            }
            catch (Exception ex)
            {
                Response.Write(ex.ToString());
            }
        }

        /// <summary>
        /// Generating Report Data
        /// </summary>
        /// <returns></returns>
        private List<SaleItemReport> GetSaleItems(int saleItemId)
        {
            var cashiers = this.CashierHeaderRepository.GetAll();
            var cashierMaterials = this.CashierRepository.GetAll();
            var materials = this.MaterialRepository.GetAll();
            var stocks = this.StockRepository.GetAll();
            var saleItemDetail = (from saleitem in cashiers
                                 join cashierMaterial in cashierMaterials.DefaultIfEmpty() on saleitem.Id equals cashierMaterial.Id
                                 join stock in stocks on cashierMaterial.Material_ID equals stock.Id
                                 join material in materials on stock.MeterialId equals material.MatId
                                 where saleitem.Id == saleItemId //&& saleitem.BranchId == BranchID 
                                 select new SaleItemReport()
                                 {
                                     SaleItemId = material.MatId,
                                     MaterialName = material.MetName,
                                     Amount = int.Parse(cashierMaterial.Amount),
                                     Price = cashierMaterial.TotalPrice
                                 }).ToList<SaleItemReport>();

            return saleItemDetail;
        }


    }
}
