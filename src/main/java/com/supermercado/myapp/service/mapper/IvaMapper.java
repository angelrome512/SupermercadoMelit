package com.supermercado.myapp.service.mapper;

import com.supermercado.myapp.domain.Iva;
import com.supermercado.myapp.service.dto.IvaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Iva} and its DTO {@link IvaDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface IvaMapper extends EntityMapper<IvaDTO, Iva> {
    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    IvaDTO toDtoId(Iva iva);
}
