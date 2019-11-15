package com.thitructuyen.repository;
import com.thitructuyen.domain.Ketqua;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Ketqua entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KetquaRepository extends JpaRepository<Ketqua, Long> {

    @Query("select ketqua from Ketqua ketqua where ketqua.user.login = ?#{principal.username}")
    List<Ketqua> findByUserIsCurrentUser();
    @Query("select kq from Ketqua kq where kq.user.login = ?1")
    List<Ketqua> getKetquaByUserId(String login);
}
