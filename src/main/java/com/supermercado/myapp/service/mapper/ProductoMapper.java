package com.supermercado.myapp.service.mapper;

import com.supermercado.myapp.domain.Producto;
import com.supermercado.myapp.service.dto.ProductoDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Producto} and its DTO {@link ProductoDTO}.
 */
@Mapper(componentModel = "spring", uses = { IvaMapper.class })
public interface ProductoMapper extends EntityMapper<ProductoDTO, Producto> {
    @Mapping(target = "iva", source = "iva", qualifiedByName = "id")
    ProductoDTO toDto(Producto s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProductoDTO toDtoId(Producto producto);
}
