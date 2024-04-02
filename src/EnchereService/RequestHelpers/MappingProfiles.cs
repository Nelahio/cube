using AutoMapper;
using EnchereService.DTOs;
using EnchereService.Models;

namespace EnchereService;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Enchere, EnchereDto>().IncludeMembers(e => e.Item);
        CreateMap<Produit, EnchereDto>();
        CreateMap<CreateEnchereDto, Enchere>()
        .ForMember(d => d.Item, o => o.MapFrom(s => s));
        CreateMap<CreateEnchereDto, Produit>();
    }
}
