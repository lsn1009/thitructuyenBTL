package com.thitructuyen.web.rest;

import com.thitructuyen.ThitructuyenApp;
import com.thitructuyen.domain.Loai;
import com.thitructuyen.repository.LoaiRepository;
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
 * Integration tests for the {@link LoaiResource} REST controller.
 */
@SpringBootTest(classes = ThitructuyenApp.class)
public class LoaiResourceIT {

    private static final String DEFAULT_TENLOAI = "AAAAAAAAAA";
    private static final String UPDATED_TENLOAI = "BBBBBBBBBB";

    @Autowired
    private LoaiRepository loaiRepository;

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

    private MockMvc restLoaiMockMvc;

    private Loai loai;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LoaiResource loaiResource = new LoaiResource(loaiRepository);
        this.restLoaiMockMvc = MockMvcBuilders.standaloneSetup(loaiResource)
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
    public static Loai createEntity(EntityManager em) {
        Loai loai = new Loai()
            .tenloai(DEFAULT_TENLOAI);
        return loai;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Loai createUpdatedEntity(EntityManager em) {
        Loai loai = new Loai()
            .tenloai(UPDATED_TENLOAI);
        return loai;
    }

    @BeforeEach
    public void initTest() {
        loai = createEntity(em);
    }

    @Test
    @Transactional
    public void createLoai() throws Exception {
        int databaseSizeBeforeCreate = loaiRepository.findAll().size();

        // Create the Loai
        restLoaiMockMvc.perform(post("/api/loais")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(loai)))
            .andExpect(status().isCreated());

        // Validate the Loai in the database
        List<Loai> loaiList = loaiRepository.findAll();
        assertThat(loaiList).hasSize(databaseSizeBeforeCreate + 1);
        Loai testLoai = loaiList.get(loaiList.size() - 1);
        assertThat(testLoai.getTenloai()).isEqualTo(DEFAULT_TENLOAI);
    }

    @Test
    @Transactional
    public void createLoaiWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = loaiRepository.findAll().size();

        // Create the Loai with an existing ID
        loai.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLoaiMockMvc.perform(post("/api/loais")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(loai)))
            .andExpect(status().isBadRequest());

        // Validate the Loai in the database
        List<Loai> loaiList = loaiRepository.findAll();
        assertThat(loaiList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTenloaiIsRequired() throws Exception {
        int databaseSizeBeforeTest = loaiRepository.findAll().size();
        // set the field null
        loai.setTenloai(null);

        // Create the Loai, which fails.

        restLoaiMockMvc.perform(post("/api/loais")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(loai)))
            .andExpect(status().isBadRequest());

        List<Loai> loaiList = loaiRepository.findAll();
        assertThat(loaiList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLoais() throws Exception {
        // Initialize the database
        loaiRepository.saveAndFlush(loai);

        // Get all the loaiList
        restLoaiMockMvc.perform(get("/api/loais?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(loai.getId().intValue())))
            .andExpect(jsonPath("$.[*].tenloai").value(hasItem(DEFAULT_TENLOAI.toString())));
    }
    
    @Test
    @Transactional
    public void getLoai() throws Exception {
        // Initialize the database
        loaiRepository.saveAndFlush(loai);

        // Get the loai
        restLoaiMockMvc.perform(get("/api/loais/{id}", loai.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(loai.getId().intValue()))
            .andExpect(jsonPath("$.tenloai").value(DEFAULT_TENLOAI.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLoai() throws Exception {
        // Get the loai
        restLoaiMockMvc.perform(get("/api/loais/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLoai() throws Exception {
        // Initialize the database
        loaiRepository.saveAndFlush(loai);

        int databaseSizeBeforeUpdate = loaiRepository.findAll().size();

        // Update the loai
        Loai updatedLoai = loaiRepository.findById(loai.getId()).get();
        // Disconnect from session so that the updates on updatedLoai are not directly saved in db
        em.detach(updatedLoai);
        updatedLoai
            .tenloai(UPDATED_TENLOAI);

        restLoaiMockMvc.perform(put("/api/loais")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLoai)))
            .andExpect(status().isOk());

        // Validate the Loai in the database
        List<Loai> loaiList = loaiRepository.findAll();
        assertThat(loaiList).hasSize(databaseSizeBeforeUpdate);
        Loai testLoai = loaiList.get(loaiList.size() - 1);
        assertThat(testLoai.getTenloai()).isEqualTo(UPDATED_TENLOAI);
    }

    @Test
    @Transactional
    public void updateNonExistingLoai() throws Exception {
        int databaseSizeBeforeUpdate = loaiRepository.findAll().size();

        // Create the Loai

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLoaiMockMvc.perform(put("/api/loais")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(loai)))
            .andExpect(status().isBadRequest());

        // Validate the Loai in the database
        List<Loai> loaiList = loaiRepository.findAll();
        assertThat(loaiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLoai() throws Exception {
        // Initialize the database
        loaiRepository.saveAndFlush(loai);

        int databaseSizeBeforeDelete = loaiRepository.findAll().size();

        // Delete the loai
        restLoaiMockMvc.perform(delete("/api/loais/{id}", loai.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Loai> loaiList = loaiRepository.findAll();
        assertThat(loaiList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Loai.class);
        Loai loai1 = new Loai();
        loai1.setId(1L);
        Loai loai2 = new Loai();
        loai2.setId(loai1.getId());
        assertThat(loai1).isEqualTo(loai2);
        loai2.setId(2L);
        assertThat(loai1).isNotEqualTo(loai2);
        loai1.setId(null);
        assertThat(loai1).isNotEqualTo(loai2);
    }
}
