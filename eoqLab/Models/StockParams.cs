namespace eoqLab.Models
{
    public class StockParams
    {
        public int ID { get; set; }
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
        public int ColorID { get; set; }
        public string ColorName { get; set; }
        public int UnitID { get; set; }
        public string UnitName { get; set; }
        public int BrandID { get; set; }
        public string BrandName { get; set; }
        public float Amount { get; set; }
        public float Price { get; set; }
    }
}