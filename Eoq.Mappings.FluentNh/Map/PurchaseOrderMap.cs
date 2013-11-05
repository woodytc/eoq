using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using Eoq.Domain; 

namespace Eoq.Mappings.FluentNh {
    
    
    public partial class PurchaseOrderMap : ClassMap<PurchaseOrder> {
        
        public PurchaseOrderMap() {
			Table("PURCHASE_ORDER");
			LazyLoad();
			Id(x => x.PONo).GeneratedBy.Assigned().Column("PO_No");
			Map(x => x.PODate).Column("PO_Date");
			Map(x => x.POTotalQTY).Column("PO_Total_QTY");
			Map(x => x.POAmount).Column("PO_Amount");
			Map(x => x.DepartID).Column("Depart_ID");
        }
    }
}
