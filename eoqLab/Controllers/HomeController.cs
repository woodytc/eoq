﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Eoq.Mappings.FluentNh.Repository;
using eoqLab.Models;
using eoqLab.helper;

namespace eoqLab.Controllers
{
    public class HomeController : Controller
    {

        public IEOQRepository EoqRepository { get; set; }
        public IMaterialRepository MaterialRepository { get; set; }
        public IUnitRepository UnitRepository { get; set; }
        public IDepartmentRepository DepartmentRepository { get; set; }
        public IEmployeeRepository EmployeeRepository { get; set; }
        public IEmployeePhoneRepository EmployeePhoneRepository { get; set; }
        public IEmployeeMailRepository EmployeeMailRepository { get; set; }
        //common
        public IColorRepository ColorRepository { get; set; }
        public IBrandRepository BrandRepository { get; set; }
        public ISizesRepository SizesRepository { get; set; }
        public ICatelogyRepository CatelogyRepository { get; set; }
        public IStockRepository StockRepository { get; set; }

        public int Branch { get; set; }
        public HomeController(IEOQRepository eoqRepository
                              , IMaterialRepository materialRepository
                              , IUnitRepository unit
                              , IDepartmentRepository departmentRepository
                              , IEmployeeRepository employeeRepository
                              , IEmployeePhoneRepository employeePhoneRepository
                              , IEmployeeMailRepository employeeEmailRepository
                              , IColorRepository colorRepository
                              , IBrandRepository brandRepository
                              , ISizesRepository sizesRepository
                              , ICatelogyRepository catelogyRepository
                              , IStockRepository stockRepository
            )
        {
            EoqRepository = eoqRepository;
            MaterialRepository = materialRepository;
            UnitRepository = unit;
            DepartmentRepository = departmentRepository;
            EmployeeRepository = employeeRepository;
            EmployeePhoneRepository = employeePhoneRepository;
            EmployeeMailRepository = employeeEmailRepository;
            //common
            this.ColorRepository = colorRepository;
            this.BrandRepository = brandRepository;
            this.SizesRepository = sizesRepository;
            this.CatelogyRepository = catelogyRepository;
            this.StockRepository = stockRepository;

            Branch = 1;

        }

        public ActionResult Index()
        {
            return View();
        }

        //get product list
        public JsonResult ProductsList()
        {
            var stockList = this.StockRepository.GetAll();
            var unitList = this.UnitRepository.GetAll();
            var productList = this.MaterialRepository.GetAll();

            var products = from stock in stockList
                    join product in productList.DefaultIfEmpty() on stock.MeterialId equals product.MatId
                    join unit in unitList on stock.UnitId equals unit.ID
                    where stock.Amount <= stock.Reorderpoint && stock.BranchId == this.Branch 
                    select new
                            {
                                ProductID   = product.MatId,
                                ProductName = product.MetName,
                                Unit        = unit.UnitName,
                                stock.Amount
                            };

            return Json(new { data = products, total = products.Count() }, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetProducts()
        {
            var productList = this.MaterialRepository.GetAll();

            var products = from product in productList
                    select new
                    {
                        ProductID = product.MatId
                        ,
                        ProductName = product.MetName

                    };

            return Json(new { data = products, total = productList.Count() }, JsonRequestBehavior.AllowGet);
        }

        //get categories list
        public JsonResult CategoriesList()
        {
            var allCategories = this.CatelogyRepository.GetAll();
            var categoriesResult = from category in allCategories
                                   select new
                                              {
                                                  CategoryID = category.Id,
                                                  CategoryName = category.Name
                                              };

            return Json(new { data = categoriesResult, total = categoriesResult.Count() }, JsonRequestBehavior.AllowGet);
        }

        public List<Eoq.Domain.Material> CreateProductDummy()
        {
            var productList = new List<Eoq.Domain.Material>();

            for (var j = 1; j < 6; j++)
            {
                productList.Add(new Eoq.Domain.Material
                {
                    MatId = j,
                    MetName = "ทดสอบ" + j,
                    CatelogyId = j
                });
            }

            return productList;
        }

        //save
        /// <summary>
        ///  reate a single action method with all the possible arguments that you expect and it will map the values (where possible) for you
        /// </summary>
        /// <param name="purchaseOrders"></param>
        /// <param name="purchaseOrder"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Update(List<PurchaseOrderModel> purchaseOrders, PurchaseOrderModel purchaseOrder)
        {
            try
            {
                if(purchaseOrder != null)
                {
                    var stock = new Eoq.Domain.Stock()
                                    {

                                        Amount = purchaseOrder.rate
                                        //Price  = purchaseOrder.price
                                    };
                }
                else if (purchaseOrders != null)
                {
                    foreach (var purchaseOrderData in purchaseOrders)
                    {
                        
                    }
                }
                else
                {
                    throw new Exception();
                }
                return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
            } 
        }


        [HttpPost]
        public JsonResult Save()
        {

            return Json(new { },JsonRequestBehavior.DenyGet);
        }

        //#region Material
        //[HttpPost]
        //public JsonResult CreateMaterial(string matName,string matDetail,decimal matPrice,int matReorderPront,int unitID)
        //{
        //    try
        //    {
        //        Material material = new Material(matName, matDetail, matPrice, matReorderPront, unitID,0);
        //        //insert
        //        MaterialRepository.Save(material);
        //        return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
        //    }
        //    catch(Exception ex)
        //    {
        //        return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
        //    }
        //}

        //[HttpPost]
        //public JsonResult UpdateMaterial(string matName, string matDetail, decimal matPrice, int matReorderPront, int unitID,int matID)
        //{
        //    try
        //    {
        //        //Material material = new Material(matName, matDetail, matPrice, matReorderPront, unitID,matID);
        //        //insert
        //        //MaterialRepository.Update(material);
        //        return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
        //    }
        //}
    }//end class
}//end namespace
