﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Eoq.Mappings.FluentNh.Repository;
using Eoq.Domain;

namespace eoqLab.Controllers
{
    public class AdminController : Controller
    {

        public IEOQRepository EOQRepository { get; set; }
        public IMaterialRepository MaterialRepository { get; set; }
        public IUnitRepository UnitRepository { get; set; }
        public IDepartmentRepository DepartmentRepository { get; set; }
        public IEmployeeRepository EmployeeRepository { get; set; }
        public IEmployeePhoneRepository EmployeePhoneRepository { get; set; }
        public IEmployeeMailRepository EmployeeMailRepository { get; set; }
        
        public AdminController(IEOQRepository eoqRepository
            ,IMaterialRepository materialRepository
            ,IUnitRepository unit
            ,IDepartmentRepository departmentRepository
            ,IEmployeeRepository employeeRepository
            ,IEmployeePhoneRepository employeePhoneRepository
            ,IEmployeeMailRepository employeeEmailRepository
            )
        {
            EOQRepository = eoqRepository;
            MaterialRepository = materialRepository;
            UnitRepository = unit;
            DepartmentRepository = departmentRepository;
            EmployeeRepository = employeeRepository;
            EmployeePhoneRepository = employeePhoneRepository;
            EmployeeMailRepository = employeeEmailRepository;

        }

  
        public ActionResult Index()
        {
            return View();
        }

       
        #region Material
        [HttpPost]
        public JsonResult CreateMaterial(string matName,string matDetail,decimal matPrice,int matReorderPront,int unitID)
        {
            try
            {
                Material material = new Material(matName, matDetail, matPrice, matReorderPront, unitID,0);
                //insert
                MaterialRepository.Save(material);
                return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult UpdateMaterial(string matName, string matDetail, decimal matPrice, int matReorderPront, int unitID,int matID)
        {
            try
            {
                Material material = new Material(matName, matDetail, matPrice, matReorderPront, unitID,matID);
                //insert
                MaterialRepository.Update(material);
                return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult DeleteMaterial(List<int> matID)
        {
            try
            {
                for (int i = 0; i < matID.Count; i++)
                {
                    Material material = new Material();
                    material.MATID = matID[i];
                    MaterialRepository.Delete(material);
                }
                return Json(new { success = true, message = "Delete Successful" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "This material can not be delete because there are others from using." }, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Unit
        [HttpPost]
        public JsonResult CreateUnit(string unitName)
        {
            try
            {
                Unit unit = new Unit();
                unit.UnitName = unitName;
                UnitRepository.Save(unit);
                return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult UpdateUnit(string unitName, int unitID)
        {
            try
            {
                Unit unit = new Unit();
                unit.ID = unitID;
                unit.UnitName = unitName;

                //insert
                UnitRepository.Update(unit);
                return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult DeleteUnit(List<int> unitID)
        {
            try
            {
                for (int i = 0; i < unitID.Count; i++)
                {
                    Unit unit = new Unit();
                    unit.ID = unitID[i];
                    UnitRepository.Delete(unit);
                }
                return Json(new { success = true, message = "Delete Successful" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "This unit can not be delete because there are others from using." }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GridUnit(string unitName="")
        {
            
            if (string.IsNullOrEmpty(unitName))
            {
                return this.SearchUnitAll();
            }
            else
            {
                return this.SearchUnit(unitName);
            }
        }

        private JsonResult SearchUnitAll()
        {
            var unit = UnitRepository.GetAll();
            return Json(new { items = unit, total = unit.Count() }, JsonRequestBehavior.AllowGet);
        }

        private JsonResult SearchUnit(string unitName)
        {
            var unit = (from u in UnitRepository.GetAll() where u.UnitName.Contains(unitName) select u).ToList<Unit>();
            return Json(new { items = unit, total = unit.Count }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Department
        [HttpPost]
        public JsonResult CreateDepartment(string departName)
        {
            try
            {
                Department enitity = new Department();
                enitity.DepartName = departName;
                DepartmentRepository.Save(enitity);
                return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult UpdateDepartment(string departName, int departID)
        {
            try
            {
                Department enitity = new Department();
                enitity.DepartID = departID;
                enitity.DepartName = departName;

                //insert
                DepartmentRepository.Update(enitity);
                return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult DeleteDepartment(List<int> ids)
        {
            try
            {
                for (int i = 0; i < ids.Count; i++)
                {
                    Department entity = new Department();
                    entity.DepartID = ids[i];
                    DepartmentRepository.Delete(entity);
                }
                return Json(new { success = true, message = "Delete Successful" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "This unit can not be delete because there are others from using." }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GridDepartment(string departName = "")
        {

            if (string.IsNullOrEmpty(departName))
            {
                return this.SearchDepartmentAll();
            }
            else
            {
                return this.SearchDepartment(departName);
            }
        }

        private JsonResult SearchDepartmentAll()
        {
            var unit = DepartmentRepository.GetAll();
            return Json(new { items = unit, total = unit.Count() }, JsonRequestBehavior.AllowGet);
        }

        private JsonResult SearchDepartment(string departName)
        {
            var unit = (from u in DepartmentRepository.GetAll() where u.DepartName.Contains(departName) select u).ToList<Department>();
            return Json(new { items = unit, total = unit.Count }, JsonRequestBehavior.AllowGet);
        }

        #endregion


        #region Employee
        [HttpPost]
        public JsonResult CreateEmployee(Employee enitity)
        {
            try
            {
                Employee enititys = new Employee();
               // enitity.DepartName = departName;
                EmployeeRepository.Save(enitity);
                return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult UpdateEmployee(string departName, int departID)
        {
            try
            {
                Employee enitity = new Employee();
                

                //insert
                EmployeeRepository.Update(enitity);
                return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult DeleteEmployee(List<int> ids)
        {
            try
            {
                for (int i = 0; i < ids.Count; i++)
                {
                    Employee entity = new Employee();
                    entity.EmpID = ids[i];
                    EmployeeRepository.Delete(entity);
                }
                return Json(new { success = true, message = "Delete Successful" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "This unit can not be delete because there are others from using." }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GridEmployee(string EmpName = "",int DepartID = 0)
        {

            if (string.IsNullOrEmpty(EmpName))
            {
                return this.SearchEmployeeAll();
            }
            else
            {
                return this.SearchEmployee(EmpName);
            }
        }

        private JsonResult SearchEmployeeAll()
        {
            var unit = EmployeeRepository.GetAll();
            return Json(new { items = unit, total = unit.Count() }, JsonRequestBehavior.AllowGet);
        }

        private JsonResult SearchEmployee(string departName)
        {
            //var unit = (from u in EmployeeRepository.GetAll() where u.DepartName.Contains(departName) select u).ToList<Employee>();
            //return Json(new { items = unit, total = unit.Count }, JsonRequestBehavior.AllowGet);
            return null;
        }

        #endregion

        #region CommboBox
        public JsonResult DepartComboBox()
        {
            var data = DepartmentRepository.GetAll();
            return Json(new { items = data, total = data.Count }, JsonRequestBehavior.AllowGet);;
        }
        #endregion

        public ActionResult Eoq(){
            return View();
        }

        public JsonResult GridEoq(string MatName)
        {

            
            //var a = this.EOQRepository.GetAll();
            var a = this.UnitRepository.GetAll();
            var b = this.MaterialRepository.GetAll();
            if (string.IsNullOrEmpty(MatName))
            {
                var q = from e in a
                        join m in b on e.ID equals m.UNITAID
                        select new
                        {
                            MatId = m.MATID
                         ,
                            MatName = m.MATNAME
                         ,
                            MatDetail = m.MATDETAIL
                         ,
                            MatPrice = m.MATPrice
                         ,
                            MatReorderPoint = m.MATREORDERPOINT
                         ,
                            UnitID = m.UNITAID
                        };

                return Json(new { items = q, total = q.Count() }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var q = from e in a
                        join m in b on e.ID equals m.UNITAID where m.MATNAME.Contains(MatName)
                        select new
                        {
                            MatId = m.MATID
                         ,
                            MatName = m.MATNAME
                         ,
                            MatDetail = m.MATDETAIL
                         ,
                            MatPrice = m.MATPrice
                         ,
                            MatReorderPoint = m.MATREORDERPOINT
                         ,
                            UnitID = m.UNITAID
                        };

                return Json(new { items = q, total = q.Count() }, JsonRequestBehavior.AllowGet);
            }
        }

        //maeterial
        public JsonResult GridMaterial()
        {
            var m = this.MaterialRepository.GetAll();

            return Json(
                new { data = m, total = m.Count, success = true },
                JsonRequestBehavior.AllowGet);
        }

        //store
        public JsonResult GetUnit()
        {
            var results = UnitRepository.GetAll();
            Unit un = new Unit();
            un.ID = -1;
            un.UnitName = "Please Select";
            results.Add(un);

            return Json(
                new { items = results, total = results.Count, success = true },
                JsonRequestBehavior.AllowGet);
        }


        private void EoqManage(EOQ eoqEntity,string type){
           if (type == "insert" || type == "update")
           {
               this.EOQRepository.SaveOrUpdate(eoqEntity);
           }
           else if (type == "delete")
           {
               //this.EOQRepository.
           }
           else if (type == "get")
           {
               var a = this.EOQRepository.GetAll();
           }

       }

    }
}
