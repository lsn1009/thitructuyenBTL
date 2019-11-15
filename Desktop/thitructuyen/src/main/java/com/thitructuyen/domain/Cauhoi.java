package com.thitructuyen.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Cauhoi.
 */
@Entity
@Table(name = "cauhoi")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cauhoi implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "noidung", nullable = false)
    private String noidung;

    @NotNull
    @Column(name = "ketqua", nullable = false)
    private String ketqua;

    @Column(name = "dapan_1")
    private String dapan1;

    @Column(name = "dapan_2")
    private String dapan2;

    @Column(name = "dapan_3")
    private String dapan3;

    @Column(name = "dapan_4")
    private String dapan4;

    @ManyToOne
    @JsonIgnoreProperties("cauhois")
    private Dokho dokho;

    @ManyToOne
    @JsonIgnoreProperties("cauhois")
    private Loai loai;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNoidung() {
        return noidung;
    }

    public Cauhoi noidung(String noidung) {
        this.noidung = noidung;
        return this;
    }

    public void setNoidung(String noidung) {
        this.noidung = noidung;
    }

    public String getKetqua() {
        return ketqua;
    }

    public Cauhoi ketqua(String ketqua) {
        this.ketqua = ketqua;
        return this;
    }

    public void setKetqua(String ketqua) {
        this.ketqua = ketqua;
    }

    public String getDapan1() {
        return dapan1;
    }

    public Cauhoi dapan1(String dapan1) {
        this.dapan1 = dapan1;
        return this;
    }

    public void setDapan1(String dapan1) {
        this.dapan1 = dapan1;
    }

    public String getDapan2() {
        return dapan2;
    }

    public Cauhoi dapan2(String dapan2) {
        this.dapan2 = dapan2;
        return this;
    }

    public void setDapan2(String dapan2) {
        this.dapan2 = dapan2;
    }

    public String getDapan3() {
        return dapan3;
    }

    public Cauhoi dapan3(String dapan3) {
        this.dapan3 = dapan3;
        return this;
    }

    public void setDapan3(String dapan3) {
        this.dapan3 = dapan3;
    }

    public String getDapan4() {
        return dapan4;
    }

    public Cauhoi dapan4(String dapan4) {
        this.dapan4 = dapan4;
        return this;
    }

    public void setDapan4(String dapan4) {
        this.dapan4 = dapan4;
    }

    public Dokho getDokho() {
        return dokho;
    }

    public Cauhoi dokho(Dokho dokho) {
        this.dokho = dokho;
        return this;
    }

    public void setDokho(Dokho dokho) {
        this.dokho = dokho;
    }

    public Loai getLoai() {
        return loai;
    }

    public Cauhoi loai(Loai loai) {
        this.loai = loai;
        return this;
    }

    public void setLoai(Loai loai) {
        this.loai = loai;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cauhoi)) {
            return false;
        }
        return id != null && id.equals(((Cauhoi) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Cauhoi{" +
            "id=" + getId() +
            ", noidung='" + getNoidung() + "'" +
            ", ketqua='" + getKetqua() + "'" +
            ", dapan1='" + getDapan1() + "'" +
            ", dapan2='" + getDapan2() + "'" +
            ", dapan3='" + getDapan3() + "'" +
            ", dapan4='" + getDapan4() + "'" +
            "}";
    }
}
