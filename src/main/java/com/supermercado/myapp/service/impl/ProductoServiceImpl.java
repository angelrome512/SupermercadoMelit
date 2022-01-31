package com.supermercado.myapp.service.impl;

import com.supermercado.myapp.domain.Iva;
import com.supermercado.myapp.domain.Producto;
import com.supermercado.myapp.repository.ProductoRepository;
import com.supermercado.myapp.repository.specification.ProductoSpecification;
import com.supermercado.myapp.service.ProductoService;
import com.supermercado.myapp.service.dto.ProductoDTO;
import com.supermercado.myapp.service.mapper.ProductoMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Producto}.
 */
@Service
@Transactional
public class ProductoServiceImpl implements ProductoService {

    private final Logger log = LoggerFactory.getLogger(ProductoServiceImpl.class);

    private final ProductoRepository productoRepository;

    private final ProductoMapper productoMapper;

    public ProductoServiceImpl(ProductoRepository productoRepository, ProductoMapper productoMapper) {
        this.productoRepository = productoRepository;
        this.productoMapper = productoMapper;
    }

    @Override
    public ProductoDTO save(ProductoDTO productoDTO) {
        log.debug("Request to save Producto : {}", productoDTO);
        Producto producto = productoMapper.toEntity(productoDTO);
        if (null != producto.getPrecioTotal()) {
            producto.getPrecioTotal();

            if (null == producto.getPrecioTotal()) {
                producto.setPrecioTotal(0.0);

                if (null != producto.getIva()) {
                    Iva iva = producto.getIva();

                    if ("A" == iva.getTipo() && 1.04 == iva.getValor()) {
                        producto.setPrecioTotal(producto.getPrecioBase() * iva.getValor());
                    }

                    if ("B" == iva.getTipo() && 1.10 == iva.getValor()) {
                        producto.setPrecioTotal(producto.getPrecioBase() * iva.getValor());
                    }

                    if ("C" == iva.getTipo() && 1.21 == iva.getValor()) {
                        producto.setPrecioTotal(producto.getPrecioBase() * iva.getValor());
                    }
                }
            }
        }
        producto = productoRepository.save(producto);

        return productoMapper.toDto(producto);
    }

    @Override
    public Optional<ProductoDTO> partialUpdate(ProductoDTO productoDTO) {
        log.debug("Request to partially update Producto : {}", productoDTO);

        return productoRepository
            .findById(productoDTO.getId())
            .map(existingProducto -> {
                productoMapper.partialUpdate(existingProducto, productoDTO);

                return existingProducto;
            })
            .map(productoRepository::save)
            .map(productoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Productos");
        return productoRepository.findAll(pageable).map(productoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ProductoDTO> findOne(Long id) {
        log.debug("Request to get Producto : {}", id);
        return productoRepository.findById(id).map(productoMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Producto : {}", id);
        productoRepository.deleteById(id);
    }

    @Override
    public Page<ProductoDTO> findAllProductoBySpecification(String filter, Pageable pageable) {
        log.debug("Request to get all Productos by specificaction");
        return productoRepository.findAll(ProductoSpecification.searchingParam(filter), pageable).map(productoMapper::toDto);
    }
}
