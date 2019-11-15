package com.thitructuyen.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Dokho.
 */
@Entity
@Table(name = "dokho")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Dokho implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "dokho", nullable = false)
    private String dokho;

    @OneToMany(mappedBy = "dokho")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Cauhoi> cauhois = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDokho() {
        return dokho;
    }

    public Dokho dokho(String dokho) {
        this.dokho = dokho;
        return this;
    }

    public void setDokho(String dokho) {
        this.dokho = dokho;
    }

    public Set<Cauhoi> getCauhois() {
        return cauhois;
    }

    public Dokho cauhois(Set<Cauhoi> cauhois) {
        this.cauhois = cauhois;
        return this;
    }

    public Dokho addCauhoi(Cauhoi cauhoi) {
        this.cauhois.add(cauhoi);
        cauhoi.setDokho(this);
        return this;
    }

    public Dokho removeCauhoi(Cauhoi cauhoi) {
        this.cauhois.remove(cauhoi);
        cauhoi.setDokho(null);
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
        if (!(o instanceof Dokho)) {
            return false;
        }
        return id != null && id.equals(((Dokho) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Dokho{" +
            "id=" + getId() +
            ", dokho='" + getDokho() + "'" +
            "}";
    }
}
