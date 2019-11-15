package com.thitructuyen.repository;
import com.thitructuyen.domain.Cauhoi;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Cauhoi entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CauhoiRepository extends JpaRepository<Cauhoi, Long> {
    @Query(value="select * from Cauhoi order by rand() limit 5", nativeQuery = true)
    List<Cauhoi> getCauHoiRandom();
}
