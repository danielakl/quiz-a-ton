package beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import java.io.Serializable;

/**
 * @author Daniel Klock
 * @version 0.1.0
 *
 * Question bean class following official JavaBean specification found at:
 * "http://www.oracle.com/technetwork/articles/javaee/spec-136004.html".
 */
@Deprecated
@XmlAccessorType(XmlAccessType.FIELD)
public class Answer implements Serializable {
    @XmlElement(name = "id")
    private int id;

    @XmlElement(name = "answer")
    private String answer;

    @XmlElement(name = "points")
    private int points;

    /*
     * Getters
     */
    public int getId() {
        return id;
    }

    public String getAnswer() {
        return answer;
    }

    public int getPoints() {
        return points;
    }

    /*
     * Setters
     */
    public void setId(int id) {
        this.id = id;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public void setPoints(int point) {
        this.points = point;
    }
}
