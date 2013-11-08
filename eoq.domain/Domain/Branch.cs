using System;
using System.Text;
using System.Collections.Generic;
//using NHibernate.Validator.Constraints;


namespace Eoq.Domain {
    
    public partial class Branch {
        public virtual int BranchID { get; set; }
        public virtual string BranchName { get; set; }
        public virtual string BranchAddress { get; set; }
        public virtual int? BranchSubDistrict { get; set; }
    }
}
