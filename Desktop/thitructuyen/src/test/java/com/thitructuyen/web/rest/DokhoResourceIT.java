package com.thitructuyen.web.rest;

import com.thitructuyen.ThitructuyenApp;
import com.thitructuyen.domain.Dokho;
import com.thitructuyen.repository.DokhoRepository;
import com.thitructuyen.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.thitructuyen.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DokhoResource} REST controller.
 */
@SpringBootTest(classes = ThitructuyenApp.class)
public class DokhoResourceIT {

    private static final String DEFAULT_DOKHO = "AAAAAAAAAA";
    private static final String UPDATED_DOKHO = "BBBBBBBBBB";

    @Autowired
    private DokhoRepository dokhoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restDokhoMockMvc;

    private Dokho dokho;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DokhoResource dokhoResource = new DokhoResource(dokhoRepository);
        this.restDokhoMockMvc = MockMvcBuilders.standaloneSetup(dokhoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Dokho createEntity(EntityManager em) {
        Dokho dokho = new Dokho()
            .dokho(DEFAULT_DOKHO);
        return dokho;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Dokho createUpdatedEntity(EntityManager em) {
        Dokho dokho = new Dokho()
            .dokho(UPDATED_DOKHO);
        return dokho;
    }

    @BeforeEach
    public void initTest() {
        dokho = createEntity(em);
    }

    @Test
    @Transactional
    public void createDokho() throws Exception {
        int databaseSizeBeforeCreate = dokhoRepository.findAll().size();

        // Create the Dokho
        restDokhoMockMvc.perform(post("/api/dokhos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dokho)))
            .andExpect(status().isCreated());

        // Validate the Dokho in the database
        List<Dokho> dokhoList = dokhoRepository.findAll();
        assertThat(dokhoList).hasSize(databaseSizeBeforeCreate + 1);
        Dokho testDokho = dokhoList.get(dokhoList.size() - 1);
        assertThat(testDokho.getDokho()).isEqualTo(DEFAULT_DOKHO);
    }

    @Test
    @Transactional
    public void createDokhoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dokhoRepository.findAll().size();

        // Create the Dokho with an existing ID
        dokho.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDokhoMockMvc.perform(post("/api/dokhos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dokho)))
            .andExpect(status().isBadRequest());

        // Validate the Dokho in the database
        List<Dokho> dokhoList = dokhoRepository.findAll();
        assertThat(dokhoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDokhoIsRequired() throws Exception {
        int databaseSizeBeforeTest = dokhoRepository.findAll().size();
        // set the field null
        dokho.setDokho(null);

        // Create the Dokho, which fails.

        restDokhoMockMvc.perform(post("/api/dokhos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dokho)))
            .andExpect(status().isBadRequest());

        List<Dokho> dokhoList = dokhoRepository.findAll();
        assertThat(dokhoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDokhos() throws Exception {
        // Initialize the database
        dokhoRepository.saveAndFlush(dokho);

        // Get all the dokhoList
        restDokhoMockMvc.perform(get("/api/dokhos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dokho.getId().intValue())))
            .andExpect(jsonPath("$.[*].dokho").value(hasItem(DEFAULT_DOKHO.toString())));
    }
    
    @Test
    @Transactional
    public void getDokho() throws Exception {
        // Initialize the database
        dokhoRepository.saveAndFlush(dokho);

        // Get the dokho
        restDokhoMockMvc.perform(get("/api/dokhos/{id}", dokho.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dokho.getId().intValue()))
            .andExpect(jsonPath("$.dokho").value(DEFAULT_DOKHO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDokho() throws Exception {
        // Get the dokho
        restDokhoMockMvc.perform(get("/api/dokhos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDokho() throws Exception {
        // Initialize the database
        dokhoRepository.saveAndFlush(dokho);

        int databaseSizeBeforeUpdate = dokhoRepository.findAll().size();

        // Update the dokho
        Dokho updatedDokho = dokhoRepository.findById(dokho.getId()).get();
        // Disconnect from session so that the updates on updatedDokho are not directly saved in db
        em.detach(updatedDokho);
        updatedDokho
            .dokho(UPDATED_DOKHO);

        restDokhoMockMvc.perform(put("/api/dokhos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDokho)))
            .andExpect(status().isOk());

        // Validate the Dokho in the database
        List<Dokho> dokhoList = dokhoRepository.findAll();
        assertThat(dokhoList).hasSize(databaseSizeBeforeUpdate);
        Dokho testDokho = dokhoList.get(dokhoList.size() - 1);
        assertThat(testDokho.getDokho()).isEqualTo(UPDATED_DOKHO);
    }

    @Test
    @Transactional
    public void updateNonExistingDokho() throws Exception {
        int databaseSizeBeforeUpdate = dokhoRepository.findAll().size();

        // Create the Dokho

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDokhoMockMvc.perform(put("/api/dokhos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dokho)))
            .andExpect(status().isBadRequest());

        // Validate the Dokho in the database
        List<Dokho> dokhoList = dokhoRepository.findAll();
        assertThat(dokhoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDokho() throws Exception {
        // Initialize the database
        dokhoRepository.saveAndFlush(dokho);

        int databaseSizeBeforeDelete = dokhoRepository.findAll().size();

        // Delete the dokho
        restDokhoMockMvc.perform(delete("/api/dokhos/{id}", dokho.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Dokho> dokhoList = dokhoRepository.findAll();
        assertThat(dokhoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Dokho.class);
        Dokho dokho1 = new Dokho();
        dokho1.setId(1L);
        Dokho dokho2 = new Dokho();
        dokho2.setId(dokho1.getId());
        assertThat(dokho1).isEqualTo(dokho2);
        dokho2.setId(2L);
        assertThat(dokho1).isNotEqualTo(dokho2);
        dokho1.setId(null);
        assertThat(dokho1).isNotEqualTo(dokho2);
    }
}
