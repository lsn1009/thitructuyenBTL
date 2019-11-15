package com.thitructuyen.repository;
import com.thitructuyen.domain.Loai;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Loai entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LoaiRepository extends JpaRepository<Loai, Long> {
}
