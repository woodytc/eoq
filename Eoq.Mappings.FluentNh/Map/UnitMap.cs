using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using Eoq.Domain; 

namespace Eoq.Mappings.FluentNh {
    
    
    public partial class UnitMap : ClassMap<Unit> {

        public UnitMap()
        {
			Table("UNIT");
			LazyLoad();
            Id(x => x.ID).GeneratedBy.Identity().Column("Unit_ID");
            Map(x => x.UnitName).Column("Unit_Name");
			//Map(x => x.SUPID).Column("SUP_ID");
        }
    }
}
