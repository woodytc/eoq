// -----------------------------------------------------------------------
// <copyright file="WithdrawRepository.cs" company="">
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

    public interface IWithdrawRepository
    {
        void Save(Withdraw newWithdraw);
        void SaveOrUpdate(Withdraw newWithdraw);
        List<Withdraw> GetAll();
        int Update(Withdraw oldWithdraw);
        int CountAll();
    }
    
    public class WithdrawRepository : NhRepository, IWithdrawRepository
    {
        #region save update select all countall

        public void Save(Withdraw newWithdraw)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newWithdraw);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(Withdraw newWithdraw)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newWithdraw);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<Withdraw> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<Withdraw>().List() as List<Withdraw>;
                //session.Close();
                return results;
            }
        }

        public int Update(Withdraw oldWithdraw)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldWithdraw);
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
                var result = session.QueryOver<Withdraw>().RowCount();
                return result;
            }

        }

        #endregion
    }
}
