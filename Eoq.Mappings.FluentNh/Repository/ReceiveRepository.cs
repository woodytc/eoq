// -----------------------------------------------------------------------
// <copyright file="ReceiveRepository.cs" company="">
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

    public interface IReceiveRepository
    {
        void Save(Receive newReceive);
        void SaveOrUpdate(Receive newReceive);
        List<Receive> GetAll();
        int Update(Receive oldReceive);
        int CountAll();
    }
    
    public class ReceiveRepository : NhRepository, IReceiveRepository
    {
        #region save update select all countall

        public void Save(Receive newReceive)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newReceive);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(Receive newReceive)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newReceive);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<Receive> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<Receive>().List() as List<Receive>;
                //session.Close();
                return results;
            }
        }

        public int Update(Receive oldReceive)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldReceive);
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
                var result = session.QueryOver<Receive>().RowCount();
                return result;
            }

        }

        #endregion
    }
}
