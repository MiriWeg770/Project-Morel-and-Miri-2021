using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Convertors
{
   public class PictureConvertors
    {
        public static Picture ToPicture(PictureDto p)
        {
            return new Picture()
            {
                PictureCode = p.PictureCode,
                PictureName = p.PictureName,

            };

        }
        public static PictureDto ToPictureDto(Picture p)
        {
            return new PictureDto()
            {
                PictureCode = p.PictureCode,
                PictureName = p.PictureName,

            };
        }

        public static List<PictureDto> ToPictureDtoList(List<Picture> pList)
        {
            List<PictureDto> udList = new List<PictureDto>();
            foreach (var item in pList)
            {
                udList.Add(ToPictureDto(item));
            }
            return udList;
        }
        public static List<Picture> ToPictureList(List<PictureDto> pList)
        {
            List<Picture> pdList = new List<Picture>();
            foreach (var item in pList)
            {
                pdList.Add(ToPicture(item));
            }
            return pdList;
        }


    }
}

