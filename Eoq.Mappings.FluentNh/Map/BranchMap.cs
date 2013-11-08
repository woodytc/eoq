using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using Eoq.Domain; 

namespace Eoq.Mappings.FluentNh {
    
    
    public partial class BranchMap : ClassMap<Branch> {
        
        public BranchMap() {
			Table("Branch");
			LazyLoad();
			Id(x => x.BranchID).GeneratedBy.Identity().Column("Branch_ID");
			Map(x => x.BranchName).Column("Branch_Name");
			Map(x => x.BranchAddress).Column("Branch_Address");
			Map(x => x.BranchSubDistrict).Column("Branch_SubDistrict");
        }
    }
}
