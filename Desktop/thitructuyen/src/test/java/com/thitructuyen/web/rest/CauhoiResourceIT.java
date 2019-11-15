package com.thitructuyen.web.rest;

import com.thitructuyen.ThitructuyenApp;
import com.thitructuyen.domain.Cauhoi;
import com.thitructuyen.repository.CauhoiRepository;
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
 * Integration tests for the {@link CauhoiResource} REST controller.
 */
@SpringBootTest(classes = ThitructuyenApp.class)
public class CauhoiResourceIT {

    private static final String DEFAULT_NOIDUNG = "AAAAAAAAAA";
    private static final String UPDATED_NOIDUNG = "BBBBBBBBBB";

    private static final String DEFAULT_KETQUA = "AAAAAAAAAA";
    private static final String UPDATED_KETQUA = "BBBBBBBBBB";

    private static final String DEFAULT_DAPAN_1 = "AAAAAAAAAA";
    private static final String UPDATED_DAPAN_1 = "BBBBBBBBBB";

    private static final String DEFAULT_DAPAN_2 = "AAAAAAAAAA";
    private static final String UPDATED_DAPAN_2 = "BBBBBBBBBB";

    private static final String DEFAULT_DAPAN_3 = "AAAAAAAAAA";
    private static final String UPDATED_DAPAN_3 = "BBBBBBBBBB";

    private static final String DEFAULT_DAPAN_4 = "AAAAAAAAAA";
    private static final String UPDATED_DAPAN_4 = "BBBBBBBBBB";

    @Autowired
    private CauhoiRepository cauhoiRepository;

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

    private MockMvc restCauhoiMockMvc;

    private Cauhoi cauhoi;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CauhoiResource cauhoiResource = new CauhoiResource(cauhoiRepository);
        this.restCauhoiMockMvc = MockMvcBuilders.standaloneSetup(cauhoiResource)
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
    public static Cauhoi createEntity(EntityManager em) {
        Cauhoi cauhoi = new Cauhoi()
            .noidung(DEFAULT_NOIDUNG)
            .ketqua(DEFAULT_KETQUA)
            .dapan1(DEFAULT_DAPAN_1)
            .dapan2(DEFAULT_DAPAN_2)
            .dapan3(DEFAULT_DAPAN_3)
            .dapan4(DEFAULT_DAPAN_4);
        return cauhoi;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cauhoi createUpdatedEntity(EntityManager em) {
        Cauhoi cauhoi = new Cauhoi()
            .noidung(UPDATED_NOIDUNG)
            .ketqua(UPDATED_KETQUA)
            .dapan1(UPDATED_DAPAN_1)
            .dapan2(UPDATED_DAPAN_2)
            .dapan3(UPDATED_DAPAN_3)
            .dapan4(UPDATED_DAPAN_4);
        return cauhoi;
    }

    @BeforeEach
    public void initTest() {
        cauhoi = createEntity(em);
    }

    @Test
    @Transactional
    public void createCauhoi() throws Exception {
        int databaseSizeBeforeCreate = cauhoiRepository.findAll().size();

        // Create the Cauhoi
        restCauhoiMockMvc.perform(post("/api/cauhois")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cauhoi)))
            .andExpect(status().isCreated());

        // Validate the Cauhoi in the database
        List<Cauhoi> cauhoiList = cauhoiRepository.findAll();
        assertThat(cauhoiList).hasSize(databaseSizeBeforeCreate + 1);
        Cauhoi testCauhoi = cauhoiList.get(cauhoiList.size() - 1);
        assertThat(testCauhoi.getNoidung()).isEqualTo(DEFAULT_NOIDUNG);
        assertThat(testCauhoi.getKetqua()).isEqualTo(DEFAULT_KETQUA);
        assertThat(testCauhoi.getDapan1()).isEqualTo(DEFAULT_DAPAN_1);
        assertThat(testCauhoi.getDapan2()).isEqualTo(DEFAULT_DAPAN_2);
        assertThat(testCauhoi.getDapan3()).isEqualTo(DEFAULT_DAPAN_3);
        assertThat(testCauhoi.getDapan4()).isEqualTo(DEFAULT_DAPAN_4);
    }

    @Test
    @Transactional
    public void createCauhoiWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cauhoiRepository.findAll().size();

        // Create the Cauhoi with an existing ID
        cauhoi.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCauhoiMockMvc.perform(post("/api/cauhois")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cauhoi)))
            .andExpect(status().isBadRequest());

        // Validate the Cauhoi in the database
        List<Cauhoi> cauhoiList = cauhoiRepository.findAll();
        assertThat(cauhoiList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNoidungIsRequired() throws Exception {
        int databaseSizeBeforeTest = cauhoiRepository.findAll().size();
        // set the field null
        cauhoi.setNoidung(null);

        // Create the Cauhoi, which fails.

        restCauhoiMockMvc.perform(post("/api/cauhois")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cauhoi)))
            .andExpect(status().isBadRequest());

        List<Cauhoi> cauhoiList = cauhoiRepository.findAll();
        assertThat(cauhoiList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkKetquaIsRequired() throws Exception {
        int databaseSizeBeforeTest = cauhoiRepository.findAll().size();
        // set the field null
        cauhoi.setKetqua(null);

        // Create the Cauhoi, which fails.

        restCauhoiMockMvc.perform(post("/api/cauhois")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cauhoi)))
            .andExpect(status().isBadRequest());

        List<Cauhoi> cauhoiList = cauhoiRepository.findAll();
        assertThat(cauhoiList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCauhois() throws Exception {
        // Initialize the database
        cauhoiRepository.saveAndFlush(cauhoi);

        // Get all the cauhoiList
        restCauhoiMockMvc.perform(get("/api/cauhois?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cauhoi.getId().intValue())))
            .andExpect(jsonPath("$.[*].noidung").value(hasItem(DEFAULT_NOIDUNG.toString())))
            .andExpect(jsonPath("$.[*].ketqua").value(hasItem(DEFAULT_KETQUA.toString())))
            .andExpect(jsonPath("$.[*].dapan1").value(hasItem(DEFAULT_DAPAN_1.toString())))
            .andExpect(jsonPath("$.[*].dapan2").value(hasItem(DEFAULT_DAPAN_2.toString())))
            .andExpect(jsonPath("$.[*].dapan3").value(hasItem(DEFAULT_DAPAN_3.toString())))
            .andExpect(jsonPath("$.[*].dapan4").value(hasItem(DEFAULT_DAPAN_4.toString())));
    }
    
    @Test
    @Transactional
    public void getCauhoi() throws Exception {
        // Initialize the database
        cauhoiRepository.saveAndFlush(cauhoi);

        // Get the cauhoi
        restCauhoiMockMvc.perform(get("/api/cauhois/{id}", cauhoi.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cauhoi.getId().intValue()))
            .andExpect(jsonPath("$.noidung").value(DEFAULT_NOIDUNG.toString()))
            .andExpect(jsonPath("$.ketqua").value(DEFAULT_KETQUA.toString()))
            .andExpect(jsonPath("$.dapan1").value(DEFAULT_DAPAN_1.toString()))
            .andExpect(jsonPath("$.dapan2").value(DEFAULT_DAPAN_2.toString()))
            .andExpect(jsonPath("$.dapan3").value(DEFAULT_DAPAN_3.toString()))
            .andExpect(jsonPath("$.dapan4").value(DEFAULT_DAPAN_4.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCauhoi() throws Exception {
        // Get the cauhoi
        restCauhoiMockMvc.perform(get("/api/cauhois/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCauhoi() throws Exception {
        // Initialize the database
        cauhoiRepository.saveAndFlush(cauhoi);

        int databaseSizeBeforeUpdate = cauhoiRepository.findAll().size();

        // Update the cauhoi
        Cauhoi updatedCauhoi = cauhoiRepository.findById(cauhoi.getId()).get();
        // Disconnect from session so that the updates on updatedCauhoi are not directly saved in db
        em.detach(updatedCauhoi);
        updatedCauhoi
            .noidung(UPDATED_NOIDUNG)
            .ketqua(UPDATED_KETQUA)
            .dapan1(UPDATED_DAPAN_1)
            .dapan2(UPDATED_DAPAN_2)
            .dapan3(UPDATED_DAPAN_3)
            .dapan4(UPDATED_DAPAN_4);

        restCauhoiMockMvc.perform(put("/api/cauhois")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCauhoi)))
            .andExpect(status().isOk());

        // Validate the Cauhoi in the database
        List<Cauhoi> cauhoiList = cauhoiRepository.findAll();
        assertThat(cauhoiList).hasSize(databaseSizeBeforeUpdate);
        Cauhoi testCauhoi = cauhoiList.get(cauhoiList.size() - 1);
        assertThat(testCauhoi.getNoidung()).isEqualTo(UPDATED_NOIDUNG);
        assertThat(testCauhoi.getKetqua()).isEqualTo(UPDATED_KETQUA);
        assertThat(testCauhoi.getDapan1()).isEqualTo(UPDATED_DAPAN_1);
        assertThat(testCauhoi.getDapan2()).isEqualTo(UPDATED_DAPAN_2);
        assertThat(testCauhoi.getDapan3()).isEqualTo(UPDATED_DAPAN_3);
        assertThat(testCauhoi.getDapan4()).isEqualTo(UPDATED_DAPAN_4);
    }

    @Test
    @Transactional
    public void updateNonExistingCauhoi() throws Exception {
        int databaseSizeBeforeUpdate = cauhoiRepository.findAll().size();

        // Create the Cauhoi

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCauhoiMockMvc.perform(put("/api/cauhois")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cauhoi)))
            .andExpect(status().isBadRequest());

        // Validate the Cauhoi in the database
        List<Cauhoi> cauhoiList = cauhoiRepository.findAll();
        assertThat(cauhoiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCauhoi() throws Exception {
        // Initialize the database
        cauhoiRepository.saveAndFlush(cauhoi);

        int databaseSizeBeforeDelete = cauhoiRepository.findAll().size();

        // Delete the cauhoi
        restCauhoiMockMvc.perform(delete("/api/cauhois/{id}", cauhoi.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Cauhoi> cauhoiList = cauhoiRepository.findAll();
        assertThat(cauhoiList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cauhoi.class);
        Cauhoi cauhoi1 = new Cauhoi();
        cauhoi1.setId(1L);
        Cauhoi cauhoi2 = new Cauhoi();
        cauhoi2.setId(cauhoi1.getId());
        assertThat(cauhoi1).isEqualTo(cauhoi2);
        cauhoi2.setId(2L);
        assertThat(cauhoi1).isNotEqualTo(cauhoi2);
        cauhoi1.setId(null);
        assertThat(cauhoi1).isNotEqualTo(cauhoi2);
    }
}
