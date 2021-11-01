using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Convertors
{
    public class UnitMeasureConvertors
    {
        public static UnitMeasure ToUnitMeasure(UnitMeasureDto u)
        {
            return new UnitMeasure()
            {
                UnitCode=u.UnitCode,
                UnitName = u.UnitName,
                ConvertionMeasureAmount=u.ConvertionMeasureAmount,
                ConvertionMeasureCode=u.ConvertionMeasureCode
            };

        }
        public static UnitMeasureDto ToUnitMeasureDto(UnitMeasure u)
        {
            return new UnitMeasureDto()
            {
                UnitCode=u.UnitCode,
                UnitName = u.UnitName,
                ConvertionMeasureAmount = u.ConvertionMeasureAmount,
                ConvertionMeasureCode = u.ConvertionMeasureCode
            };
        }

        public static List<UnitMeasureDto> ToUnitMeasureDtoList(List<UnitMeasure> pList)
        {
            List<UnitMeasureDto> pdList = new List<UnitMeasureDto>();
            foreach (var item in pList)
            {
                pdList.Add(ToUnitMeasureDto(item));
            }
            return pdList;
        }
        public static List<UnitMeasure> ToUnitMeasureList(List<UnitMeasureDto> pList)
        {
            List<UnitMeasure> pdList = new List<UnitMeasure>();
            foreach (var item in pList)
            {
                pdList.Add(ToUnitMeasure(item));
            }
            return pdList;
        }
    }
}
