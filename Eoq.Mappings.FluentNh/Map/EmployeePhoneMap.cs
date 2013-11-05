using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using Eoq.Domain; 

namespace Eoq.Mappings.FluentNh {
    
    
    public partial class EmployeePhoneMap : ClassMap<EmployeePhone> {
        
        public EmployeePhoneMap() {
			Table("EMP _PHONE");
			LazyLoad();
            Id(x => x.ID).GeneratedBy.Identity().Column("ID");
            Map(x => x.EmPloyeePHONE).Column("EMP_PHONE");
			Map(x => x.EMPID).Column("EMP_ID");
        }
    }
}
