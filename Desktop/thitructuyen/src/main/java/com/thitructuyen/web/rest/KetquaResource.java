package com.thitructuyen.web.rest;

import com.thitructuyen.domain.Ketqua;
import com.thitructuyen.domain.User;
import com.thitructuyen.repository.KetquaRepository;
import com.thitructuyen.repository.UserRepository;
import com.thitructuyen.security.SecurityUtils;
import com.thitructuyen.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.thitructuyen.domain.Ketqua}.
 */
@RestController
@RequestMapping("/api")
public class KetquaResource {

    private final Logger log = LoggerFactory.getLogger(KetquaResource.class);

    private static final String ENTITY_NAME = "ketqua";
    @Autowired
    private UserRepository userRepository;


    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    @Autowired
    private final KetquaRepository ketquaRepository;

    public KetquaResource(KetquaRepository ketquaRepository) {
        this.ketquaRepository = ketquaRepository;
    }

    /**
     * {@code POST  /ketquas} : Create a new ketqua.
     *
     * @param ketqua the ketqua to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ketqua, or with status {@code 400 (Bad Request)} if the ketqua has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ketquas")
    public ResponseEntity<Ketqua> createKetqua(@RequestBody Ketqua ketqua) throws URISyntaxException {
        log.debug("REST request to save Ketqua : {}", ketqua);
        if (ketqua.getId() != null) {
            throw new BadRequestAlertException("A new ketqua cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ketqua result = ketquaRepository.save(ketqua);
        return ResponseEntity.created(new URI("/api/ketquas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ketquas} : Updates an existing ketqua.
     *
     * @param ketqua the ketqua to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ketqua,
     * or with status {@code 400 (Bad Request)} if the ketqua is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ketqua couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ketquas")
    public ResponseEntity<Ketqua> updateKetqua(@RequestBody Ketqua ketqua) throws URISyntaxException {
        log.debug("REST request to update Ketqua : {}", ketqua);
        if (ketqua.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ketqua result = ketquaRepository.save(ketqua);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ketqua.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ketquas} : get all the ketquas.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ketquas in body.
     */
    @GetMapping("/ketquas")
    public List<Ketqua> getAllKetquas() {
        log.debug("REST request to get all Ketquas");
        return ketquaRepository.findAll();
    }

    /**
     * {@code GET  /ketquas/:id} : get the "id" ketqua.
     *
     * @param id the id of the ketqua to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ketqua, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ketquas/{id}")
    public ResponseEntity<Ketqua> getKetqua(@PathVariable Long id) {
        log.debug("REST request to get Ketqua : {}", id);
        Optional<Ketqua> ketqua = ketquaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ketqua);
    }



    /**
     * {@code DELETE  /ketquas/:id} : delete the "id" ketqua.
     *
     * @param id the id of the ketqua to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ketquas/{id}")
    public ResponseEntity<Void> deleteKetqua(@PathVariable Long id) {
        log.debug("REST request to delete Ketqua : {}", id);
        ketquaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/ketquas/user")
    public List<Ketqua> getKetquaByUserId(){
        Optional<User> optinalUser = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
        User user = optinalUser.get();
        return ketquaRepository.getKetquaByUserId(user.getLogin());

    }

}
