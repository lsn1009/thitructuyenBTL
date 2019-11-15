package com.thitructuyen.web.rest;

import com.thitructuyen.domain.Dokho;
import com.thitructuyen.repository.DokhoRepository;
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
 * REST controller for managing {@link com.thitructuyen.domain.Dokho}.
 */
@RestController
@RequestMapping("/api")
public class DokhoResource {

    private final Logger log = LoggerFactory.getLogger(DokhoResource.class);

    private static final String ENTITY_NAME = "dokho";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DokhoRepository dokhoRepository;

    public DokhoResource(DokhoRepository dokhoRepository) {
        this.dokhoRepository = dokhoRepository;
    }

    /**
     * {@code POST  /dokhos} : Create a new dokho.
     *
     * @param dokho the dokho to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dokho, or with status {@code 400 (Bad Request)} if the dokho has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/dokhos")
    public ResponseEntity<Dokho> createDokho(@Valid @RequestBody Dokho dokho) throws URISyntaxException {
        log.debug("REST request to save Dokho : {}", dokho);
        if (dokho.getId() != null) {
            throw new BadRequestAlertException("A new dokho cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Dokho result = dokhoRepository.save(dokho);
        return ResponseEntity.created(new URI("/api/dokhos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /dokhos} : Updates an existing dokho.
     *
     * @param dokho the dokho to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dokho,
     * or with status {@code 400 (Bad Request)} if the dokho is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dokho couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/dokhos")
    public ResponseEntity<Dokho> updateDokho(@Valid @RequestBody Dokho dokho) throws URISyntaxException {
        log.debug("REST request to update Dokho : {}", dokho);
        if (dokho.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Dokho result = dokhoRepository.save(dokho);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, dokho.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /dokhos} : get all the dokhos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dokhos in body.
     */
    @GetMapping("/dokhos")
    public List<Dokho> getAllDokhos() {
        log.debug("REST request to get all Dokhos");
        return dokhoRepository.findAll();
    }

    /**
     * {@code GET  /dokhos/:id} : get the "id" dokho.
     *
     * @param id the id of the dokho to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dokho, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/dokhos/{id}")
    public ResponseEntity<Dokho> getDokho(@PathVariable Long id) {
        log.debug("REST request to get Dokho : {}", id);
        Optional<Dokho> dokho = dokhoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dokho);
    }

    /**
     * {@code DELETE  /dokhos/:id} : delete the "id" dokho.
     *
     * @param id the id of the dokho to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/dokhos/{id}")
    public ResponseEntity<Void> deleteDokho(@PathVariable Long id) {
        log.debug("REST request to delete Dokho : {}", id);
        dokhoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
