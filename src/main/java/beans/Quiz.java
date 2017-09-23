package beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.*;

/**
 * @author Daniel Klock
 * @version 1.2.0
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
    private Date startTime;

    @XmlElement(name = "questions")
    private List<Question> questions;

    @XmlElement(name = "playerList")
    private List<Player> playerList;

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

    public Date getStartTime() {
        return startTime;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public List<Player> getPlayerList() {
        return playerList;
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

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public void setPlayerList(List<Player> scoreBoard) {
        this.playerList = playerList;
    }
}
