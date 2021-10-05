using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Convertors
{
    public class LevelConvertors
    {
        public static Level ToLevel(LevelDto m)
        {
            return new Level()
            {
                LevelCode=m.LevelCode,
                LevelName=m.LevelName

            };

        }
        public static LevelDto ToLevelDto(Level m)
        {
            return new LevelDto()
            {
              LevelCode=m.LevelCode,
              LevelName=m.LevelName
              
            };
        }

        public static List<LevelDto> ToLevelDtoList(List<Level> mList)
        {
            List<LevelDto> mdList = new List<LevelDto>();
            foreach (var item in mList)
            {
                mdList.Add(ToLevelDto(item));
            }
            return mdList;
        }
        public static List<Level> ToLevelList(List<LevelDto> mList)
        {
            List<Level> mdList = new List<Level>();
            foreach (var item in mList)
            {
                mdList.Add(ToLevel(item));
            }
            return mdList;
        }
    }
}

