using System;
using System.Collections.Generic;
using System.Text;
using FluentNHibernate.Mapping;
using Eoq.Domain;
using Eoq.Domain.Domain;

namespace Eoq.Mappings.FluentNh
{


    public partial class UserInBranchsMap : ClassMap<UserInBranchs>
    {

        public UserInBranchsMap()
        {
            Table("UserInBranchs");
            LazyLoad();
            Id(x => x.Username).GeneratedBy.Assigned().Column("Username");
            Map(x => x.BranchID).Column("Branch_ID").CustomType("int");
        }
    }
}
