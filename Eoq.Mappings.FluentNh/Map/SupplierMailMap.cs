using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using Eoq.Domain; 

namespace Eoq.Mappings.FluentNh {
    
    
    public partial class SupplierMailMap : ClassMap<SupplierMail> {
        
        public SupplierMailMap() {
			Table("SUP _EMAIL");
			LazyLoad();
            Id(x => x.ID).GeneratedBy.Identity().Column("ID");
			Map(x => x.SupID).Column("Sup_ID");
			Map(x => x.SupEmail).Column("Sup_Email");
        }
    }
}
