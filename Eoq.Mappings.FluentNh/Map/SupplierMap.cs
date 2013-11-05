using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using Eoq.Domain; 

namespace Eoq.Mappings.FluentNh {
    
    
    public partial class SupplierMap : ClassMap<Supplier> {
        
        public SupplierMap() {
			Table("SUPPLIER");
			LazyLoad();
			Id(x => x.SupID).GeneratedBy.Identity().Column("Sup_ID");
			Map(x => x.SupName).Column("Sup_Name");
			Map(x => x.SupAddress).Column("Sup_Address");
			Map(x => x.Street).Column("Street");
			Map(x => x.District).Column("District");
			Map(x => x.Province).Column("Province");
			Map(x => x.Zipcode).Column("Zipcode");
        }
    }
}
