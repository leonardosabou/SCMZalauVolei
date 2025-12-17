package scmzalauvolei.scmzalauvoleiBE.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class MatchResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String stage;
    private String imageUrl;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getStage() { return stage; }
    public void setStage(String stage) { this.stage = stage; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}