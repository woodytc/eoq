// -----------------------------------------------------------------------
// <copyright file="EmployeeRepository.cs" company="">
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

    public interface IEmployeeRepository
    {
        void Save(Employee newEmployee);
        void SaveOrUpdate(Employee newEmployee);
        List<Employee> GetAll();
        int Update(Employee oldEmployee);
        int CountAll();

        void Delete(Employee entity);
    }
    
    public class EmployeeRepository : NhRepository, IEmployeeRepository
    {
        #region save update select all countall

        public void Save(Employee newEmployee)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newEmployee);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(Employee newEmployee)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newEmployee);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<Employee> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<Employee>().List() as List<Employee>;
                //session.Close();
                return results;
            }
        }

        public int Update(Employee oldEmployee)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldEmployee);
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
                var result = session.QueryOver<Employee>().RowCount();
                return result;
            }

        }

        public void Delete(Employee entity)
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                session.Delete(entity);
            }
        }
        #endregion
    }
}
