using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp9
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine($"Табель оценок студентов (Рус.яз, Ин.яз, Мат, Инф, Физ)");
            string[] students =
            {
                 "Иванов-5-5-5-5-5",
                "Петров-4-5-4-5-4",
                "Сидоров-5-4-5-4-5",
                "Козлов-4-4-4-4-3",
                "Николаев-3-4-3-5-4",
                "Фёдоров-5-5-3-4-3",
                "Волков-4-3-5-3-4",
                "Орлов-3-5-4-4-2",
                "Макаров-4-3-3-3-3",
                "Жуков-3-3-4-5-3",
            };
            Console.WriteLine();
            foreach (string tab in students)
            {
                var part = tab.Split('-');
                Console.Write($"{part[0]}: ");
                for (int i = 1; i < part.Length; i++)
                {
                    Console.Write($"{part[i]}, ");
                }
                Console.WriteLine();
            }
            Console.WriteLine();
            Console.WriteLine($"Введите средний балл");
            double a = Convert.ToDouble(Console.ReadLine());
            Console.WriteLine();
            Console.WriteLine($"Ученики со средним баллом выше {a}:");
            foreach (string tab in students)
            {
                var part = tab.Split('-');
                string name = part[0];
                double sum = 0;
                for (int i = 1; i < part.Length; i++)
                {
                    sum += Convert.ToDouble(part[i]);
                }
                double sred = sum / (part.Length - 1);
                if (sred > a)
                {
                    Console.WriteLine($"{name}: {sred:f1}");
                }
            }
            Console.WriteLine();
            Console.WriteLine($"Успеваимость по предметам:");
            string[] sub = { "Рус.яз", "Ин.яз", "Мат", "Инф", "Физ" };
            double[] best = new double[sub.Length];
            for (int i = 0; i < sub.Length; i++)
            {

                double summ = 0;
                foreach (string tab in students)
                {
                    var part = tab.Split('-');
                    summ += Convert.ToDouble(part[i + 1]);
                }
                best[i] = summ / students.Length;
                Console.WriteLine($"{sub[i]}: {best[i]}");
            }
            Console.WriteLine();
            Console.WriteLine($"Предмет с наивысшей успеваимостью:");
            double max = 0;
            string bsub = "";
            for (int i = 0; i < best.Length; i++)
            {
                if (best[i] > max)
                {
                    max = best[i];
                    bsub = sub[i];
                }
            }
            Console.WriteLine($"{bsub}: {max}");
            Console.WriteLine();
            string[] reit = new string[students.Length];
            for (int i = 0; i < reit.Length; i++)
            {
                var part = students[i].Split('-');
                string name = part[0];
                double sum = 0;
                for (int j = 1; j < part.Length; j++)
                {
                    sum += Convert.ToDouble(part[j]);
                }
                double sred = sum / (part.Length - 1);
                reit[i] = $"{name}-{sred}";
            }
            var rit = reit.OrderByDescending(b => Convert.ToDouble(b.Split('-')[1]));
            int kol = 1;
            foreach (string b in rit)
            {
                Console.WriteLine($"{kol}.  {b.Split('-')[0]} -- {b.Split('-')[1]}");
                kol++;
            }
            Console.WriteLine();
            Console.WriteLine($"Отличники");
            foreach (string tab in students)
            {
                var part = tab.Split('-');
                var name = part[0];
                int five = 0;
                for (int j = 1; j < part.Length; j++)
                {
                    if (part[j] == "5")
                    {
                        five++;
                    }
                }
                if (five == part.Length - 1)
                {
                    Console.WriteLine($"  --  {name}  --  ");
                }
            }
        }
    }
}
