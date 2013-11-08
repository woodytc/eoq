using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using Eoq.Domain; 

namespace eoq.Mappings.FluentNh {
    
    
    public partial class BrandMap : ClassMap<Brand> {
        
        public BrandMap() {
			Table("Brand");
			LazyLoad();
			Id(x => x.Id).GeneratedBy.Identity().Column("Id");
			Map(x => x.Name).Column("Name");
        }
    }
}
