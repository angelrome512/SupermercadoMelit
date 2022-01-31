package com.supermercado.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.supermercado.myapp.domain.Iva} entity.
 */
public class IvaDTO implements Serializable {

    private Long id;

    private String tipo;

    private Double valor;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof IvaDTO)) {
            return false;
        }

        IvaDTO ivaDTO = (IvaDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, ivaDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "IvaDTO{" +
            "id=" + getId() +
            ", tipo='" + getTipo() + "'" +
            ", valor=" + getValor() +
            "}";
    }
}
