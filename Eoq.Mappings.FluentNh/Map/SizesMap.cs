using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using Eoq.Domain;

namespace Eoq.Mappings.FluentNh {
    
    
    public partial class SizesMap : ClassMap<Sizes> {
        
        public SizesMap() {
			Table("Sizes");
			LazyLoad();
			Id(x => x.Id).GeneratedBy.Identity().Column("id");
			Map(x => x.Name).Column("Name");
        }
    }
}
