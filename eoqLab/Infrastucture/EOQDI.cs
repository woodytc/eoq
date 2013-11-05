using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ninject;
using System.Web.Mvc;
//using Spring.Context.Support;
using System.Diagnostics;
using Eoq.Mappings.FluentNh.Repository;

using Eoq.Mappings.FluentNh;
using NHibernate;
using FluentNHibernate.Cfg;
using NHibernate.ByteCode.Castle;
using FluentNHibernate.Cfg.Db;
using eoqLab.Properties;

//using Spring.Context;

namespace eoqLab.Infrastucture
{
    public static class EOQDI
    {
        public static void Initialize()
        {
            HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
            //log4net.Config.XmlConfigurator.Configure();
            IKernel kernel = new StandardKernel();
            
            var a = CreateSessionFactory();
            kernel.Bind<ISessionFactory>().ToConstant(CreateSessionFactory()).InSingletonScope();
            
            kernel.Bind<IDepartmentRepository>()
                .To<DepartmentRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());
            //employee
            kernel.Bind<IEmployeeMailRepository>()
                .To<EmployeeMailRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());
            
            kernel.Bind<IEmployeePhoneRepository>()
                .To<EmployeePhoneRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());
            kernel.Bind<IEmployeeRepository>()
                .To<EmployeeRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());
            //eoq
            kernel.Bind<IEOQRepository>()
                .To<EOQRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());
            //invoice
            kernel.Bind<IInvoiceRepository>()
                .To<InvoiceRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());
            //Meterial
            kernel.Bind<IMaterialRepository>()
                .To<MaterialRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());
            
            //orders
            kernel.Bind<IOrdersRepository>()
                .To<OrdersRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());

            //PurchaseOrder
            kernel.Bind<IPurchaseOrderRepository>()
                .To<PurchaseOrderRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());
            //Reveice
            kernel.Bind<IReceiveRepository>()
                .To<ReceiveRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());
            //Requisition
            kernel.Bind<IRequisitionRepository>()
                .To<RequisitionRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());
            //SupplierMail
            kernel.Bind<ISupplierMailRepository>()
                .To<SupplierMailRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());
            //SupplierPhone
            kernel.Bind<ISupplierPhoneRepository>()
                .To<SupplierPhoneRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());
            //Supplier
            kernel.Bind<ISupplierRepository>()
                .To<SupplierRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());
            //Withdraw
            kernel.Bind<IWithdrawRepository>()
                .To<WithdrawRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());

            //unit
            kernel.Bind<IUnitRepository>()
                .To<UnitRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());
              
            //StartProcess();
            DependencyResolver.SetResolver(new NinjectDependencyResolver(kernel));
        }

        public static ISessionFactory CreateSessionFactory()
        {
            //Appist: 192.168.30.3
            return Fluently.Configure()
                .ProxyFactoryFactory<ProxyFactoryFactory>()
                .Database(MsSqlConfiguration.MsSql2008
                .ConnectionString(c => c
                .Server(Settings.Default.ServerDatabase) //dbuat01, 192.168.30.3, 192.168.10.11
                .Username(Settings.Default.UsernameDatabase)
                .Password(Settings.Default.PasswordDatabase)
                .Database(Settings.Default.Database)))
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<DepartmentMap>())
                .ExposeConfiguration(c => c.SetProperty("current_session_context_class", "thread_static"))
                .BuildSessionFactory();
        }

    }
}