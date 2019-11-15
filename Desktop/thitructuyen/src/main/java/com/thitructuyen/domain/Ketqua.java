package com.thitructuyen.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Ketqua.
 */
@Entity
@Table(name = "ketqua")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ketqua implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "diemso")
    private Integer diemso;

    @ManyToOne
    @JsonIgnoreProperties("ketquas")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDiemso() {
        return diemso;
    }

    public Ketqua diemso(Integer diemso) {
        this.diemso = diemso;
        return this;
    }

    public void setDiemso(Integer diemso) {
        this.diemso = diemso;
    }

    public User getUser() {
        return user;
    }

    public Ketqua user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ketqua)) {
            return false;
        }
        return id != null && id.equals(((Ketqua) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Ketqua{" +
            "id=" + getId() +
            ", diemso=" + getDiemso() +
            "}";
    }

}
