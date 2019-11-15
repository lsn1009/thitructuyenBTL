package com.thitructuyen.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Loai.
 */
@Entity
@Table(name = "loai")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Loai implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "tenloai", nullable = false)
    private String tenloai;

    @OneToMany(mappedBy = "loai")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Cauhoi> cauhois = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTenloai() {
        return tenloai;
    }

    public Loai tenloai(String tenloai) {
        this.tenloai = tenloai;
        return this;
    }

    public void setTenloai(String tenloai) {
        this.tenloai = tenloai;
    }

    public Set<Cauhoi> getCauhois() {
        return cauhois;
    }

    public Loai cauhois(Set<Cauhoi> cauhois) {
        this.cauhois = cauhois;
        return this;
    }

    public Loai addCauhoi(Cauhoi cauhoi) {
        this.cauhois.add(cauhoi);
        cauhoi.setLoai(this);
        return this;
    }

    public Loai removeCauhoi(Cauhoi cauhoi) {
        this.cauhois.remove(cauhoi);
        cauhoi.setLoai(null);
        return this;
    }

    public void setCauhois(Set<Cauhoi> cauhois) {
        this.cauhois = cauhois;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Loai)) {
            return false;
        }
        return id != null && id.equals(((Loai) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Loai{" +
            "id=" + getId() +
            ", tenloai='" + getTenloai() + "'" +
            "}";
    }
}
