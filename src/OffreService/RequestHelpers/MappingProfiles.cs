using AutoMapper;
using OffreService.Contracts;
using OffreService.DTOs;
using OffreService.Models;

namespace OffreService.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Offre, OffreDto>();
        CreateMap<Offre, OffreCreated>();
    }
}
