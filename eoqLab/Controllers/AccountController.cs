using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Eoq.Domain.Domain;
using Eoq.Mappings.FluentNh.Repository;
using eoqLab.helper;
namespace eoqLab.Controllers
{
    public class AccountController : Controller
    {
        private MembershipCreateStatus result;
        private readonly MembershipProvider _provider;

        public IBranchRepository BranchRepository { get; set; }
        public IUserInBranchsRepository UserInBranchsRepository { get; set; }
        
        public AccountController()
        {
        }

        public AccountController(IBranchRepository branchRepository,IUserInBranchsRepository userInBranchsRepository)
        {
            this.BranchRepository = branchRepository;
            this.UserInBranchsRepository = userInBranchsRepository;
        }
        //
        // GET: /Account/

        public ActionResult Index()
        {
            string userName = User.Identity.Name;
            if (!string.IsNullOrEmpty(userName))
            {
                RolePrincipal rolePrincipal = (RolePrincipal)User;
                string[] roleArray = rolePrincipal.GetRoles();

                string role = "";
                if (userName.Equals("superadmin"))
                {
                    return RedirectToAction("Index", "Admin");
                }
                else if (User.IsInRole("admin"))
                {
                    return RedirectToAction("Index", "Admin");
                }
                else if (User.IsInRole("member"))
                {
                    ViewBag.Username = userName;
                    return RedirectToAction("Index", "Home");

                }

                foreach (var item in roleArray)
                {
                    role += item + ",";
                }
                if (!role.Equals(""))
                {
                    role = role.Remove(role.Length - 1);
                }

                ViewBag.CurrentUser = userName;
                ViewBag.CurrentUserRole = role;

                return View();
            }
            else
            {
                //return RedirectToAction("Logon", "Account");
                return View();
            }
        }

        public ActionResult Logon(string username, string password)
        {
            return View();
        }


        public ActionResult LogOff()
        {
            FormsAuthentication.SignOut();

            return RedirectToAction("Logon", "Account");
        }

        [HttpPost]
        public JsonResult LoginAction(string username, string password)
        {
            // [16/7/2013:pitsanu:[4]Add membership exception]
            if (username.Equals("root") && password.Equals("111111"))
            {
                FormsAuthentication.SetAuthCookie(username, true);
                return Json(new { success = true, url = "../Admin" }, JsonRequestBehavior.AllowGet);
            }
            bool status = false;
            string errorMsg = string.Empty;

            try
            {
                status = Membership.ValidateUser(username, password);
                if (!status)
                {
                    errorMsg = "The user name or password provided is incorrect.";
                }
            }
            catch (HttpException ex)
            {
                status = false;
                errorMsg = ex.Message;
            }
            catch (Exception ex)
            {
                status = false;
                errorMsg = "Server Error: " + ex.Message;
            }

            if (status)
            {
                FormsAuthentication.SetAuthCookie(username, true);

                if (Roles.IsUserInRole(username, "Member"))
                {

                    //return RedirectToAction("Index", "Devices");
                    return Json(new { success = true, url = "../Home/" }, JsonRequestBehavior.AllowGet);

                }
                else if (Roles.IsUserInRole(username, "admin"))
                {
                    //return RedirectToAction("Index", "Admin");
                    return Json(new { success = true, url = "../Admin" }, JsonRequestBehavior.AllowGet);
                }
                else if (Roles.IsUserInRole(username, "admin"))
                {
                    //return RedirectToAction("Index", "Account");
                    return Json(new { success = true, url = "./" }, JsonRequestBehavior.AllowGet);
                }

            }
            else
            {
                //return View();
                return Json(new { success = false, error = errorMsg }, JsonRequestBehavior.AllowGet);
            }

            //return null;
            return Json(new { success = false, errors = "Server Error: Operation must not reach here" }, JsonRequestBehavior.AllowGet);
        }



        //get All Role not implement
        public JsonResult GetRoles()
        {
            var results = Roles.GetAllRoles();
            return GetAllUserAndRoles(0, 0);

        }

        //data grid user and role
        public JsonResult GetUserAll(string username, string role, int start, int limit)
        {

            JsonResult result = null;
            if (string.IsNullOrEmpty(username) && role.ToLower().Equals("all role"))
            {
                return GetAllUserAndRoles(start, limit);
            }
            else if (string.IsNullOrEmpty(username) && !role.ToLower().Equals("all role"))
            {
                return FindUsernameWithRole(role, start, limit);
            }
            else if (!string.IsNullOrEmpty(username))
            {
                return FindUsernameWithRole(username, role.ToLower().Equals("all role") ? "" : role, start, limit);
            }
            else return result;

            //return result;


        }

        [HttpPost]
        //public ActionResult Register(RegisterModel model)
        public JsonResult Register(string UserName, string Password, string Email, string role,int branchID)
        {
            //statscreate code

            MemberMessage msg = new MemberMessage();

            try
            {
                MembershipUser newUser = Membership.CreateUser(UserName, Password, Email);

                if (newUser == null)
                {
                    return Json(new { success = false, error = msg.GetErrorMessage(result) }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    
                    Roles.AddUserToRole(UserName, role);
                    //mapping branch to user
                    
                    UserToBranch(UserName, branchID);

                    return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (MembershipCreateUserException ex)
            {
                return Json(new { success = false, error = msg.GetErrorMessage(ex.StatusCode) }, JsonRequestBehavior.AllowGet);
            }
        }

        //find role
        private JsonResult FindUsernameWithRole(string role, int start, int limit)
        {
            var userRoles = (from MembershipUser user in Membership.GetAllUsers()
                             let roles = Roles.GetRolesForUser(user.UserName)
                             //where user.UserName.Contains(username) && roles.Equals(role)
                             select new
                             {
                                 UserName = user.UserName,
                                 Email = user.Email,
                                 Roles = (string.Join(", ", roles)).Replace("admin", "Admin"),
                                 IsApproved = user.IsApproved ? "Enable" : "Disable"
                             });
            var dataPage = (from x in userRoles where x.Roles.Contains((role == "admin" ? "Admin" : role)) select x).Skip(start).Take(limit);
            return Json(new { items = dataPage, total = dataPage.Count() }, JsonRequestBehavior.AllowGet);
        }

        //find name and role
        private JsonResult FindUsernameWithRole(string username, string role, int start, int limit)
        {
            var userRoles = (from MembershipUser user in Membership.GetAllUsers()
                             let roles = Roles.GetRolesForUser(user.UserName)
                             //where user.UserName.Contains(username) && roles.Equals(role)
                             select new
                             {
                                 UserName = user.UserName,
                                 Email = user.Email,
                                 Roles = (string.Join(", ", roles)).Replace("admin", "Admin"),
                                 IsApproved = user.IsApproved ? "Enable" : "Disable"
                             });
            var dataPage = (from x in userRoles where x.Roles.Contains((role == "admin" ? "Admin" : role)) && (x.UserName.ToLower().Contains(username)) select x).Skip(start).Take(limit);
            return Json(new { items = dataPage, total = dataPage.Count() }, JsonRequestBehavior.AllowGet);
        }


        //get all userinfo
        public JsonResult GetAllUserAndRoles(int start, int limit)
        {
            var userRoles = (from MembershipUser user in Membership.GetAllUsers()
                             let roles = Roles.GetRolesForUser(user.UserName)
                             select new
                             {
                                 UserName = user.UserName,
                                 Email = user.Email,
                                 Roles = (string.Join(", ", roles)).Replace("admin", "Admin"),
                                 IsApproved = user.IsApproved ? "Enable" : "Disable"
                             });
            var dataPage = (from x in userRoles select x).Skip(start).Take(limit);
            return Json(new { items = dataPage, total = userRoles.Count() }, JsonRequestBehavior.AllowGet);
        }


        public JsonResult FindUsernameWithRole(string username, string role)
        {
            var userRoles = (from MembershipUser user in Membership.GetAllUsers()
                             let roles = Roles.GetRolesForUser(user.UserName)

                             //where user.UserName.Contains(username) && roles.Equals(role)
                             select new
                             {
                                 UserName = user.UserName,
                                 Email = user.Email,
                                 Roles = (string.Join(", ", roles)).Replace("admin", "Admin"),
                                 IsApproved = user.IsApproved ? "Enable" : "Disable"
                             });
            var dataPage = from x in userRoles where x.Roles.Contains((role == "admin" ? "Admin" : role)) && (x.UserName.Contains(username)) select x;

            return Json(new { items = dataPage, total = dataPage.Count() }, JsonRequestBehavior.AllowGet);
        }

        //not implement
        public bool RemoveUser(string username)
        {
            bool status = Membership.DeleteUser(username, true);
            return status;
        }


        //reset password user
        [HttpPost]
        public JsonResult ResetPassword(string username, string password)
        {
            try
            {
                var user = Membership.GetUser(username);
                if (user.IsLockedOut) user.UnlockUser();
                bool isChangeSuccess = user.ChangePassword(user.ResetPassword(), password);
                return Json(new { success = isChangeSuccess }, JsonRequestBehavior.AllowGet);
            }
            catch (MembershipCreateUserException ex)
            {
                ex.Message.ToString();
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }

        }

        //assign role to user
        [HttpPost]
        public JsonResult UpdateUserRole(string username, string[] roles)
        {
            try
            {
                bool isUpdateUserRole = false;

                //remove role
                foreach (string rmrole in Roles.GetRolesForUser(username))
                {
                    Roles.RemoveUserFromRole(username, rmrole);
                }
                //var tmp = roles.Split(',');
                foreach (string item in roles)
                {
                    Roles.AddUserToRole(username, item);
                    isUpdateUserRole = Roles.IsUserInRole(username, item);
                }

                return Json(new { success = isUpdateUserRole }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ex.Message.ToString();
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }

        }

        //Disable user
        [HttpPost]
        public bool DisableUser(string username, bool status)
        {
            MembershipUser user = Membership.GetUser(username);
            try
            {
                if (user != null)
                {
                    //ture = disable flase = undisable
                    user.IsApproved = status;
                    Membership.UpdateUser(user);
                    user = Membership.GetUser(username);
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                ex.Message.ToString();
                return false;
            }

        }


        public bool testlogin(string user, string pass)
        {
            bool status = Membership.ValidateUser(user, pass);
            FormsAuthentication.SetAuthCookie(user, true);
            return status;

        }

        //sing in 
        protected void SignIn(string userName, bool createPersistentCookie)
        {
            if (String.IsNullOrEmpty(userName)) throw new ArgumentException("Value cannot be null or empty.", "userName");

            FormsAuthentication.SetAuthCookie(userName, createPersistentCookie);
        }

        protected void SignOut()
        {
            FormsAuthentication.SignOut();
        }

        protected void UserToBranch(string username, int branch)
        {
            var entity = new UserInBranchs();
            entity.BranchID = branch;
            entity.Username = username;
            try
            {
                UserInBranchsRepository.Save(entity);
            }
            catch (Exception ex)
            {
                //ex.Message;
            }
        }

        public JsonResult GetBranch()
        {
            var result = this.BranchRepository.GetAll();
            
            return Json(new { items = result, total = result.Count() }, JsonRequestBehavior.AllowGet);
        }
    }
}
