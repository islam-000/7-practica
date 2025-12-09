using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            double[] numbers = { 1.5, 2.7, 3.1, 4.8, 5.3, 6.9, 7.3, 8.1, 9.6, 10.4, 11.2, 12.7, 13.2, 14.7, 15.8 };
            for (int i = 0; i < numbers.Length; i++)
            {
                Console.Write(numbers[i] + " ");
            }
            var max = numbers.Max(b => Convert.ToDouble(b));
            Console.WriteLine(" ");
            Console.WriteLine($"Максимальное: {max}");
            var min = numbers.Min(b => Convert.ToDouble(b));

            Console.WriteLine($"Минимальное: {min}");
            Console.WriteLine($"Разность между макс и мин: {max - min}");
            var average = numbers.Average(b => Convert.ToDouble(b));
            var averagebig = numbers.Where(b => Convert.ToDouble(b) > average);
            Console.WriteLine($"среднее: {average}");
            Console.WriteLine($"Элементы больше среднего: ");
            foreach (var a in averagebig)
            {

                Console.WriteLine(a);
            }

        }
    }
}
