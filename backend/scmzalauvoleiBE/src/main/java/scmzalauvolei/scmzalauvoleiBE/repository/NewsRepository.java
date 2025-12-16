package scmzalauvolei.scmzalauvoleiBE.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import scmzalauvolei.scmzalauvoleiBE.model.NewsItem;

public interface NewsRepository extends JpaRepository<NewsItem, Long>{
}
