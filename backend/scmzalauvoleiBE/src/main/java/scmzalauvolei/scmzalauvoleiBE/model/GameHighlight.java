package scmzalauvolei.scmzalauvoleiBE.model;

import jakarta.persistence.*;

@Entity
public class GameHighlight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;        // image / video
    private String mediaUrl;
    private String description; // Alt text like Meci Dinamo

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getMediaUrl() { return mediaUrl; }
    public void setMediaUrl(String mediaUrl) { this.mediaUrl = mediaUrl; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}