using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using Eoq.Domain; 

namespace Eoq.Mappings.FluentNh {
    
    
    public partial class ReceiveMap : ClassMap<Receive> {
        
        public ReceiveMap() {
			Table("RECEIVE");
			LazyLoad();
			CompositeId().KeyProperty(x => x.MatID, "Mat_ID")
			             .KeyProperty(x => x.InvNo, "Inv_No");
			Map(x => x.QTY).Column("QTY");
			Map(x => x.Unit).Column("Unit");
        }
    }
}
