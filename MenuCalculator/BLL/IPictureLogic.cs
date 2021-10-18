using DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL
{
   public interface IPictureLogic
    {
        List<PictureDto> GetAllPicture();
        PictureDto GetPictureById(int id);
        PictureDto AddPicture(PictureDto u);
        PictureDto AddPictureToUser(PictureDto u);
        List<PictureDto> GetUserPicture(int id);
        PictureDto DeletPicture(PictureDto u);
        PictureDto UpdatePicture(PictureDto u);
    }
}
