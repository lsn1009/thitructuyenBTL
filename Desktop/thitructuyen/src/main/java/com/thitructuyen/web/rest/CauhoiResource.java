package com.thitructuyen.web.rest;

import com.thitructuyen.domain.Cauhoi;
import com.thitructuyen.repository.CauhoiRepository;
import com.thitructuyen.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.thitructuyen.domain.Cauhoi}.
 */
@RestController
@RequestMapping("/api")
public class CauhoiResource {

    private final Logger log = LoggerFactory.getLogger(CauhoiResource.class);

    private static final String ENTITY_NAME = "cauhoi";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CauhoiRepository cauhoiRepository;

    public CauhoiResource(CauhoiRepository cauhoiRepository) {
        this.cauhoiRepository = cauhoiRepository;
    }

    /**
     * {@code POST  /cauhois} : Create a new cauhoi.
     *
     * @param cauhoi the cauhoi to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cauhoi, or with status {@code 400 (Bad Request)} if the cauhoi has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cauhois")
    public ResponseEntity<Cauhoi> createCauhoi(@Valid @RequestBody Cauhoi cauhoi) throws URISyntaxException {
        log.debug("REST request to save Cauhoi : {}", cauhoi);
        if (cauhoi.getId() != null) {
            throw new BadRequestAlertException("A new cauhoi cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cauhoi result = cauhoiRepository.save(cauhoi);
        return ResponseEntity.created(new URI("/api/cauhois/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cauhois} : Updates an existing cauhoi.
     *
     * @param cauhoi the cauhoi to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cauhoi,
     * or with status {@code 400 (Bad Request)} if the cauhoi is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cauhoi couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cauhois")
    public ResponseEntity<Cauhoi> updateCauhoi(@Valid @RequestBody Cauhoi cauhoi) throws URISyntaxException {
        log.debug("REST request to update Cauhoi : {}", cauhoi);
        if (cauhoi.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cauhoi result = cauhoiRepository.save(cauhoi);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, cauhoi.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cauhois} : get all the cauhois.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cauhois in body.
     */
    @GetMapping("/cauhois")
    public List<Cauhoi> getAllCauhois() {
        log.debug("REST request to get all Cauhois");
        return cauhoiRepository.findAll();
    }

    /**
     * {@code GET  /cauhois/:id} : get the "id" cauhoi.
     *
     * @param id the id of the cauhoi to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cauhoi, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cauhois/{id}")
    public ResponseEntity<Cauhoi> getCauhoi(@PathVariable Long id) {
        log.debug("REST request to get Cauhoi : {}", id);
        Optional<Cauhoi> cauhoi = cauhoiRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cauhoi);
    }

    /**
     * {@code DELETE  /cauhois/:id} : delete the "id" cauhoi.
     *
     * @param id the id of the cauhoi to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cauhois/{id}")
    public ResponseEntity<Void> deleteCauhoi(@PathVariable Long id) {
        log.debug("REST request to delete Cauhoi : {}", id);
        cauhoiRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
    @GetMapping("/cauhois/random")
    public List<Cauhoi> getCauhoiRandom(){
        return cauhoiRepository.getCauHoiRandom();
    }
}
