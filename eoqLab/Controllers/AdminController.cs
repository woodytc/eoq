using System;
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
        //common
        public IColorRepository ColorRepository { get; set; }
        public IBrandRepository BrandRepository { get; set; }
        public ISizesRepository SizesRepository { get; set; }
        public AdminController(IEOQRepository eoqRepository
            ,IMaterialRepository materialRepository
            ,IUnitRepository unit
            ,IDepartmentRepository departmentRepository
            ,IEmployeeRepository employeeRepository
            ,IEmployeePhoneRepository employeePhoneRepository
            ,IEmployeeMailRepository employeeEmailRepository
            ,IColorRepository colorRepository
            ,IBrandRepository brandRepository
            ,ISizesRepository sizesRepository
            )
        {
            EOQRepository = eoqRepository;
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

        #region Color
        [HttpPost]
        public JsonResult CreateColor(String Name)
        {
            try
            {
                Color enititys = new Color();
                enititys.Name = Name;
                ColorRepository.Save(enititys);
                return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult UpdateColor(string Name, int Id)
        {
            try
            {
                Color enitity = new Color();

                enitity.Id = Id;
                enitity.Name = Name;
                //insert
                ColorRepository.Update(enitity);
                return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult DeleteColor(List<int> ids)
        {
            try
            {
                for (int i = 0; i < ids.Count; i++)
                {
                    Color entity = new Color();
                    entity.Id = ids[i];
                    ColorRepository.Delete(entity);
                }
                return Json(new { success = true, message = "Delete Successful" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "This unit can not be delete because there are others from using." }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GridColor(string Name = "")
        {

            if (string.IsNullOrEmpty(Name))
            {
                return this.SearchColorAll();
            }
            else
            {
                return this.SearchColor(Name);
            }
        }

        private JsonResult SearchColorAll()
        {
            var unit = ColorRepository.GetAll();
            return Json(new { items = unit, total = unit.Count() }, JsonRequestBehavior.AllowGet);
        }

        private JsonResult SearchColorAll(string name)
        {
            var result =from c in ColorRepository.GetAll() where c.Name.Contains(name) select c; 
            return Json(new { items = result, total = result.Count() }, JsonRequestBehavior.AllowGet);
        }

        private JsonResult SearchColor(string Name)
        {
            var result = (from c in ColorRepository.GetAll() where c.Name.Contains(Name) select c ).ToList<Color>();
            return Json(new { items = result, total = result.Count }, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Sizes
        [HttpPost]
        public JsonResult CreateSizes(string Name)
        {
            try
            {
                Sizes enititys = new Sizes();
                 enititys.Name = Name;
                SizesRepository.Save(enititys);
                return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult UpdateSizes(string Name, int Id)
        {
            try
            {
                Sizes enitity = new Sizes();
                enitity.Id = Id;
                enitity.Name = Name;
                SizesRepository.Update(enitity);
                
                return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult DeleteSizes(List<int> ids)
        {
            try
            {
                for (int i = 0; i < ids.Count; i++)
                {
                    Sizes entity = new Sizes();
                    entity.Id = ids[i];
                    SizesRepository.Delete(entity);
                }
                return Json(new { success = true, message = "Delete Successful" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "This unit can not be delete because there are others from using." }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GridSizes(string Name = "")
        {

            if (string.IsNullOrEmpty(Name))
            {
                return this.SearchSizesAll();
            }
            else
            {
                return this.SearchSizes(Name);
            }
        }

        private JsonResult SearchSizesAll()
        {
            var unit = SizesRepository.GetAll();
            return Json(new { items = unit, total = unit.Count() }, JsonRequestBehavior.AllowGet);
        }

        private JsonResult SearchSizes(string name)
        {
            var result = from s in SizesRepository.GetAll() where s.Name.Contains(name) select s;
            return Json(new { items = result, total = result.Count() }, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Brand
        [HttpPost]
        public JsonResult CreateBrand(string Name)
        {
            try
            {
                Brand enititys = new Brand();
                enititys.Name = Name;
                BrandRepository.Save(enititys);
                return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult UpdateBrand(string Name, int Id)
        {
            try
            {
                Brand enitity = new Brand();
                enitity.Id = Id;
                enitity.Name = Name;
                //update
                BrandRepository.Update(enitity);
                return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult DeleteBrand(List<int> ids)
        {
            try
            {
                for (int i = 0; i < ids.Count; i++)
                {
                    Brand entity = new Brand();
                    entity.Id = ids[i];
                    BrandRepository.Delete(entity);
                }
                return Json(new { success = true, message = "Delete Successful" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "This unit can not be delete because there are others from using." }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GridBrand(string name = "")
        {

            if (string.IsNullOrEmpty(name))
            {
                return this.SearchBrandAll();
            }
            else
            {
                return this.SearchBrandAll(name);
            }
        }

        private JsonResult SearchBrandAll()
        {
            var unit = BrandRepository.GetAll();
            return Json(new { items = unit, total = unit.Count() }, JsonRequestBehavior.AllowGet);
        }

        private JsonResult SearchBrandAll(string name)
        {
            var result = from b in BrandRepository.GetAll() where b.Name.Contains(name) select b;
            return Json(new { items = result, total = result.Count() }, JsonRequestBehavior.AllowGet);
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

        public JsonResult GetColor()
        {
            var results = ColorRepository.GetAll();
            Color un = new Color();
            un.Id = -1;
            un.Name = "Please Select";
            results.Add(un);

            return Json(
                new { items = results, total = results.Count, success = true },
                JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBrand()
        {
            var results = BrandRepository.GetAll();
            Brand un = new Brand();
            un.Id = -1;
            un.Name = "Please Select";
            results.Add(un);

            return Json(
                new { items = results, total = results.Count, success = true },
                JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSizes()
        {
            var results = SizesRepository.GetAll();
            Sizes un = new Sizes();
            un.Id = -1;
            un.Name = "Please Select";
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
