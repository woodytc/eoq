using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using Eoq.Domain; 

namespace Eoq.Mappings.FluentNh {
    
    
    public partial class RequisitionMap : ClassMap<Requisition> {
        
        public RequisitionMap() {
			Table("REQUISITION");
			LazyLoad();
			Id(x => x.ReqID).GeneratedBy.Identity().Column("Req_ID");
			Map(x => x.ReqDate).Column("Req_Date");
			Map(x => x.ReqStatus).Column("ReqStatus");
			Map(x => x.ReqTotalQTY).Column("ReqTotal_QTY");
			Map(x => x.DepartID).Column("Depart_ID");
        }
    }
}
