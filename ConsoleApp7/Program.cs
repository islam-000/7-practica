using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp7
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Создайте каталог товаров(название, цена, категория).Выполните:
            //• Фильтрацию по категории
            //• Поиск товаров в заданном ценовом диапазоне
            //• Вывод товаров, отсортированных по цене
            string[] tavars =
            {
                "Молоко1л-70-Напиток",
                "ХлебБородинский-50-Хлебобулочные",
                "ЯблокиКрасные-120-Фрукты",
                "ШоколадЧёрный-150-Сладости",
                "Кефир1л-60-Напиток",
                "БатонНарезной-45-Хлебобулочные",
                "ГрушиЗеленые-130-Фрукты",
            };
            Console.WriteLine("Товары с категорией хлебобулочные:");
            var a1 = tavars.Where(b => Convert.ToString(b.Split('-')[2]) == "Хлебобулочные");
            foreach (var a in a1)
            {
                Console.WriteLine($"  - {a.Split('-')[0]} {a.Split('-')[2]}");
            }
            Console.WriteLine("Товары  в  ценовом диапазоне больше 120р.: ");
            var a2 = tavars.Where(b => Convert.ToInt32(b.Split('-')[1]) > 120);
            foreach (var b3 in a2)
            {
                Console.WriteLine($"  - {b3.Split('-')[0]} {b3.Split('-')[1]} руб");
            }
        }
    }
}
