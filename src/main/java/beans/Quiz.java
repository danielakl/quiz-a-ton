package beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * @author Daniel Klock
 * @version 1.1.0
 *
 * Quiz bean class following official JavaBean specification found at:
 * "http://www.oracle.com/technetwork/articles/javaee/spec-136004.html".
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class Quiz implements Serializable {
    @XmlElement(name = "id")
    private int id;

    @XmlElement(name = "name")
    private String name;

    @XmlElement(name = "creator")
    private String creator;

    @XmlElement(name = "startTime")
    private LocalDateTime startTime;

    @XmlElement(name = "questions")
    private List<Integer> questions;

    @XmlElement(name = "scoreBoard")
    private Map<String, Integer> scoreBoard;

    /*
     * Getters
     */
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCreator() {
        return creator;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public List<Integer> getQuestions() {
        return questions;
    }

    public Map<String, Integer> getScoreBoard() {
        return scoreBoard;
    }

    /*
     * Setters
     */
    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public void setQuestions(List<Integer> questions) {
        this.questions = questions;
    }

    public void setScoreBoard(Map<String, Integer> scoreBoard) {
        this.scoreBoard = scoreBoard;
    }
}
