using System;
using System.Text;
using System.Collections.Generic;
//using NHibernate.Validator.Constraints;


namespace Eoq.Domain {
    
    public partial class PurchaseOrder {
        public virtual string PONo { get; set; }
        public virtual DateTime? PODate { get; set; }
        public virtual int? POTotalQTY { get; set; }
        public virtual decimal? POAmount { get; set; }
        public virtual int? DepartID { get; set; }
    }
}
