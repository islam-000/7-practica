using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp5
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string[] books =
           {
                "ИвановА.А.-охранник",
                "ПетровА.А.-бухгалтер",
                "СидоровА.А.-администратор",
                "СафоновА.А.-директор",
                "МакаровМ.П.-охранник",
                "ГончарА.А.-бухгалтер",
                "СмирновА.А.-администратор",
            };
            Console.WriteLine("===Анализ сотрудников===");
            Console.WriteLine("Сотрудники с должностью бухгалтер:");
            var a1 = books.Where(b => Convert.ToString(b.Split('-')[1]) == "бухгалтер");
            foreach (var b2 in a1)
            {
                Console.WriteLine($"  - {b2.Split('-')[0]} {b2.Split('-')[1]}");
            }
            Console.WriteLine("Сотрудники чья фамилия начинается на букву (С)");
            var startWithV = books.Where(b => b.StartsWith("С"));
            foreach (var book in startWithV)
            {
                Console.WriteLine(book);
            }
            var alf = books.OrderBy(b => (b.Split('-')[0]));
            Console.WriteLine("По алфавиту: ");
            foreach (var i in alf)
                Console.WriteLine(i);
        }
    }
}
