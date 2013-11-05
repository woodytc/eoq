// -----------------------------------------------------------------------
// <copyright file="EmployeeMailRepository.cs" company="">
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

    public interface IEmployeeMailRepository
    {
        void Save(EmployeeMail newEmployeeMail);
        void SaveOrUpdate(EmployeeMail newEmployeeMail);
        List<EmployeeMail> GetAll();
        int Update(EmployeeMail oldEmployeeMail);
        int CountAll();
    }
    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public class EmployeeMailRepository : NhRepository, IEmployeeMailRepository
    {
        #region save update select all countall

        public void Save(EmployeeMail newEmployeeMail)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newEmployeeMail);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(EmployeeMail newEmployeeMail)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newEmployeeMail);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<EmployeeMail> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<EmployeeMail>().List() as List<EmployeeMail>;
                //session.Close();
                return results;
            }
        }

        public int Update(EmployeeMail oldEmployeeMail)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldEmployeeMail);
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
                var result = session.QueryOver<EmployeeMail>().RowCount();
                return result;
            }

        }

        #endregion
    }
}
