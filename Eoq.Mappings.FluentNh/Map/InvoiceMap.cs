using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using Eoq.Domain; 

namespace Eoq.Mappings.FluentNh {
    
    
    public partial class InvoiceMap : ClassMap<Invoice> {
        
        public InvoiceMap() {
			Table("INVOICE");
			LazyLoad();
			Id(x => x.InvNo).GeneratedBy.Identity().Column("Inv_No");
			Map(x => x.SupID).Column("Sup_ID");
			Map(x => x.PONo).Column("PO_No");
			Map(x => x.DepartID).Column("Depart_ID");
			Map(x => x.InvDate).Column("Inv_Date");
			Map(x => x.InvTotalQTY).Column("Inv_Total_QTY");
			Map(x => x.InvAmount).Column("Inv_Amount");
			Map(x => x.Approvedby).Column("Approved_by");
        }
    }
}
