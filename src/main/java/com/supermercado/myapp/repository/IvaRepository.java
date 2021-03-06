package com.supermercado.myapp.repository;

import com.supermercado.myapp.domain.Iva;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Iva entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IvaRepository extends JpaRepository<Iva, Long> {}
