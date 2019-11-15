package com.thitructuyen.web.rest;

import com.thitructuyen.ThitructuyenApp;
import com.thitructuyen.domain.Ketqua;
import com.thitructuyen.repository.KetquaRepository;
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
 * Integration tests for the {@link KetquaResource} REST controller.
 */
@SpringBootTest(classes = ThitructuyenApp.class)
public class KetquaResourceIT {

    private static final Integer DEFAULT_DIEMSO = 1;
    private static final Integer UPDATED_DIEMSO = 2;
    private static final Integer SMALLER_DIEMSO = 1 - 1;

    @Autowired
    private KetquaRepository ketquaRepository;

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

    private MockMvc restKetquaMockMvc;

    private Ketqua ketqua;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KetquaResource ketquaResource = new KetquaResource(ketquaRepository);
        this.restKetquaMockMvc = MockMvcBuilders.standaloneSetup(ketquaResource)
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
    public static Ketqua createEntity(EntityManager em) {
        Ketqua ketqua = new Ketqua()
            .diemso(DEFAULT_DIEMSO);
        return ketqua;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ketqua createUpdatedEntity(EntityManager em) {
        Ketqua ketqua = new Ketqua()
            .diemso(UPDATED_DIEMSO);
        return ketqua;
    }

    @BeforeEach
    public void initTest() {
        ketqua = createEntity(em);
    }

    @Test
    @Transactional
    public void createKetqua() throws Exception {
        int databaseSizeBeforeCreate = ketquaRepository.findAll().size();

        // Create the Ketqua
        restKetquaMockMvc.perform(post("/api/ketquas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ketqua)))
            .andExpect(status().isCreated());

        // Validate the Ketqua in the database
        List<Ketqua> ketquaList = ketquaRepository.findAll();
        assertThat(ketquaList).hasSize(databaseSizeBeforeCreate + 1);
        Ketqua testKetqua = ketquaList.get(ketquaList.size() - 1);
        assertThat(testKetqua.getDiemso()).isEqualTo(DEFAULT_DIEMSO);
    }

    @Test
    @Transactional
    public void createKetquaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ketquaRepository.findAll().size();

        // Create the Ketqua with an existing ID
        ketqua.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKetquaMockMvc.perform(post("/api/ketquas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ketqua)))
            .andExpect(status().isBadRequest());

        // Validate the Ketqua in the database
        List<Ketqua> ketquaList = ketquaRepository.findAll();
        assertThat(ketquaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllKetquas() throws Exception {
        // Initialize the database
        ketquaRepository.saveAndFlush(ketqua);

        // Get all the ketquaList
        restKetquaMockMvc.perform(get("/api/ketquas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ketqua.getId().intValue())))
            .andExpect(jsonPath("$.[*].diemso").value(hasItem(DEFAULT_DIEMSO)));
    }
    
    @Test
    @Transactional
    public void getKetqua() throws Exception {
        // Initialize the database
        ketquaRepository.saveAndFlush(ketqua);

        // Get the ketqua
        restKetquaMockMvc.perform(get("/api/ketquas/{id}", ketqua.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ketqua.getId().intValue()))
            .andExpect(jsonPath("$.diemso").value(DEFAULT_DIEMSO));
    }

    @Test
    @Transactional
    public void getNonExistingKetqua() throws Exception {
        // Get the ketqua
        restKetquaMockMvc.perform(get("/api/ketquas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKetqua() throws Exception {
        // Initialize the database
        ketquaRepository.saveAndFlush(ketqua);

        int databaseSizeBeforeUpdate = ketquaRepository.findAll().size();

        // Update the ketqua
        Ketqua updatedKetqua = ketquaRepository.findById(ketqua.getId()).get();
        // Disconnect from session so that the updates on updatedKetqua are not directly saved in db
        em.detach(updatedKetqua);
        updatedKetqua
            .diemso(UPDATED_DIEMSO);

        restKetquaMockMvc.perform(put("/api/ketquas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedKetqua)))
            .andExpect(status().isOk());

        // Validate the Ketqua in the database
        List<Ketqua> ketquaList = ketquaRepository.findAll();
        assertThat(ketquaList).hasSize(databaseSizeBeforeUpdate);
        Ketqua testKetqua = ketquaList.get(ketquaList.size() - 1);
        assertThat(testKetqua.getDiemso()).isEqualTo(UPDATED_DIEMSO);
    }

    @Test
    @Transactional
    public void updateNonExistingKetqua() throws Exception {
        int databaseSizeBeforeUpdate = ketquaRepository.findAll().size();

        // Create the Ketqua

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKetquaMockMvc.perform(put("/api/ketquas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ketqua)))
            .andExpect(status().isBadRequest());

        // Validate the Ketqua in the database
        List<Ketqua> ketquaList = ketquaRepository.findAll();
        assertThat(ketquaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteKetqua() throws Exception {
        // Initialize the database
        ketquaRepository.saveAndFlush(ketqua);

        int databaseSizeBeforeDelete = ketquaRepository.findAll().size();

        // Delete the ketqua
        restKetquaMockMvc.perform(delete("/api/ketquas/{id}", ketqua.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ketqua> ketquaList = ketquaRepository.findAll();
        assertThat(ketquaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ketqua.class);
        Ketqua ketqua1 = new Ketqua();
        ketqua1.setId(1L);
        Ketqua ketqua2 = new Ketqua();
        ketqua2.setId(ketqua1.getId());
        assertThat(ketqua1).isEqualTo(ketqua2);
        ketqua2.setId(2L);
        assertThat(ketqua1).isNotEqualTo(ketqua2);
        ketqua1.setId(null);
        assertThat(ketqua1).isNotEqualTo(ketqua2);
    }
}
