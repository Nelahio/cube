using AutoMapper;
using Contracts;
using EnchereService.DTOs;
using EnchereService.Models;

namespace EnchereService.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Enchere, EnchereDto>().IncludeMembers(e => e.Item);
        CreateMap<Produit, EnchereDto>();
        CreateMap<CreateEnchereDto, Enchere>()
        .ForMember(d => d.Item, o => o.MapFrom(s => s));
        CreateMap<CreateEnchereDto, Produit>();
        CreateMap<EnchereDto, EnchereCreated>();
        CreateMap<Enchere, EnchereUpdated>().IncludeMembers(e => e.Item);
        CreateMap<Produit, EnchereUpdated>();
    }
}
