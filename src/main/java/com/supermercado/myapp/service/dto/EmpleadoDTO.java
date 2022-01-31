package com.supermercado.myapp.service.dto;

import com.supermercado.myapp.domain.enumeration.Cargo;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.supermercado.myapp.domain.Empleado} entity.
 */
public class EmpleadoDTO implements Serializable {

    private Long id;

    @NotNull
    private String nombre;

    @NotNull
    private String documento;

    @NotNull
    private String direccion;

    @NotNull
    private String email;

    @NotNull
    private String telefono;

    @NotNull
    private Cargo cargo;

    private String codigoSU;

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public Cargo getCargo() {
        return cargo;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
    }

    public String getCodigoSU() {
        return codigoSU;
    }

    public void setCodigoSU(String codigoSU) {
        this.codigoSU = codigoSU;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmpleadoDTO)) {
            return false;
        }

        EmpleadoDTO empleadoDTO = (EmpleadoDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, empleadoDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmpleadoDTO{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", email='" + getEmail() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", cargo='" + getCargo() + "'" +
            ", codigoSU='" + getCodigoSU() + "'" +
            "}";
    }
}
