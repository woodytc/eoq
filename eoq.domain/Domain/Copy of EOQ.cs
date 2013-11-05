using System;
using System.Text;
using System.Collections.Generic;
//using NHibernate.Validator.Constraints;


namespace Eoq.Domain {

    public partial class EoqGrid : EOQ
    {
        public EoqGrid()
        {
            Material = new Material();
        }
        public virtual int Eoqtype { get; set; }
        public virtual int? Demand { get; set; }
        public virtual decimal? OtytoPurchase { get; set; }
        public virtual decimal? MaintainCostperunit { get; set; }
        public virtual decimal? MaintainCost { get; set; }
        public virtual decimal? PurchaseCost { get; set; }
        public virtual decimal? PurCostperYear { get; set; }
        public virtual int? MatID { get; set; }
        public virtual Material Material { get; set; }
    }
}
