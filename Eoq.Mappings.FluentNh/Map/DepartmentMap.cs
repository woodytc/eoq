using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using Eoq.Domain; 

namespace Eoq.Mappings.FluentNh {
    
    
    public partial class DepartmentMap : ClassMap<Department> {
        
        public DepartmentMap() {
			Table("DEPARTMENT");
			LazyLoad();
			Id(x => x.DepartID).GeneratedBy.Identity().Column("Depart_ID");
			Map(x => x.DepartName).Column("Depart_Name");
        }
    }
}
