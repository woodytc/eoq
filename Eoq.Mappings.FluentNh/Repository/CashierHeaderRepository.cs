// -----------------------------------------------------------------------
// <copyright file="CashierRepository.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

using System;

namespace Eoq.Mappings.FluentNh.Repository
{
    using System.Collections.Generic;
    using Eoq.Domain;

    public interface ICashierHeaderRepository
    {
        void Save(CashierHeader newCashier);
        void SaveOrUpdate(CashierHeader newCashier);
        List<CashierHeader> GetAll();
        int Update(CashierHeader oldCashier);
        int CountAll();
        void Delete(CashierHeader Cashier);
    }

    public class CashierHeaderRepository : NhRepository, ICashierHeaderRepository
    {
        #region save update select all countall

        public void Save(CashierHeader newCashier)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newCashier);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(CashierHeader newCashier)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newCashier);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<CashierHeader> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            try{
                using (var session = SessionFactory.OpenStatelessSession())
                {
                    var results = session.QueryOver<CashierHeader>().List() as List<CashierHeader>;
                    //session.Close();
                    return results;
                }
            }catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public int Update(CashierHeader oldCashier)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldCashier);
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
                var result = session.QueryOver<CashierHeader>().RowCount();
                return result;
            }

        }

        public void Delete(CashierHeader Cashier)
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                session.Delete(Cashier);
            }
        }

        #endregion
    }
}
