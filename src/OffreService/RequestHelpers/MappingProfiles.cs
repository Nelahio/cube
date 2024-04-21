using AutoMapper;
using OffreService.DTOs;
using OffreService.Models;

namespace OffreService.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Offre, OffreDto>();
    }
}
