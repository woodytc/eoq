// -----------------------------------------------------------------------
// <copyright file="EmployeePhoneRepository.cs" company="">
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

    public interface IEmployeePhoneRepository
    {
        void Save(EmployeePhone newEmployeePhone);
        void SaveOrUpdate(EmployeePhone newEmployeePhone);
        List<EmployeePhone> GetAll();
        int Update(EmployeePhone oldEmployeePhone);
        int CountAll();
    }
    
    public class EmployeePhoneRepository : NhRepository, IEmployeePhoneRepository
    {
        #region save update select all countall

        public void Save(EmployeePhone newEmployeePhone)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newEmployeePhone);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(EmployeePhone newEmployeePhone)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newEmployeePhone);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<EmployeePhone> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<EmployeePhone>().List() as List<EmployeePhone>;
                //session.Close();
                return results;
            }
        }

        public int Update(EmployeePhone oldEmployeePhone)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldEmployeePhone);
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
                var result = session.QueryOver<EmployeePhone>().RowCount();
                return result;
            }

        }

        #endregion
    }
}
