using Eoq.Domain;
using FluentNHibernate.Mapping;

namespace Eoq.Mappings.FluentNh
{
    public sealed class CashierHeaderMap : ClassMap<CashierHeader>
    {
        public CashierHeaderMap()
        {
            Table("CashierHeader");
            LazyLoad();
            Id(x => x.Id).GeneratedBy.Identity().Column("ID");
            Map(x => x.BranchId).Column("Branch_ID").Not.Nullable();
            Map(x => x.Createdate).Column("CreateDate");
            Map(x => x.Createby).Column("CreateBY");
            Map(x => x.Updatedate).Column("UpdateDate");
            Map(x => x.Updateby).Column("UpdateBy");
        }
    }
}