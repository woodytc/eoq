// -----------------------------------------------------------------------
// <copyright file="DepartmentRepository.cs" company="">
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

    public interface IDepartmentRepository
    {
        void Save(Department newDepartment);
        void SaveOrUpdate(Department newDepartment);
        List<Department> GetAll();
        int Update(Department oldDepartment);
        int CountAll();
        void Delete(Department entity);
    }
    
    public class DepartmentRepository : NhRepository, IDepartmentRepository
    {
        #region save update select all countall

        public void Save(Department newDepartment)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newDepartment);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(Department newDepartment)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newDepartment);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<Department> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<Department>().List() as List<Department>;
                //session.Close();
                return results;
            }
        }

        public int Update(Department oldDepartment)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldDepartment);
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
                var result = session.QueryOver<Department>().RowCount();
                return result;
            }

        }

        public void Delete(Department entity)
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                session.Delete(entity);
            }
        }

        #endregion
    }
}
