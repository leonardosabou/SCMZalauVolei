package scmzalauvolei.scmzalauvoleiBE.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import scmzalauvolei.scmzalauvoleiBE.model.*;
import scmzalauvolei.scmzalauvoleiBE.repository.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/home")
@CrossOrigin(origins = "http://localhost:3000")
public class HomeController {

    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private SponsorRepository sponsorRepository;

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private MatchResultRepository resultRepository;

    @Autowired
    private GameHighlightRepository gameHighlightRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private StandingRepository standingRepository;

    @GetMapping("/news")
    public List<NewsItem> getNews(){
        return newsRepository.findAll(Sort.by(Sort.Direction.DESC, "date"));
    }

    @GetMapping("/sponsors")
    public List<Sponsor> getSponsors(){
        return sponsorRepository.findAll(Sort.by(Sort.Direction.ASC, "displayOrder"));
    }

    @GetMapping("/next-match")
    public ResponseEntity<MatchGame> getNextMatch(){
        MatchGame nextMatch = matchRepository.findFirstByDateAfterAndIsFinishedFalseOrderByDateAsc(LocalDateTime.now().minusHours(3));

        if(nextMatch != null){
            return ResponseEntity.ok(nextMatch);
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/results")
    public List<MatchResult> getResults(){
        return resultRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    @GetMapping("/highlights")
    public List<GameHighlight> getHighlights(){
        return gameHighlightRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    @GetMapping("/team/players")
    public List<Player> getPlayers(){
        return playerRepository.findAll();
    }

    @GetMapping("/team/staff")
    public List<Staff> getStaff(){
        return staffRepository.findAll();
    }

    @GetMapping("/program")
    public List<MatchGame> getAllMatches(){
        return matchRepository.findAllByDateAfterOrderByDateAsc(LocalDateTime.now());
    }

    @GetMapping("/standings")
    public List<Standing> getStandings(){
        return standingRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }
}
