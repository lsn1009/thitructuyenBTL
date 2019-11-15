package com.thitructuyen.repository;
import com.thitructuyen.domain.Dokho;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Dokho entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DokhoRepository extends JpaRepository<Dokho, Long> {

}
