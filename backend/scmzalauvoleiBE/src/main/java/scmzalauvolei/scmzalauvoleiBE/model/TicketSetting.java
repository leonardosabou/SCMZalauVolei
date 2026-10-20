package scmzalauvolei.scmzalauvoleiBE.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class TicketSetting {
    @Id
    private Long id = 1L;

    private boolean visible;
    private String linkUrl;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public boolean isVisible() { return visible; }
    public void setVisible(boolean visible) { this.visible = visible; }

    public String getLinkUrl() { return linkUrl; }
    public void setLinkUrl(String linkUrl) { this.linkUrl = linkUrl; }
}