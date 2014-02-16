// -----------------------------------------------------------------------
// <copyright file="StockRepository.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Eoq.Mappings.FluentNh.Repository
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using Eoq.Domain;
using NHibernate;
using NHibernate.Criterion;

    public interface IStockRepository
    {
        void Save(Stock newStock);
        void SaveOrUpdate(Stock newStock);
        List<Stock> GetAll();
        int Update(Stock oldUnit);
        int CountAll();
        bool IsExist(Stock stock);
        void Delete(Stock stock);
    }

    public class StockRepository : NhRepository, IStockRepository
    {
        #region save update select all countall

        public void Save(Stock newStock)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newStock);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(Stock newStock)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newStock);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<Stock> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<Stock>().List() as List<Stock>;
                //session.Close();
                return results;
            }
        }

        public int Update(Stock oldUnit)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldUnit);
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
                var result = session.QueryOver<Stock>().RowCount();
                return result;
            }

        }

        public void Delete(Stock stock)
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                session.Delete(stock);
            }
        }

        public bool IsExist(Stock stock)
        {

            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = (from x in session.QueryOver<Stock>()
                               where x.BranchId == stock.BranchId
                                    && x.MeterialId == stock.MeterialId
                                    && x.ColorId == stock.ColorId
                                    && x.BrandId == stock.BrandId
                                    && x.UnitId == stock.UnitId
                                    && x.SizeId == stock.SizeId
                               select x);
                              
                //session.Close();
                return results.RowCount() > 0;
            }
        }

        #endregion

        public IList<Stock> ExecuteICriteria(Stock enitity)
        {
            using(var Session = SessionFactory.OpenSession())
            using (ITransaction transaction = Session.BeginTransaction())
            {
                try
                {
                    IList<Stock> result = Session.CreateCriteria(typeof(Stock))
                        .Add(Restrictions.Eq("id", enitity))
                        .Add(Restrictions.Eq("", enitity))
                        .Add(Restrictions.Eq("", enitity))
                        .List<Stock>();
                       
                    transaction.Commit();
                    return result;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw;
                }
            }
        }
    }
}
