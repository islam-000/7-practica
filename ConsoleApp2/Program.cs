using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string[] strings = new string[5];
            for (int i = 0; i < strings.Length; i++)
            {
                Console.WriteLine("Введите строку: ");
                strings[i] = Console.ReadLine();
                Console.Write("");
            }
            int dlin = strings[0].Length;
            string dlins = "";
            for (int i = 0; i < strings.Length; i++)
            {
                if (strings[i].Length >= dlin)
                {
                    dlin = strings[i].Length;
                    dlins = strings[i];
                }
            }
            Console.WriteLine($"Длинная строка: {dlins}, кол-во элементов: {dlin}");
            Console.WriteLine($"Все строки котрорые вы ввели: ");
            int si = 0;
            Console.WriteLine($"Введите слово которое хотите найти:");
            string slova = Console.ReadLine();
            for (int i = 0; i < strings.Length; i++)
            {
                if (strings[i] == slova)
                {
                    si = i;
                    Console.WriteLine($"Индекс слова ({strings[i]}) в массиве равен {si}");
                    break;
                }
            }
            Console.WriteLine("Введите букву клторую хотите найти в словах:");
            string a = Console.ReadLine();
            for (int i = 0; i < strings.Length; i++)
            {
                string b = strings[i];
                for (int j = 0; j < b.Length; j++)
                {
                    string c = b[i].ToString();
                    if (c == a)
                    {
                        Console.Write(strings[i] + "");
                        break;
                    }
                }
            }
        }
    }
}
