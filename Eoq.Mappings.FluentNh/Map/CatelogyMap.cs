using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using Eoq.Domain; 

namespace eoq.Mappings.FluentNh {
    
    
    public partial class CatelogyMap : ClassMap<Catelogy> {
        
        public CatelogyMap() {
			Table("Catelogy");
			LazyLoad();
			Id(x => x.Id).GeneratedBy.Identity().Column("Id");
			Map(x => x.Name).Column("Name");
        }
    }
}
