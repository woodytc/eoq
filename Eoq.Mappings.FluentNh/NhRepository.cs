// -----------------------------------------------------------------------
// <copyright file="NHRepository.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------
using System.Collections;

namespace Eoq.Mappings.FluentNh
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using NHibernate;
    using NHibernate.AdoNet.Util;
    using NHibernate.Criterion;

    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public class NhRepository
    {
        public NhRepository()
        {
            HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
        }
        private ISessionFactory _sessionFactory = null;
        public static string NHibernateGeneratedSQL { get; set; }
        public static int QueryCounter { get; set; }
        public static string FormatSQL()
        {
            BasicFormatter formatter = new BasicFormatter();
            return formatter.Format(NHibernateGeneratedSQL.ToUpper());
        }

        public ISessionFactory SessionFactory
        {
            protected get { return _sessionFactory; }
            set { _sessionFactory = value; }
        }

        public IList<T> ExecuteICriteria<T>()
        {
            //using (ITransaction transaction = Session.BeginTransaction())
            using(var Session = SessionFactory.OpenStatelessSession())
            {
                try
                {
                    IList<T> result = Session.CreateCriteria(typeof(T)).List<T>();
                    return result;
                }
                catch (Exception ex)
                {
                    throw;
                }
            }
        }

        public void Update<T>(T enity)
        {
            using (var Session = SessionFactory.OpenStatelessSession())
            using (var tran = Session.BeginTransaction())
            {
                try{
                    Session.Update(enity);
                    tran.Commit();
                }catch(Exception executeICriteria){
                    tran.Rollback();
                    throw executeICriteria;
            
                }
            }
        }

        public void Insert<T>(T entity)
        {
            using(var Session = SessionFactory.OpenStatelessSession())
            using (var tran = Session.BeginTransaction())
            {
                try
                {
                    Session.Insert(entity);
                    tran.Commit();
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw;
                }
            }
        }

        public void SaveOrUpdate<T>(T entity)
        {
            using (var Session = SessionFactory.OpenSession())
            using (var tran = Session.BeginTransaction())
            {
                try
                {
                    Session.SaveOrUpdate(entity);
                    tran.Commit();
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw;
                }

            }
            
        }

        public void Delete<T>(T entity)
        {
            using(var Session = SessionFactory.OpenSession())
            using (var ts = Session.BeginTransaction())
            {
                try
                {
                    Session.Delete(entity);
                    ts.Commit();
                }
                catch (Exception ex)
                {
                    ts.Rollback();
                    throw;
                }
            }
        }

        public IList<T> ExecuteICriteriaOrderBy<T>(T entity,string orderBy)
        {
            using(var Session = SessionFactory.OpenStatelessSession())
            using (ITransaction transaction = Session.BeginTransaction())
            {
                try
                {
                    IList<T> result = Session.CreateCriteria(typeof(T))
                    .AddOrder(Order.Asc(orderBy))
                    .List<T>();
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
}}