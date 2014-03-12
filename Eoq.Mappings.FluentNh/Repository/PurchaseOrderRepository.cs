// -----------------------------------------------------------------------
// <copyright file="PurchaseOrderRepository.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Eoq.Mappings.FluentNh.Repository
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    using NHibernate.Linq;
    using Eoq.Domain;

    public interface IPurchaseOrderRepository
    {
        void Save(PurchaseOrder newPurchaseOrder);
        void SaveOrUpdate(PurchaseOrder newPurchaseOrder);
        List<PurchaseOrder> GetAll();
        int Update(PurchaseOrder oldPurchaseOrder);
        int CountAll();
        //add by woody
        List<Brand> BrandCommonList(int id, int materialid, int unitid, int colorid);
        List<Sizes> SizeCommonList(int id, int materialid, int unitid, int colorid, int brandid);
        List<Color> ColorCommonList(int id, int meterailID, int unitID);
        List<Catelogy> CatelogyCommonList(int id);
        List<Material> MaterialInStockCommonList(int id, int catid);
        List<Unit> UnitCommonList(int id, int catid, int proid);
    }
    
    public class PurchaseOrderRepository : NhRepository, IPurchaseOrderRepository
    {
        #region save update select all countall

        public void Save(PurchaseOrder newPurchaseOrder)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newPurchaseOrder);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(PurchaseOrder newPurchaseOrder)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newPurchaseOrder);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<PurchaseOrder> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<PurchaseOrder>().List() as List<PurchaseOrder>;
                //session.Close();
                return results;
            }
        }

        public int Update(PurchaseOrder oldPurchaseOrder)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldPurchaseOrder);
                session.Flush();
                //session.Close();
                ts.Commit();
                return 1;
            }
        }

        public int CountAll()
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var result = session.QueryOver<PurchaseOrder>().RowCount();
                return result;
            }

        }

        #endregion

        public List<Brand> BrandCommonList(int id, int materialid, int unitid, int colorid)
        {
            using (var session = SessionFactory.OpenSession())
            {
                var results = (from x in session.Query<Stock>() 
                                join y in session.Query<Brand>() on x.BrandId equals y.Id 
                                where x.BranchId == id
                                && x.MeterialId == materialid
                                && x.UnitId == unitid
                                && x.ColorId == colorid
                               select y).ToList<Brand>();
                return results;
            }
        }

        public List<Sizes> SizeCommonList(int id, int materialid, int unitid, int colorid,int brandid)
        {
            using (var session = SessionFactory.OpenSession())
            {
                var result = (from x in session.Query<Stock>() 
                              join y in session.Query<Sizes>()
                              on x.SizeId equals y.Id
                              where x.BranchId == id
                              && x.MeterialId == materialid
                              && x.UnitId == unitid
                              && x.ColorId == colorid
                              && x.BrandId == brandid
                              select y).ToList<Sizes>();
                return result;
                                                               
            }
        }

        public List<Color> ColorCommonList(int id,int meterailID, int unitID)
        {
            using (var session = SessionFactory.OpenSession())
            {
                var result = (from x in session.Query<Stock>()
                              join y in session.Query<Color>()
                              on x.ColorId equals y.Id
                              where x.BranchId == id
                              && x.MeterialId == meterailID
                              && x.UnitId == unitID
                              select y).ToList<Color>();
                return result;                   
            }
        }

        public List<Catelogy> CatelogyCommonList(int id)
        {
            using (var session = SessionFactory.OpenSession())
            {
                var reslult = (from x in session.Query<Stock>()
                               join y in session.Query<Material>()
                               on x.MeterialId equals y.MatId
                               join z in session.Query<Catelogy>()
                               on y.CatelogyId equals z.Id
                               where x.BranchId == id
                               select z).ToList<Catelogy>();
                return reslult;
            }
        }

        public List<Material> MaterialInStockCommonList(int id, int catid)
        {
            using (var session = SessionFactory.OpenSession())
            {
                var result = (from x in session.Query<Stock>()
                              join y in session.Query<Material>()
                              on x.MeterialId equals y.MatId
                              join z in session.Query<Catelogy>()
                              on y.CatelogyId equals z.Id
                              where z.Id == catid && x.BranchId == id
                              select y).ToList<Material>();
                return result;
                                    
            }
        }

        public List<Unit> UnitCommonList(int id,int catid, int proid)
        {
            using (var session = SessionFactory.OpenSession())
            {
                var check = (from x in session.Query<Catelogy>()
                             join y in session.Query<Material>()
                                 on x.Id equals y.CatelogyId
                             where y.CatelogyId == catid
                             && y.MatId == proid
                             select y).ToList<Material>().Count();

                if (check > 0)
                {
                    var result = (from x in session.Query<Stock>()
                                  join y in session.Query<Unit>()
                                  on x.UnitId equals y.ID
                                  where x.BranchId == id
                                  && x.MeterialId == proid
                                  select y).ToList<Unit>();
                    return result;
                }
                else
                {
                    return new List<Unit>();
                }
                
            }
        }

    }

    
}
