using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using Eoq.Domain; 

namespace Eoq.Mappings.FluentNh {
    
    
    public partial class OrdersMap : ClassMap<Orders> {
        
        public OrdersMap() {
			Table("ORDERS");
			LazyLoad();
			CompositeId().KeyProperty(x => x.MatID, "Mat_ID")
			             .KeyProperty(x => x.PONo, "PO_No");
			Map(x => x.QTY).Column("QTY");
			Map(x => x.Unit).Column("Unit");
        }
    }
}
