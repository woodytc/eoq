using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using Eoq.Domain; 

namespace Eoq.Mappings.FluentNh {
    
    
    public partial class SupplierPhoneMap : ClassMap<SupplierPhone> {
        
        public SupplierPhoneMap() {
			Table("SUP_PHONE");
			LazyLoad();
            Id(x => x.ID).GeneratedBy.Identity().Column("ID");
            Map(x => x.SUPPHONEVal).Column("SUP_PHONE");
			Map(x => x.SUPID).Column("SUP_ID");
        }
    }
}
