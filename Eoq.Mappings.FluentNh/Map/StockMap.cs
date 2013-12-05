using System;
using System.Collections.Generic;
using System.Text;
using FluentNHibernate.Mapping;
using Eoq.Domain;

namespace Eoq.Mappings.FluentNh
{


    public class StockMap : ClassMap<Stock>
    {

        public StockMap()
        {
            Table("Stock");
            LazyLoad();
            Id(x => x.Id).GeneratedBy.Identity().Column("ID");
            Map(x => x.MeterialId).Column("Meterial_id").Not.Nullable();
            Map(x => x.OrderId).Column("Order_ID");
            Map(x => x.ColorId).Column("Color_ID").Not.Nullable();
            Map(x => x.BranchId).Column("Branch_ID").Not.Nullable();
            Map(x => x.UnitId).Column("Unit_ID").Not.Nullable();
            Map(x => x.SizeId).Column("Size_ID").Not.Nullable();
            Map(x => x.Reorderpoint).Column("ReorderPoint").Not.Nullable();
            Map(x => x.Amount).Column("Amount").Not.Nullable();
            Map(x => x.Price).Column("Price").Not.Nullable();
            Map(x => x.Createby).Column("CreateBy");
            Map(x => x.Createdate).Column("CreateDate");
            Map(x => x.Updateby).Column("UpdateBy");
            Map(x => x.Updatedate).Column("UpdateDate").Not.Nullable();
        }
    }
}
