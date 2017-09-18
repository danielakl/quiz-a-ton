package beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import java.io.Serializable;
import java.util.List;

/**
 * @author Daniel Klock
 * @version 0.1.0
 *
 * Quiz bean class following official JavaBean specification found at:
 * "http://www.oracle.com/technetwork/articles/javaee/spec-136004.html".
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class Quiz implements Serializable {
    @XmlElement(name = "id")
    private int id;

    @XmlElement(name = "questions")
    private List<Question> questions;

    @XmlElement(name = "duration")
    private int duration;

    /*
     * Getters
     */
    public int getId() {
        return id;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public int getDuration() {
        return duration;
    }

    /*
     * Setters
     */
    public void setId(int id) {
        this.id = id;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }
}
