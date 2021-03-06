using DAL.Models;
using DTO;
using DTO.Convertors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
    public class PictureLogic : IPictureLogic

    {
        private MenuCalculatorContext _context;
        public PictureLogic(MenuCalculatorContext context)
        {
            _context = context;
        }
        public PictureDto AddPicture(PictureDto p)
        {
            try
            {
                Picture m = PictureConvertors.ToPicture(p);
                Picture m1 = new Picture() { PictureName = p.PictureName };
                _context.Picture.Add(m1);
                _context.SaveChanges();
                m1 = _context.Picture.FirstOrDefault(i => i.PictureName == p.PictureName);
                return PictureConvertors.ToPictureDto(m1);
            }
            catch (Exception e)
            {
                _context.Picture.Remove(PictureConvertors.ToPicture(p));
                _context.SaveChanges();
                return p;
            }
        }

        public PictureDto AddPictureToUser(PictureDto u)
        {
            throw new NotImplementedException();
        }

        public PictureDto DeletPicture(PictureDto u)
        {
            _context.Picture.Remove(PictureConvertors.ToPicture(u));
            _context.SaveChanges();
            return u;
        }

        public List<PictureDto> GetAllPicture()
        {
            return PictureConvertors.ToPictureDtoList(_context.Picture.ToList());
        }

        public PictureDto GetPictureById(int id)
        {
            try
            {
                return PictureConvertors.ToPictureDto(_context.Picture.FirstOrDefault(p => p.PictureCode == id));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<PictureDto> GetUserPicture(int id)
        {
            throw new NotImplementedException();
        }

        public PictureDto UpdatePicture(PictureDto u)
        {
            throw new NotImplementedException();
        }
    }
}
